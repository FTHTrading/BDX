import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/shell";
import { Tape } from "@/components/tape";
import { StatusLegend } from "@/components/status";
import { GlassCard } from "@/components/glass-card";
import { Wordmark } from "@/components/mark";

export const Route = createFileRoute("/")({ component: Home });

const DOORS = [
  {
    n: "01",
    to: "/desk" as const,
    title: "Desk",
    copy: "European pricing, path stress, book imbalance, confluence. Internal size only.",
  },
  {
    n: "02",
    to: "/ops" as const,
    title: "Operations",
    copy: "the custodian Express, cash rails, possession evidence. No keys on this console.",
  },
  {
    n: "03",
    to: "/protocol" as const,
    title: "Infrastructure",
    copy: "Counterparties, chains, cross-chain tokens, contract families, modules.",
  },
  {
    n: "04",
    to: "/docs" as const,
    title: "Documentation",
    copy: "System map. Connectivity status. What this console will and will not do.",
  },
];

function Home() {
  return (
    <Shell>
      <Tape />
      <Wordmark size="lg" />
      <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.16em] text-gold">
        UnyKorn LLC · Institutional structuring
      </p>
      <h1 className="mt-3 max-w-3xl font-display text-5xl leading-[1.04] font-normal tracking-tight md:text-7xl">
        Issuance and structuring.
      </h1>
      <p className="mt-5 max-w-xl text-lg leading-relaxed text-mute">
        Software for series design, custody coordination, and controlled handoff.
        Public marks are venue references. Qualified custody, where used, is
        a chartered custodian or cash rails in the client’s name.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          to="/launch"
          className="inline-flex min-h-11 items-center rounded-full bg-linear-to-b from-[#f3e2b3] to-gold px-5 text-sm font-semibold text-[#2a1c04] transition-transform duration-150 active:scale-[0.96]"
        >
          Prepare handoff
        </Link>
        <Link
          to="/desk"
          className="inline-flex min-h-11 items-center rounded-full border border-line bg-white/80 px-5 text-sm font-semibold"
        >
          Open desk
        </Link>
      </div>

      <section id="legend" className="mt-12 scroll-mt-24">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-mute">
          Status
        </p>
        <StatusLegend />
      </section>

      <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {DOORS.map((d) => (
          <Link key={d.n} to={d.to}>
            <GlassCard className="h-full">
              <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ok">
                {d.n}
              </div>
              <h2 className="mt-1 text-lg font-semibold">{d.title}</h2>
              <p className="mt-1 text-sm leading-relaxed text-mute">{d.copy}</p>
            </GlassCard>
          </Link>
        ))}
      </div>
    </Shell>
  );
}
