# Backend map

This console is **not** the operator cockpit.

| Layer | In this console | Chip |
| --- | --- | --- |
| Public spots (Coinbase) | Yes | REF |
| BTC L2 OBI (Coinbase, top 100) | Yes | REF |
| Black–Scholes / GBM | Yes | LAB |
| Pearson (WALCL − TGA − RRP vs log BTC) | Formula + sample only | LAB |
| Confluence 0–100 | Weighted OBI + vol + Pearson | LAB |
| `/api/ops/execution-trigger` | Refused | HOLD |
| Agent chat (Gemini / OpenRouter) | Not attached | HOLD |
| BitGo Express ping | Not attached | HOLD |
| Paxos session | Named only | RAIL |
| Mint / CCT deploy | Launch rail / unsigned | HOLD |

Operator telemetry (`predictive_engine`, confluence DB, SPI) stays in the separate cockpit process. Do not mark it LIVE from BDX.
