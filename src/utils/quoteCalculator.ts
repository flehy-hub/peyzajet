import type { QuoteFormData } from '../types';

const BASE_PRICES: Record<string, number> = {
  'Peyzaj Tasarımı': 150,
  'Çim Uygulaması': 120,
  'Sulama Sistemi': 80,
  'Komple Bahçe': 250,
};

const GARDEN_TYPE_MULTIPLIER: Record<string, number> = {
  'Villa': 1.0,
  'Site': 0.85,
  'İş Yeri': 1.15,
  'Hobi Bahçesi': 0.75,
};

const PLANT_DENSITY_MULTIPLIER: Record<string, number> = {
  'Az': 0.8,
  'Orta': 1.0,
  'Yoğun': 1.4,
};

export function calculateQuote(data: QuoteFormData) {
  const basePrice = BASE_PRICES[data.serviceType] || 150;
  const gardenMultiplier = GARDEN_TYPE_MULTIPLIER[data.gardenType] || 1;
  const densityMultiplier = PLANT_DENSITY_MULTIPLIER[data.plantDensity] || 1;

  let total = data.area * basePrice * gardenMultiplier * densityMultiplier;

  if (data.hasLighting) total += data.area * 35;
  if (data.hasIrrigation) total += data.area * 25;

  const min = Math.round(total * 0.85);
  const avg = Math.round(total);
  const max = Math.round(total * 1.2);

  return { min, avg, max };
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('tr-TR').format(price);
}
