export const RAILS = [
  {
    name: "BitGo Express",
    role: "Local daemon the client hosts. Proxies BitGo REST. Keys stay in their policy wallet.",
    status: "HOLD" as const,
    note: "No Express host attached. Ping is not attempted from this console.",
    docs: "https://developers.bitgo.com/docs/get-started-express-install",
  },
  {
    name: "BitGo Bank & Trust",
    role: "Qualified custody. Intended CCIP / CCT admin for a series.",
    status: "RAIL" as const,
    note: "Named counterparty. No wallet id or balance here.",
    docs: "https://www.bitgo.com/",
  },
  {
    name: "Paxos",
    role: "Cash (PYUSD) and gold (PAXG).",
    status: "RAIL" as const,
    note: "No Paxos session. Tape marks are public spots.",
    docs: "https://paxos.com/",
  },
  {
    name: "itBit",
    role: "Paxos institutional venue for USD / PAXG.",
    status: "RAIL" as const,
    note: "Not a UnyKorn book.",
    docs: "https://www.itbit.com/",
  },
  {
    name: "x402",
    role: "HTTP 402 payment / access rail (Solana worker).",
    status: "RAIL" as const,
    note: "Public rail. This desk does not meter.",
    docs: "https://x402.unykorn.org",
  },
  {
    name: "System mint",
    role: "SPL mint for UnyKorn systems (Phantom / Solflare).",
    status: "RAIL" as const,
    note: "Minting is on the issuer launch rail — not this console.",
    docs: "https://mint.unykorn.org",
  },
  {
    name: "TROPTIONS Exchange OS",
    role: "XRPL books + AMM. Guided launch with proof packets.",
    status: "RAIL" as const,
    note: "Listing approvals are a separate operator flow.",
    docs: "https://troptions.unykorn.org/exchange-os",
  },
  {
    name: "CCT / CCIP",
    role: "BurnMint token pool. BitGo as token admin. Not LayerZero OFT.",
    status: "HOLD" as const,
    note: "Kit unsigned. No pool address until a key is supplied.",
    docs: "https://docs.chain.link/ccip/concepts/cross-chain-tokens",
  },
] as const;

export const CHAINS = [
  { name: "Unykorn L1", id: "7331", status: "HOLD" as const, note: "Public RPC not restored." },
  { name: "Apostle", id: "7332", status: "HOLD" as const, note: "LOCAL_STUB only." },
  { name: "Solana", id: "main / devnet", status: "RAIL" as const, note: "x402 worker + mint.unykorn.org." },
  { name: "Ethereum / Sepolia", id: "1 / 11155111", status: "HOLD" as const, note: "CCT kit target. Unsigned." },
  { name: "XRPL", id: "main", status: "RAIL" as const, note: "TROPTIONS books. Not this blotter." },
] as const;
