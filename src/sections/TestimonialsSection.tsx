import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Platform, Pressable, Linking, useWindowDimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SectionWrapper } from '../components/SectionWrapper';
import { useTheme } from '../hooks/useTheme';
import { useResponsive } from '../hooks/useResponsive';
import { TESTIMONIALS } from '../constants/data';
import { Fonts, Spacing, BorderRadius } from '../theme';

const TABS = ['Yazılı Yorumlar', 'Fotoğraf & Video'] as const;

export function TestimonialsSection() {
  const { isMobile } = useResponsive();
  const { colors } = useTheme();
  const [activeTab, setActiveTab] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  const cardsPerView = isMobile ? 1 : 3;
  const totalPages = Math.ceil(TESTIMONIALS.length / cardsPerView);

  const resetInterval = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % totalPages);
    }, 5000);
  };

  useEffect(() => {
    resetInterval();
    return () => clearInterval(intervalRef.current);
  }, [totalPages]);

  const goTo = (idx: number) => {
    setActiveIndex(idx);
    resetInterval();
  };

  const visibleCards = TESTIMONIALS.slice(
    activeIndex * cardsPerView,
    activeIndex * cardsPerView + cardsPerView
  );

  return (
    <SectionWrapper id="yorumlar" background="alt">
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.overline, { color: colors.primary }]}>MÜŞTERİ YORUMLARI</Text>
        <Text style={[styles.title, { color: colors.text }]}>Müşteri Memnuniyet Hikayeleri</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        {TABS.map((tab, i) => (
          <Pressable
            key={tab}
            onPress={() => setActiveTab(i)}
            style={[
              styles.tab,
              i === activeTab && styles.tabActive,
            ]}
          >
            <Text
              style={[
                styles.tabText,
                { color: i === activeTab ? '#6FA43A' : colors.textMuted },
                i === activeTab && styles.tabTextActive,
              ]}
            >
              {tab}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Content */}
      {activeTab === 0 ? (
        <>
          <View style={[styles.cardsRow, isMobile && styles.cardsRowMobile]}>
            {visibleCards.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} isMobile={isMobile} />
            ))}
          </View>

          {/* Navigation */}
          <View style={styles.navigation}>
            <Pressable
              onPress={() => goTo((activeIndex - 1 + totalPages) % totalPages)}
              style={[styles.arrow, { borderColor: colors.border || '#E0E0E0' }]}
            >
              <Text style={styles.arrowText}>{'‹'}</Text>
            </Pressable>

            <View style={styles.dots}>
              {Array.from({ length: totalPages }).map((_, idx) => (
                <Pressable key={idx} onPress={() => goTo(idx)}>
                  <View
                    style={[
                      styles.dot,
                      { backgroundColor: idx === activeIndex ? '#6FA43A' : '#D0D0D0' },
                    ]}
                  />
                </Pressable>
              ))}
            </View>

            <Pressable
              onPress={() => goTo((activeIndex + 1) % totalPages)}
              style={[styles.arrow, { borderColor: colors.border || '#E0E0E0' }]}
            >
              <Text style={styles.arrowText}>{'›'}</Text>
            </Pressable>
          </View>

          {/* Google yorumları linki */}
          <Pressable
            accessibilityRole="link"
            accessibilityLabel="Google'daki değerlendirmelerimizi görün"
            onPress={() => Linking.openURL('https://www.google.com/search?q=Peyzajet+Ankara+yorumlar')}
            style={styles.googleLink}
          >
            <MaterialCommunityIcons name="google" size={16} color="#6FA43A" />
            <Text style={[styles.googleLinkText, { color: colors.textMuted }]}>
              Tüm değerlendirmelerimizi Google'da görün
            </Text>
            <MaterialCommunityIcons name="open-in-new" size={14} color="#6FA43A" />
          </Pressable>
        </>
      ) : (
        <View style={styles.placeholder}>
          <Text style={[styles.placeholderText, { color: colors.textMuted }]}>
            Fotoğraf & Video yorumları yakında eklenecektir.
          </Text>
        </View>
      )}
    </SectionWrapper>
  );
}

