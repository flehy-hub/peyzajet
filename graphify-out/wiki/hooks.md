# Hooks (5)

`src/hooks/`, barrel: `src/hooks/index.ts` (useCostCalculator barrel'da değil, doğrudan import edilir).

- **useTheme / ThemeContext** (`useTheme.ts:11`) — light/dark tema; Colors paletini verir. Provider: [RootLayout](RootLayout.md). Tüketici: hemen her bileşen.
- **useResponsive** (`useResponsive.ts:6`) — Dimensions tabanlı breakpoint: mobile/tablet/desktop.
- **useScrollAnimation** (`useScrollAnimation.ts:4`) — görünürlük tetikleyici (threshold 0.15), scroll animasyonları.
- **useCountUp** (`useCountUp.ts:3`) — sayı animasyonu; StatsSection'da.
- **[useCostCalculator](useCostCalculator.md)** (`useCostCalculator.ts:20`) — maliyet tahmini; QuoteSection'da.
