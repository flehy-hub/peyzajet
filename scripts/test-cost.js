// Maliyet hesaplama mantığı için hızlı senaryo testleri. Çalıştırma:
//   npx tsc src/constants/pricing.ts --ignoreConfig --outDir /tmp/pj --module commonjs --target es2020 --skipLibCheck
//   node scripts/test-cost.js
const P = require('/tmp/pj/pricing.js');

function calc(area, apps, projMult, plantMult, matMult, terrainExtra, design) {
  const hasArea = apps.some((k) => {
    const d = P.APPLICATIONS.find((a) => a.key === k);
    return d && !d.isFixedPrice;
  });
  const soil = hasArea
    ? { min: area * (P.SOIL_PREP_COST.min + terrainExtra), max: area * (P.SOIL_PREP_COST.max + terrainExtra) }
    : { min: 0, max: 0 };
  let amin = 0, amax = 0;
  for (const k of apps) {
    const d = P.APPLICATIONS.find((a) => a.key === k);
    if (!d) continue;
    let m = projMult;
    if (d.affectedByPlantLevel) m *= plantMult;
    if (d.affectedByMaterial) m *= matMult;
    if (d.isFixedPrice) { amin += Math.round(d.fixedMin * m); amax += Math.round(d.fixedMax * m); }
    else { amin += Math.round(area * d.minPerSqm * m); amax += Math.round(area * d.maxPerSqm * m); }
  }
  const mmin = soil.min + amin, mmax = soil.max + amax;
  const ov = { min: Math.round(mmin * P.OVERHEAD_RATE), max: Math.round(mmax * P.OVERHEAD_RATE) };
  const st = { min: mmin + ov.min + design.min, max: mmax + ov.max + design.max };
  const vat = { min: Math.round(st.min * P.VAT_RATE), max: Math.round(st.max * P.VAT_RATE) };
  return { soil, ov, st, vat, total: { min: st.min + vat.min, max: st.max + vat.max } };
}

let r = calc(200, ['lawn_roll', 'irrigation', 'planting'], 1, 1.35, 1.25, 0, { min: 15000, max: 25000 });
console.log('S1 200m2 villa toplam (KDV dahil):', r.total, 'KDV:', r.vat);

r = calc(200, ['pergola'], 1, 2.5, 1.0, 150, { min: 0, max: 0 });
console.log('S2 sadece pergola — toprak hazırlığı 0 olmalı:', r.soil, 'toplam:', r.total);

const a = calc(100, ['pergola'], 1, 1.0, 1.0, 0, { min: 0, max: 0 }).total;
const b = calc(100, ['pergola'], 1, 2.5, 1.0, 0, { min: 0, max: 0 }).total;
console.log('S3 bitki seviyesi pergolayı etkilemiyor mu:', a.min === b.min && a.max === b.max);

const c = calc(100, ['planting'], 1, 1.0, 1.0, 0, { min: 0, max: 0 }).total;
const d = calc(100, ['planting'], 1, 1.0, 2.2, 0, { min: 0, max: 0 }).total;
console.log('S4 malzeme kalitesi bitkilendirmeyi etkilemiyor mu:', c.min === d.min && c.max === d.max);

const s5 = calc(300, ['lawn_seed'], 1, 1, 1, 0, { min: 0, max: 0 });
console.log('S5 KDV oranı %20 mi:', Math.abs(s5.vat.min / s5.st.min - 0.2) < 0.001);
console.log('S5 300m2 çim ekimi toplam:', s5.total);

const roll = calc(300, ['lawn_roll'], 1, 1, 1, 0, { min: 0, max: 0 }).total;
console.log('S6 rulo çim > tohum ekimi mi:', roll.min > s5.total.min && roll.max > s5.total.max, roll);
