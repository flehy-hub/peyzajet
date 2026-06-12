import React from 'react';
import { View, Text, StyleSheet, Platform, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SectionWrapper } from '../components/SectionWrapper';
import { useTheme } from '../hooks/useTheme';
import { useResponsive } from '../hooks/useResponsive';
import { Fonts, Spacing, BorderRadius } from '../theme';

const CHECKLIST = [
  'Profesyonel Tasarım',
  'Kaliteli Malzeme',
  'Zamanında Teslimat',
  'Müşteri Memnuniyeti',
  'Sürdürülebilir Çözümler',
];

export function FounderQuoteSection() {
  const { colors } = useTheme();
  const { isMobile } = useResponsive();

  return (
    <SectionWrapper id="hakkimizda" background="surface">
      <View style={[styles.container, isMobile && styles.containerMobile]}>
        {/* LEFT: Single professional image */}
        <View style={[styles.imageArea, isMobile && styles.imageAreaMobile]}>
          <Image
            source={{ uri: 'https://i.pinimg.com/736x/92/20/d3/9220d311854ade443f6a3cd7138069fb.jpg' }}
            style={styles.imagePrimary}
            resizeMode="cover"
          />
        </View>

        {/* RIGHT: Content */}
        <View style={[styles.content, isMobile && styles.contentMobile]}>
          <Text style={styles.overline}>HAKKIMIZDA</Text>
          <Text style={[styles.heading, { color: colors.text }]}>
            {'Peyzaj Mükemmelliği\nİçin Tutkumuz'}
          </Text>
          <Text style={[styles.description, { color: colors.textMuted }]}>
            Her bahçe bir hikaye anlatır. Biz, doğanın dilini konuşarak, hayallerinizi toprağa
            dönüştürüyoruz. Yılların deneyimi ve tutkusuyla, yaşam alanlarınızı doğayla
            buluşturan profesyonel peyzaj çözümleri sunuyoruz.
          </Text>

          <Text style={[styles.subheading, { color: colors.text }]}>
            Temel Standartlarımız:
          </Text>

          <View style={styles.checklist}>
            {CHECKLIST.map((item, i) => (
              <View key={i} style={styles.checkItem}>
                <MaterialCommunityIcons name="check-circle" size={20} color="#99a537" />
                <Text style={[styles.checkText, { color: colors.text }]}>{item}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </SectionWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: Spacing.xl,
    alignItems: 'center',
  },
  containerMobile: {
    flexDirection: 'column',
  },
  imageArea: {
    flex: 0.48,
  },
  imageAreaMobile: {
    flex: undefined,
    width: '100%' as any,
    marginBottom: Spacing.lg,
  },
  imagePrimary: {
    width: '100%' as any,
    aspectRatio: 3 / 4,
    borderRadius: BorderRadius.xl,
  },
  content: {
    flex: 0.55,
    gap: Spacing.md,
  },
  contentMobile: {
    flex: undefined,
  },
  overline: {
    fontFamily: Fonts.family,
    fontWeight: Fonts.weights.semibold,
    fontSize: Fonts.sizes.sm,
    color: '#6FA43A',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  heading: {
    fontFamily: Fonts.headingFamily,
    fontWeight: Fonts.weights.bold,
    fontSize: 36,
    lineHeight: 46,
  },
  description: {
    fontFamily: Fonts.family,
    fontWeight: Fonts.weights.regular,
    fontSize: Fonts.sizes.base,
    lineHeight: 26,
  },
  subheading: {
    fontFamily: Fonts.headingFamily,
    fontWeight: Fonts.weights.semibold,
    fontSize: Fonts.sizes.lg,
    marginTop: Spacing.sm,
  },
  checklist: {
    gap: Spacing.sm,
  },
  checkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  checkIcon: {
    fontFamily: Fonts.family,
    fontWeight: Fonts.weights.bold,
    fontSize: 16,
    color: '#6FA43A',
    width: 24,
    height: 24,
    lineHeight: 24,
    textAlign: 'center',
    backgroundColor: 'rgba(111, 164, 58, 0.12)',
    borderRadius: 12,
    overflow: 'hidden',
  },
  checkText: {
    fontFamily: Fonts.family,
    fontWeight: Fonts.weights.medium,
    fontSize: Fonts.sizes.base,
  },
});
