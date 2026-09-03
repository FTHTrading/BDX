import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function GlassCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      className={cn("glass rounded-2xl p-5 transition-transform duration-150", className)}
      onMouseMove={(e) => {
        const el = ref.current;
        if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = `perspective(900px) rotateX(${(-y * 4).toFixed(2)}deg) rotateY(${(x * 5).toFixed(2)}deg)`;
      }}
      onMouseLeave={() => {
        if (ref.current) ref.current.style.transform = "perspective(900px) rotateX(0) rotateY(0)";
      }}
    >
      {children}
    </div>
  );
}
