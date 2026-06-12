import { useMemo } from 'react';
import type { CostFormData, CostBreakdown, ProjectMeta } from '../types';
import {
  PROJECT_TYPES,
  DESIGN_FEES,
  APPLICATIONS,
  PLANT_LEVELS,
  MATERIAL_QUALITIES,
  TERRAIN_TYPES,
  SOIL_PREP_COST,
  OVERHEAD_RATE,
  VAT_RATE,
} from '../constants/pricing';

export function useCostCalculator(form: CostFormData) {
  const breakdown = useMemo<CostBreakdown>(() => {
    const area = form.area;
    const projectType = PROJECT_TYPES.find((p) => p.label === form.projectType);
    const projectMultiplier = projectType?.multiplier ?? 1;
    const plantLevel = PLANT_LEVELS.find((p) => p.label === form.plantLevel);
    const plantMultiplier = plantLevel?.multiplier ?? 1;
    const matQuality = MATERIAL_QUALITIES.find((m) => m.label === form.materialQuality);
    const matMultiplier = matQuality?.multiplier ?? 1;
    const terrain = TERRAIN_TYPES.find((t) => t.label === form.terrain);
    const terrainExtra = terrain?.extraPerSqm ?? 0;

    // Toprak hazırlığı yalnızca alan bazlı (m²) bir uygulama seçiliyse gerekir
    const hasAreaBasedApp = form.applications.some((key) => {
      const def = APPLICATIONS.find((a) => a.key === key);
      return def != null && !def.isFixedPrice;
    });
    const soilPrep = hasAreaBasedApp
      ? {
          min: Math.round(area * (SOIL_PREP_COST.min + terrainExtra)),
          max: Math.round(area * (SOIL_PREP_COST.max + terrainExtra)),
        }
      : { min: 0, max: 0 };

    // Design fee
    let designFee = { min: 0, max: 0 };
    if (form.includeDesign) {
      const range = DESIGN_FEES.find((d) => area >= d.minArea && area < d.maxArea)
        || DESIGN_FEES[DESIGN_FEES.length - 1];
      designFee = { min: range.minFee, max: range.maxFee };
    }

    // Application costs
    const applicationCosts: Record<string, { min: number; max: number }> = {};
    let appTotalMin = 0;
    let appTotalMax = 0;

    for (const appKey of form.applications) {
      const appDef = APPLICATIONS.find((a) => a.key === appKey);
      if (!appDef) continue;

      // Çarpanlar kaleme göre: bitki seviyesi sadece bitkilendirmeyi,
      // malzeme kalitesi sadece sert zemin/yapı kalemlerini etkiler.
      let multiplier = projectMultiplier;
      if (appDef.affectedByPlantLevel) multiplier *= plantMultiplier;
      if (appDef.affectedByMaterial) multiplier *= matMultiplier;

      let min: number;
      let max: number;

      if (appDef.isFixedPrice) {
        min = Math.round((appDef.fixedMin ?? 0) * multiplier);
        max = Math.round((appDef.fixedMax ?? 0) * multiplier);
      } else {
        min = Math.round(area * (appDef.minPerSqm ?? 0) * multiplier);
        max = Math.round(area * (appDef.maxPerSqm ?? 0) * multiplier);
      }

      applicationCosts[appKey] = { min, max };
      appTotalMin += min;
      appTotalMax += max;
    }

    const materialMin = soilPrep.min + appTotalMin;
    const materialMax = soilPrep.max + appTotalMax;
    const materialTotal = { min: materialMin, max: materialMax };

    const overhead = {
      min: Math.round(materialMin * OVERHEAD_RATE),
      max: Math.round(materialMax * OVERHEAD_RATE),
    };

    const subtotal = {
      min: materialMin + overhead.min + designFee.min,
      max: materialMax + overhead.max + designFee.max,
    };

    const vat = {
      min: Math.round(subtotal.min * VAT_RATE),
      max: Math.round(subtotal.max * VAT_RATE),
    };

    return {
      soilPrep,
      designFee,
      applicationCosts,
      materialTotal,
      overhead,
      subtotal,
      vat,
      grandTotal: { min: subtotal.min + vat.min, max: subtotal.max + vat.max },
    };
  }, [form]);

  const meta = useMemo<ProjectMeta>(() => {
    const area = form.area;
    const appCount = form.applications.length;

    const baseDays = Math.ceil(area / 50) + appCount * 3;
    const weeks = Math.max(1, Math.ceil(baseDays / 7));
    const estimatedDuration = weeks <= 4 ? `${weeks} Hafta` : `${Math.ceil(weeks / 4)} Ay`;

    const teamSize = area < 200 ? '3–5 Kişi' : area < 500 ? '5–8 Kişi' : area < 1000 ? '8–12 Kişi' : '12+ Kişi';

    const hasIrrigation = form.applications.includes('irrigation');
    const irrigationZones = hasIrrigation ? `${Math.max(2, Math.ceil(area / 80))} Bölge` : 'Yok';

    const avgTotal = (breakdown.grandTotal.min + breakdown.grandTotal.max) / 2;
    const yearlyMaintenance = `₺${formatCompact(Math.round(avgTotal * 0.08))}/yıl`;

    const diffScore = getDifficultyScore(form);
    const difficulty = diffScore < 3 ? 'Kolay' : diffScore < 5 ? 'Orta' : diffScore < 7 ? 'Zor' : 'Çok Zor';

    return { estimatedDuration, teamSize, irrigationZones, yearlyMaintenance, difficulty };
  }, [form, breakdown]);

  return { breakdown, meta };
}

function getDifficultyScore(form: CostFormData): number {
  let score = 0;
  if (form.area > 500) score += 2;
  else if (form.area > 200) score += 1;

  const terrain = TERRAIN_TYPES.find((t) => t.label === form.terrain);
  if (terrain) score += TERRAIN_TYPES.indexOf(terrain);

  score += Math.min(form.applications.length, 4);

  const matQuality = MATERIAL_QUALITIES.find((m) => m.label === form.materialQuality);
  if (matQuality) score += MATERIAL_QUALITIES.indexOf(matQuality);

  return score;
}

function formatCompact(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${Math.round(n / 1_000)}K`;
  return String(n);
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('tr-TR').format(price);
}
