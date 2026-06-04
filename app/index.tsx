import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useTheme } from '../src/hooks/useTheme';
import { Header } from '../src/components/Header';
import { Footer } from '../src/components/Footer';
import { WhatsAppFAB } from '../src/components/WhatsAppFAB';
import { ScrollToTopFAB } from '../src/components/ScrollToTopFAB';
import {
  HeroSection,
  ServicesSection,
  CapabilitiesSection,
  ProcessSection,
  CTABannerSection,
  ProjectsSection,
  BeforeAfterSection,
  FounderQuoteSection,
  PackagesSection,
  StatsSection,
  TestimonialsSection,
  TeamSection,
  QuoteSection,
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
        <CapabilitiesSection />
        <ProcessSection />
        <CTABannerSection />
        <ProjectsSection />
        <BeforeAfterSection />
        <FounderQuoteSection />
        <PackagesSection />
        <StatsSection />
        <TestimonialsSection />
        <TeamSection />
        <QuoteSection />
        <BlogSection />
        <ContactSection />
        <Footer />
      </ScrollView>
      <WhatsAppFAB />
      <ScrollToTopFAB />
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
