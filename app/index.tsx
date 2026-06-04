import React from 'react';
import { ScrollView, StyleSheet, Platform } from 'react-native';
import { useTheme } from '../src/hooks/useTheme';
import { Header } from '../src/components/Header';
import { Footer } from '../src/components/Footer';
import { WhatsAppFAB } from '../src/components/WhatsAppFAB';
import {
  HeroSection,
  ServicesSection,
  QuoteSection,
  ProjectsSection,
  BeforeAfterSection,
  PackagesSection,
  StatsSection,
  TestimonialsSection,
  BlogSection,
  ContactSection,
} from '../src/sections';

export default function HomeScreen() {
  const { colors } = useTheme();

  return (
    <>
      <Header />
      <ScrollView
        style={[styles.container, { backgroundColor: colors.background }]}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <HeroSection />
        <ServicesSection />
        <QuoteSection />
        <ProjectsSection />
        <BeforeAfterSection />
        <PackagesSection />
        <StatsSection />
        <TestimonialsSection />
        <BlogSection />
        <ContactSection />
        <Footer />
      </ScrollView>
      <WhatsAppFAB />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
  },
});
