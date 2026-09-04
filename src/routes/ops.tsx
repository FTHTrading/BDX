import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Shell } from "@/components/shell";
import { GlassCard } from "@/components/glass-card";
import { StatusChip } from "@/components/status";
import { RAILS } from "@/lib/rails";
import { CONDITIONS, possessionGate, sha256Hex } from "@/lib/possession";

export const Route = createFileRoute("/ops")({ component: Ops });

function Ops() {
  const [flags, setFlags] = useState<Record<string, boolean>>(
    Object.fromEntries(CONDITIONS.map((c) => [c.id, false])),
  );
  const gate = useMemo(() => possessionGate(flags), [flags]);
  const [chain, setChain] = useState<{ n: number; hash: string; note: string }[]>([]);

  async function appendReceipt() {
    const prev = chain.at(-1)?.hash ?? "0".repeat(64);
    const note = `ops:${new Date().toISOString()}:gate=${gate.assert ? "pass" : "refuse"}`;
    const hash = await sha256Hex(`${prev}|${note}`);
    setChain((c) => [...c, { n: c.length + 1, hash, note }].slice(-6));
  }

  return (
    <Shell>
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gold">
        Operations · custody
      </p>
      <h1 className="mt-2 font-display text-4xl md:text-5xl">
        Custody rails. No keys on this console.
      </h1>
      <p className="mt-3 max-w-xl text-mute">
        the custodian Express is hosted by the client. cash rails cash and gold remain in the
        client’s name. This page does not query wallets, sign, or transmit.
      </p>

      <div className="mt-8 grid gap-3 md:grid-cols-2">
        {RAILS.map((r) => (
          <GlassCard key={r.name}>
            <div className="flex items-start justify-between gap-2">
              <h2 className="text-lg font-semibold">{r.name}</h2>
              <StatusChip code={r.status} />
            </div>
            <p className="mt-2 text-sm leading-relaxed">{r.role}</p>
            <p className="mt-1 text-xs text-mute">{r.note}</p>
            <a
              href={r.docs}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-block text-xs font-semibold uppercase tracking-wider text-ember"
            >
              Official docs
            </a>
          </GlassCard>
        ))}
      </div>

      <section className="mt-10">
        <h2 className="font-display text-3xl">Possession gate</h2>
        <p className="mt-1 max-w-xl text-sm text-mute">
          Five conditions from the BD-New evidence engine. Unchecked = refuse.
          Checking a box here is a lab toggle, not a filing.
        </p>
        <div className="mt-4 grid gap-2">
          {CONDITIONS.map((c) => (
            <label key={c.id} className="glass flex min-h-11 cursor-pointer items-start gap-3 rounded-2xl p-4">
              <input
                type="checkbox"
                className="mt-1 size-4"
                checked={!!flags[c.id]}
                onChange={(e) => setFlags((f) => ({ ...f, [c.id]: e.target.checked }))}
              />
              <span>
                <span className="block font-medium">{c.title}</span>
                <span className="text-xs text-mute">{c.detail}</span>
              </span>
            </label>
          ))}
        </div>
        <div className="mt-4 glass rounded-2xl p-4">
          <StatusChip code={gate.assert ? "LAB" : "HOLD"} />
          <p className="mt-2 font-mono text-sm">{gate.reason}</p>
          <button
            type="button"
            onClick={appendReceipt}
            className="mt-3 min-h-11 rounded-full border border-line bg-white px-4 text-sm font-semibold"
          >
            Append hash-chained receipt
          </button>
          <ul className="mt-3 space-y-1 font-mono text-[11px] break-all text-mute">
            {chain.map((r) => (
              <li key={r.n}>
                #{r.n} {r.hash}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </Shell>
  );
}
