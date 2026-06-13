import React, { useState, useEffect, useRef } from 'react';
import { Pressable, Text, StyleSheet, Platform, Linking, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../hooks/useTheme';
import { useResponsive } from '../hooks/useResponsive';
import { CONTACT_INFO } from '../constants/data';
import {
  getPageScrollY,
  getPageScroller,
  findPageScroller,
  smoothScrollTo,
  scrollToId,
} from '../utils/pageScroll';

/**
 * Tek koordineli alt dok: yüzen "maliyet" pill'i (mobil) + sağ alt FAB sütunu
 * (Başa Dön üstte, WhatsApp altta). Tek <floating-actions> stack'i.
 *
 * Çakışma çözümü iki katmanlı:
 *  1. Pill açıkken FAB sütunu yukarı kalkar (pill ile çakışmaz).
 *  2. IntersectionObserver: form navigasyonu (Geri/İleri), sonuç CTA'ları
 *     (Keşif/WhatsApp) ve footer ekranın alt bandına girince TÜM stack
 *     opacity ile gizlenir → hiçbir içerik butonunun üstüne binmez.
 *
 * Avoid edilecek öğeler web'de `data-fab-avoid="1"` ile işaretlenir.
 */

const INSET = 16; // kenar boşluğu (px)
const WA_SIZE = 56; // WhatsApp butonu
const TOP_SIZE = 44; // başa-dön butonu
const COL_GAP = 16; // WA üst kenarı ile başa-dön arası → 56+16 = 72px ayrım
const PILL_H = 52; // yüzen pill yüksekliği
const AVOID_BAND = 96; // ekran altında "tehlike bandı" yüksekliği (px)

// fixed + safe-area destekli alt konum (yalnızca web'de env() geçerli)
const safeBottom = (base: number) =>
  Platform.OS === 'web'
    ? ({ bottom: `calc(${base}px + env(safe-area-inset-bottom, 0px))` } as any)
    : { bottom: base };

export function BottomDock() {
  const { colors } = useTheme();
  const { isMobile } = useResponsive();

  const [scrollTopVisible, setScrollTopVisible] = useState(false);
  const [pillVisible, setPillVisible] = useState(false);
  const [avoidActive, setAvoidActive] = useState(false); // alt CTA/footer görünür mü
  const [hovered, setHovered] = useState<'wa' | 'top' | null>(null);
  const scrollerRef = useRef<HTMLElement | null>(null);

  // --- Scroll: başa-dön ve pill görünürlüğü ---
  useEffect(() => {
    if (Platform.OS !== 'web') return;
    const handleScroll = (e: Event) => {
      const y = getPageScrollY(e);
      if (y === null) return; // yatay carousel vb. — yok say
      const scroller = getPageScroller(e);
      if (scroller) scrollerRef.current = scroller;

      setScrollTopVisible(y > 400);

      const pastHero = y > window.innerHeight * 0.8;
      const quoteEl = document.getElementById('maliyet-hesapla');
      const r = quoteEl?.getBoundingClientRect();
      const quoteVisible = r ? r.top < window.innerHeight && r.bottom > 0 : false;
      setPillVisible(pastHero && !quoteVisible);
    };
    window.addEventListener('scroll', handleScroll, { passive: true, capture: true });
    return () => window.removeEventListener('scroll', handleScroll, { capture: true } as any);
  }, []);

  // --- IntersectionObserver: alt içerik butonları / footer çakışma koruması ---
  useEffect(() => {
    if (Platform.OS !== 'web' || typeof IntersectionObserver === 'undefined') return;

    const active = new Set<Element>();
    // Ekranın alt AVOID_BAND bandına giren öğeleri yakala (altta -%... margin)
    const io = new IntersectionObserver(
      (entries) => {
        for (const en of entries) {
          if (en.isIntersecting) active.add(en.target);
          else active.delete(en.target);
        }
        setAvoidActive(active.size > 0);
      },
      { rootMargin: `0px 0px -${Math.max(0, window.innerHeight - AVOID_BAND)}px 0px`, threshold: 0 }
    );

    const observed = new Set<Element>();
    const sync = () => {
      const els = document.querySelectorAll('[data-fab-avoid="1"]');
      els.forEach((el) => {
        if (!observed.has(el)) {
          observed.add(el);
          io.observe(el);
        }
      });
      // DOM'dan kalkanları temizle
      observed.forEach((el) => {
        if (!el.isConnected) {
          observed.delete(el);
          active.delete(el);
        }
      });
    };
    sync();

    // Wizard adımları/sonuç kartı dinamik render edilir → DOM değişimini izle
    const mo = new MutationObserver(() => sync());
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  const isWeb = Platform.OS === 'web';
  const showPill = isWeb && isMobile && pillVisible && !avoidActive;
  const hidden = avoidActive; // stack'i tamamen sahne dışına al

  // Pill açıkken FAB sütununu pill'in üstüne çıkar
  const columnBottom = showPill ? INSET + PILL_H + COL_GAP : INSET;

  const onScrollTop = () => {
    if (!isWeb) return;
    const scroller = scrollerRef.current ?? findPageScroller();
    if (scroller) smoothScrollTo(scroller, 0);
    else window.scrollTo(0, 0);
  };

  const webHover = (key: 'wa' | 'top') =>
    isWeb
      ? { onMouseEnter: () => setHovered(key), onMouseLeave: () => setHovered(null) }
      : {};

  return (
    <>
      {/* Yüzen maliyet pill'i (mobil) */}
      {showPill && (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Maliyet hesaplayıcıya git"
          onPress={() => scrollToId('maliyet-hesapla')}
          style={[styles.pill, safeBottom(INSET), { backgroundColor: colors.primary }]}
        >
          <MaterialCommunityIcons name="calculator-variant-outline" size={20} color="#FFFFFF" />
          <Text style={styles.pillText}>Maliyetini Hemen Hesapla</Text>
          <MaterialCommunityIcons name="arrow-right" size={18} color="#FFFFFF" />
        </Pressable>
      )}

      {/* Sağ alt FAB sütunu (floating-actions) */}
      <View
        style={[
          styles.column,
          safeBottom(columnBottom),
          {
            opacity: hidden ? 0 : 1,
            ...(isWeb
              ? ({ transitionProperty: 'opacity, bottom', transitionDuration: '250ms' } as any)
              : {}),
          },
        ]}
        pointerEvents={hidden ? 'none' : 'box-none'}
      >
        {scrollTopVisible && (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Sayfanın başına dön"
            onPress={onScrollTop}
            {...webHover('top')}
            style={[
              styles.topFab,
              {
                backgroundColor: hovered === 'top' ? colors.primaryDark : colors.primary,
                transform: [{ scale: hovered === 'top' ? 1.1 : 1 }],
              },
            ]}
          >
            <MaterialCommunityIcons name="chevron-up" size={22} color="#FFFFFF" />
          </Pressable>
        )}

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="WhatsApp ile iletişime geç"
          onPress={() =>
            Linking.openURL(`https://wa.me/${CONTACT_INFO.whatsapp.replace(/\D/g, '')}`)
          }
          {...webHover('wa')}
          style={[styles.waFab, { transform: [{ scale: hovered === 'wa' ? 1.1 : 1 }] }]}
        >
          <MaterialCommunityIcons name="whatsapp" size={28} color="#FFFFFF" />
        </Pressable>
      </View>
    </>
  );
}

const fixed = Platform.OS === 'web' ? ('fixed' as any) : 'absolute';

const styles = StyleSheet.create({
  column: {
    position: fixed,
    right: INSET,
    alignItems: 'center',
    gap: COL_GAP,
    // z hiyerarşisi: modaller > mobil menü (1000) > floating (900) > içerik
    zIndex: 900,
  },
  waFab: {
    width: WA_SIZE,
    height: WA_SIZE,
    borderRadius: WA_SIZE / 2,
    backgroundColor: '#25D366',
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      web: {
        cursor: 'pointer',
        boxShadow: '0 4px 16px rgba(37, 211, 102, 0.4)',
        transitionDuration: '200ms',
        transitionProperty: 'transform',
      } as any,
    }),
  },
  topFab: {
    width: TOP_SIZE,
    height: TOP_SIZE,
    borderRadius: TOP_SIZE / 2,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      web: {
        cursor: 'pointer',
        boxShadow: '0 4px 12px rgba(111, 164, 58, 0.3)',
        transitionDuration: '200ms',
        transitionProperty: 'all',
      } as any,
    }),
  },
  pill: {
    position: fixed,
    left: INSET,
    right: INSET,
    height: PILL_H,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 16,
    borderRadius: PILL_H / 2,
    zIndex: 899,
    ...Platform.select({
      web: {
        cursor: 'pointer',
        boxShadow: '0 6px 20px rgba(0,0,0,0.25)',
      } as any,
    }),
  },
  pillText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
});
