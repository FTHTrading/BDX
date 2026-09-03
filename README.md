# BDX — UnyKorn Quant Command

Issuer structuring software for **UnyKorn LLC / FTH Trading**.  
Not a broker-dealer. Not a bank. Not a custodian. Not an ATS. Not a market maker.

**Status of this console:** calculation, firm book, and outreach drafts.  
It does **not** place orders, hold assets, settle cash, or mint.

---

## Table of contents

1. [What this is](#what-this-is)
2. [Color code](#color-code)
3. [Rooms](#rooms)
4. [Named rails (not live)](#named-rails-not-live)
5. [What is functional](#what-is-functional)
6. [What is not](#what-is-not)
7. [Repo layout](#repo-layout)
8. [Legal](#legal)

---

## What this is

BDX is the **issuance lab**: size a series, map counterparties, run T-bill / LP economics, and open a mandate letter in the operator’s mail client.

Minting, if any, lives on the issuer’s launch rail — not in this console.

Positioning:

> Issuer structuring and institutional workflow software for tokenized products — reference analytics, issuance design, counterparty coordination, and controlled launch handoff.

---

## Color code

| Chip | Color | Meaning |
| --- | --- | --- |
| **REF** | Navy `#1D4E89` | Public spot print. Delayed. Not a UnyKorn quote. Not executable. |
| **LAB** | Gold `#B8892D` | Sizing ticket. Lives in the browser. Never a fill. |
| **RAIL** | Teal `#0F766E` | Named counterparty (BitGo, Paxos, itBit, …). No API session here. |
| **HOLD** | Slate `#6B7280` | Not live: no order, custody, settlement, or mint from this site. |

Use these chips on every blotter row. Do not mark BitGo or Paxos as LIVE unless a session, account id, and confirmation exist.

---

## Rooms

| Room | Job | Execution |
| --- | --- | --- |
| Home | Reference tape, color legend, TOC | Display |
| Desk | Blotter, Black–Scholes, GBM paths | Calculation |
| Firms | 116-firm book: they buy / we sell / wave | Directory |
| RWA | T-bill lift vs idle cash; LP waterfall | Calculator |
| Letters | Mandate draft → copy / mailto | Outbound only |
| Engage | Name, firm, note → mail client | Outbound only |

---

## Named rails (not live)

BitGo Bank & Trust · Paxos · itBit · Go Network · x402 · UnyKorn Mint

These are **intended** counterparties. This repo does not contain API keys, wallet balances, or settlement instructions.

---

## What is functional

- Public spot marks (BTC, ETH, SOL, PAXG)
- European Black–Scholes + GBM tails
- T-bill vs cash carry and LP waterfall
- Firm filter and mandate letter generation
- Color-coded blotter (REF / LAB / HOLD)

## What is not

- Live trading or RFQ
- Custody, KYC, or funded accounts
- On-chain mint / burn
- CRM send/track
- Broker-dealer registration

---

## Repo layout

```
src/routes/     Home, Desk, Firms, RWA, Letters, Engage
src/lib/quant.ts    Lab math
src/lib/firms.ts    Book + letter body
src/components/status.tsx   Color chips
src/data/firms.json
```

---

## Legal

UnyKorn LLC licenses software and infrastructure. Custody, where used, opens in the client’s name at BitGo Bank & Trust or Paxos. Material here is information, not an offer of securities.

© UnyKorn LLC / FTH Trading
