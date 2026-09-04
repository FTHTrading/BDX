# BDX — UnyKorn structuring console

Issuance and structuring software for **UnyKorn LLC / FTH Trading**.

Not a broker-dealer, bank, custodian, ATS, or exchange.

**Scope:** public references, internal size, counterparty map, issuance handoff.  
This repository does **not** accept orders, hold assets, settle cash, mint, or transmit execution.

**Live Surface:** [https://quant.unykorn.ai](https://quant.unykorn.ai)  
**Security Gate Passcode:** `12345`  
**Repository:** [https://github.com/FTHTrading/BDX](https://github.com/FTHTrading/BDX)


---

## Table of contents

1. [Status](#status)
2. [Handoff](#handoff)
3. [Rooms](#rooms)
4. [System map](#system-map)
5. [Infrastructure](#infrastructure)
6. [What is functional](#what-is-functional)
7. [What is not](#what-is-not)
8. [Layout](#layout)
9. [Legal](#legal)

---

## Status

| Chip | Hex | Meaning |
| :---: | :---: | --- |
| **REF** | `#1D4E89` | Public reference. Delayed venue print. Not a UnyKorn price. |
| **LAB** | `#B8892D` | Internal size. Calculation only. Not a market. |
| **RAIL** | `#0F766E` | Named counterparty. No account session. |
| **HOLD** | `#6B7280` | Not connected. Order, custody, settlement, mint remain off-system. |

See [docs/COLOR.md](docs/COLOR.md).

---

## Handoff

**Handoff** copies a JSON packet (issuer, counterparties, possession stance, timestamp) and opens mail.

It does not mint. See [docs/LAUNCH.md](docs/LAUNCH.md).

---

## Rooms

| Room | Job |
| --- | --- |
| Desk | Blotter, Black–Scholes, GBM, book imbalance, confluence |
| Operations | the custodian Express, cash rails, possession evidence |
| Infrastructure | Counterparties, chains, CCT, contract families, modules |
| Documentation | System map and connectivity |
| Handoff | Structured packet |
| Firms / RWA / Letters | Directory, economics, mailto |

---

## System map

Operator execution is **not connected**.

- **REF** Coinbase spots and L2 book imbalance (top 100)
- **LAB** confluence from OBI, vol, and a sample Pearson series
- **HOLD** transmit instruction (declined)

Full map: [docs/BACKEND.md](docs/BACKEND.md).

---

## Infrastructure

the custodian Express · a chartered custodian · cash rails · the venue · x402 · UnyKorn mint · UnyKorn Exchange OS · CCT/CCIP

- [smart-contract-builder](https://github.com/FTHTrading/smart-contract-builder)
- [BD-New](https://github.com/FTHTrading/BD-New)
- [whitelabel](https://github.com/FTHTrading/whitelabel)

---

## What is functional

Public marks, book imbalance, Black–Scholes, GBM, T-bill / waterfall, possession evidence (default: not asserted), hash-chained receipts, handoff copy.

## What is not

Live RFQ, Express query, cash rails session, Federal Reserve feed, execution, mint, broker-dealer registration.

---

## Layout

```
src/routes/desk.tsx       Desk
src/routes/ops.tsx        Operations
src/routes/protocol.tsx   Infrastructure
src/routes/docs.tsx       Documentation
src/routes/launch.tsx     Handoff
src/lib/quant.ts          Pricing
src/lib/rails.ts          Counterparties
src/lib/possession.ts     Possession gate
src/data/firms.json       Firm book
docs/                     COLOR, BACKEND, LAUNCH
```

---

## Legal

UnyKorn LLC licenses software and infrastructure. Custody, where used, opens in the client’s name at a chartered custodian or cash rails. Material here is information, not an offer of securities.

© UnyKorn LLC / FTH Trading
