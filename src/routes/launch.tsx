import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Shell } from "@/components/shell";
import { Wordmark } from "@/components/mark";
import { StatusChip } from "@/components/status";
import { packetText } from "@/lib/packet";

export const Route = createFileRoute("/launch")({ component: Launch });

function Launch() {
  const text = useMemo(() => packetText(), []);
  const [copied, setCopied] = useState(false);
  const mail = `mailto:kevan@unykorn.org?subject=${encodeURIComponent("UnyKorn issuance handoff")}&body=${encodeURIComponent(text)}`;

  return (
    <Shell>
      <Wordmark size="lg" />
      <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.16em] text-gold">
        Issuance handoff
      </p>
      <h1 className="mt-2 font-display text-4xl md:text-5xl">Prepare the handoff.</h1>
      <p className="mt-3 max-w-xl text-mute">
        Copies a structured packet for custody and mint counterparties. Does not
        instruct BitGo Express, does not originate an order, and does not mint.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          className="inline-flex min-h-11 items-center rounded-full bg-linear-to-b from-[#f3e2b3] to-gold px-5 text-sm font-semibold text-[#2a1c04]"
          onClick={async () => {
            await navigator.clipboard.writeText(text);
            setCopied(true);
          }}
        >
          {copied ? "Copied" : "Copy handoff"}
        </button>
        <a
          href={mail}
          className="inline-flex min-h-11 items-center rounded-full border border-line bg-white/80 px-5 text-sm font-semibold"
        >
          Open mail
        </a>
        <Link
          to="/docs"
          className="inline-flex min-h-11 items-center rounded-full border border-line bg-white/80 px-5 text-sm font-semibold"
        >
          Documentation
        </Link>
      </div>
      <pre className="mt-8 overflow-x-auto glass rounded-2xl p-5 font-mono text-xs leading-relaxed">
        {text}
      </pre>
      <div className="mt-4 flex gap-2">
        <StatusChip code="LAB" />
        <StatusChip code="HOLD" />
      </div>
    </Shell>
  );
}
