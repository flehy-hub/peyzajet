import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet, Platform, ScrollView } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { useResponsive } from '../hooks/useResponsive';
import { Logo } from './Logo';
import { Fonts, Spacing, MaxWidth, BorderRadius } from '../theme';
import { NAV_LINKS } from '../constants/data';

export function Header() {
  const { colors, mode, toggleTheme } = useTheme();
  const { isMobile, isTablet } = useResponsive();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (Platform.OS !== 'web') return;
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    if (Platform.OS === 'web') {
      const id = href.replace('#', '');
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
    setMenuOpen(false);
  };

  const compact = isMobile || isTablet;

  return (
    <View style={[
      styles.header,
      {
        backgroundColor: scrolled ? (mode === 'light' ? 'rgba(255,255,255,0.97)' : 'rgba(15,26,20,0.97)') : 'transparent',
        borderBottomWidth: scrolled ? 1 : 0,
        borderBottomColor: colors.border,
      },
    ]}>
      <View style={styles.inner}>
        <Logo color={scrolled ? colors.text : '#FFFFFF'} size={compact ? 22 : 26} />

        {!compact && (
          <View style={styles.nav}>
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.href}
                label={link.label}
                onPress={() => scrollToSection(link.href)}
                color={scrolled ? colors.text : '#FFFFFF'}
              />
            ))}
          </View>
        )}

        <View style={styles.actions}>
          <Pressable onPress={toggleTheme} style={styles.themeToggle}>
            <Text style={{ fontSize: 18 }}>{mode === 'light' ? '☾' : '☀'}</Text>
          </Pressable>

          {!compact && (
            <Pressable
              onPress={() => scrollToSection('#iletisim')}
              style={[styles.ctaButton, { backgroundColor: colors.primary }]}
            >
              <Text style={styles.ctaText}>Teklif Al</Text>
            </Pressable>
          )}

          {compact && (
            <Pressable onPress={() => setMenuOpen(!menuOpen)} style={styles.hamburger}>
              <View style={[styles.hamburgerLine, { backgroundColor: scrolled ? colors.text : '#FFF' }]} />
              <View style={[styles.hamburgerLine, { backgroundColor: scrolled ? colors.text : '#FFF', width: menuOpen ? 24 : 18 }]} />
              <View style={[styles.hamburgerLine, { backgroundColor: scrolled ? colors.text : '#FFF' }]} />
            </Pressable>
          )}
        </View>
      </View>

      {compact && menuOpen && (
        <View style={[styles.mobileMenu, { backgroundColor: colors.surface }]}>
          {NAV_LINKS.map((link) => (
            <Pressable key={link.href} onPress={() => scrollToSection(link.href)} style={styles.mobileLink}>
              <Text style={[styles.mobileLinkText, { color: colors.text }]}>{link.label}</Text>
            </Pressable>
          ))}
          <Pressable
            onPress={() => scrollToSection('#iletisim')}
            style={[styles.mobileCta, { backgroundColor: colors.primary }]}
          >
            <Text style={styles.ctaText}>Teklif Al</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

function NavLink({ label, onPress, color }: { label: string; onPress: () => void; color: string }) {
  const [hovered, setHovered] = useState(false);
  const webHover = Platform.OS === 'web' ? {
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
  } : {};

  return (
    <Pressable onPress={onPress} {...webHover} style={styles.navLink}>
      <Text style={[styles.navText, { color, opacity: hovered ? 1 : 0.85 }]}>{label}</Text>
      {hovered && <View style={[styles.navUnderline, { backgroundColor: '#6FA43A' }]} />}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  header: {
    position: Platform.OS === 'web' ? ('fixed' as any) : 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    ...Platform.select({
      web: {
        transitionDuration: '300ms',
        transitionProperty: 'all',
        backdropFilter: 'blur(10px)',
      } as any,
    }),
  },
  inner: {
    maxWidth: MaxWidth.wide,
    width: '100%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  nav: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  navLink: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    ...Platform.select({ web: { cursor: 'pointer' } as any }),
  },
  navText: {
    fontFamily: Fonts.family,
    fontWeight: Fonts.weights.medium,
    fontSize: Fonts.sizes.sm,
  },
  navUnderline: {
    height: 2,
    borderRadius: 1,
    marginTop: 2,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  themeToggle: {
    padding: Spacing.sm,
    ...Platform.select({ web: { cursor: 'pointer' } as any }),
  },
  ctaButton: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: 10,
    borderRadius: BorderRadius.md,
    ...Platform.select({ web: { cursor: 'pointer' } as any }),
  },
  ctaText: {
    color: '#FFFFFF',
    fontFamily: Fonts.family,
    fontWeight: Fonts.weights.semibold,
    fontSize: Fonts.sizes.sm,
  },
  hamburger: {
    padding: Spacing.sm,
    gap: 5,
    ...Platform.select({ web: { cursor: 'pointer' } as any }),
  },
  hamburgerLine: {
    width: 24,
    height: 2,
    borderRadius: 1,
  },
  mobileMenu: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
    ...Platform.select({
      web: {
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
      } as any,
    }),
  },
  mobileLink: {
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  mobileLinkText: {
    fontFamily: Fonts.family,
    fontWeight: Fonts.weights.medium,
    fontSize: Fonts.sizes.base,
  },
  mobileCta: {
    marginTop: Spacing.md,
    paddingVertical: 14,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
  },
});
