import raw from "@/data/firms.json";

export type Firm = {
  name: string;
  type: string;
  hq: string;
  site: string;
  careers?: string;
  notes: string;
  persona: string;
  they_buy: string;
  we_sell: string;
  leverage: string;
  wave: number;
};

export const firms = raw as Firm[];

export const firmTypes = [...new Set(firms.map((f) => f.type))].sort();

export function letterBody(firm: Firm) {
  return `Dear ${firm.persona},

UnyKorn LLC licenses issuance software and infrastructure. We are not a broker-dealer, bank, custodian, ATS, or market maker. Custody, where used, opens in the client's name at a chartered custodian or cash rails.

We are writing because ${firm.name} (${firm.type}, ${firm.hq}) typically buys: ${firm.they_buy}.

What we sell: ${firm.we_sell}

Why this door: ${firm.leverage}

This message is a structuring conversation, not an offer of securities and not a request for execution. If useful, we can walk a T-bill sleeve vs idle cash, an LP waterfall, and a CCT/CCIP issuance shape on a sandbox — then hand minting to the issuer's own launch rail.

UnyKorn LLC
Quant Command — issuance lab`;
}
