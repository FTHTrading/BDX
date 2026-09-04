import { Link, useRouterState } from "@tanstack/react-router";
import { Wordmark } from "@/components/mark";
import { FrostStage } from "@/components/frost";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/desk", label: "Desk" },
  { to: "/ops", label: "Operations" },
  { to: "/protocol", label: "Infrastructure" },
  { to: "/docs", label: "Documentation" },
  { to: "/firms", label: "Firms" },
  { to: "/rwa", label: "RWA" },
] as const;

export function Shell({ children }: { children: React.ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <div className="min-h-dvh bg-ice text-ink">
      <FrostStage />
      <header className="sticky top-0 z-40 border-b border-white/70 bg-white/50 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3 px-5 py-3">
          <Link to="/" className="min-h-11" aria-label="UnyKorn home">
            <Wordmark size="sm" />
          </Link>
          <nav className="flex flex-1 flex-wrap gap-0.5">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className={cn(
                  "inline-flex min-h-11 items-center rounded-full px-3 py-2 text-sm font-medium",
                  pathname === n.to ? "bg-white/90 shadow-sm" : "hover:bg-white/70",
                )}
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <Link
            to="/launch"
            className="inline-flex min-h-11 items-center rounded-full bg-linear-to-b from-[#f3e2b3] to-gold px-5 text-sm font-semibold text-[#2a1c04] shadow-sm transition-transform duration-150 active:scale-[0.96]"
          >
            Handoff
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-5 py-10 pb-20">{children}</main>
      <footer className="border-t border-line/60 px-5 py-8 text-xs leading-relaxed text-mute">
        <div className="mx-auto max-w-6xl">
          UnyKorn LLC provides issuance and structuring software. It is not a
          broker-dealer, bank, custodian, ATS, or exchange. Qualified custody,
          where used, opens in the client’s name at a chartered custodian or cash rails.
          This console does not accept orders, hold keys, settle, or mint.
        </div>
      </footer>
    </div>
  );
}
