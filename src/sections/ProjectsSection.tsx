import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Platform, Pressable } from 'react-native';
import { SectionWrapper } from '../components/SectionWrapper';
import { SectionTitle } from '../components/SectionTitle';
import { useTheme } from '../hooks/useTheme';
import { useResponsive } from '../hooks/useResponsive';
import { PROJECTS, PROJECT_FILTERS } from '../constants/data';
import { Fonts, Spacing, BorderRadius } from '../theme';

export function ProjectsSection() {
  const { colors } = useTheme();
  const { isMobile, isTablet } = useResponsive();
  const [activeFilter, setActiveFilter] = useState('Tümü');

  const filtered = activeFilter === 'Tümü'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeFilter);

  const cols = isMobile ? 1 : isTablet ? 2 : 3;

  return (
    <SectionWrapper id="projeler">
      <SectionTitle
        title="Tamamlanan Projelerimiz"
        subtitle="Son dönemde hayata geçirdiğimiz peyzaj projeleri"
      />

      <View style={styles.filters}>
        {PROJECT_FILTERS.map((f) => (
          <Pressable
            key={f}
            onPress={() => setActiveFilter(f)}
            style={[
              styles.filterChip,
              {
                backgroundColor: activeFilter === f ? colors.primary : 'transparent',
                borderColor: activeFilter === f ? colors.primary : colors.border,
              },
            ]}
          >
            <Text style={[
              styles.filterText,
              { color: activeFilter === f ? '#FFFFFF' : colors.textSecondary },
            ]}>
              {f}
            </Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.grid}>
        {filtered.map((project) => (
          <ProjectCard key={project.id} project={project} cols={cols} />
        ))}
      </View>
    </SectionWrapper>
  );
}

function ProjectCard({ project, cols }: { project: typeof PROJECTS[0]; cols: number }) {
  const { colors } = useTheme();
  const [hovered, setHovered] = useState(false);
  const webHover = Platform.OS === 'web' ? {
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
  } : {};

  const widthPercent = cols === 1 ? '100%' : cols === 2 ? '48.5%' : '32%';

  return (
    <View
      {...webHover}
      style={[
        styles.card,
        {
          backgroundColor: colors.surface,
          width: widthPercent as any,
          transform: [{ translateY: hovered ? -6 : 0 }],
          ...Platform.select({
            web: {
              boxShadow: hovered
                ? '0 16px 32px rgba(0,0,0,0.12)'
                : `0 2px 12px ${colors.cardShadow}`,
            } as any,
          }),
        },
      ]}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: project.image }} style={styles.image} resizeMode="cover" />
        <View style={[styles.badge, { backgroundColor: colors.primary }]}>
          <Text style={styles.badgeText}>{project.category}</Text>
        </View>
      </View>
      <View style={styles.cardBody}>
        <Text style={[styles.cardTitle, { color: colors.text }]}>{project.title}</Text>
        <View style={styles.meta}>
          <Text style={[styles.metaText, { color: colors.textMuted }]}>📍 {project.location}</Text>
          <Text style={[styles.metaText, { color: colors.textMuted }]}>📐 {project.area} m²</Text>
          <Text style={[styles.metaText, { color: colors.textMuted }]}>⏱ {project.duration}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  filters: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.xl,
  },
  filterChip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    ...Platform.select({ web: { cursor: 'pointer', transitionDuration: '200ms', transitionProperty: 'all' } as any }),
  },
  filterText: {
    fontFamily: Fonts.family,
    fontWeight: Fonts.weights.medium,
    fontSize: Fonts.sizes.sm,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: Spacing.md,
  },
  card: {
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    marginBottom: Spacing.md,
    ...Platform.select({
      web: {
        cursor: 'pointer',
        transitionDuration: '300ms',
        transitionProperty: 'all',
      } as any,
    }),
  },
  imageContainer: {
    position: 'relative',
    height: 220,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  badge: {
    position: 'absolute',
    top: Spacing.md,
    left: Spacing.md,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: BorderRadius.sm,
  },
  badgeText: {
    fontFamily: Fonts.family,
    fontWeight: Fonts.weights.semibold,
    fontSize: 11,
    color: '#FFFFFF',
  },
  cardBody: {
    padding: Spacing.md,
  },
  cardTitle: {
    fontFamily: Fonts.family,
    fontWeight: Fonts.weights.bold,
    fontSize: Fonts.sizes.base,
    marginBottom: Spacing.sm,
  },
  meta: {
    gap: 4,
  },
  metaText: {
    fontFamily: Fonts.family,
    fontSize: Fonts.sizes.xs,
    lineHeight: 20,
  },
});
