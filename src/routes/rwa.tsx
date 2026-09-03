import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Shell } from "@/components/shell";
import { tBillLift, waterfall } from "@/lib/quant";
import { usd } from "@/lib/utils";

export const Route = createFileRoute("/rwa")({ component: Rwa });

function Rwa() {
  const [notional, setNotional] = useState(25_000_000);
  const [cashPct, setCashPct] = useState(0);
  const [billPct, setBillPct] = useState(4.6);
  const [adminBps, setAdminBps] = useState(8);
  const [days, setDays] = useState(90);
  const [haircutPct, setHaircutPct] = useState(0);
  const lift = useMemo(
    () => tBillLift({ notional, cashPct, billPct, adminBps, days, haircutPct }),
    [notional, cashPct, billPct, adminBps, days, haircutPct],
  );

  const [auc, setAuc] = useState(100_000_000);
  const [stackBps, setStackBps] = useState(25);
  const [ourTakeBps, setOurTakeBps] = useState(8);
  const [lpCapital, setLpCapital] = useState(80_000_000);
  const [endNav, setEndNav] = useState(88_000_000);
  const [prefPct, setPrefPct] = useState(8);
  const wf = useMemo(
    () => waterfall({ auc, stackBps, ourTakeBps, lpCapital, endNav, prefPct }),
    [auc, stackBps, ourTakeBps, lpCapital, endNav, prefPct],
  );

  return (
    <Shell>
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gold">RWA lab</p>
      <h1 className="mt-2 font-display text-4xl md:text-5xl">Idle cash, stack, waterfall.</h1>
      <p className="mt-3 max-w-xl text-mute">
        Numbers an issuer or LP can argue with. No vanity AUM. These sliders do
        not buy T-bills, open custody, or pay LPs.
      </p>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <section className="glass rounded-2xl p-5">
          <h2 className="font-display text-2xl">T-bill sleeve vs idle cash</h2>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <Field label="Idle USD" value={notional} onChange={setNotional} />
            <Field label="Cash %" value={cashPct} onChange={setCashPct} step={0.1} />
            <Field label="T-bill %" value={billPct} onChange={setBillPct} step={0.01} />
            <Field label="Admin bps" value={adminBps} onChange={setAdminBps} />
            <Field label="Days" value={days} onChange={setDays} />
            <Field label="Haircut %" value={haircutPct} onChange={setHaircutPct} step={0.1} />
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2">
            <Kpi k="Cash carry" v={usd(lift.cashCarry, 0)} />
            <Kpi k="Bill net" v={usd(lift.billNet, 0)} />
            <Kpi k="Lift" v={usd(lift.lift, 0)} />
          </div>
        </section>

        <section className="glass rounded-2xl p-5">
          <h2 className="font-display text-2xl">White-label take + LP waterfall</h2>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <Field label="AUC $" value={auc} onChange={setAuc} />
            <Field label="Stack bps" value={stackBps} onChange={setStackBps} />
            <Field label="Our take bps" value={ourTakeBps} onChange={setOurTakeBps} />
            <Field label="LP capital" value={lpCapital} onChange={setLpCapital} />
            <Field label="End NAV" value={endNav} onChange={setEndNav} />
            <Field label="Pref %" value={prefPct} onChange={setPrefPct} step={0.1} />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
            <Kpi k="Stack $" v={usd(wf.stack, 0)} />
            <Kpi k="Our take" v={usd(wf.ourTake, 0)} />
            <Kpi k="LP pref" v={usd(wf.lpPref, 0)} />
            <Kpi k="LP residual" v={usd(wf.lpResidual, 0)} />
            <Kpi k="GP catch" v={usd(wf.gpCatch, 0)} />
            <Kpi k="LP total" v={usd(wf.lpTotal, 0)} />
          </div>
        </section>
      </div>
    </Shell>
  );
}

function Field({
  label,
  value,
  onChange,
  step = 1,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
  step?: number;
}) {
  return (
    <label className="block text-[11px] font-semibold uppercase tracking-wider text-mute">
      {label}
      <input
        type="number"
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-1 w-full rounded-xl border border-line bg-white/80 px-3 py-2 font-mono text-sm text-ink"
      />
    </label>
  );
}

function Kpi({ k, v }: { k: string; v: string }) {
  return (
    <div className="rounded-xl border border-line bg-white px-3 py-2">
      <div className="text-[10px] font-semibold uppercase tracking-wider text-mute">{k}</div>
      <div className="font-mono text-base tabular-nums">{v}</div>
    </div>
  );
}
