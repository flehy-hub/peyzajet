import React, { useState, useEffect } from 'react';
import { Pressable, Text, StyleSheet, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../hooks/useTheme';
import { useResponsive } from '../hooks/useResponsive';

export function StickyQuoteBar() {
  const { colors } = useTheme();
  const { isMobile } = useResponsive();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (Platform.OS !== 'web') return;
    const handleScroll = (e: Event) => {
      const target = e.target as HTMLElement | Document;
      const y = window.scrollY || (target instanceof HTMLElement ? target.scrollTop : 0);
      const pastHero = y > window.innerHeight * 0.8;
      const quoteEl = document.getElementById('maliyet-hesapla');
      const quoteVisible = quoteEl
        ? quoteEl.getBoundingClientRect().top < window.innerHeight &&
          quoteEl.getBoundingClientRect().bottom > 0
        : false;
      setVisible(pastHero && !quoteVisible);
    };
    window.addEventListener('scroll', handleScroll, { passive: true, capture: true });
    return () => window.removeEventListener('scroll', handleScroll, { capture: true } as any);
  }, []);

  if (!isMobile || !visible) return null;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Maliyet hesaplayıcıya git"
      onPress={() => {
        if (Platform.OS === 'web') {
          document.getElementById('maliyet-hesapla')?.scrollIntoView({ behavior: 'smooth' });
        }
      }}
      style={[styles.bar, { backgroundColor: colors.primary }]}
    >
      <MaterialCommunityIcons name="calculator-variant-outline" size={20} color="#FFFFFF" />
      <Text style={styles.text}>Maliyetini Hemen Hesapla</Text>
      <MaterialCommunityIcons name="arrow-right" size={18} color="#FFFFFF" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  bar: {
    position: Platform.OS === 'web' ? ('fixed' as any) : 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    // sağda WhatsApp FAB ile çakışmaması için geniş yatay boşluk
    paddingHorizontal: 72,
    zIndex: 997,
    ...Platform.select({
      web: {
        cursor: 'pointer',
        boxShadow: '0 -2px 12px rgba(0,0,0,0.15)',
      } as any,
    }),
  },
  text: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});
