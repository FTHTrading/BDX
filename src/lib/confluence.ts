/** Lab / public-book math. Not the operator cockpit. */

export function obiFromBook(
  bids: [string, string][],
  asks: [string, string][],
  depth = 100,
) {
  const sum = (rows: [string, string][]) =>
    rows.slice(0, depth).reduce((s, r) => s + Number(r[1] || 0), 0);
  const b = sum(bids);
  const a = sum(asks);
  const den = b + a;
  if (!den) return { obi: 0, bid: 0, ask: 0 };
  return { obi: (b - a) / den, bid: b, ask: a };
}

export function pearson(xs: number[], ys: number[]) {
  const n = Math.min(xs.length, ys.length);
  if (n < 3) return 0;
  let sx = 0,
    sy = 0,
    sxx = 0,
    syy = 0,
    sxy = 0;
  for (let i = 0; i < n; i++) {
    sx += xs[i];
    sy += ys[i];
    sxx += xs[i] * xs[i];
    syy += ys[i] * ys[i];
    sxy += xs[i] * ys[i];
  }
  const num = n * sxy - sx * sy;
  const den = Math.sqrt((n * sxx - sx * sx) * (n * syy - sy * sy));
  return den ? num / den : 0;
}

export function confluence(p: { obi: number; vol: number; pearson: number }) {
  const obiScore = Math.max(0, Math.min(100, 50 + p.obi * 50));
  const volScore = Math.max(0, Math.min(100, 100 - p.vol * 250));
  const liqScore = Math.max(0, Math.min(100, 50 + p.pearson * 50));
  const score = 0.45 * obiScore + 0.25 * volScore + 0.3 * liqScore;
  return {
    score,
    parts: [
      { name: "OBI", w: 0.45, v: obiScore },
      { name: "Vol", w: 0.25, v: volScore },
      { name: "Pearson", w: 0.3, v: liqScore },
    ],
  };
}

/** Short LAB sample — not Fed WALCL, not a live SPI. */
export const SAMPLE_LIQ = [3.1, 3.2, 3.15, 3.4, 3.6, 3.55, 3.7, 3.9, 3.85, 4.0];
export const SAMPLE_LOG_BTC = [4.2, 4.25, 4.22, 4.4, 4.55, 4.5, 4.62, 4.78, 4.7, 4.85];
