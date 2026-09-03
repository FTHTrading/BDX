/** Lab math only. Not a quote. */

export function erf(x: number) {
  const sign = x < 0 ? -1 : 1;
  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const p = 0.3275911;
  const t = 1 / (1 + p * Math.abs(x));
  const y =
    1 -
    ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
  return sign * y;
}

export function nCdf(x: number) {
  return 0.5 * (1 + erf(x / Math.SQRT2));
}

export function nPdf(x: number) {
  return Math.exp(-0.5 * x * x) / Math.sqrt(2 * Math.PI);
}

export function blackScholes(p: {
  spot: number;
  strike: number;
  t: number;
  vol: number;
  rate: number;
  div: number;
}) {
  const { spot: S, strike: K, t, vol: sig, rate: r, div: q } = p;
  if (t <= 0 || sig <= 0 || S <= 0 || K <= 0) {
    return { call: 0, put: 0, delta: 0, vega: 0, d1: 0, d2: 0 };
  }
  const d1 =
    (Math.log(S / K) + (r - q + 0.5 * sig * sig) * t) / (sig * Math.sqrt(t));
  const d2 = d1 - sig * Math.sqrt(t);
  const df = Math.exp(-r * t);
  const dq = Math.exp(-q * t);
  const call = S * dq * nCdf(d1) - K * df * nCdf(d2);
  const put = K * df * nCdf(-d2) - S * dq * nCdf(-d1);
  const delta = dq * nCdf(d1);
  const vega = (S * dq * nPdf(d1) * Math.sqrt(t)) / 100;
  return { call, put, delta, vega, d1, d2 };
}

function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function gauss(rng: () => number) {
  const u = Math.max(1e-12, rng());
  const v = rng();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

export function gbmPaths(p: {
  s0: number;
  mu: number;
  sigma: number;
  days: number;
  nPaths: number;
  seed: number;
}) {
  const rng = mulberry32(p.seed || 1);
  const dt = 1 / 252;
  const paths: number[][] = [];
  const last: number[] = [];
  for (let i = 0; i < p.nPaths; i++) {
    const row = [p.s0];
    let s = p.s0;
    for (let d = 0; d < p.days; d++) {
      s =
        s *
        Math.exp(
          (p.mu - 0.5 * p.sigma * p.sigma) * dt + p.sigma * Math.sqrt(dt) * gauss(rng),
        );
      row.push(s);
    }
    paths.push(row);
    last.push(s);
  }
  last.sort((a, b) => a - b);
  const pct = (q: number) => last[Math.min(last.length - 1, Math.floor(q * last.length))];
  return { paths, p05: pct(0.05), p50: pct(0.5), p95: pct(0.95) };
}

export function tBillLift(p: {
  notional: number;
  cashPct: number;
  billPct: number;
  adminBps: number;
  days: number;
  haircutPct: number;
}) {
  const t = p.days / 365;
  const cashCarry = p.notional * (p.cashPct / 100) * t;
  const billNet =
    p.notional *
    (1 - p.haircutPct / 100) *
    (p.billPct / 100 - p.adminBps / 10000) *
    t;
  return { cashCarry, billNet, lift: billNet - cashCarry };
}

export function waterfall(p: {
  auc: number;
  stackBps: number;
  ourTakeBps: number;
  lpCapital: number;
  endNav: number;
  prefPct: number;
}) {
  const stack = (p.auc * p.stackBps) / 10000;
  const ourTake = (p.auc * p.ourTakeBps) / 10000;
  const pref = p.lpCapital * (p.prefPct / 100);
  const gain = Math.max(0, p.endNav - p.lpCapital);
  const lpPref = Math.min(gain, pref);
  const residual = Math.max(0, gain - pref);
  const gpCatch = residual * 0.2;
  const lpResidual = residual * 0.8;
  return {
    stack,
    ourTake,
    lpPref,
    lpResidual,
    gpCatch,
    lpTotal: p.lpCapital + lpPref + lpResidual,
  };
}
