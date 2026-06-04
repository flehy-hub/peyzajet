import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { useResponsive } from '../hooks/useResponsive';
import { Fonts, Spacing } from '../theme';

interface Props {
  title: string;
  subtitle?: string;
  light?: boolean;
}

export function SectionTitle({ title, subtitle, light }: Props) {
  const { colors } = useTheme();
  const { isMobile } = useResponsive();

  return (
    <View style={styles.container}>
      <Text style={[
        styles.title,
        { color: light ? '#FFFFFF' : colors.text, fontSize: isMobile ? Fonts.sizes['2xl'] : Fonts.sizes['3xl'] },
      ]}>
        {title}
      </Text>
      <View style={[styles.divider, { backgroundColor: colors.primary }]} />
      {subtitle && (
        <Text style={[
          styles.subtitle,
          { color: light ? 'rgba(255,255,255,0.8)' : colors.textSecondary, fontSize: isMobile ? Fonts.sizes.base : Fonts.sizes.md },
        ]}>
          {subtitle}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: Spacing['2xl'],
  },
  title: {
    fontFamily: Fonts.family,
    fontWeight: Fonts.weights.bold,
    textAlign: 'center',
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
    textAlign: 'center',
    maxWidth: 600,
    lineHeight: 26,
  },
});
