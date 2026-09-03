import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Shell } from "@/components/shell";
import { firms, letterBody } from "@/lib/firms";

export const Route = createFileRoute("/letters")({ component: Letters });

function Letters() {
  const [q, setQ] = useState("");
  const [name, setName] = useState(firms[0]?.name ?? "");
  const firm = firms.find((f) => f.name === name) ?? firms[0];
  const list = useMemo(
    () =>
      firms.filter((f) => f.name.toLowerCase().includes(q.toLowerCase())).slice(0, 40),
    [q],
  );
  const body = firm ? letterBody(firm) : "";
  const mailto = firm
    ? `mailto:?subject=${encodeURIComponent("UnyKorn LLC — issuance software / " + firm.name)}&body=${encodeURIComponent(body)}`
    : "#";

  return (
    <Shell>
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gold">Letters</p>
      <h1 className="mt-2 font-display text-4xl md:text-5xl">Mandate in. Mailto out.</h1>
      <p className="mt-3 max-w-xl text-mute">
        Drafts open your mail client. This page does not send, track, or file a
        mandate.
      </p>
      <div className="mt-6 grid gap-4 lg:grid-cols-[280px_1fr]">
        <div className="glass rounded-2xl p-3">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Filter firms"
            className="mb-2 min-h-11 w-full rounded-xl border border-line bg-white px-3 text-sm"
          />
          <div className="max-h-[480px] overflow-auto">
            {list.map((f) => (
              <button
                key={f.name}
                type="button"
                onClick={() => setName(f.name)}
                className={`mb-1 w-full rounded-xl px-3 py-2 text-left text-sm ${f.name === name ? "bg-white shadow-sm" : "hover:bg-white/70"}`}
              >
                <div className="font-medium">{f.name}</div>
                <div className="text-xs text-mute">{f.type}</div>
              </button>
            ))}
          </div>
        </div>
        <div className="glass rounded-2xl p-5">
          {firm && (
            <>
              <h2 className="text-lg font-semibold">{firm.name}</h2>
              <p className="text-xs text-mute">
                {firm.persona} · {firm.hq}
              </p>
              <textarea
                readOnly
                value={body}
                className="mt-4 min-h-72 w-full rounded-xl border border-line bg-white p-3 font-mono text-xs leading-relaxed"
              />
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  type="button"
                  className="min-h-11 rounded-full border border-line bg-white px-4 text-sm font-semibold"
                  onClick={() => navigator.clipboard.writeText(body)}
                >
                  Copy
                </button>
                <a
                  href={mailto}
                  className="inline-flex min-h-11 items-center rounded-full bg-gold px-4 text-sm font-semibold text-[#2a1c04]"
                >
                  Open mail
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </Shell>
  );
}
