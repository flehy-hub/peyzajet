import React, { useState, useEffect } from 'react';
import { Pressable, Text, StyleSheet, Platform } from 'react-native';
import { useTheme } from '../hooks/useTheme';

export function ScrollToTopFAB() {
  const { colors } = useTheme();
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (Platform.OS !== 'web') return;
    const handleScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  const webHover = Platform.OS === 'web' ? {
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
  } : {};

  return (
    <Pressable
      onPress={() => {
        if (Platform.OS === 'web') window.scrollTo({ top: 0, behavior: 'smooth' });
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
      <Text style={styles.icon}>{'↑'}</Text>
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
