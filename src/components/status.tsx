import { cn } from "@/lib/utils";

export const STATUSES = [
  {
    code: "REF",
    label: "Reference print",
    meaning: "Public spot. Delayed. Not a quote.",
    className: "bg-ref/10 text-ref border-ref/30",
  },
  {
    code: "LAB",
    label: "Lab ticket",
    meaning: "Sizing only. Never leaves this browser.",
    className: "bg-lab/15 text-ember border-lab/40",
  },
  {
    code: "RAIL",
    label: "Named rail",
    meaning: "Intended counterparty. No session here.",
    className: "bg-rail/10 text-rail border-rail/30",
  },
  {
    code: "HOLD",
    label: "Not live",
    meaning: "No order, custody, settlement, or mint.",
    className: "bg-hold/10 text-hold border-hold/30",
  },
] as const;

export function StatusChip({
  code,
}: {
  code: (typeof STATUSES)[number]["code"];
}) {
  const s = STATUSES.find((x) => x.code === code) ?? STATUSES[3];
  return (
    <span
      className={cn(
        "inline-flex rounded-full border px-2 py-0.5 font-mono text-[10px] font-semibold tracking-wider",
        s.className,
      )}
    >
      {s.code}
    </span>
  );
}

export function StatusLegend() {
  return (
    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
      {STATUSES.map((s) => (
        <div key={s.code} className="glass flex items-start gap-2 rounded-xl p-3">
          <StatusChip code={s.code} />
          <div>
            <div className="text-sm font-medium">{s.label}</div>
            <div className="text-xs text-mute">{s.meaning}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
