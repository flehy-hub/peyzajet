import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Platform, ImageBackground } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { useResponsive } from '../hooks/useResponsive';
import { Button } from '../components/Button';
import { Fonts, Spacing, MaxWidth } from '../theme';

export function HeroSection() {
  const { colors } = useTheme();
  const { isMobile, isTablet } = useResponsive();
  const [scrollY, setScrollY] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    if (Platform.OS !== 'web') return;
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const parallaxOffset = Platform.OS === 'web' ? scrollY * 0.4 : 0;
  const compact = isMobile || isTablet;

  const scrollToSection = (id: string) => {
    if (Platform.OS === 'web') {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <View
      {...(Platform.OS === 'web' ? { id: 'hero' } : {})}
      style={styles.container}
    >
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=1920&q=80' }}
        style={[
          styles.bg,
          Platform.OS === 'web' && { transform: [{ translateY: parallaxOffset }] },
        ]}
        resizeMode="cover"
      />
      <View style={styles.overlay} />

      <View style={[
        styles.content,
        {
          opacity: visible ? 1 : 0,
          transform: [{ translateY: visible ? 0 : 40 }],
        },
      ]}>
        <View style={[styles.badge, { backgroundColor: 'rgba(111, 164, 58, 0.2)', borderColor: 'rgba(111, 164, 58, 0.4)' }]}>
          <Text style={styles.badgeText}>Profesyonel Peyzaj Hizmetleri</Text>
        </View>

        <Text style={[
          styles.title,
          { fontSize: compact ? Fonts.sizes['3xl'] : Fonts.sizes.hero, lineHeight: compact ? 44 : 76 },
        ]}>
          Hayalinizdeki Bah{'ç'}eyi{'\n'}Ger{'ç'}e{'ğ'}e D{'ö'}n{'ü'}{'ş'}t{'ü'}r{'ü'}yoruz
        </Text>

        <Text style={[
          styles.subtitle,
          { fontSize: compact ? Fonts.sizes.base : Fonts.sizes.lg, maxWidth: compact ? '100%' : 600 },
        ]}>
          Profesyonel peyzaj tasar{'ı'}m{'ı'}, bah{'ç'}e d{'ü'}zenleme ve bak{'ı'}m hizmetleri
        </Text>

        <View style={[styles.buttons, { flexDirection: compact ? 'column' : 'row' }]}>
          <Button
            title="Ücretsiz Keşif Talebi"
            variant="primary"
            size="lg"
            onPress={() => scrollToSection('iletisim')}
          />
          <Button
            title="Maliyet Hesapla"
            variant="white"
            size="lg"
            onPress={() => scrollToSection('maliyet-hesapla')}
          />
        </View>

        <View style={styles.trustRow}>
          {[
            { num: '500+', label: 'Proje' },
            { num: '15+', label: 'Yıl' },
            { num: '98%', label: 'Memnuniyet' },
          ].map((item, i) => (
            <View key={i} style={styles.trustItem}>
              <Text style={styles.trustNum}>{item.num}</Text>
              <Text style={styles.trustLabel}>{item.label}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.scrollIndicator}>
        <View style={styles.scrollDot} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: Platform.OS === 'web' ? ('100vh' as any) : 800,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  bg: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '120%',
    top: -50,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(15, 26, 20, 0.65)',
  },
  content: {
    maxWidth: MaxWidth.content,
    width: '100%',
    paddingHorizontal: Spacing.lg,
    alignItems: 'center',
    zIndex: 1,
    ...Platform.select({
      web: {
        transitionDuration: '1000ms',
        transitionProperty: 'opacity, transform',
      } as any,
    }),
  },
  badge: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: 50,
    borderWidth: 1,
    marginBottom: Spacing.lg,
  },
  badgeText: {
    fontFamily: Fonts.family,
    fontWeight: Fonts.weights.medium,
    fontSize: Fonts.sizes.sm,
    color: '#6FA43A',
    letterSpacing: 1,
  },
  title: {
    fontFamily: Fonts.family,
    fontWeight: Fonts.weights.extrabold,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },
  subtitle: {
    fontFamily: Fonts.family,
    fontWeight: Fonts.weights.regular,
    color: 'rgba(255,255,255,0.85)',
    textAlign: 'center',
    marginBottom: Spacing['2xl'],
    lineHeight: 28,
  },
  buttons: {
    gap: Spacing.md,
    alignItems: 'center',
    marginBottom: Spacing['3xl'],
  },
  trustRow: {
    flexDirection: 'row',
    gap: Spacing['2xl'],
    alignItems: 'center',
  },
  trustItem: {
    alignItems: 'center',
  },
  trustNum: {
    fontFamily: Fonts.family,
    fontWeight: Fonts.weights.bold,
    fontSize: Fonts.sizes.xl,
    color: '#6FA43A',
  },
  trustLabel: {
    fontFamily: Fonts.family,
    fontWeight: Fonts.weights.regular,
    fontSize: Fonts.sizes.sm,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 2,
  },
  scrollIndicator: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    width: 24,
    height: 40,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.4)',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 6,
  },
  scrollDot: {
    width: 4,
    height: 8,
    borderRadius: 2,
    backgroundColor: '#6FA43A',
  },
});
