/** Five-condition possession gate (BD-New spirit). Lab only — refuses unless all true. */

export const CONDITIONS = [
  {
    id: "exclusive",
    title: "Exclusive cryptographic control",
    detail: "Keys / policy at BitGo Express in the client’s name. UnyKorn never holds keys.",
  },
  {
    id: "segregated",
    title: "Segregated from firm inventory",
    detail: "Wallet policy isolates customer assets from operator float.",
  },
  {
    id: "free",
    title: "Free of liens and encumbrances",
    detail: "No pledge, rehypothecation, or open material concern.",
  },
  {
    id: "proof",
    title: "Proof of control without movement",
    detail: "Signed challenge from Express. No sendcoins required to prove control.",
  },
  {
    id: "records",
    title: "Tamper-evident records",
    detail: "SHA-256 hash-chained receipts. External WORM anchor is HOLD until wired.",
  },
] as const;

export function possessionGate(flags: Record<string, boolean>) {
  const failed = CONDITIONS.filter((c) => !flags[c.id]);
  return {
    assert: failed.length === 0,
    failed: failed.map((c) => c.id),
    reason:
      failed.length === 0
        ? "Conditions recorded. This console does not file a 15c3-3 assertion."
        : `Possession not asserted: ${failed.map((c) => c.id).join(", ")}`,
  };
}

export async function sha256Hex(s: string) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}
