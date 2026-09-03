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
