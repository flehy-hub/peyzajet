import React, { useState, useEffect } from 'react';
import { Pressable, Text, StyleSheet, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../hooks/useTheme';
import { useResponsive } from '../hooks/useResponsive';
import { getPageScrollY, scrollToId } from '../utils/pageScroll';

export function StickyQuoteBar() {
  const { colors } = useTheme();
  const { isMobile } = useResponsive();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (Platform.OS !== 'web') return;
    const handleScroll = (e: Event) => {
      const y = getPageScrollY(e);
      if (y === null) return; // yatay carousel vb. — yok say
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
          scrollToId('maliyet-hesapla');
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
    // Tam genişlik yerine yüzen pill: sağda WhatsApp FAB'a (right 30 + 60) yer
    // bırakacak şekilde biter; böylece butonlar üst üste binmez.
    bottom: 16,
    left: 12,
    right: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 28,
    zIndex: 997,
    ...Platform.select({
      web: {
        cursor: 'pointer',
        boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
      } as any,
    }),
  },
  text: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});
