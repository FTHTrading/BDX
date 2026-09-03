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
    name: "UnyKorn Exchange OS",
    role: "XRPL books and AMM for UnyKorn series. Guided launch with proof packets.",
    status: "RAIL" as const,
    note: "Listing approvals are a separate UnyKorn operator flow.",
    docs: "https://genesis402.com",
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
  { name: "XRPL", id: "main", status: "RAIL" as const, note: "UnyKorn books. Not this blotter." },
] as const;

export const PROTOCOL = [
  { name: "Genesis402 console", url: "https://genesis402.com", role: "Operator map for the capital stack" },
  { name: "Protocol docs", url: "https://dev.genesis402.com/protocol/overview/", role: "Console & rails overview" },
  { name: "System mint", url: "https://mint.unykorn.org", role: "SPL mint" },
  { name: "x402 worker", url: "https://x402.unykorn.org", role: "HTTP 402 rail" },
  { name: "RWA catalog", url: "https://fthtrading.github.io/smart-contract-builder/", role: "Foundry library" },
  { name: "RWA docs", url: "https://smartcontract.unykorn.ai", role: "Contract library pages" },
  { name: "Quant Command (BDX)", url: "https://github.com/FTHTrading/BDX", role: "This desk — source" },
  { name: "Smart-contract builder", url: "https://github.com/FTHTrading/smart-contract-builder", role: "RWA Solidity" },
  { name: "BD-New possession", url: "https://github.com/FTHTrading/BD-New", role: "15c3-3 evidence engine" },
  { name: "White-label fabric", url: "https://github.com/FTHTrading/whitelabel", role: "Evaluation modules" },
] as const;

export const CONTRACTS = [
  { family: "Draw escrow", note: "Milestone + waiver attestation" },
  { family: "CMBS waterfall", note: "Senior / mezz / equity" },
  { family: "Pool delegate", note: "Maple-shape credit" },
  { family: "Invoice factoring", note: "Advance-rate pool" },
  { family: "Tokenized treasury", note: "PoR-gated mint" },
  { family: "Cash vault 4626", note: "Reserve ratio" },
  { family: "ERC-3643 security", note: "Identity + freeze" },
  { family: "Gold-backed token", note: "PAXG-shape PoR" },
  { family: "CCIP CCT", note: "BurnMint — BitGo admin" },
  { family: "REIT distributor", note: "Pull dividend accumulator" },
] as const;

export const SKUS = [
  { n: "01", name: "Evidence desk", for: "Legal / construction" },
  { n: "02", name: "Legacy vault", for: "Wealth / RIA" },
  { n: "03", name: "Private credit ops", for: "Lenders" },
  { n: "04", name: "Provenance vault", for: "Art / GAA" },
  { n: "05", name: "Issuer OS", for: "Sponsors / ERC-3643" },
  { n: "06", name: "Sovereign fabric", for: "Family office" },
] as const;
