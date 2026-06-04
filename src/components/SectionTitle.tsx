import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { useResponsive } from '../hooks/useResponsive';
import { Fonts, Spacing } from '../theme';

interface Props {
  title: string;
  subtitle?: string;
  overline?: string;
  light?: boolean;
  align?: 'center' | 'left';
  showDivider?: boolean;
}

export function SectionTitle({ title, subtitle, overline, light, align = 'center', showDivider = true }: Props) {
  const { colors } = useTheme();
  const { isMobile } = useResponsive();

  const isCenter = align === 'center';

  return (
    <View style={[styles.container, { alignItems: isCenter ? 'center' : 'flex-start' }]}>
      {overline && (
        <Text style={[
          styles.overline,
          { color: light ? 'rgba(111, 164, 58, 0.9)' : colors.primary, textAlign: isCenter ? 'center' : 'left' },
        ]}>
          {overline.toUpperCase()}
        </Text>
      )}
      <Text style={[
        styles.title,
        {
          color: light ? '#FFFFFF' : colors.text,
          fontSize: isMobile ? Fonts.sizes['2xl'] : Fonts.sizes['3xl'],
          textAlign: isCenter ? 'center' : 'left',
        },
      ]}>
        {title}
      </Text>
      {showDivider && (
        <View style={[styles.divider, { backgroundColor: colors.primary, alignSelf: isCenter ? 'center' : 'flex-start' }]} />
      )}
      {subtitle && (
        <Text style={[
          styles.subtitle,
          {
            color: light ? 'rgba(255,255,255,0.8)' : colors.textSecondary,
            fontSize: isMobile ? Fonts.sizes.base : Fonts.sizes.md,
            textAlign: isCenter ? 'center' : 'left',
          },
        ]}>
          {subtitle}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing['2xl'],
  },
  overline: {
    fontFamily: Fonts.family,
    fontWeight: Fonts.weights.semibold,
    fontSize: Fonts.sizes.sm,
    letterSpacing: 2,
    marginBottom: Spacing.sm,
  },
  title: {
    fontFamily: Fonts.family,
    fontWeight: Fonts.weights.bold,
  },
  divider: {
    width: 60,
    height: 3,
    borderRadius: 2,
    marginTop: Spacing.md,
    marginBottom: Spacing.md,
  },
  subtitle: {
    fontFamily: Fonts.family,
    fontWeight: Fonts.weights.regular,
    maxWidth: 600,
    lineHeight: 26,
  },
});
