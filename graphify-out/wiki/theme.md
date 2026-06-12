# theme

`src/theme/`, barrel: `src/theme/index.ts`.

- **Colors** (`colors.ts`) — light/dark paletleri; [useTheme](hooks.md) üzerinden tüketilir, hardcoded renk kullanılmaz.
- **Fonts** (`fonts.ts`) — Platform'a göre font ailesi; sizes xs..hero, weights light..extrabold.
- **Spacing / BorderRadius / MaxWidth** (`spacing.ts`) — spacing token'ları, radius (sm..full), max-width (narrow 800 / content 1200 / wide 1400).

Kural (frontend-design skill): her zaman token kullan — `Spacing.lg`, `Fonts.sizes.xl`; sayı hardcode etme.
