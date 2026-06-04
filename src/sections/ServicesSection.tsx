import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Platform, Pressable } from 'react-native';
import { SectionWrapper } from '../components/SectionWrapper';
import { SectionTitle } from '../components/SectionTitle';
import { useTheme } from '../hooks/useTheme';
import { useResponsive } from '../hooks/useResponsive';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { SERVICES } from '../constants/data';
import { Fonts, Spacing, BorderRadius } from '../theme';

export function ServicesSection() {
  const { isMobile, isTablet } = useResponsive();
  const { ref, isVisible } = useScrollAnimation();
  const cols = isMobile ? 1 : isTablet ? 2 : 4;

  return (
    <SectionWrapper id="hizmetler">
      <SectionTitle
        overline="Hizmetlerimiz"
        title="Profesyonel Peyzaj Hizmetleri"
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
        {SERVICES.map((service) => (
          <ServiceCard key={service.id} service={service} cols={cols} />
        ))}
      </View>
    </SectionWrapper>
  );
}

function ServiceCard({ service, cols }: { service: typeof SERVICES[0]; cols: number }) {
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
          backgroundColor: colors.surface,
          width: widthPercent as any,
          transform: [{ translateY: hovered ? -8 : 0 }],
          ...Platform.select({
            web: {
              boxShadow: hovered
                ? '0 20px 40px rgba(0,0,0,0.12)'
                : `0 4px 16px ${colors.cardShadow}`,
            } as any,
          }),
        },
      ]}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: service.image }}
          style={[styles.image, { transform: [{ scale: hovered ? 1.08 : 1 }] }]}
          resizeMode="cover"
        />
        {service.category && (
          <View style={[styles.categoryBadge, { backgroundColor: colors.primary }]}>
            <Text style={styles.categoryText}>{service.category}</Text>
          </View>
        )}
      </View>

      <View style={styles.cardBody}>
        <Text style={[styles.cardTitle, { color: colors.text }]}>
          {service.title}
        </Text>
        <Text style={[styles.cardDesc, { color: colors.textSecondary }]}>
          {service.description}
        </Text>
        <Pressable style={styles.link}>
          <Text style={[styles.linkText, { color: colors.primary }]}>
            Teklif Al {'→'}
          </Text>
        </Pressable>
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
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    marginBottom: Spacing.md,
    ...Platform.select({
      web: {
        cursor: 'pointer',
        transitionDuration: '300ms',
        transitionProperty: 'all',
      } as any,
    }),
  },
  imageContainer: {
    height: 200,
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    ...Platform.select({
      web: {
        transitionDuration: '500ms',
        transitionProperty: 'transform',
      } as any,
    }),
  },
  categoryBadge: {
    position: 'absolute',
    top: Spacing.sm,
    left: Spacing.sm,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: BorderRadius.sm,
  },
  categoryText: {
    fontFamily: Fonts.family,
    fontWeight: Fonts.weights.semibold,
    fontSize: 11,
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  cardBody: {
    padding: Spacing.md,
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
  link: {
    ...Platform.select({ web: { cursor: 'pointer' } as any }),
  },
  linkText: {
    fontFamily: Fonts.family,
    fontWeight: Fonts.weights.semibold,
    fontSize: Fonts.sizes.sm,
  },
});
