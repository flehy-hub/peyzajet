import React, { useState, useEffect, useRef } from 'react';
import { Pressable, StyleSheet, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../hooks/useTheme';
import { getPageScrollY, getPageScroller, findPageScroller, smoothScrollTo } from '../utils/pageScroll';

export function ScrollToTopFAB() {
  const { colors } = useTheme();
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const scrollerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (Platform.OS !== 'web') return;
    const handleScroll = (e: Event) => {
      const y = getPageScrollY(e);
      if (y === null) return; // yatay carousel vb. — yok say
      const scroller = getPageScroller(e);
      if (scroller) scrollerRef.current = scroller;
      setVisible(y > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true, capture: true });
    return () => window.removeEventListener('scroll', handleScroll, { capture: true } as any);
  }, []);

  if (!visible) return null;

  const webHover = Platform.OS === 'web' ? {
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
  } : {};

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Sayfanın başına dön"
      onPress={() => {
        if (Platform.OS === 'web') {
          const scroller = scrollerRef.current ?? findPageScroller();
          if (scroller) smoothScrollTo(scroller, 0);
          else window.scrollTo(0, 0);
        }
      }}
      {...webHover}
      style={[
        styles.fab,
        {
          backgroundColor: hovered ? colors.primaryDark : colors.primary,
          opacity: visible ? 1 : 0,
          transform: [{ scale: hovered ? 1.1 : 1 }],
        },
      ]}
    >
      <MaterialCommunityIcons name="chevron-up" size={24} color="#FFFFFF" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: Platform.OS === 'web' ? ('fixed' as any) : 'absolute',
    bottom: 30,
    right: 100,
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 998,
    ...Platform.select({
      web: {
        cursor: 'pointer',
        boxShadow: '0 4px 12px rgba(111, 164, 58, 0.3)',
        transitionDuration: '200ms',
        transitionProperty: 'all',
      } as any,
    }),
  },
  icon: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '700',
  },
});
