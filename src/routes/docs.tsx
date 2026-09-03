import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/shell";
import { GlassCard } from "@/components/glass-card";
import { StatusChip } from "@/components/status";

export const Route = createFileRoute("/docs")({ component: Docs });

const LAYERS = [
  {
    name: "Macro liquidity / Pearson",
    chip: "LAB" as const,
    copy: "WALCL − TGA − RRP vs log10(BTC). Formula lives here. Fed series is not wired. Sample series only.",
  },
  {
    name: "Order book imbalance",
    chip: "REF" as const,
    copy: "Public Coinbase L2 (top 100). OBI = (bids − asks) / (bids + asks). Not Binance. Not a private feed.",
  },
  {
    name: "Confluence score",
    chip: "LAB" as const,
    copy: "Weighted 0–100 from OBI, vol, Pearson. Attribution shown. Not the operator SPI database.",
  },
  {
    name: "Execution trigger",
    chip: "HOLD" as const,
    copy: "Operator route /api/ops/execution-trigger is not attached. This console refuses the fire.",
  },
  {
    name: "Agent dispatch",
    chip: "HOLD" as const,
    copy: "Model relay is not connected to this console.",
  },
  {
    name: "BitGo Express / Paxos",
    chip: "HOLD" as const,
    copy: "Named rails. Express is a daemon the client hosts. Keys never in UnyKorn.",
  },
];

function Docs() {
  return (
    <Shell>
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gold">
        System map
      </p>
      <h1 className="mt-2 font-display text-4xl md:text-5xl">Connectivity and scope.</h1>
      <p className="mt-3 max-w-xl text-mute">
        Predictive telemetry and execution sit on a separate operator process.
        This console sizes series and names counterparties. It does not attach
        that process.
      </p>
      <div className="mt-8 grid gap-3 md:grid-cols-2">
        {LAYERS.map((l) => (
          <GlassCard key={l.name}>
            <div className="flex items-start justify-between gap-2">
              <h2 className="font-semibold">{l.name}</h2>
              <StatusChip code={l.chip} />
            </div>
            <p className="mt-2 text-sm leading-relaxed text-mute">{l.copy}</p>
          </GlassCard>
        ))}
      </div>
    </Shell>
  );
}
