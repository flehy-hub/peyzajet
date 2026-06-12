# Peyzajet — Knowledge Graph Report

**Generated**: 2026-06-12 | **Nodes**: 36 | **Edges**: 63

## Architecture Overview

Peyzajet, Ankara merkezli bir peyzaj firmasının tek sayfalık tanıtım sitesi. Expo SDK 56 + expo-router + react-native-web ile yazılmış; web çıktısı statik (`app.json → web.output: "static"`), Vercel ile yayınlanıyor. Tüm sayfa `app/index.tsx` (HomeScreen) içinde bir ScrollView olarak 15 section'ı sırayla render eder; tema (light/dark) `app/_layout.tsx`'teki ThemeContext ile sağlanır.

## Module Map

| Katman | Dosyalar | Rol |
|---|---|---|
| Routing/Screens | `app/_layout.tsx`, `app/index.tsx`, `app/+html.tsx` | Root layout (tema), ana sayfa kompozisyonu, web HTML şablonu |
| Sections (15) | `src/sections/*` | Hero, Services, Capabilities, Process, CTABanner, Projects, BeforeAfter, FounderQuote, Packages, Stats, Testimonials, Team, Quote, Blog, Contact |
| Components (9) | `src/components/*` | Header, Footer, Logo, Button, SectionWrapper, SectionTitle, WhatsAppFAB, ScrollToTopFAB, StickyQuoteBar |
| Hooks (5) | `src/hooks/*` | useTheme, useResponsive, useScrollAnimation, useCountUp, useCostCalculator |
| Constants | `src/constants/data.ts`, `src/constants/pricing.ts` | Tüm statik içerik; maliyet hesaplama modeli |
| Theme | `src/theme/*` | Colors, Fonts, Spacing, BorderRadius, MaxWidth token'ları |
| Types | `src/types/index.ts` | Domain tipleri |
| Utils | `src/utils/quoteCalculator.ts` | Eski/basit teklif hesabı (aktif akış useCostCalculator) |

## Key Relationships

- **HomeScreen → her şey**: Header, 15 section, Footer, WhatsAppFAB, ScrollToTopFAB, StickyQuoteBar.
- **useTheme**: RootLayout sağlar; neredeyse tüm bileşenler tüketir. Renkler `src/theme/colors.ts`'ten.
- **constants/data.ts**: 13 section/bileşenin içerik kaynağı (SERVICES, PROJECTS, PACKAGES, NAV_LINKS, CONTACT_INFO …).
- **QuoteSection → useCostCalculator → constants/pricing.ts**: interaktif maliyet tahmini. Oranlar: işçilik %25, nakliye %8, makine %5, toprak hazırlığı 80–250 TL/m².
- **StatsSection → useScrollAnimation + useCountUp**: görünür olunca sayaç animasyonu.

## Entry Points

1. `app/_layout.tsx` — RootLayout (tema + Stack)
2. `app/index.tsx` — HomeScreen (sayfa kompozisyonu)
3. `src/constants/data.ts` — içerik değişiklikleri buradan
4. `src/constants/pricing.ts` — fiyat modeli değişiklikleri buradan

## Wiki

Bkz. `wiki/index.md`.
