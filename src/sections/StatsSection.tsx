import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Platform, ScrollView } from 'react-native';
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
  const scrollRef = useRef<ScrollView>(null);
  const scrollPos = useRef(0);
  const animFrame = useRef<number | null>(null);

  const topRow = STATS.slice(0, 3);
  const bottomRow = STATS.slice(3);
  const allStats = STATS;

  useEffect(() => {
    if (!isMobile || Platform.OS !== 'web') return;

    let maxScroll = 0;
    const speed = 0.5;

    const tick = () => {
      scrollPos.current += speed;
      if (maxScroll > 0 && scrollPos.current >= maxScroll) {
        scrollPos.current = 0;
      }
      scrollRef.current?.scrollTo({ x: scrollPos.current, animated: false });
      animFrame.current = requestAnimationFrame(tick);
    };

    const timer = setTimeout(() => {
      const node = scrollRef.current as any;
      if (node?.getScrollableNode) {
        const el = node.getScrollableNode();
        maxScroll = el.scrollWidth - el.clientWidth;
      }
      animFrame.current = requestAnimationFrame(tick);
    }, 500);

    return () => {
      clearTimeout(timer);
      if (animFrame.current) cancelAnimationFrame(animFrame.current);
    };
  }, [isMobile]);

  return (
    <View
      {...(Platform.OS === 'web' ? { id: 'neden-peyzajet' } : {})}
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View ref={ref} style={styles.inner}>
        <View
          style={[
            styles.card,
            {
              backgroundColor: '#FFFFFF',
              ...(Platform.OS === 'web'
                ? { boxShadow: '0px 4px 24px rgba(0, 0, 0, 0.06)' }
                : {
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.06,
                    shadowRadius: 24,
                    elevation: 3,
                  }),
            },
          ]}
        >
          {isMobile ? (
            <ScrollView
              ref={scrollRef}
              horizontal
              showsHorizontalScrollIndicator={false}
              scrollEventThrottle={16}
              onTouchStart={() => {
                if (animFrame.current) cancelAnimationFrame(animFrame.current);
                animFrame.current = null;
              }}
              contentContainerStyle={styles.mobileScrollContent}
            >
              {[...allStats, ...allStats].map((stat, idx) => (
                <StatItem key={idx} stat={stat} isVisible={isVisible} />
              ))}
            </ScrollView>
          ) : (
            <>
              <View style={[styles.row, { flexDirection: 'row' }]}>
                {topRow.map((stat, idx) => (
                  <StatItem key={idx} stat={stat} isVisible={isVisible} />
                ))}
              </View>
              <View style={styles.divider} />
              <View style={[styles.row, { flexDirection: 'row', justifyContent: 'center' }]}>
                {bottomRow.map((stat, idx) => (
                  <StatItem key={idx} stat={stat} isVisible={isVisible} />
                ))}
              </View>
            </>
          )}
        </View>
      </View>
    </View>
  );
}

function StatItem({ stat, isVisible }: { stat: (typeof STATS)[0]; isVisible: boolean }) {
  const count = useCountUp(stat.value, 2000, isVisible);

  return (
    <View style={styles.statItem}>
      <Text style={styles.statValue}>
        <Text style={styles.statNumber}>{count}</Text>
        {stat.suffix ? <Text style={styles.statSuffix}>{stat.suffix}</Text> : null}
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
  },
  card: {
    borderRadius: BorderRadius.xl,
    paddingVertical: Spacing['2xl'],
    paddingHorizontal: Spacing.xl,
    overflow: 'hidden',
  },
  row: {
    gap: Spacing.xl,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: '#E8E8E4',
    marginVertical: Spacing.xl,
    marginHorizontal: Spacing.lg,
  },
  mobileScrollContent: {
    gap: Spacing.xl,
    paddingHorizontal: Spacing.md,
  },
  statItem: {
    alignItems: 'center',
    paddingVertical: Spacing.md,
    minWidth: 140,
  },
  statValue: {
    marginBottom: Spacing.xs,
  },
  statNumber: {
    fontFamily: Fonts.headingFamily,
    fontWeight: Fonts.weights.bold,
    fontSize: 56,
    color: '#223740',
  },
  statSuffix: {
    fontFamily: Fonts.headingFamily,
    fontWeight: Fonts.weights.bold,
    fontSize: 56,
    color: '#99a537',
  },
  statLabel: {
    fontFamily: Fonts.family,
    fontWeight: Fonts.weights.regular,
    fontSize: Fonts.sizes.base,
    color: '#565753',
    textAlign: 'center',
  },
});
