import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Shell } from "@/components/shell";
import { firms, firmTypes } from "@/lib/firms";

export const Route = createFileRoute("/firms")({ component: Firms });

function Firms() {
  const [q, setQ] = useState("");
  const [type, setType] = useState("all");
  const [wave, setWave] = useState("all");
  const rows = useMemo(() => {
    return firms.filter((f) => {
      const hit =
        !q ||
        `${f.name} ${f.hq} ${f.type} ${f.we_sell}`.toLowerCase().includes(q.toLowerCase());
      const t = type === "all" || f.type === type;
      const w = wave === "all" || String(f.wave) === wave;
      return hit && t && w;
    });
  }, [q, type, wave]);

  return (
    <Shell>
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gold">
        Firm book
      </p>
      <h1 className="mt-2 font-display text-4xl md:text-5xl">They fund. We sell.</h1>
      <p className="mt-3 max-w-xl text-mute">
        Official sites only. This is a relationship map, not a job board and not
        a live CRM.
      </p>
      <div className="mt-6 flex flex-wrap gap-2">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search"
          className="min-h-11 min-w-48 flex-1 rounded-xl border border-line bg-white px-3 text-sm"
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="min-h-11 rounded-xl border border-line bg-white px-3 text-sm"
        >
          <option value="all">All types</option>
          {firmTypes.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
        <select
          value={wave}
          onChange={(e) => setWave(e.target.value)}
          className="min-h-11 rounded-xl border border-line bg-white px-3 text-sm"
        >
          <option value="all">All waves</option>
          <option value="1">Wave 1</option>
          <option value="2">Wave 2</option>
          <option value="3">Wave 3</option>
        </select>
      </div>
      <p className="mt-3 text-xs text-mute">{rows.length} firms</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {rows.map((f) => (
          <article key={f.name} className="glass rounded-2xl p-4">
            <div className="flex items-start justify-between gap-2">
              <h2 className="text-base font-semibold">{f.name}</h2>
              <span className="rounded-full bg-gold/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider">
                W{f.wave}
              </span>
            </div>
            <p className="mt-1 text-xs text-mute">
              {f.type} · {f.hq}
            </p>
            <p className="mt-2 text-sm leading-relaxed">
              <span className="text-mute">They buy: </span>
              {f.they_buy}
            </p>
            <p className="mt-1 text-sm leading-relaxed">
              <span className="text-mute">We sell: </span>
              {f.we_sell}
            </p>
            <a
              href={f.site}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-block text-xs font-semibold uppercase tracking-wider text-ember"
            >
              Official site
            </a>
          </article>
        ))}
      </div>
    </Shell>
  );
}
