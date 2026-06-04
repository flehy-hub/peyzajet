import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Platform, Pressable } from 'react-native';
import { SectionWrapper } from '../components/SectionWrapper';
import { SectionTitle } from '../components/SectionTitle';
import { useTheme } from '../hooks/useTheme';
import { useResponsive } from '../hooks/useResponsive';
import { BLOG_POSTS } from '../constants/data';
import { Fonts, Spacing, BorderRadius } from '../theme';

export function BlogSection() {
  const { isMobile } = useResponsive();

  return (
    <SectionWrapper id="blog">
      <SectionTitle
        overline="Blog"
        title="Peyzaj Dünyasından"
        subtitle="Peyzaj ve bahçe bakımı hakkında faydalı bilgiler"
      />
      <View style={[styles.grid, { flexDirection: isMobile ? 'column' : 'row' }]}>
        {BLOG_POSTS.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </View>
    </SectionWrapper>
  );
}

function BlogCard({ post }: { post: typeof BLOG_POSTS[0] }) {
  const { colors } = useTheme();
  const [hovered, setHovered] = useState(false);
  const webHover = Platform.OS === 'web' ? {
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
  } : {};

  return (
    <View
      {...webHover}
      style={[
        styles.card,
        {
          backgroundColor: colors.surface,
          transform: [{ translateY: hovered ? -6 : 0 }],
          ...Platform.select({
            web: {
              boxShadow: hovered
                ? '0 16px 32px rgba(0,0,0,0.1)'
                : `0 2px 12px ${colors.cardShadow}`,
            } as any,
          }),
        },
      ]}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: post.image }} style={[styles.image, { transform: [{ scale: hovered ? 1.05 : 1 }] }]} resizeMode="cover" />
        <View style={[styles.categoryBadge, { backgroundColor: colors.primary }]}>
          <Text style={styles.categoryText}>{post.category}</Text>
        </View>
      </View>

      <View style={styles.body}>
        <Text style={[styles.date, { color: colors.textMuted }]}>{post.date}</Text>
        <Text style={[styles.title, { color: colors.text }]}>{post.title}</Text>
        <Text style={[styles.excerpt, { color: colors.textSecondary }]}>{post.excerpt}</Text>

        <Pressable style={styles.readMore}>
          <Text style={[styles.readMoreText, { color: colors.primary }]}>
            Devamını Oku {'→'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    gap: Spacing.lg,
  },
  card: {
    flex: 1,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    ...Platform.select({
      web: {
        cursor: 'pointer',
        transitionDuration: '300ms',
        transitionProperty: 'all',
      } as any,
    }),
  },
  imageContainer: {
    height: 200,
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    ...Platform.select({
      web: {
        transitionDuration: '500ms',
        transitionProperty: 'transform',
      } as any,
    }),
  },
  categoryBadge: {
    position: 'absolute',
    top: Spacing.md,
    left: Spacing.md,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: BorderRadius.sm,
  },
  categoryText: {
    fontFamily: Fonts.family,
    fontWeight: Fonts.weights.semibold,
    fontSize: 11,
    color: '#FFFFFF',
  },
  body: {
    padding: Spacing.lg,
  },
  date: {
    fontFamily: Fonts.family,
    fontSize: Fonts.sizes.xs,
    marginBottom: Spacing.sm,
  },
  title: {
    fontFamily: Fonts.family,
    fontWeight: Fonts.weights.bold,
    fontSize: Fonts.sizes.md,
    marginBottom: Spacing.sm,
    lineHeight: 26,
  },
  excerpt: {
    fontFamily: Fonts.family,
    fontWeight: Fonts.weights.regular,
    fontSize: Fonts.sizes.sm,
    lineHeight: 22,
    marginBottom: Spacing.md,
  },
  readMore: {
    ...Platform.select({ web: { cursor: 'pointer' } as any }),
  },
  readMoreText: {
    fontFamily: Fonts.family,
    fontWeight: Fonts.weights.semibold,
    fontSize: Fonts.sizes.sm,
  },
});
