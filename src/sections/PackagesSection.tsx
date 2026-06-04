import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform, Pressable } from 'react-native';
import { SectionWrapper } from '../components/SectionWrapper';
import { SectionTitle } from '../components/SectionTitle';
import { Button } from '../components/Button';
import { useTheme } from '../hooks/useTheme';
import { useResponsive } from '../hooks/useResponsive';
import { PACKAGES } from '../constants/data';
import { Fonts, Spacing, BorderRadius } from '../theme';

export function PackagesSection() {
  const { isMobile } = useResponsive();

  return (
    <SectionWrapper id="paketler">
      <SectionTitle
        title="Bakım Paketlerimiz"
        subtitle="Bahçenize en uygun bakım paketini seçin"
      />
      <View style={[styles.grid, { flexDirection: isMobile ? 'column' : 'row' }]}>
        {PACKAGES.map((pkg) => (
          <PackageCard key={pkg.id} pkg={pkg} />
        ))}
      </View>
    </SectionWrapper>
  );
}

function PackageCard({ pkg }: { pkg: typeof PACKAGES[0] }) {
  const { colors } = useTheme();
  const [hovered, setHovered] = useState(false);
  const webHover = Platform.OS === 'web' ? {
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
  } : {};

  return (
    <View
      {...webHover}
      style={[
        styles.card,
        {
          backgroundColor: colors.surface,
          borderColor: pkg.popular ? colors.primary : colors.border,
          borderWidth: pkg.popular ? 2 : 1,
          transform: [{ translateY: hovered ? -10 : 0 }, { scale: pkg.popular && !hovered ? 1.03 : hovered ? 1.05 : 1 }],
          ...Platform.select({
            web: {
              boxShadow: hovered
                ? '0 24px 48px rgba(0,0,0,0.12)'
                : pkg.popular
                  ? '0 8px 24px rgba(111, 164, 58, 0.15)'
                  : `0 4px 16px ${colors.cardShadow}`,
            } as any,
          }),
        },
      ]}
    >
      {pkg.popular && (
        <View style={[styles.popularBadge, { backgroundColor: colors.primary }]}>
          <Text style={styles.popularText}>En Popüler</Text>
        </View>
      )}

      <View style={[styles.colorStrip, { backgroundColor: pkg.color }]} />

      <Text style={[styles.packageName, { color: colors.text }]}>{pkg.name}</Text>

      <View style={styles.priceContainer}>
        <Text style={[styles.currency, { color: colors.primary }]}>₺</Text>
        <Text style={[styles.price, { color: colors.text }]}>{pkg.price}</Text>
        <Text style={[styles.period, { color: colors.textMuted }]}>{pkg.period}</Text>
      </View>

      <View style={styles.features}>
        {pkg.features.map((feature, idx) => (
          <View key={idx} style={styles.featureRow}>
            <Text style={{ color: colors.primary, fontSize: 14 }}>{'✓'}</Text>
            <Text style={[styles.featureText, { color: colors.textSecondary }]}>{feature}</Text>
          </View>
        ))}
      </View>

      <Button
        title="Teklif Al"
        variant={pkg.popular ? 'primary' : 'outline'}
        size="md"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    gap: Spacing.lg,
    alignItems: 'stretch',
  },
  card: {
    flex: 1,
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
    ...Platform.select({
      web: {
        cursor: 'pointer',
        transitionDuration: '300ms',
        transitionProperty: 'all',
      } as any,
    }),
  },
  colorStrip: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
  },
  popularBadge: {
    position: 'absolute',
    top: 16,
    right: -30,
    paddingHorizontal: 40,
    paddingVertical: 6,
    transform: [{ rotate: '45deg' }],
  },
  popularText: {
    fontFamily: Fonts.family,
    fontWeight: Fonts.weights.bold,
    fontSize: 10,
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  packageName: {
    fontFamily: Fonts.family,
    fontWeight: Fonts.weights.bold,
    fontSize: Fonts.sizes.xl,
    marginTop: Spacing.md,
    marginBottom: Spacing.md,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: Spacing.lg,
  },
  currency: {
    fontFamily: Fonts.family,
    fontWeight: Fonts.weights.bold,
    fontSize: Fonts.sizes.lg,
    marginBottom: 4,
  },
  price: {
    fontFamily: Fonts.family,
    fontWeight: Fonts.weights.extrabold,
    fontSize: 42,
    lineHeight: 42,
  },
  period: {
    fontFamily: Fonts.family,
    fontWeight: Fonts.weights.regular,
    fontSize: Fonts.sizes.base,
    marginBottom: 4,
    marginLeft: 2,
  },
  features: {
    width: '100%',
    marginBottom: Spacing.xl,
    gap: Spacing.sm,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  featureText: {
    fontFamily: Fonts.family,
    fontWeight: Fonts.weights.regular,
    fontSize: Fonts.sizes.sm,
  },
});
