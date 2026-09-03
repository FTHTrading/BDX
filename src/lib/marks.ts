export type Marks = {
  BTC: number | null;
  ETH: number | null;
  SOL: number | null;
  PAXG: number | null;
  asOf: string;
  ok: boolean;
};

const IDS = [
  ["BTC", "BTC-USD"],
  ["ETH", "ETH-USD"],
  ["SOL", "SOL-USD"],
  ["PAXG", "PAXG-USD"],
] as const;

export async function fetchMarks(): Promise<Marks> {
  const out: Marks = {
    BTC: null,
    ETH: null,
    SOL: null,
    PAXG: null,
    asOf: new Date().toISOString(),
    ok: false,
  };
  try {
    await Promise.all(
      IDS.map(async ([k, pair]) => {
        const r = await fetch(`https://api.coinbase.com/v2/prices/${pair}/spot`);
        if (!r.ok) return;
        const j = (await r.json()) as { data?: { amount?: string } };
        const n = Number(j.data?.amount);
        if (Number.isFinite(n)) out[k] = n;
      }),
    );
    out.ok = [out.BTC, out.ETH, out.SOL, out.PAXG].some((v) => v != null);
  } catch {
    out.ok = false;
  }
  return out;
}
