import React from 'react';
import { View, Text, StyleSheet, Platform, Pressable, Linking } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useResponsive } from '../hooks/useResponsive';
import { Button } from '../components/Button';
import { Fonts, Spacing, MaxWidth } from '../theme';
import { CTA_BANNER, CONTACT_INFO } from '../constants/data';

export function CTABannerSection() {
  const { isMobile } = useResponsive();

  return (
    <LinearGradient
      colors={['#223740', '#2d4a52', '#223740']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.decorLeft} />
      <View style={styles.decorRight} />

      <View style={[styles.inner, { flexDirection: isMobile ? 'column' : 'row' }]}>
        <View style={[styles.textSide, { alignItems: isMobile ? 'center' : 'flex-start' }]}>
          <Text style={[styles.overline, { textAlign: isMobile ? 'center' : 'left' }]}>
            {CTA_BANNER.overline.toUpperCase()}
          </Text>
          <Text style={[
            styles.headline,
            { fontSize: isMobile ? Fonts.sizes.xl : Fonts.sizes['3xl'], textAlign: isMobile ? 'center' : 'left' },
          ]}>
            {CTA_BANNER.headline}
          </Text>
          <Text style={[styles.description, { textAlign: isMobile ? 'center' : 'left' }]}>
            {CTA_BANNER.description}
          </Text>
        </View>

        <View style={[styles.ctaSide, { alignItems: isMobile ? 'center' : 'flex-end' }]}>
          <Pressable onPress={() => Linking.openURL(`tel:${CONTACT_INFO.phone}`)}>
            <Text style={styles.phone}>{CONTACT_INFO.phone}</Text>
          </Pressable>
          <Button
            title="Hemen Arayın"
            variant="primary"
            size="lg"
            icon="phone"
            onPress={() => Linking.openURL(`tel:${CONTACT_INFO.phone}`)}
          />
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: Spacing['3xl'],
    paddingHorizontal: Spacing.lg,
    position: 'relative',
    overflow: 'hidden',
  },
  decorLeft: {
    position: 'absolute',
    top: -40,
    left: -40,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(153, 165, 55, 0.08)',
  },
  decorRight: {
    position: 'absolute',
    bottom: -30,
    right: -30,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(153, 165, 55, 0.06)',
  },
  inner: {
    maxWidth: MaxWidth.content,
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    gap: Spacing.xl,
    zIndex: 1,
  },
  textSide: {
    flex: 1,
  },
  overline: {
    fontFamily: Fonts.family,
    fontWeight: Fonts.weights.semibold,
    fontSize: Fonts.sizes.sm,
    color: '#99a537',
    letterSpacing: 2,
    marginBottom: Spacing.sm,
  },
  headline: {
    fontFamily: Fonts.headingFamily,
    fontWeight: Fonts.weights.bold,
    color: '#FFFFFF',
    marginBottom: Spacing.md,
    lineHeight: 44,
  },
  description: {
    fontFamily: Fonts.family,
    fontWeight: Fonts.weights.regular,
    fontSize: Fonts.sizes.base,
    color: 'rgba(255,255,255,0.7)',
    lineHeight: 26,
    maxWidth: 500,
  },
  ctaSide: {
    gap: Spacing.md,
  },
  phone: {
    fontFamily: Fonts.family,
    fontWeight: Fonts.weights.extrabold,
    fontSize: Fonts.sizes['2xl'],
    color: '#99a537',
    ...Platform.select({ web: { cursor: 'pointer' } as any }),
  },
});
