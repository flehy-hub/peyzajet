import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Platform, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../hooks/useTheme';
import { useResponsive } from '../hooks/useResponsive';
import { Fonts, Spacing, MaxWidth, BorderRadius } from '../theme';
import { scrollToId } from '../utils/pageScroll';

const DARK_BG = '#223740';
const OLIVE = '#99a537';

export function HeroSection() {
  const { colors } = useTheme();
  const { isMobile, isTablet } = useResponsive();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  const compact = isMobile || isTablet;

  const scrollToSection = (id: string) => {
    if (Platform.OS === 'web') scrollToId(id);
  };

  return (
    <View
      {...(Platform.OS === 'web' ? { id: 'hero' } : {})}
      style={[styles.container, compact && styles.containerCompact]}
    >
      {/* Background image overlay */}
      {Platform.OS === 'web' && (
        <View style={styles.bgImage}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=1400&q=80' }}
            style={StyleSheet.absoluteFill}
            resizeMode="cover"
          />
          {compact ? (
            <LinearGradient
              colors={['rgba(34,55,64,0.35)', 'rgba(34,55,64,0.92)']}
              style={StyleSheet.absoluteFill}
            />
          ) : (
            <View style={styles.bgOverlay} />
          )}
        </View>
      )}

      <View style={[styles.inner, { flexDirection: compact ? 'column' : 'row' }]}>
        {/* Text Content */}
        <View
          style={[
            styles.leftSide,
            compact && styles.leftSideCompact,
            {
              opacity: visible ? 1 : 0,
              transform: [{ translateY: visible ? 0 : 30 }],
            },
          ]}
        >
          {/* Badge */}
          <View style={styles.badge}>
            <MaterialCommunityIcons name="leaf" size={14} color={OLIVE} />
            <Text style={styles.badgeText}>Ankara'nın Peyzaj Uzmanı</Text>
          </View>

          <Text
            style={[
              styles.title,
              { fontSize: compact ? 32 : Fonts.sizes.hero, lineHeight: compact ? 40 : 76 },
            ]}
          >
            Hayalinizdeki{'\n'}Bahçeyi{' '}
            <Text style={{ color: OLIVE }}>Tasarlıyoruz</Text>
          </Text>

          <Text
            style={[
              styles.subtitle,
              { fontSize: compact ? Fonts.sizes.sm : Fonts.sizes.lg },
            ]}
          >
            Profesyonel peyzaj tasarımı ile dış mekan yaşam alanlarınızı estetik
            ve fonksiyonel bir şekilde hayata geçiriyoruz.
          </Text>

          {/* CTA Buttons */}
          <View style={styles.ctaRow}>
            <Pressable
              onPress={() => scrollToSection('maliyet-hesapla')}
              style={[
                styles.ctaPrimary,
                Platform.OS === 'web' && ({ cursor: 'pointer', boxShadow: '0 6px 24px rgba(153,165,55,0.4)', transitionDuration: '250ms', transitionProperty: 'transform, box-shadow' } as any),
              ]}
            >
              <MaterialCommunityIcons name="calculator-variant-outline" size={18} color="#FFFFFF" />
              <Text style={styles.ctaPrimaryText}>Teklif Al</Text>
              <MaterialCommunityIcons name="arrow-right" size={16} color="#FFFFFF" />
            </Pressable>

            <Pressable
              onPress={() => scrollToSection('projeler')}
              style={[
                styles.ctaSecondary,
                Platform.OS === 'web' && ({ cursor: 'pointer', transitionDuration: '250ms' } as any),
              ]}
            >
              <MaterialCommunityIcons name="image-multiple-outline" size={18} color="#FFFFFF" />
              <Text style={styles.ctaSecondaryText}>Projelerimiz</Text>
            </Pressable>
          </View>

          {/* Stats row */}
          <View style={[styles.statsRow, compact && styles.statsRowCompact]}>
            <StatItem value="500+" label="Proje" />
            <View style={styles.statDivider} />
            <StatItem value="12+" label="Yıl Tecrübe" />
            <View style={styles.statDivider} />
            <StatItem value="%98" label="Memnuniyet" />
          </View>
        </View>

        {/* Right side - images (desktop only) */}
        {!compact && (
          <View style={styles.rightSide}>
            <View style={[styles.mainImageWrap, Platform.OS === 'web' && ({ boxShadow: '0 20px 60px rgba(0,0,0,0.3)' } as any)]}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80' }}
                style={styles.mainImage}
                resizeMode="cover"
              />
            </View>
            <View style={[styles.secondImageWrap, Platform.OS === 'web' && ({ boxShadow: '0 12px 40px rgba(0,0,0,0.25)' } as any)]}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1598902108854-d1446677672c?w=800&q=80' }}
                style={styles.secondImage}
                resizeMode="cover"
              />
            </View>
            {/* Decorative elements */}
            <View style={styles.decoRing} />
            <View style={styles.decoBar} />
          </View>
        )}
      </View>

      {/* Scroll indicator */}
      <View style={styles.scrollIndicator}>
        <View style={styles.scrollDot} />
      </View>
    </View>
  );
}

