import { Link, useRouterState } from "@tanstack/react-router";
import { Crest } from "@/components/crest";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/desk", label: "Desk" },
  { to: "/firms", label: "Firms" },
  { to: "/rwa", label: "RWA" },
  { to: "/letters", label: "Letters" },
] as const;

export function Shell({ children }: { children: React.ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <div className="min-h-dvh bg-ice text-ink">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(900px_500px_at_8%_-10%,rgba(214,230,255,.95),transparent_58%),radial-gradient(700px_460px_at_94%_0,rgba(255,232,204,.65),transparent_55%),linear-gradient(180deg,#f8fbff,#eef2f7)]"
      />
      <header className="sticky top-0 z-40 border-b border-white/70 bg-white/50 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3 px-5 py-3">
          <Link to="/" className="flex items-center gap-2.5 text-xs font-semibold tracking-[0.14em]">
            <Crest className="size-7" />
            UNYKORN LLC
          </Link>
          <nav className="flex flex-1 flex-wrap gap-0.5">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className={cn(
                  "rounded-full px-3 py-2 text-sm font-medium min-h-11 inline-flex items-center",
                  pathname === n.to ? "bg-white shadow-sm" : "hover:bg-white/80",
                )}
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <Link
            to="/engage"
            className="inline-flex min-h-11 items-center rounded-full bg-linear-to-b from-[#f3e2b3] to-gold px-5 text-sm font-semibold text-[#2a1c04] shadow-sm"
          >
            Engage
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-5 py-10 pb-20">{children}</main>
      <footer className="border-t border-line/60 px-5 py-8 text-xs leading-relaxed text-mute">
        <div className="mx-auto max-w-6xl">
          UnyKorn LLC licenses issuance software and infrastructure. Not a
          broker-dealer, bank, custodian, ATS, exchange, or market maker. This
          console sizes series and drafts outreach. It does not place orders,
          hold assets, settle cash, or mint. Custody, where used, opens in the
          client's name at BitGo Bank & Trust or Paxos.
        </div>
      </footer>
    </div>
  );
}
