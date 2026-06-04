import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { SectionWrapper } from '../components/SectionWrapper';
import { SectionTitle } from '../components/SectionTitle';
import { useTheme } from '../hooks/useTheme';
import { useResponsive } from '../hooks/useResponsive';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { SERVICES } from '../constants/data';
import { Fonts, Spacing, BorderRadius } from '../theme';

const ICONS: Record<string, string> = {
  leaf: '\u{1F33F}',
  map: '\u{1F5FA}',
  water: '\u{1F4A7}',
  grass: '\u{1F33E}',
  flower: '\u{1F33A}',
  cut: '\u{2702}',
  bulb: '\u{1F4A1}',
  timer: '\u{23F1}',
};

export function ServicesSection() {
  const { isMobile, isTablet } = useResponsive();
  const { ref, isVisible } = useScrollAnimation();

  const cols = isMobile ? 1 : isTablet ? 2 : 4;

  return (
    <SectionWrapper id="hizmetler">
      <SectionTitle
        title="Hizmetlerimiz"
        subtitle="Bahçeniz için ihtiyacınız olan tüm profesyonel peyzaj hizmetleri"
      />
      <View
        ref={ref}
        style={[
          styles.grid,
          {
            opacity: isVisible ? 1 : 0,
            transform: [{ translateY: isVisible ? 0 : 30 }],
          },
        ]}
      >
        {SERVICES.map((service, idx) => (
          <ServiceCard key={service.id} service={service} index={idx} cols={cols} />
        ))}
      </View>
    </SectionWrapper>
  );
}

function ServiceCard({ service, index, cols }: { service: typeof SERVICES[0]; index: number; cols: number }) {
  const { colors } = useTheme();
  const [hovered, setHovered] = useState(false);

  const webHover = Platform.OS === 'web' ? {
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
  } : {};

  const widthPercent = cols === 1 ? '100%' : cols === 2 ? '48%' : '23.5%';

  return (
    <View
      {...webHover}
      style={[
        styles.card,
        {
          backgroundColor: hovered ? colors.primary : colors.surface,
          width: widthPercent as any,
          transform: [{ translateY: hovered ? -8 : 0 }],
          ...Platform.select({
            web: {
              boxShadow: hovered
                ? '0 20px 40px rgba(111, 164, 58, 0.2)'
                : `0 4px 16px ${colors.cardShadow}`,
            } as any,
          }),
        },
      ]}
    >
      <Text style={styles.icon}>{ICONS[service.icon] || '\u{1F33F}'}</Text>
      <Text style={[styles.cardTitle, { color: hovered ? '#FFFFFF' : colors.text }]}>
        {service.title}
      </Text>
      <Text style={[styles.cardDesc, { color: hovered ? 'rgba(255,255,255,0.85)' : colors.textSecondary }]}>
        {service.description}
      </Text>
      <View style={[styles.cardArrow, { backgroundColor: hovered ? 'rgba(255,255,255,0.2)' : colors.surfaceAlt }]}>
        <Text style={{ color: hovered ? '#FFF' : colors.primary, fontSize: 16 }}>{'→'}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: Spacing.md,
    ...Platform.select({
      web: {
        transitionDuration: '600ms',
        transitionProperty: 'opacity, transform',
      } as any,
    }),
  },
  card: {
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.md,
    ...Platform.select({
      web: {
        cursor: 'pointer',
        transitionDuration: '300ms',
        transitionProperty: 'all',
      } as any,
    }),
  },
  icon: {
    fontSize: 36,
    marginBottom: Spacing.md,
  },
  cardTitle: {
    fontFamily: Fonts.family,
    fontWeight: Fonts.weights.bold,
    fontSize: Fonts.sizes.md,
    marginBottom: Spacing.sm,
  },
  cardDesc: {
    fontFamily: Fonts.family,
    fontWeight: Fonts.weights.regular,
    fontSize: Fonts.sizes.sm,
    lineHeight: 22,
    marginBottom: Spacing.md,
  },
  cardArrow: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
