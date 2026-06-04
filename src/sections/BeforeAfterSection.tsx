import React, { useState, useRef } from 'react';
import { View, Text, Image, StyleSheet, Platform, Pressable, PanResponder } from 'react-native';
import { SectionWrapper } from '../components/SectionWrapper';
import { SectionTitle } from '../components/SectionTitle';
import { useTheme } from '../hooks/useTheme';
import { useResponsive } from '../hooks/useResponsive';
import { BEFORE_AFTER } from '../constants/data';
import { Fonts, Spacing, BorderRadius } from '../theme';

export function BeforeAfterSection() {
  const { isMobile } = useResponsive();
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <SectionWrapper id="before-after" background="alt">
      <SectionTitle
        title="Öncesi ve Sonrası"
        subtitle="Projelerimizin dönüşüm hikayelerini keşfedin"
      />

      <ComparisonSlider item={BEFORE_AFTER[activeIndex]} />

      <View style={[styles.thumbs, { flexWrap: isMobile ? 'wrap' : 'nowrap' }]}>
        {BEFORE_AFTER.map((item, idx) => (
          <ThumbCard
            key={item.id}
            item={item}
            active={idx === activeIndex}
            onPress={() => setActiveIndex(idx)}
          />
        ))}
      </View>
    </SectionWrapper>
  );
}

function ComparisonSlider({ item }: { item: typeof BEFORE_AFTER[0] }) {
  const { colors } = useTheme();
  const [position, setPosition] = useState(50);
  const containerRef = useRef<View>(null);

  const handleWebMove = (e: any) => {
    if (Platform.OS !== 'web') return;
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setPosition(pct);
  };

  return (
    <View
      ref={containerRef}
      style={styles.comparisonContainer}
      {...(Platform.OS === 'web' ? {
        onMouseMove: handleWebMove,
        onTouchMove: (e: any) => {
          const touch = e.nativeEvent.touches[0];
          const rect = (e.currentTarget as unknown as HTMLElement).getBoundingClientRect();
          const x = touch.clientX - rect.left;
          const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
          setPosition(pct);
        },
      } : {})}
    >
      <Image source={{ uri: item.afterImage }} style={styles.comparisonImage} resizeMode="cover" />

      <View style={[styles.beforeOverlay, { width: `${position}%` as any }]}>
        <Image source={{ uri: item.beforeImage }} style={styles.comparisonImage} resizeMode="cover" />
      </View>

      <View style={[styles.sliderLine, { left: `${position}%` as any }]}>
        <View style={[styles.sliderHandle, { backgroundColor: colors.primary }]}>
          <Text style={{ color: '#FFF', fontSize: 14, fontWeight: '700' }}>{'◀ ▶'}</Text>
        </View>
      </View>

      <View style={[styles.compLabel, { left: Spacing.md }]}>
        <Text style={styles.compLabelText}>ÖNCE</Text>
      </View>
      <View style={[styles.compLabel, { right: Spacing.md }]}>
        <Text style={styles.compLabelText}>SONRA</Text>
      </View>
    </View>
  );
}

function ThumbCard({ item, active, onPress }: { item: typeof BEFORE_AFTER[0]; active: boolean; onPress: () => void }) {
  const { colors } = useTheme();
  return (
    <Pressable onPress={onPress} style={[
      styles.thumb,
      {
        borderColor: active ? colors.primary : 'transparent',
        opacity: active ? 1 : 0.6,
      },
    ]}>
      <Image source={{ uri: item.afterImage }} style={styles.thumbImage} resizeMode="cover" />
      <Text style={[styles.thumbTitle, { color: colors.text }]}>{item.title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  comparisonContainer: {
    width: '100%',
    height: 500,
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: Spacing.xl,
    ...Platform.select({ web: { cursor: 'col-resize', userSelect: 'none' } as any }),
  },
  comparisonImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  beforeOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    overflow: 'hidden',
  },
  sliderLine: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 3,
    backgroundColor: '#FFFFFF',
    marginLeft: -1.5,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  sliderHandle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      web: { boxShadow: '0 2px 10px rgba(0,0,0,0.3)' } as any,
    }),
  },
  compLabel: {
    position: 'absolute',
    bottom: Spacing.md,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
    zIndex: 3,
  },
  compLabelText: {
    fontFamily: Fonts.family,
    fontWeight: Fonts.weights.bold,
    fontSize: Fonts.sizes.xs,
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  thumbs: {
    flexDirection: 'row',
    gap: Spacing.md,
    justifyContent: 'center',
  },
  thumb: {
    borderRadius: BorderRadius.md,
    borderWidth: 3,
    overflow: 'hidden',
    width: 120,
    ...Platform.select({
      web: {
        cursor: 'pointer',
        transitionDuration: '200ms',
        transitionProperty: 'all',
      } as any,
    }),
  },
  thumbImage: {
    width: '100%',
    height: 80,
  },
  thumbTitle: {
    fontFamily: Fonts.family,
    fontWeight: Fonts.weights.medium,
    fontSize: 11,
    textAlign: 'center',
    paddingVertical: 6,
  },
});
