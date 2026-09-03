export function FrostStage() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-linear-to-b from-paper to-ice"
    >
      <div className="frost-blob left-[-140px] top-5 size-[560px] bg-[#c7dbff]" />
      <div className="frost-blob right-[-100px] top-28 size-[500px] bg-[#ffd7b0] [animation-direction:reverse]" />
      <div className="frost-blob bottom-[-80px] left-[38%] size-[420px] bg-[#c4f0e8] [animation-delay:-7s]" />
      <div className="absolute inset-0 bg-white/20 backdrop-blur-[1px]" />
    </div>
  );
}
