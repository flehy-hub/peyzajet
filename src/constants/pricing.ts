/**
 * Peyzajet Maliyet Hesaplama — Ankara Bazlı Fiyatlandırma
 * Tüm fiyatlar TL cinsinden, 2026 Ankara piyasa değerleri
 */

export interface ProjectTypeConfig {
  label: string;
  icon: string;
  multiplier: number;
}

export interface ApplicationItem {
  key: string;
  label: string;
  icon: string;
  minPerSqm?: number;
  maxPerSqm?: number;
  isFixedPrice?: boolean;
  fixedMin?: number;
  fixedMax?: number;
  /** Bitki seviyesi çarpanı yalnızca bu kalemlere uygulanır */
  affectedByPlantLevel?: boolean;
  /** Malzeme kalitesi çarpanı yalnızca sert zemin kalemlerine uygulanır */
  affectedByMaterial?: boolean;
  /** Aynı gruptan yalnızca biri seçilebilir (ör. rulo çim vs tohum ekimi) */
  exclusiveGroup?: string;
}

export interface PlantLevelConfig {
  label: string;
  icon: string;
  multiplier: number;
}

export interface MaterialQualityConfig {
  label: string;
  icon: string;
  multiplier: number;
}

export interface TerrainConfig {
  label: string;
  icon: string;
  extraPerSqm: number;
}

export interface DesignFeeRange {
  minArea: number;
  maxArea: number;
  minFee: number;
  maxFee: number;
  label: string;
}

export const CITY = 'Ankara';

export const PROJECT_TYPES: ProjectTypeConfig[] = [
  { label: 'Villa Bahçesi', icon: 'home-roof', multiplier: 1.0 },
  { label: 'Site Peyzajı', icon: 'office-building', multiplier: 0.85 },
  { label: 'Ticari Alan', icon: 'store', multiplier: 1.15 },
  { label: 'Otel Peyzajı', icon: 'bed-outline', multiplier: 1.3 },
  { label: 'Kamu Projesi', icon: 'bank', multiplier: 0.9 },
  { label: 'Hobi Bahçesi', icon: 'sprout', multiplier: 0.75 },
  { label: 'Teras Bahçesi', icon: 'flower-outline', multiplier: 1.2 },
  { label: 'Rezidans', icon: 'city-variant-outline', multiplier: 1.25 },
];

export const AREA_RANGES = [
  { label: '50 – 100 m²', min: 50, max: 100 },
  { label: '100 – 250 m²', min: 100, max: 250 },
  { label: '250 – 500 m²', min: 250, max: 500 },
  { label: '500 – 1000 m²', min: 500, max: 1000 },
  { label: '1000+ m²', min: 1000, max: 2000 },
];

export const DESIGN_FEES: DesignFeeRange[] = [
  { minArea: 50, maxArea: 100, minFee: 8_000, maxFee: 15_000, label: '50-100 m²' },
  { minArea: 100, maxArea: 250, minFee: 15_000, maxFee: 25_000, label: '100-250 m²' },
  { minArea: 250, maxArea: 500, minFee: 25_000, maxFee: 45_000, label: '250-500 m²' },
  { minArea: 500, maxArea: 1000, minFee: 45_000, maxFee: 80_000, label: '500-1000 m²' },
  { minArea: 1000, maxArea: Infinity, minFee: 80_000, maxFee: 150_000, label: '1000+ m²' },
];

export const APPLICATIONS: ApplicationItem[] = [
  { key: 'lawn_roll', label: 'Rulo Çim (serim dahil)', icon: 'grass', minPerSqm: 350, maxPerSqm: 650, exclusiveGroup: 'lawn' },
  { key: 'lawn_seed', label: 'Çim Ekimi (tohum)', icon: 'seed-outline', minPerSqm: 100, maxPerSqm: 250, exclusiveGroup: 'lawn' },
  { key: 'irrigation', label: 'Otomatik Sulama', icon: 'water-outline', minPerSqm: 120, maxPerSqm: 450 },
  { key: 'lighting', label: 'Aydınlatma', icon: 'lightbulb-outline', minPerSqm: 150, maxPerSqm: 900 },
  { key: 'planting', label: 'Bitkilendirme', icon: 'tree-outline', minPerSqm: 250, maxPerSqm: 2000, affectedByPlantLevel: true },
  { key: 'walkway', label: 'Yürüyüş Yolu', icon: 'walk', minPerSqm: 300, maxPerSqm: 1200, affectedByMaterial: true },
  { key: 'stone', label: 'Doğal Taş', icon: 'diamond-stone', minPerSqm: 450, maxPerSqm: 2500, affectedByMaterial: true },
  { key: 'deck', label: 'Ahşap Deck', icon: 'dock-window', minPerSqm: 1200, maxPerSqm: 4500, affectedByMaterial: true },
  { key: 'pergola', label: 'Pergola', icon: 'warehouse', isFixedPrice: true, fixedMin: 35_000, fixedMax: 250_000, affectedByMaterial: true },
  { key: 'gazebo', label: 'Kamelya', icon: 'home-variant-outline', isFixedPrice: true, fixedMin: 25_000, fixedMax: 180_000, affectedByMaterial: true },
  { key: 'pool', label: 'Süs Havuzu', icon: 'pool', isFixedPrice: true, fixedMin: 40_000, fixedMax: 500_000, affectedByMaterial: true },
  { key: 'firepit', label: 'Ateş Çukuru', icon: 'fire', isFixedPrice: true, fixedMin: 8_000, fixedMax: 45_000, affectedByMaterial: true },
  { key: 'playground', label: 'Çocuk Oyun Alanı', icon: 'human-child', isFixedPrice: true, fixedMin: 15_000, fixedMax: 120_000, affectedByMaterial: true },
  { key: 'veggie', label: 'Sebze Bahçesi', icon: 'carrot', minPerSqm: 200, maxPerSqm: 600 },
];

export const PLANT_LEVELS: PlantLevelConfig[] = [
  { label: 'Ekonomik', icon: 'sprout-outline', multiplier: 1.0 },
  { label: 'Standart', icon: 'leaf', multiplier: 1.35 },
  { label: 'Premium', icon: 'tree-outline', multiplier: 1.75 },
  { label: 'Ultra Premium', icon: 'star-outline', multiplier: 2.5 },
];

export const MATERIAL_QUALITIES: MaterialQualityConfig[] = [
  { label: 'Ekonomik', icon: 'cube-outline', multiplier: 1.0 },
  { label: 'Orta Segment', icon: 'cube', multiplier: 1.25 },
  { label: 'Premium', icon: 'diamond-stone', multiplier: 1.6 },
  { label: 'Lüks', icon: 'crown-outline', multiplier: 2.2 },
];

export const TERRAIN_TYPES: TerrainConfig[] = [
  { label: 'Düz Arazi', icon: 'minus', extraPerSqm: 0 },
  { label: 'Hafif Eğimli', icon: 'slope-uphill', extraPerSqm: 40 },
  { label: 'Eğimli', icon: 'triangle-outline', extraPerSqm: 80 },
  { label: 'Zor Arazi', icon: 'alert-outline', extraPerSqm: 150 },
];

export const SOIL_PREP_COST = { min: 80, max: 250 }; // TL/m²

// m² birim fiyatları uygulama (işçilik+montaj) dahil piyasa fiyatlarıdır;
// üzerine yalnızca genel gider/lojistik payı eklenir.
export const OVERHEAD_RATE = 0.12; // genel giderler & lojistik
export const VAT_RATE = 0.2; // KDV %20 (peyzaj hizmetleri genel orana tabi, 2026)
