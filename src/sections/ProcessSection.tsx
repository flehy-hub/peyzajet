import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { SectionWrapper } from '../components/SectionWrapper';
import { SectionTitle } from '../components/SectionTitle';
import { useTheme } from '../hooks/useTheme';
import { useResponsive } from '../hooks/useResponsive';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { PROCESS_STEPS } from '../constants/data';
import { Fonts, Spacing, BorderRadius } from '../theme';

export function ProcessSection() {
  const { colors } = useTheme();
  const { isMobile } = useResponsive();
  const { ref, isVisible } = useScrollAnimation();

  return (
    <SectionWrapper id="surec">
      <SectionTitle
        overline="Nasıl Çalışıyoruz"
        title="4 Adımda Bahçeniz Hazır"
        subtitle="Profesyonel sürecimizle hayalinizdeki bahçeye adım adım ulaşın"
      />

      <View
        ref={ref}
        style={[
          isMobile ? styles.verticalContainer : styles.horizontalContainer,
          {
            opacity: isVisible ? 1 : 0,
            transform: [{ translateY: isVisible ? 0 : 30 }],
          },
        ]}
      >
        {PROCESS_STEPS.map((step, idx) => (
          <View key={step.step} style={isMobile ? styles.verticalStep : styles.horizontalStep}>
            {/* Connector line (not for first item) */}
            {idx > 0 && (
              <View style={isMobile ? [styles.vConnector, { backgroundColor: colors.primary }] : [styles.hConnector, { backgroundColor: colors.primary }]} />
            )}

            {/* Step circle */}
            <View style={[styles.circle, { backgroundColor: colors.primary }]}>
              <Text style={styles.circleText}>{step.step}</Text>
            </View>

            {/* Content */}
            <View style={[styles.stepContent, { alignItems: isMobile ? 'flex-start' : 'center' }]}>
              <Text style={[styles.stepTitle, { color: colors.text, textAlign: isMobile ? 'left' : 'center' }]}>
                {step.title}
              </Text>
              <Text style={[styles.stepDesc, { color: colors.textSecondary, textAlign: isMobile ? 'left' : 'center' }]}>
                {step.description}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </SectionWrapper>
  );
}

const styles = StyleSheet.create({
  horizontalContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    ...Platform.select({
      web: {
        transitionDuration: '600ms',
        transitionProperty: 'opacity, transform',
      } as any,
    }),
  },
  verticalContainer: {
    gap: 0,
    ...Platform.select({
      web: {
        transitionDuration: '600ms',
        transitionProperty: 'opacity, transform',
      } as any,
    }),
  },
  horizontalStep: {
    flex: 1,
    alignItems: 'center',
    position: 'relative',
    paddingHorizontal: Spacing.md,
  },
  verticalStep: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.md,
    paddingVertical: Spacing.md,
    position: 'relative',
  },
  circle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
    ...Platform.select({
      web: { boxShadow: '0 4px 16px rgba(111, 164, 58, 0.3)' } as any,
    }),
  },
  circleText: {
    fontFamily: Fonts.family,
    fontWeight: Fonts.weights.extrabold,
    fontSize: Fonts.sizes.xl,
    color: '#FFFFFF',
  },
  hConnector: {
    position: 'absolute',
    top: 32,
    right: '50%',
    width: '100%',
    height: 2,
    opacity: 0.2,
    zIndex: 1,
  },
  vConnector: {
    position: 'absolute',
    top: 0,
    left: 32,
    width: 2,
    height: Spacing.md,
    opacity: 0.2,
    zIndex: 1,
  },
  stepContent: {
    marginTop: Spacing.md,
    flex: 1,
  },
  stepTitle: {
    fontFamily: Fonts.family,
    fontWeight: Fonts.weights.bold,
    fontSize: Fonts.sizes.md,
    marginBottom: Spacing.xs,
  },
  stepDesc: {
    fontFamily: Fonts.family,
    fontWeight: Fonts.weights.regular,
    fontSize: Fonts.sizes.sm,
    lineHeight: 22,
    maxWidth: 200,
  },
});