function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <View style={styles.statItem}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: Platform.OS === 'web' ? ('100vh' as any) : 800,
    backgroundColor: DARK_BG,
    overflow: 'hidden',
    position: 'relative',
    justifyContent: 'center',
  },
  containerCompact: {
    minHeight: Platform.OS === 'web' ? ('100svh' as any) : 700,
  },
  bgImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
  } as any,
  bgOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(34,55,64,0.8)',
  } as any,
  inner: {
    flex: 1,
    maxWidth: MaxWidth.wide,
    width: '100%',
    alignSelf: 'center',
    zIndex: 1,
  },

  /* Left */
  leftSide: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: Spacing['2xl'],
    paddingVertical: Spacing['3xl'],
    ...Platform.select({
      web: { transitionDuration: '800ms', transitionProperty: 'opacity, transform' } as any,
    }),
  },
  leftSideCompact: {
    paddingHorizontal: Spacing.lg,
    paddingTop: 100,
    paddingBottom: Spacing.xl,
    justifyContent: 'flex-end',
  },

  /* Badge */
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(153,165,55,0.15)',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: BorderRadius.full,
    marginBottom: Spacing.lg,
  } as any,
  badgeText: {
    fontFamily: Fonts.family,
    fontWeight: Fonts.weights.semibold,
    fontSize: 12,
    color: OLIVE,
    letterSpacing: 0.5,
  },

  /* Title */
  title: {
    fontFamily: Fonts.headingFamily,
    fontWeight: Fonts.weights.extrabold,
    color: '#FFFFFF',
    marginBottom: Spacing.md,
  },
  subtitle: {
    fontFamily: Fonts.family,
    fontWeight: Fonts.weights.regular,
    color: 'rgba(255,255,255,0.65)',
    lineHeight: 26,
    marginBottom: Spacing.xl,
    maxWidth: 480,
  },

  /* CTA */
  ctaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    marginBottom: Spacing['2xl'],
    flexWrap: 'wrap',
  } as any,
  ctaPrimary: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: OLIVE,
    paddingHorizontal: 28,
    paddingVertical: 16,
    borderRadius: BorderRadius.full,
  } as any,
  ctaPrimaryText: {
    fontFamily: Fonts.headingFamily,
    fontWeight: Fonts.weights.bold,
    fontSize: Fonts.sizes.base,
    color: '#FFFFFF',
  },
  ctaSecondary: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: BorderRadius.full,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.25)',
  } as any,
  ctaSecondaryText: {
    fontFamily: Fonts.family,
    fontWeight: Fonts.weights.medium,
    fontSize: Fonts.sizes.sm,
    color: '#FFFFFF',
  },

  /* Stats */
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.lg,
  } as any,
  statsRowCompact: {
    gap: Spacing.md,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontFamily: Fonts.headingFamily,
    fontWeight: Fonts.weights.extrabold,
    fontSize: 22,
    color: OLIVE,
  },
  statLabel: {
    fontFamily: Fonts.family,
    fontWeight: Fonts.weights.regular,
    fontSize: 11,
    color: 'rgba(255,255,255,0.5)',
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 28,
    backgroundColor: 'rgba(255,255,255,0.12)',
  },

  /* Right - Desktop images */
  rightSide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Spacing['2xl'],
    paddingHorizontal: Spacing.lg,
    position: 'relative',
  },
  mainImageWrap: {
    width: 340,
    height: 420,
    borderRadius: 24,
    overflow: 'hidden',
    zIndex: 2,
  },
  mainImage: {
    width: '100%',
    height: '100%',
  } as any,
  secondImageWrap: {
    width: 180,
    height: 240,
    borderRadius: 18,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 60,
    left: 30,
    zIndex: 3,
    borderWidth: 3,
    borderColor: DARK_BG,
  },
  secondImage: {
    width: '100%',
    height: '100%',
  } as any,
  decoRing: {
    position: 'absolute',
    top: 60,
    right: 40,
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: 'rgba(153,165,55,0.2)',
  },
  decoBar: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    width: 80,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(153,165,55,0.15)',
  },

  /* Scroll indicator */
  scrollIndicator: {
    position: 'absolute',
    bottom: 24,
    alignSelf: 'center',
    left: '50%' as any,
    marginLeft: -12,
    width: 24,
    height: 40,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 6,
    zIndex: 10,
  },
  scrollDot: {
    width: 4,
    height: 8,
    borderRadius: 2,
    backgroundColor: OLIVE,
  },
});
