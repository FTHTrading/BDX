# BDX — UnyKorn Quant Command

Issuer structuring software for **UnyKorn LLC / FTH Trading**.  
Not a broker-dealer. Not a bank. Not a custodian. Not an ATS. Not a market maker.

**Status:** calculation, rail map, handoff packet.  
It does **not** place orders, hold assets, settle cash, mint, or fire execution.

---

## Table of contents

1. [Color code](#color-code)
2. [One-click launch](#one-click-launch)
3. [Rooms](#rooms)
4. [Backend](#backend)
5. [Infrastructure](#infrastructure)
6. [What is functional](#what-is-functional)
7. [What is not](#what-is-not)
8. [Legal](#legal)

---

## Color code

| Chip | Hex | Meaning |
| :---: | :---: | --- |
| **REF** | `#1D4E89` navy | Public delayed print. Not executable. |
| **LAB** | `#B8892D` gold | Browser sizing only. |
| **RAIL** | `#0F766E` teal | Named counterparty. No session. |
| **HOLD** | `#6B7280` slate | Not live. |

See [docs/COLOR.md](docs/COLOR.md).

---

## One-click launch

In the console: **Launch** copies the JSON handoff and opens mail.

It does not mint. See [docs/LAUNCH.md](docs/LAUNCH.md).

---

## Rooms

| Room | Job |
| --- | --- |
| Quant | Blotter, Black–Scholes, GBM, OBI, confluence |
| Ops | BitGo Express, Paxos, possession gate |
| Infra | Rails, chains, CCT, SKUs |
| Docs | Honest cockpit map |
| Launch | Handoff packet |
| Firms / RWA / Letters | Directory, economics, mailto |

---

## Backend

Operator cockpit (Pearson vs Fed liquidity, SPI, execution trigger, agent chat) is **not attached**.

This console:

- **REF** Coinbase spots + L2 OBI (top 100)
- **LAB** confluence from OBI + vol + sample Pearson
- **HOLD** execution trigger (always refuse)

Full map: [docs/BACKEND.md](docs/BACKEND.md).

---

## Infrastructure

BitGo Express · BitGo Bank & Trust · Paxos · itBit · x402 · mint · TROPTIONS · CCT/CCIP  
[smart-contract-builder](https://github.com/FTHTrading/smart-contract-builder) · [BD-New](https://github.com/FTHTrading/BD-New) · [whitelabel](https://github.com/FTHTrading/whitelabel)

---

## What is functional

Public marks, OBI, Black–Scholes, GBM, T-bill / waterfall, possession gate (default refuse), hash receipts, launch packet copy.

## What is not

Live RFQ, Express ping, Paxos session, Fed WALCL feed, SPI fire, mint, BD registration.

---

## Legal

UnyKorn LLC licenses software and infrastructure. Custody, where used, opens in the client’s name at BitGo Bank & Trust or Paxos.

© UnyKorn LLC / FTH Trading
