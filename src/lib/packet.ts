export function launchPacket() {
  return {
    issuer: "UnyKorn LLC",
    console: "UnyKorn structuring console",
    action: "handoff",
    rails: {
      bitgoExpress: "HOLD — client daemon not attached",
      paxos: "RAIL — named, no session",
      cct: "HOLD — unsigned",
      mint: "launch rail — not this console",
      execution: "HOLD — not connected",
    },
    possession: "refuse until five conditions are evidenced",
    stamps: new Date().toISOString(),
  };
}

export function packetText() {
  return JSON.stringify(launchPacket(), null, 2);
}
