# Frontend Design Skill — Peyzajet

Peyzaj mimarlığı firması web sitesi için frontend design skill'i. Expo + React Native Web (v0.85) + expo-router altyapısı.

## Proje Yapısı

```
src/
  theme/        → colors.ts, fonts.ts, spacing.ts (design tokens)
  components/   → Header, Footer, Button, Logo, SectionTitle, SectionWrapper, WhatsAppFAB, ScrollToTopFAB
  sections/     → Hero, Services, Capabilities, Process, CTABanner, Projects, BeforeAfter, FounderQuote, Packages, Stats, Testimonials, Team, Quote, Blog, Contact
  hooks/        → useTheme (light/dark mode)
  types/        → shared type definitions
  constants/    → static data
  utils/        → helpers
app/
  index.tsx     → ana sayfa (tüm section'ları sırasıyla render eder)
  _layout.tsx   → root layout
```

## Design System

### Renkler
- **Primary**: `#6FA43A` (yeşil — peyzaj teması)
- **Secondary**: `#1F3A2E` (koyu orman yeşili)
- **Accent**: `#D4B06A` (altın/toprak tonu)
- **Background**: `#F8F8F5` (sıcak beyaz)
- Dark mode desteklenir — `useTheme()` hook'u ile `colors` objesi alınır

### Tipografi
- Font: Inter (web), System (native)
- Sizes: xs(12)..hero(64)
- Weights: light(300)..extrabold(800)
- `Fonts.family`, `Fonts.sizes.xl`, `Fonts.weights.semibold` şeklinde kullan

### Spacing & Layout
- Spacing: xs(4)..section(100)
- BorderRadius: sm(6), md(12), lg(16), xl(24), full(9999)
- MaxWidth: content(1200), narrow(800), wide(1400)
- Section'lar `SectionWrapper` ile sarılır

### Button Variants
- `primary` | `secondary` | `outline` | `white`
- Sizes: `sm` | `md` | `lg`
- Hover efektleri web'de Platform.select ile

## Kurallar

1. **Her zaman `useTheme()` kullan** — hardcoded renk yazma
2. **Design token'ları kullan** — `Spacing.lg` not `24`, `Fonts.sizes.xl` not `24`
3. **Platform.OS === 'web'** kontrolü ile web-specific hover/cursor/transition ekle
4. **Responsive**: useWindowDimensions ile breakpoint kontrolü, `MaxWidth.content` ile sınırla
5. **Yeni section**: `SectionWrapper` ile sar, `SectionTitle` kullan, `src/sections/index.ts`'e export ekle
6. **Yeni component**: `src/components/index.ts`'e export ekle
7. **Animasyonlar**: react-native-reanimated kullanılabilir
8. **İkonlar**: @expo/vector-icons mevcut
9. **Gradient**: expo-linear-gradient mevcut
10. **Tutarlılık**: Mevcut section'ların yapısını takip et — benzer padding, spacing, card pattern'leri

## Tasarım Dili

Peyzajet doğa-ilhamlı, premium bir peyzaj firması. Tasarımda:
- Organik, yumuşak formlar (full border-radius butonlar, yumuşak gölgeler)
- Doğa renk paleti (yeşiller, toprak tonları, altın aksan)
- Bol beyaz alan, temiz tipografi
- Profesyonel ama sıcak ton
