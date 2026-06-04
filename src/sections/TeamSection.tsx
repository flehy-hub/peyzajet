import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform, Pressable } from 'react-native';
import { SectionWrapper } from '../components/SectionWrapper';
import { SectionTitle } from '../components/SectionTitle';
import { useTheme } from '../hooks/useTheme';
import { useResponsive } from '../hooks/useResponsive';
import { TEAM_MEMBERS } from '../constants/data';
import { Fonts, Spacing, BorderRadius } from '../theme';

export function TeamSection() {
  const { isMobile, isTablet } = useResponsive();
  const cols = isMobile ? 1 : isTablet ? 2 : 4;

  return (
    <SectionWrapper id="ekibimiz">
      <SectionTitle
        overline="Ekibimiz"
        title="Uzman Kadromuz"
        subtitle="Deneyimli ve tutkulu ekibimizle tanışın"
      />
      <View style={styles.grid}>
        {TEAM_MEMBERS.map((member) => (
          <TeamCard key={member.id} member={member} cols={cols} />
        ))}
      </View>
    </SectionWrapper>
  );
}

function TeamCard({ member, cols }: { member: typeof TEAM_MEMBERS[0]; cols: number }) {
  const { colors } = useTheme();
  const [hovered, setHovered] = useState(false);

  const webHover = Platform.OS === 'web' ? {
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
  } : {};

  const widthPercent = cols === 1 ? '100%' : cols === 2 ? '48%' : '23%';

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
                ? '0 16px 32px rgba(0,0,0,0.1)'
                : `0 4px 16px ${colors.cardShadow}`,
            } as any,
          }),
        },
      ]}
    >
      <View style={[
        styles.avatar,
        { backgroundColor: hovered ? colors.primary : colors.surfaceAlt }
      ]}>
        <Text style={[
          styles.avatarText,
          { color: hovered ? '#FFFFFF' : colors.primary }
        ]}>
          {member.avatar}
        </Text>
      </View>

      <View style={[styles.leafDecor, { borderColor: colors.primary }]} />

      <Text style={[styles.name, { color: colors.text }]}>{member.name}</Text>
      <Text style={[styles.role, { color: colors.textMuted }]}>{member.role}</Text>

      <View style={styles.socialRow}>
        {['IG', 'LI', 'TW'].map((s) => (
          <Pressable key={s} style={[styles.socialIcon, { backgroundColor: colors.surfaceAlt }]}>
            <Text style={[styles.socialText, { color: colors.textMuted }]}>{s}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: Spacing.lg,
  },
  card: {
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    alignItems: 'center',
    ...Platform.select({
      web: {
        transitionDuration: '300ms',
        transitionProperty: 'all',
      } as any,
    }),
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
    ...Platform.select({
      web: {
        transitionDuration: '300ms',
        transitionProperty: 'all',
      } as any,
    }),
  },
  avatarText: {
    fontFamily: Fonts.family,
    fontWeight: Fonts.weights.bold,
    fontSize: Fonts.sizes.xl,
    ...Platform.select({
      web: {
        transitionDuration: '300ms',
        transitionProperty: 'color',
      } as any,
    }),
  },
  leafDecor: {
    width: 16,
    height: 16,
    borderWidth: 2,
    borderRadius: 8,
    borderTopRightRadius: 2,
    borderBottomLeftRadius: 2,
    transform: [{ rotate: '45deg' }],
    marginBottom: Spacing.md,
    opacity: 0.4,
  },
  name: {
    fontFamily: Fonts.family,
    fontWeight: Fonts.weights.bold,
    fontSize: Fonts.sizes.md,
    marginBottom: Spacing.xs,
  },
  role: {
    fontFamily: Fonts.family,
    fontWeight: Fonts.weights.regular,
    fontSize: Fonts.sizes.sm,
    marginBottom: Spacing.md,
  },
  socialRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  socialIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({ web: { cursor: 'pointer' } as any }),
  },
  socialText: {
    fontFamily: Fonts.family,
    fontWeight: Fonts.weights.semibold,
    fontSize: 10,
  },
});
