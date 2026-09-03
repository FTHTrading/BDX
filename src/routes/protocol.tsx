import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/shell";
import { GlassCard } from "@/components/glass-card";
import { StatusChip } from "@/components/status";
import { CHAINS, CONTRACTS, PROTOCOL, RAILS, SKUS } from "@/lib/rails";

export const Route = createFileRoute("/protocol")({ component: Protocol });

function Protocol() {
  return (
    <Shell>
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gold">
        Infrastructure
      </p>
      <h1 className="mt-2 font-display text-4xl md:text-5xl">Counterparties and rails.</h1>
      <p className="mt-3 max-w-xl text-mute">
        Named custody, cash, mint, and cross-chain facilities. Status chips
        indicate connectivity. None of the sessions below are open from this console.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          to="/desk"
          className="inline-flex min-h-11 items-center rounded-full bg-linear-to-b from-[#f3e2b3] to-gold px-5 text-sm font-semibold text-[#2a1c04]"
        >
          Open desk
        </Link>
        <Link
          to="/ops"
          className="inline-flex min-h-11 items-center rounded-full border border-line bg-white/80 px-5 text-sm font-semibold"
        >
          Back office
        </Link>
      </div>

      <h2 className="mt-12 font-display text-3xl">Rails</h2>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {RAILS.map((r) => (
          <GlassCard key={r.name}>
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold">{r.name}</h3>
              <StatusChip code={r.status} />
            </div>
            <p className="mt-1 text-sm">{r.role}</p>
            <p className="mt-1 text-xs text-mute">{r.note}</p>
          </GlassCard>
        ))}
      </div>

      <h2 className="mt-12 font-display text-3xl">Chains</h2>
      <div className="mt-4 overflow-x-auto glass rounded-2xl">
        <table className="w-full min-w-[520px] text-left text-sm">
          <thead className="text-[11px] uppercase tracking-wider text-mute">
            <tr>
              {["Chain", "Id", "Status", "Note"].map((h) => (
                <th key={h} className="px-4 py-3 font-medium">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {CHAINS.map((c) => (
              <tr key={c.name} className="border-t border-line/70">
                <td className="px-4 py-3 font-medium">{c.name}</td>
                <td className="px-4 py-3 font-mono text-xs">{c.id}</td>
                <td className="px-4 py-3">
                  <StatusChip code={c.status} />
                </td>
                <td className="px-4 py-3 text-mute">{c.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="mt-12 font-display text-3xl">Operator map</h2>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {PROTOCOL.map((p) => (
          <GlassCard key={p.url}>
            <h3 className="font-semibold">{p.name}</h3>
            <p className="mt-1 text-sm text-mute">{p.role}</p>
            <a
              href={p.url}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-block break-all text-xs font-semibold text-ember"
            >
              {p.url.replace("https://", "")}
            </a>
          </GlassCard>
        ))}
      </div>

      <h2 className="mt-12 font-display text-3xl">Contract families</h2>
      <p className="mt-1 text-sm text-mute">
        smart-contract-builder. Scaffold — not audited, not a legal opinion.
      </p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {CONTRACTS.map((c) => (
          <GlassCard key={c.family}>
            <h3 className="font-semibold">{c.family}</h3>
            <p className="mt-1 text-xs text-mute">{c.note}</p>
          </GlassCard>
        ))}
      </div>

      <h2 className="mt-12 font-display text-3xl">White-label modules</h2>
      <p className="mt-1 text-sm text-mute">Evaluation packages. Not an offer from this page.</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {SKUS.map((s) => (
          <GlassCard key={s.n}>
            <div className="text-[10px] font-semibold tracking-wider text-ok">{s.n}</div>
            <h3 className="mt-1 font-semibold">{s.name}</h3>
            <p className="text-xs text-mute">{s.for}</p>
          </GlassCard>
        ))}
      </div>
    </Shell>
  );
}
