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

// Tek bir koordineli alt dok: yüzen pill (mobil) + sağ alt FAB sütunu.
// Pill açıkken FAB sütunu yukarı kalkar; böylece WhatsApp/başa-dön asla
// pill'in üstüne binmez. Eski WhatsAppFAB + ScrollToTopFAB + StickyQuoteBar
// yerine geçer.

const INSET = 16; // kenar boşluğu
const WA_SIZE = 56; // WhatsApp butonu
const TOP_SIZE = 44; // başa-dön butonu
const GAP = 12; // dikey/aralık
const PILL_H = 52; // yüzen pill yüksekliği

export function BottomDock() {
  const { colors } = useTheme();
  const { isMobile } = useResponsive();

  const [scrollTopVisible, setScrollTopVisible] = useState(false);
  const [pillVisible, setPillVisible] = useState(false);
  const [hovered, setHovered] = useState<'wa' | 'top' | null>(null);
  const scrollerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (Platform.OS !== 'web') return;
    const handleScroll = (e: Event) => {
      const y = getPageScrollY(e);
      if (y === null) return; // yatay carousel vb. — yok say
      const scroller = getPageScroller(e);
      if (scroller) scrollerRef.current = scroller;

      setScrollTopVisible(y > 400);

      // Pill: hero geçildi ve maliyet bölümü görünmüyorsa
      const pastHero = y > window.innerHeight * 0.8;
      const quoteEl = document.getElementById('maliyet-hesapla');
      const r = quoteEl?.getBoundingClientRect();
      const quoteVisible = r ? r.top < window.innerHeight && r.bottom > 0 : false;
      setPillVisible(pastHero && !quoteVisible);
    };
    window.addEventListener('scroll', handleScroll, { passive: true, capture: true });
    return () => window.removeEventListener('scroll', handleScroll, { capture: true } as any);
  }, []);

  const isWeb = Platform.OS === 'web';
  const showPill = isWeb && isMobile && pillVisible;

  // Pill açıkken FAB sütununu pill'in üstüne çıkar
  const columnBottom = showPill ? INSET + PILL_H + GAP : INSET;

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
          style={[styles.pill, { backgroundColor: colors.primary }]}
        >
          <MaterialCommunityIcons name="calculator-variant-outline" size={20} color="#FFFFFF" />
          <Text style={styles.pillText}>Maliyetini Hemen Hesapla</Text>
          <MaterialCommunityIcons name="arrow-right" size={18} color="#FFFFFF" />
        </Pressable>
      )}

      {/* Sağ alt FAB sütunu */}
      <View style={[styles.column, { bottom: columnBottom }]} pointerEvents="box-none">
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
    gap: GAP,
    zIndex: 999,
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
    bottom: INSET,
    // FAB sütununa yer bırak: sağda WA genişliği + boşluk kadar
    left: INSET,
    right: INSET,
    height: PILL_H,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 16,
    borderRadius: PILL_H / 2,
    zIndex: 998,
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
