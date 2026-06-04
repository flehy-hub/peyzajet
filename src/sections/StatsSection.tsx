import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { useResponsive } from '../hooks/useResponsive';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useCountUp } from '../hooks/useCountUp';
import { STATS } from '../constants/data';
import { Fonts, Spacing, MaxWidth, BorderRadius } from '../theme';

export function StatsSection() {
  const { colors } = useTheme();
  const { isMobile } = useResponsive();
  const { ref, isVisible } = useScrollAnimation(0.3);

  return (
    <View
      {...(Platform.OS === 'web' ? { id: 'neden-peyzajet' } : {})}
      style={[styles.container, { backgroundColor: colors.secondary }]}
    >
      <View style={styles.inner}>
        <Text style={[styles.title, { fontSize: isMobile ? Fonts.sizes['2xl'] : Fonts.sizes['3xl'] }]}>
          Neden Peyzajet?
        </Text>
        <Text style={styles.subtitle}>
          Y{'ı'}llar{'ı'}n deneyimi ve y{'ü'}zlerce ba{'ş'}ar{'ı'}l{'ı'} proje ile sekt{'ö'}r{'ü'}n g{'ü'}venilir markas{'ı'}
        </Text>

        <View
          ref={ref}
          style={[styles.statsRow, { flexDirection: isMobile ? 'column' : 'row' }]}
        >
          {STATS.map((stat, idx) => (
            <StatItem key={idx} stat={stat} isVisible={isVisible} />
          ))}
        </View>
      </View>
    </View>
  );
}

function StatItem({ stat, isVisible }: { stat: typeof STATS[0]; isVisible: boolean }) {
  const count = useCountUp(stat.value, 2000, isVisible);

  return (
    <View style={styles.statItem}>
      <Text style={styles.statValue}>
        {count}{stat.suffix}
      </Text>
      <Text style={styles.statLabel}>{stat.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: Spacing.section,
    paddingHorizontal: Spacing.lg,
  },
  inner: {
    maxWidth: MaxWidth.content,
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: Fonts.family,
    fontWeight: Fonts.weights.bold,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: Fonts.family,
    fontWeight: Fonts.weights.regular,
    fontSize: Fonts.sizes.md,
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
    marginTop: Spacing.md,
    marginBottom: Spacing['2xl'],
    maxWidth: 600,
    lineHeight: 28,
  },
  statsRow: {
    gap: Spacing.xl,
    width: '100%',
    justifyContent: 'center',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: Spacing.xl,
    paddingHorizontal: Spacing.lg,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  statValue: {
    fontFamily: Fonts.family,
    fontWeight: Fonts.weights.extrabold,
    fontSize: 48,
    color: '#6FA43A',
    marginBottom: Spacing.sm,
  },
  statLabel: {
    fontFamily: Fonts.family,
    fontWeight: Fonts.weights.medium,
    fontSize: Fonts.sizes.base,
    color: 'rgba(255,255,255,0.8)',
  },
});
