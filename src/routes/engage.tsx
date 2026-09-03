import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Shell } from "@/components/shell";

export const Route = createFileRoute("/engage")({ component: Engage });

function Engage() {
  const [name, setName] = useState("");
  const [firm, setFirm] = useState("");
  const [note, setNote] = useState("");
  const body = `Name: ${name}\nFirm: ${firm}\n\n${note}\n\nThis is a request to discuss UnyKorn LLC issuance software. Not an order.`;
  const href = `mailto:hello@unykorn.ai?subject=${encodeURIComponent("Quant Command — engage")}&body=${encodeURIComponent(body)}`;

  return (
    <Shell>
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gold">Engage</p>
      <h1 className="mt-2 font-display text-4xl">Talk to the desk.</h1>
      <p className="mt-3 max-w-xl text-mute">
        Opens your mail client. No ticket is created here. No KYC is collected
        in this console.
      </p>
      <form
        className="mt-8 max-w-lg space-y-3 glass rounded-2xl p-5"
        onSubmit={(e) => {
          e.preventDefault();
          window.location.href = href;
        }}
      >
        <label className="block text-xs font-semibold uppercase tracking-wider text-mute">
          Name
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 min-h-11 w-full rounded-xl border border-line bg-white px-3 text-sm"
          />
        </label>
        <label className="block text-xs font-semibold uppercase tracking-wider text-mute">
          Firm
          <input
            required
            value={firm}
            onChange={(e) => setFirm(e.target.value)}
            className="mt-1 min-h-11 w-full rounded-xl border border-line bg-white px-3 text-sm"
          />
        </label>
        <label className="block text-xs font-semibold uppercase tracking-wider text-mute">
          Note
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="mt-1 min-h-28 w-full rounded-xl border border-line bg-white px-3 py-2 text-sm"
          />
        </label>
        <button
          type="submit"
          className="min-h-11 rounded-full bg-gold px-5 text-sm font-semibold text-[#2a1c04]"
        >
          Open mail
        </button>
      </form>
    </Shell>
  );
}
