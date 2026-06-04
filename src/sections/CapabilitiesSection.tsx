import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform, Pressable } from 'react-native';
import { SectionWrapper } from '../components/SectionWrapper';
import { SectionTitle } from '../components/SectionTitle';
import { useTheme } from '../hooks/useTheme';
import { useResponsive } from '../hooks/useResponsive';
import { CAPABILITIES } from '../constants/data';
import { Fonts, Spacing, BorderRadius } from '../theme';

export function CapabilitiesSection() {
  return (
    <SectionWrapper id="hizmet-alanlari" background="primaryLight">
      <SectionTitle
        overline="Hizmet Alanlarımız"
        title="Her Alanda Profesyonel Peyzaj"
        subtitle="Konuttan ticariye, otelden kamusal alanlara kadar her türlü mekan için peyzaj çözümleri sunuyoruz"
      />
      <View style={styles.grid}>
        {CAPABILITIES.map((cap) => (
          <CapabilityBadge key={cap.id} item={cap} />
        ))}
      </View>
    </SectionWrapper>
  );
}

function CapabilityBadge({ item }: { item: typeof CAPABILITIES[0] }) {
  const { colors } = useTheme();
  const [hovered, setHovered] = useState(false);

  const webHover = Platform.OS === 'web' ? {
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
  } : {};

  return (
    <Pressable
      {...webHover}
      style={[
        styles.badge,
        {
          backgroundColor: hovered ? colors.primary : colors.surface,
          borderColor: hovered ? colors.primary : colors.border,
          transform: [{ scale: hovered ? 1.05 : 1 }],
          ...Platform.select({
            web: {
              boxShadow: hovered ? '0 8px 24px rgba(111, 164, 58, 0.2)' : `0 2px 8px ${colors.cardShadow}`,
            } as any,
          }),
        },
      ]}
    >
      <Text style={styles.icon}>{item.icon}</Text>
      <Text style={[styles.label, { color: hovered ? '#FFFFFF' : colors.text }]}>
        {item.label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: Spacing.md,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    ...Platform.select({
      web: {
        cursor: 'pointer',
        transitionDuration: '250ms',
        transitionProperty: 'all',
      } as any,
    }),
  },
  icon: {
    fontSize: 22,
  },
  label: {
    fontFamily: Fonts.family,
    fontWeight: Fonts.weights.semibold,
    fontSize: Fonts.sizes.base,
  },
});
