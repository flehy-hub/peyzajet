import React, { useState, useRef, useCallback, useMemo } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Platform,
  Pressable,
  useWindowDimensions,
} from 'react-native';
import { SectionWrapper } from '../components/SectionWrapper';
import { SectionTitle } from '../components/SectionTitle';
import { useTheme } from '../hooks/useTheme';
import { useResponsive } from '../hooks/useResponsive';
import { BEFORE_AFTER } from '../constants/data';
import { Fonts, Spacing, MaxWidth } from '../theme';
import type { BeforeAfter } from '../types';

const CARD_GAP = 20;
const DEBOUNCE_MS = 200;

export function BeforeAfterSection() {
  const { width: screenWidth } = useWindowDimensions();
  const { isMobile, isTablet } = useResponsive();
  const { colors } = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);
  const lastClickRef = useRef(0);

  const slidesPerView = isMobile ? 1 : isTablet ? 2 : 3;
  const containerWidth = Math.min(screenWidth - Spacing.lg * 2, MaxWidth.content);
  const cardWidth = (containerWidth - CARD_GAP * (slidesPerView - 1)) / slidesPerView;
  const maxIndex = Math.max(0, BEFORE_AFTER.length - slidesPerView);

  const goTo = useCallback(
    (index: number) => {
      const now = Date.now();
      if (now - lastClickRef.current < DEBOUNCE_MS) return;
      lastClickRef.current = now;

      requestAnimationFrame(() => {
        let next = index;
        if (next > maxIndex) next = 0;
        if (next < 0) next = maxIndex;
        setActiveIndex(next);
      });
    },
    [maxIndex]
  );

  const visibleItems = useMemo(
    () => BEFORE_AFTER.slice(activeIndex, activeIndex + slidesPerView),
    [activeIndex, slidesPerView]
  );

  const paginationDots = useMemo(
    () => Array.from({ length: maxIndex + 1 }, (_, i) => i),
    [maxIndex]
  );

  return (
    <SectionWrapper id="before-after" background="alt">
      <SectionTitle
        overline="Projelerimiz"
        title="Öncesi ve Sonrası"
        subtitle="Projelerimizin dönüşüm hikayelerini keşfedin"
      />

      <View style={[styles.cardsRow, { gap: CARD_GAP }]}>
        {visibleItems.map((item) => (
          <BeforeAfterCard key={item.id} item={item} width={cardWidth} />
        ))}
      </View>

      {/* Navigation */}
      <View style={styles.nav}>
        <NavButton direction="left" onPress={() => goTo(activeIndex - 1)} colors={colors} />

        <View style={styles.dots}>
          {paginationDots.map((i) => (
            <Pressable
              key={i}
              onPress={() => goTo(i)}
              style={[
                styles.dot,
                {
                  backgroundColor: i === activeIndex ? colors.primary : colors.border,
                  width: i === activeIndex ? 28 : 10,
                },
              ]}
              accessibilityRole="button"
              accessibilityLabel={`Sayfa ${i + 1}`}
            />
          ))}
        </View>

        <NavButton direction="right" onPress={() => goTo(activeIndex + 1)} colors={colors} />
      </View>

      <Text style={[styles.footerText, { color: colors.textMuted }]}>
        Tamamlanan 1.800+ proje.{' '}
        <Text style={[styles.footerLink, { color: colors.primary }]}>Tümünü Görüntüle</Text>
      </Text>
    </SectionWrapper>
  );
}

