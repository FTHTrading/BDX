import { useEffect, useState } from "react";
import { fetchMarks, type Marks } from "@/lib/marks";
import { obiFromBook } from "@/lib/confluence";
import { usd } from "@/lib/utils";
import { StatusChip } from "@/components/status";

export function Tape() {
  const [m, setM] = useState<Marks | null>(null);
  const [obi, setObi] = useState<number | null>(null);
  useEffect(() => {
    let on = true;
    const run = () => {
      fetchMarks().then((v) => on && setM(v));
      fetch("https://api.exchange.coinbase.com/products/BTC-USD/book?level=2")
        .then((r) => r.json())
        .then((d) => {
          if (!on || !d?.bids) return;
          setObi(obiFromBook(d.bids, d.asks).obi);
        })
        .catch(() => on && setObi(null));
    };
    run();
    const id = setInterval(run, 30000);
    return () => {
      on = false;
      clearInterval(id);
    };
  }, []);

  const cell = (k: string, v: number | null) => (
    <span className="font-mono text-sm tabular-nums">
      <span className="mr-1 text-mute">{k}</span>
      {v == null ? "—" : usd(v, v > 200 ? 0 : 2)}
    </span>
  );

  return (
    <div className="mb-8 flex flex-wrap items-center gap-x-4 gap-y-2 rounded-2xl glass px-4 py-3 text-sm">
      <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gold">
        Reference marks
      </span>
      {cell("BTC", m?.BTC ?? null)}
      {cell("ETH", m?.ETH ?? null)}
      {cell("SOL", m?.SOL ?? null)}
      {cell("PAXG", m?.PAXG ?? null)}
      <span className="inline-flex items-center gap-2 font-mono text-sm">
        <StatusChip code="REF" />
        OBI {obi == null ? "—" : obi.toFixed(3)}
      </span>
      <span className="text-xs text-mute">
        Delayed venue marks · Coinbase L2 · not a UnyKorn price
      </span>
    </div>
  );
}
