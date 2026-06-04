import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Platform, Pressable } from 'react-native';
import { SectionWrapper } from '../components/SectionWrapper';
import { SectionTitle } from '../components/SectionTitle';
import { useTheme } from '../hooks/useTheme';
import { useResponsive } from '../hooks/useResponsive';
import { TESTIMONIALS } from '../constants/data';
import { Fonts, Spacing, BorderRadius } from '../theme';

export function TestimonialsSection() {
  const { isMobile } = useResponsive();
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(intervalRef.current);
  }, []);

  const goTo = (idx: number) => {
    setActiveIndex(idx);
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
  };

  return (
    <SectionWrapper id="yorumlar" background="alt">
      <SectionTitle
        title="Müşteri Yorumları"
        subtitle="Müşterilerimizin deneyimleri"
      />

      <View style={styles.sliderContainer}>
        <TestimonialCard testimonial={TESTIMONIALS[activeIndex]} />

        <View style={styles.controls}>
          <Pressable onPress={() => goTo((activeIndex - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)} style={styles.arrow}>
            <Text style={styles.arrowText}>{'‹'}</Text>
          </Pressable>

          <View style={styles.dots}>
            {TESTIMONIALS.map((_, idx) => (
              <Pressable key={idx} onPress={() => goTo(idx)}>
                <View style={[
                  styles.dot,
                  { backgroundColor: idx === activeIndex ? '#6FA43A' : '#D0D0D0' },
                ]} />
              </Pressable>
            ))}
          </View>

          <Pressable onPress={() => goTo((activeIndex + 1) % TESTIMONIALS.length)} style={styles.arrow}>
            <Text style={styles.arrowText}>{'›'}</Text>
          </Pressable>
        </View>
      </View>
    </SectionWrapper>
  );
}

function TestimonialCard({ testimonial }: { testimonial: typeof TESTIMONIALS[0] }) {
  const { colors } = useTheme();

  return (
    <View style={[styles.card, { backgroundColor: colors.surface }, Platform.select({
      web: { boxShadow: '0 8px 32px rgba(0,0,0,0.08)' } as any,
    })]}>
      <Text style={styles.quoteIcon}>{'"'}</Text>

      <Text style={[styles.comment, { color: colors.text }]}>
        {testimonial.comment}
      </Text>

      <View style={styles.stars}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Text key={i} style={{ fontSize: 18, color: i < testimonial.rating ? '#D4B06A' : '#E0E0E0' }}>
            {'★'}
          </Text>
        ))}
      </View>

      <View style={styles.author}>
        <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
          <Text style={styles.avatarText}>{testimonial.avatar}</Text>
        </View>
        <View>
          <Text style={[styles.authorName, { color: colors.text }]}>{testimonial.name}</Text>
          <Text style={[styles.authorLocation, { color: colors.textMuted }]}>{testimonial.location}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sliderContainer: {
    alignItems: 'center',
    maxWidth: 700,
    alignSelf: 'center',
    width: '100%',
  },
  card: {
    padding: Spacing.xl,
    borderRadius: BorderRadius.xl,
    alignItems: 'center',
    width: '100%',
  },
  quoteIcon: {
    fontFamily: 'Georgia, serif',
    fontSize: 60,
    color: '#6FA43A',
    lineHeight: 60,
    marginBottom: Spacing.sm,
    opacity: 0.3,
  },
  comment: {
    fontFamily: Fonts.family,
    fontWeight: Fonts.weights.regular,
    fontSize: Fonts.sizes.md,
    textAlign: 'center',
    lineHeight: 30,
    marginBottom: Spacing.lg,
  },
  stars: {
    flexDirection: 'row',
    gap: 4,
    marginBottom: Spacing.lg,
  },
  author: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontFamily: Fonts.family,
    fontWeight: Fonts.weights.bold,
    fontSize: Fonts.sizes.base,
    color: '#FFFFFF',
  },
  authorName: {
    fontFamily: Fonts.family,
    fontWeight: Fonts.weights.bold,
    fontSize: Fonts.sizes.base,
  },
  authorLocation: {
    fontFamily: Fonts.family,
    fontSize: Fonts.sizes.sm,
    marginTop: 2,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.lg,
    marginTop: Spacing.xl,
  },
  arrow: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(111,164,58,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({ web: { cursor: 'pointer' } as any }),
  },
  arrowText: {
    fontSize: 24,
    color: '#6FA43A',
    fontWeight: '700',
    lineHeight: 28,
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
});
