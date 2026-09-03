export function FrostStage() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-linear-to-b from-paper to-ice"
    >
      <div className="frost-blob left-[-180px] top-[-40px] size-[640px] bg-[#bdd6ff]" />
      <div className="frost-blob right-[-140px] top-10 size-[560px] bg-[#ffd4a8] [animation-direction:reverse]" />
      <div className="frost-blob bottom-[-120px] left-[28%] size-[480px] bg-[#b8f3e8] [animation-delay:-8s]" />
      <div className="frost-blob right-[18%] top-[42%] size-[280px] bg-white [animation-delay:-12s] opacity-80" />
      <div className="absolute inset-0 bg-white/18 backdrop-blur-[1.5px]" />
    </div>
  );
}