/* ─── Nav Button ─── */
function NavButton({
  direction,
  onPress,
  colors,
}: {
  direction: 'left' | 'right';
  onPress: () => void;
  colors: any;
}) {
  const handleClick = useCallback(
    (e: any) => {
      onPress();
      if (e?.currentTarget?.blur) {
        e.currentTarget.blur();
      }
    },
    [onPress]
  );

  if (Platform.OS === 'web') {
    return (
      <div
        role="button"
        tabIndex={-1}
        onClick={handleClick}
        onTouchEnd={(e) => {
          e.preventDefault();
          handleClick(e);
        }}
        aria-label={direction === 'left' ? 'Önceki' : 'Sonraki'}
        style={{
          width: 42,
          height: 42,
          borderRadius: 21,
          border: `2px solid ${colors.text}`,
          backgroundColor: 'transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          WebkitTapHighlightColor: 'transparent',
          touchAction: 'manipulation',
          userSelect: 'none',
          outline: 'none',
          transition: 'background-color 200ms, color 200ms',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.backgroundColor = colors.text;
          const txt = e.currentTarget.querySelector('span');
          if (txt) txt.style.color = colors.background;
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
          const txt = e.currentTarget.querySelector('span');
          if (txt) txt.style.color = colors.text;
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <MaterialCommunityIcons name={direction === 'left' ? 'chevron-left' : 'chevron-right'} size={16} color={colors.text} />
        </span>
      </div>
    );
  }

  return (
    <Pressable
      onPress={handleClick}
      style={[styles.navBtn, { borderColor: colors.text }]}
      accessibilityRole="button"
      accessibilityLabel={direction === 'left' ? 'Önceki' : 'Sonraki'}
    >
      <MaterialCommunityIcons name={direction === 'left' ? 'chevron-left' : 'chevron-right'} size={16} color={colors.text} />
    </Pressable>
  );
}

/* ─── Card ─── */
function BeforeAfterCard({ item, width }: { item: BeforeAfter; width: number }) {
  const { colors } = useTheme();
  const [hovered, setHovered] = useState(false);
  const webHover =
    Platform.OS === 'web'
      ? { onMouseEnter: () => setHovered(true), onMouseLeave: () => setHovered(false) }
      : {};

  return (
    <View
      {...webHover}
      style={[
        styles.card,
        {
          width,
          backgroundColor: colors.surface,
          transform: [{ translateY: hovered ? -6 : 0 }],
        },
        Platform.OS === 'web' && {
          boxShadow: hovered
            ? '0 12px 40px rgba(0,0,0,0.12)'
            : '0 4px 20px rgba(0,0,0,0.06)',
        } as any,
      ]}
    >
      <View style={styles.cardHeader}>
        <Text style={[styles.categoryText, { color: colors.primary }]}>{item.category}</Text>
        <Text style={[styles.areaText, { color: colors.textMuted }]}>{item.area}</Text>
      </View>

      <View style={styles.sliderWrap}>
        <ComparisonSlider item={item} hovered={hovered} />
      </View>

      <View style={styles.cardFooter}>
        <View style={{ flex: 1 }}>
          <Text style={[styles.cardTitle, { color: colors.text }]} numberOfLines={1}>
            {item.title}
          </Text>
          <View style={styles.locationRow}>
            <MaterialCommunityIcons name="map-marker-outline" size={14} color={colors.textMuted} />
            <Text style={[styles.locationText, { color: colors.textMuted }]} numberOfLines={1}>
              {item.location}
            </Text>
          </View>
        </View>
        <View style={[styles.arrowBtn, { borderColor: colors.border }]}>
          <MaterialCommunityIcons name="arrow-top-right" size={12} color={colors.textMuted} />
        </View>
      </View>
    </View>
  );
}

/* ─── Comparison Slider ─── */
function ComparisonSlider({ item, hovered }: { item: BeforeAfter; hovered: boolean }) {
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef<View>(null);

  const calcPosition = useCallback(
    (clientX: number, target: any) => {
      if (Platform.OS !== 'web') return;
      const rect = (target as HTMLElement).getBoundingClientRect();
      const x = clientX - rect.left;
      setPosition(Math.max(0, Math.min(100, (x / rect.width) * 100)));
    },
    []
  );

  const webEvents =
    Platform.OS === 'web'
      ? {
          onMouseDown: (e: any) => {
            setIsDragging(true);
            calcPosition(e.clientX, e.currentTarget);
          },
          onMouseMove: (e: any) => {
            if (!isDragging) return;
            calcPosition(e.clientX, e.currentTarget);
          },
          onMouseUp: () => setIsDragging(false),
          onMouseLeave: () => setIsDragging(false),
          onTouchStart: (e: any) => {
            setIsDragging(true);
            calcPosition(e.touches[0].clientX, e.currentTarget);
          },
          onTouchMove: (e: any) => {
            if (!isDragging) return;
            calcPosition(e.touches[0].clientX, e.currentTarget);
          },
          onTouchEnd: () => setIsDragging(false),
        }
      : {};

  return (
    <View
      ref={containerRef}
      onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}
      style={[
        styles.comparisonContainer,
        Platform.OS === 'web' && {
          transform: hovered ? 'scale(1.01)' : 'scale(1)',
        } as any,
      ]}
      {...webEvents}
    >
      <Image
        source={item.afterImage}
        style={styles.comparisonImage}
        resizeMode="cover"
      />

      <View style={[styles.beforeOverlay, { width: `${position}%` as any }]}>
        <Image
          source={item.beforeImage}
          style={[styles.comparisonImage, containerWidth > 0 && { width: containerWidth }]}
          resizeMode="cover"
        />
      </View>

      <View
        style={[styles.sliderLine, { left: `${position}%` as any, pointerEvents: 'none' }]}
      >
        <View style={styles.sliderHandle}>
          <Text style={styles.handleArrows}>{'◁ ▷'}</Text>
        </View>
      </View>

      <View style={[styles.label, { left: 10, bottom: 10, pointerEvents: 'none' }]}>
        <Text style={styles.labelText}>ÖNCESİ</Text>
      </View>
      <View style={[styles.label, { right: 10, bottom: 10, pointerEvents: 'none' }]}>
        <Text style={styles.labelText}>SONRASI</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardsRow: {
    flexDirection: 'row',
    marginBottom: Spacing.xl,
  },
  card: {
    borderRadius: 20,
    overflow: 'hidden',
    ...Platform.select({
      web: {
        transitionDuration: '300ms',
        transitionProperty: 'transform, box-shadow',
      } as any,
    }),
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingTop: 14,
    paddingBottom: 8,
  },
  categoryText: {
    fontFamily: Fonts.family,
    fontWeight: Fonts.weights.semibold,
    fontSize: 13,
    letterSpacing: 0.5,
  },
  areaText: {
    fontFamily: Fonts.family,
    fontWeight: Fonts.weights.medium,
    fontSize: 13,
  },
  sliderWrap: {
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingBottom: 16,
    paddingTop: 4,
  },
  cardTitle: {
    fontFamily: Fonts.headingFamily,
    fontWeight: Fonts.weights.semibold,
    fontSize: 15,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    marginTop: 2,
  },
  locationIcon: {
    fontSize: 11,
  },
  locationText: {
    fontFamily: Fonts.family,
    fontSize: 12,
  },
  arrowBtn: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  comparisonContainer: {
    width: '100%',
    aspectRatio: 4 / 3,
    borderRadius: 14,
    overflow: 'hidden',
    position: 'relative',
    ...Platform.select({
      web: {
        cursor: 'col-resize',
        userSelect: 'none',
        transitionDuration: '300ms',
        transitionProperty: 'transform',
      } as any,
    }),
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
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      web: {
        boxShadow: '0 2px 12px rgba(0,0,0,0.25)',
      } as any,
    }),
  },
  handleArrows: {
    fontSize: 11,
    color: '#1E293B',
    fontWeight: '700',
    letterSpacing: 2,
  },
  label: {
    position: 'absolute',
    backgroundColor: '#99a537',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    zIndex: 3,
  },
  labelText: {
    fontFamily: Fonts.family,
    fontWeight: Fonts.weights.bold,
    fontSize: 10,
    color: '#FFFFFF',
    letterSpacing: 1.5,
  },
  nav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    marginBottom: Spacing.lg,
  },
  navBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navIcon: {
    fontSize: 14,
  },
  dots: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dot: {
    height: 10,
    borderRadius: 5,
    ...Platform.select({
      web: {
        cursor: 'pointer',
        transitionDuration: '300ms',
        transitionProperty: 'width, background-color',
      } as any,
    }),
  },
  footerText: {
    fontFamily: Fonts.family,
    fontSize: 14,
    textAlign: 'center',
  },
  footerLink: {
    fontWeight: Fonts.weights.medium,
    ...Platform.select({
      web: { textDecorationLine: 'underline' } as any,
    }),
  },
});
