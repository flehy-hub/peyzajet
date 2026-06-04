import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { SectionWrapper } from '../components/SectionWrapper';
import { useTheme } from '../hooks/useTheme';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { FOUNDER_QUOTE } from '../constants/data';
import { Fonts, Spacing, BorderRadius } from '../theme';

export function FounderQuoteSection() {
  const { colors } = useTheme();
  const { ref, isVisible } = useScrollAnimation();

  return (
    <SectionWrapper id="kurucu" background="primaryLight">
      <View
        ref={ref}
        style={[
          styles.container,
          {
            opacity: isVisible ? 1 : 0,
            transform: [{ translateY: isVisible ? 0 : 20 }],
          },
        ]}
      >
        <Text style={styles.quoteIcon}>{'“'}</Text>

        <Text style={[styles.quote, { color: colors.text }]}>
          {FOUNDER_QUOTE.quote}
        </Text>

        <View style={[styles.divider, { backgroundColor: colors.primary }]} />

        <View style={styles.author}>
          <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
            <Text style={styles.avatarText}>{FOUNDER_QUOTE.avatar}</Text>
          </View>
          <View>
            <Text style={[styles.name, { color: colors.text }]}>{FOUNDER_QUOTE.name}</Text>
            <Text style={[styles.title, { color: colors.textMuted }]}>{FOUNDER_QUOTE.title}</Text>
          </View>
        </View>
      </View>
    </SectionWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    maxWidth: 800,
    alignSelf: 'center',
    ...Platform.select({
      web: {
        transitionDuration: '600ms',
        transitionProperty: 'opacity, transform',
      } as any,
    }),
  },
  quoteIcon: {
    fontFamily: 'Georgia, serif',
    fontSize: 80,
    color: '#6FA43A',
    lineHeight: 80,
    opacity: 0.25,
    marginBottom: Spacing.sm,
  },
  quote: {
    fontFamily: Fonts.family,
    fontWeight: Fonts.weights.medium,
    fontSize: Fonts.sizes.xl,
    textAlign: 'center',
    lineHeight: 36,
    fontStyle: 'italic',
    marginBottom: Spacing.lg,
  },
  divider: {
    width: 40,
    height: 3,
    borderRadius: 2,
    marginBottom: Spacing.lg,
  },
  author: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontFamily: Fonts.family,
    fontWeight: Fonts.weights.bold,
    fontSize: Fonts.sizes.md,
    color: '#FFFFFF',
  },
  name: {
    fontFamily: Fonts.family,
    fontWeight: Fonts.weights.bold,
    fontSize: Fonts.sizes.md,
  },
  title: {
    fontFamily: Fonts.family,
    fontWeight: Fonts.weights.regular,
    fontSize: Fonts.sizes.sm,
    marginTop: 2,
  },
});
