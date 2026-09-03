import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Line, LineChart, ResponsiveContainer, YAxis } from "recharts";
import { Shell } from "@/components/shell";
import { Tape } from "@/components/tape";
import { StatusChip, StatusLegend } from "@/components/status";
import { blackScholes, gbmPaths } from "@/lib/quant";
import { confluence, obiFromBook, pearson, SAMPLE_LIQ, SAMPLE_LOG_BTC } from "@/lib/confluence";
import { num, usd } from "@/lib/utils";

export const Route = createFileRoute("/desk")({ component: Desk });

const ROWS = [
  { t: "REF" as const, ticket: "UYK-REF-BTC", side: "REF", asset: "BTC", size: "1.00", mark: "spot" },
  { t: "REF" as const, ticket: "UYK-REF-PAXG", side: "REF", asset: "PAXG", size: "1 oz", mark: "spot" },
  { t: "REF" as const, ticket: "UYK-OBI-BTC", side: "REF", asset: "Coinbase L2 OBI", size: "top 100", mark: "public" },
  { t: "LAB" as const, ticket: "UYK-TBILL-25M", side: "SIZE", asset: "T-bill sleeve", size: "$25,000,000", mark: "4.60%" },
  { t: "LAB" as const, ticket: "UYK-PAXG-200", side: "SIZE", asset: "PAXG collat", size: "200 oz", mark: "attest" },
  { t: "HOLD" as const, ticket: "UYK-MINT", side: "HOLD", asset: "Series mint", size: "—", mark: "launch rail" },
  { t: "RAIL" as const, ticket: "UYK-PAXOS", side: "RAIL", asset: "PYUSD / PAXG", size: "named", mark: "no session" },
  { t: "HOLD" as const, ticket: "UYK-EXPRESS", side: "HOLD", asset: "BitGo Express", size: "daemon", mark: "not attached" },
  { t: "HOLD" as const, ticket: "UYK-CCT", side: "HOLD", asset: "CCIP BurnMint", size: "pool", mark: "unsigned" },
  { t: "HOLD" as const, ticket: "UYK-COCKPIT", side: "HOLD", asset: "Execution trigger", size: "SPI", mark: "not attached" },
];