function TestimonialCard({
  testimonial,
  isMobile,
}: {
  testimonial: (typeof TESTIMONIALS)[0];
  isMobile: boolean;
}) {
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: colors.surface },
        isMobile && { width: '100%' },
        Platform.select({
          web: { boxShadow: '0 4px 24px rgba(0,0,0,0.07)' } as any,
        }),
      ]}
    >
      {/* Quote icon */}
      <Text style={styles.quoteIcon}>{'“'}</Text>

      {/* Comment */}
      <Text style={[styles.comment, { color: colors.text }]}>{testimonial.comment}</Text>

      {/* Divider */}
      <View style={[styles.divider, { backgroundColor: colors.border || '#E8E8E8' }]} />

      {/* Bottom row: avatar + info + stars */}
      <View style={styles.bottomRow}>
        <View style={styles.authorInfo}>
          <View style={[styles.avatar, { backgroundColor: '#6FA43A' }]}>
            <Text style={styles.avatarText}>{testimonial.avatar}</Text>
          </View>
          <View>
            <Text style={[styles.authorName, { color: colors.text }]}>{testimonial.name}</Text>
            <Text style={[styles.authorLocation, { color: colors.textMuted }]}>
              {testimonial.location}
            </Text>
          </View>
        </View>
        <View style={styles.stars}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Text
              key={i}
              style={{
                fontSize: 16,
                color: i < testimonial.rating ? '#D4B06A' : '#E0E0E0',
              }}
            >
              <MaterialCommunityIcons name={i < testimonial.rating ? 'star' : 'star-outline'} size={16} color={i < testimonial.rating ? '#D4B06A' : '#E0E0E0'} />
            </Text>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  overline: {
    fontFamily: Fonts.family,
    fontWeight: Fonts.weights.semibold,
    fontSize: Fonts.sizes.sm,
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: Spacing.sm,
  },
  title: {
    fontFamily: Fonts.headingFamily,
    fontWeight: Fonts.weights.bold,
    fontSize: Fonts.sizes['2xl'],
    textAlign: 'center',
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.xl,
    marginBottom: Spacing.xl,
    marginTop: Spacing.md,
  },
  tab: {
    paddingBottom: Spacing.sm,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    ...Platform.select({ web: { cursor: 'pointer' } as any }),
  },
  tabActive: {
    borderBottomColor: '#6FA43A',
  },
  tabText: {
    fontFamily: Fonts.family,
    fontWeight: Fonts.weights.medium,
    fontSize: Fonts.sizes.base,
  },
  tabTextActive: {
    fontWeight: Fonts.weights.semibold,
  },
  cardsRow: {
    flexDirection: 'row',
    gap: Spacing.lg,
    justifyContent: 'center',
    width: '100%',
    maxWidth: 1200,
    alignSelf: 'center',
  },
  cardsRowMobile: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  card: {
    flex: 1,
    maxWidth: 380,
    minWidth: 280,
    padding: Spacing.xl,
    borderRadius: BorderRadius.xl,
  },
  quoteIcon: {
    fontFamily: 'Georgia, serif',
    fontSize: 40,
    color: '#6FA43A',
    lineHeight: 44,
    marginBottom: Spacing.sm,
  },
  comment: {
    fontFamily: Fonts.family,
    fontWeight: Fonts.weights.regular,
    fontSize: Fonts.sizes.base,
    lineHeight: 26,
    marginBottom: Spacing.lg,
  },
  divider: {
    height: 1,
    width: '100%',
    marginBottom: Spacing.md,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  authorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontFamily: Fonts.family,
    fontWeight: Fonts.weights.bold,
    fontSize: Fonts.sizes.sm,
    color: '#FFFFFF',
  },
  authorName: {
    fontFamily: Fonts.headingFamily,
    fontWeight: Fonts.weights.bold,
    fontSize: Fonts.sizes.sm,
  },
  authorLocation: {
    fontFamily: Fonts.family,
    fontSize: Fonts.sizes.xs,
    marginTop: 2,
  },
  stars: {
    flexDirection: 'row',
    gap: 2,
  },
  navigation: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.lg,
    marginTop: Spacing.xl,
  },
  arrow: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({ web: { cursor: 'pointer' } as any }),
  },
  arrowText: {
    fontSize: 22,
    color: '#6FA43A',
    fontWeight: '700',
    lineHeight: 26,
  },
  dots: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    ...Platform.select({
      web: {
        cursor: 'pointer',
        transitionDuration: '200ms',
        transitionProperty: 'background-color',
      } as any,
    }),
  },
  googleLink: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginTop: Spacing.lg,
    ...Platform.select({ web: { cursor: 'pointer' } as any }),
  },
  googleLinkText: {
    fontFamily: Fonts.family,
    fontSize: Fonts.sizes.sm,
    textDecorationLine: 'underline',
  },
  placeholder: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.section,
  },
  placeholderText: {
    fontFamily: Fonts.family,
    fontSize: Fonts.sizes.md,
    fontStyle: 'italic',
  },
});
