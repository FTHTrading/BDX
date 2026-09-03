# BDX — UnyKorn Quant Command

Issuer structuring software for **UnyKorn LLC / FTH Trading**.  
Not a broker-dealer. Not a bank. Not a custodian. Not an ATS. Not a market maker.

**Status of this console:** calculation, firm book, rail map, and outreach drafts.  
It does **not** place orders, hold assets, settle cash, or mint.

---

## Table of contents

1. [What this is](#what-this-is)
2. [Color code](#color-code)
3. [Rooms](#rooms)
4. [Infrastructure](#infrastructure)
5. [Named rails](#named-rails)
6. [What is functional](#what-is-functional)
7. [What is not](#what-is-not)
8. [Repo layout](#repo-layout)
9. [Legal](#legal)

---

## What this is

BDX is the **issuance lab plus infrastructure map**: size a series, name custody rails (BitGo Express, Paxos), run T-bill / LP economics, list contract families, and open a mandate letter.

Minting, if any, lives on the issuer’s launch rail — not in this console.

---

## Color code

| Chip | Color | Meaning |
| --- | --- | --- |
| **REF** | Navy `#1D4E89` | Public spot print. Delayed. Not executable. |
| **LAB** | Gold `#B8892D` | Sizing ticket. Lives in the browser. |
| **RAIL** | Teal `#0F766E` | Named counterparty. No API session here. |
| **HOLD** | Slate `#6B7280` | Not live: no order, custody, settlement, or mint. |

---

## Rooms

| Room | Job |
| --- | --- |
| Quant (`/desk`) | Blotter, Black–Scholes, GBM |
| Ops (`/ops`) | BitGo Express, Paxos, possession gate, hash receipts |
| Infra (`/protocol`) | Rails, chains, Genesis402, contracts, SKUs |
| Firms | They buy / we sell |
| RWA | T-bill lift, LP waterfall |
| Letters / Engage | Mailto only |

---

## Infrastructure

- BitGo Express (client-hosted daemon) — HOLD
- BitGo Bank & Trust — RAIL
- Paxos / itBit — RAIL
- x402, mint.unykorn.org, TROPTIONS — RAIL
- CCT / CCIP BurnMint — HOLD (unsigned)
- Unykorn L1 `7331` — HOLD · Apostle `7332` — HOLD
- [smart-contract-builder](https://github.com/FTHTrading/smart-contract-builder)
- [BD-New](https://github.com/FTHTrading/BD-New)
- [whitelabel](https://github.com/FTHTrading/whitelabel)
- [Genesis402 protocol](https://dev.genesis402.com/protocol/overview/)

---

## Named rails

BitGo Express · BitGo Bank & Trust · Paxos · itBit · x402 · System mint · TROPTIONS · CCT/CCIP

No API keys, wallet balances, or settlement instructions in this repo.

---

## What is functional

- Public spot marks (BTC, ETH, SOL, PAXG)
- European Black–Scholes + GBM tails
- T-bill vs cash carry and LP waterfall
- Possession gate (lab checkboxes; default refuse)
- SHA-256 receipt append
- Firm filter and mandate letter generation

## What is not

- Live trading, RFQ, Express ping, Paxos session
- Custody, KYC, funded accounts
- On-chain mint / burn / CCT deploy
- Broker-dealer registration

---

## Repo layout

```
src/routes/desk.tsx       Quant
src/routes/ops.tsx        Back office
src/routes/protocol.tsx   Infrastructure
src/lib/quant.ts          Lab math
src/lib/rails.ts          Rails / chains / SKUs
src/lib/possession.ts     Five-condition gate
src/data/firms.json       Firm book
```

---

## Legal

UnyKorn LLC licenses software and infrastructure. Custody, where used, opens in the client’s name at BitGo Bank & Trust or Paxos. Material here is information, not an offer of securities.

© UnyKorn LLC / FTH Trading