function Desk() {
  const [spot, setSpot] = useState(4397);
  const [strike, setStrike] = useState(4400);
  const [t, setT] = useState(0.25);
  const [vol, setVol] = useState(0.18);
  const [rate, setRate] = useState(0.042);
  const [div, setDiv] = useState(0);
  const bs = useMemo(
    () => blackScholes({ spot, strike, t, vol, rate, div }),
    [spot, strike, t, vol, rate, div],
  );

  const [s0, setS0] = useState(4397);
  const [mu, setMu] = useState(0.04);
  const [sig, setSig] = useState(0.16);
  const [days, setDays] = useState(63);
  const [nPaths, setNPaths] = useState(40);
  const paths = useMemo(
    () => gbmPaths({ s0, mu, sigma: sig, days, nPaths, seed: 33 }),
    [s0, mu, sig, days, nPaths],
  );
  const chart = useMemo(() => {
    const rows: Record<string, number>[] = [];
    const show = Math.min(8, paths.paths.length);
    for (let i = 0; i <= days; i++) {
      const row: Record<string, number> = { i };
      for (let p = 0; p < show; p++) row[`p${p}`] = paths.paths[p][i];
      rows.push(row);
    }
    return { rows, show };
  }, [paths, days]);

  const [obi, setObi] = useState(0);
  useEffect(() => {
    fetch("https://api.exchange.coinbase.com/products/BTC-USD/book?level=2")
      .then((r) => r.json())
      .then((d) => {
        if (d?.bids) setObi(obiFromBook(d.bids, d.asks).obi);
      })
      .catch(() => setObi(0));
  }, []);
  const r = pearson(SAMPLE_LIQ, SAMPLE_LOG_BTC);
  const conf = confluence({ obi, vol: sig, pearson: r });
  const [fired, setFired] = useState("");

  return (
    <Shell>
      <Tape />
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gold">
        Desk · structuring
      </p>
      <h1 className="mt-2 font-display text-4xl md:text-5xl">
        Structure size. Stress. Handoff off-system.
      </h1>
      <p className="mt-3 max-w-xl text-mute">
        Internal size only. Public marks are venue references, not fills.
        Minting and execution remain with the issuer’s appointed rails.
      </p>

      <div className="mt-6">
        <StatusLegend />
      </div>

      <div className="mt-8 overflow-x-auto glass rounded-2xl">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="text-[11px] uppercase tracking-wider text-mute">
            <tr>
              {["Status", "Ticket", "Side", "Asset", "Size", "Mark"].map((h) => (
                <th key={h} className="px-4 py-3 font-medium">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row) => (
              <tr key={row.ticket} className="border-t border-line/70">
                <td className="px-4 py-3">
                  <StatusChip code={row.t} />
                </td>
                <td className="px-4 py-3 font-mono text-xs">{row.ticket}</td>
                <td className="px-4 py-3">{row.side}</td>
                <td className="px-4 py-3">{row.asset}</td>
                <td className="px-4 py-3 font-mono">{row.size}</td>
                <td className="px-4 py-3 font-mono">{row.mark}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <section className="glass rounded-2xl p-5">
          <h2 className="font-display text-2xl">Black–Scholes · structure size</h2>
          <p className="mb-3 text-xs text-mute">European. Used to size a series — not to quote a book.</p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <Field label="Spot" value={spot} onChange={setSpot} />
            <Field label="Strike" value={strike} onChange={setStrike} />
            <Field label="T years" value={t} onChange={setT} step={0.01} />
            <Field label="Vol" value={vol} onChange={setVol} step={0.01} />
            <Field label="Rate" value={rate} onChange={setRate} step={0.001} />
            <Field label="Div" value={div} onChange={setDiv} step={0.001} />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
            <Kpi k="Call" v={usd(bs.call)} />
            <Kpi k="Put" v={usd(bs.put)} />
            <Kpi k="Δ" v={num(bs.delta, 4)} />
            <Kpi k="ν" v={num(bs.vega, 4)} />
          </div>
        </section>

        <section className="glass rounded-2xl p-5">
          <h2 className="font-display text-2xl">GBM paths</h2>
          <p className="mb-3 text-xs text-mute">Tails for issuance cap. Not a P&L forecast.</p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <Field label="S0" value={s0} onChange={setS0} />
            <Field label="μ" value={mu} onChange={setMu} step={0.01} />
            <Field label="σ" value={sig} onChange={setSig} step={0.01} />
            <Field label="Days" value={days} onChange={setDays} step={1} />
            <Field label="Paths" value={nPaths} onChange={setNPaths} step={1} />
          </div>
          <div className="mt-3 h-40">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chart.rows}>
                <YAxis hide domain={["auto", "auto"]} />
                {Array.from({ length: chart.show }).map((_, i) => (
                  <Line
                    key={i}
                    dataKey={`p${i}`}
                    stroke="#b8892d"
                    strokeOpacity={0.35 + (i % 3) * 0.15}
                    dot={false}
                    isAnimationActive={false}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 grid grid-cols-3 gap-2">
            <Kpi k="5th" v={usd(paths.p05, 0)} />
            <Kpi k="Median" v={usd(paths.p50, 0)} />
            <Kpi k="95th" v={usd(paths.p95, 0)} />
          </div>
        </section>
      </div>

      <section className="mt-8 glass rounded-2xl p-5">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="font-display text-2xl">Confluence</h2>
          <StatusChip code="LAB" />
          <StatusChip code="REF" />
        </div>
        <p className="mt-1 text-xs text-mute">
          Book imbalance from Coinbase public depth. Pearson uses an internal
          sample series, not a Federal Reserve feed. Execution remains disconnected.
        </p>
        <div className="mt-4 grid gap-2 sm:grid-cols-4">
          <Kpi k="OBI" v={num(obi, 3)} />
          <Kpi k="Pearson" v={num(r, 3)} />
          <Kpi k="Score" v={num(conf.score, 1)} />
          <Kpi k="Fire" v="HOLD" />
        </div>
        <ul className="mt-3 text-sm text-mute">
          {conf.parts.map((p) => (
            <li key={p.name}>
              {p.name} × {p.w} → {num(p.v, 1)}
            </li>
          ))}
        </ul>
        <button
          type="button"
          className="mt-4 min-h-11 rounded-full border border-line bg-white px-5 text-sm font-semibold"
          onClick={() =>
            setFired("Declined. Execution systems are not connected to this console.")
          }
        >
          Transmit instruction
        </button>
        {fired ? <p className="mt-2 font-mono text-xs text-ember">{fired}</p> : null}
      </section>
    </Shell>
  );
}

function Field({
  label,
  value,
  onChange,
  step = 1,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
  step?: number;
}) {
  return (
    <label className="block text-[11px] font-semibold uppercase tracking-wider text-mute">
      {label}
      <input
        type="number"
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-1 w-full rounded-xl border border-line bg-white/80 px-3 py-2 font-mono text-sm text-ink"
      />
    </label>
  );
}

function Kpi({ k, v }: { k: string; v: string }) {
  return (
    <div className="rounded-xl border border-line bg-white px-3 py-2">
      <div className="text-[10px] font-semibold uppercase tracking-wider text-mute">{k}</div>
      <div className="font-mono text-lg tabular-nums">{v}</div>
    </div>
  );
}
