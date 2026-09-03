import { Crest } from "@/components/crest";
import { cn } from "@/lib/utils";

export function Wordmark({
  size = "md",
}: {
  size?: "sm" | "md" | "lg";
}) {
  const crest = size === "lg" ? "size-16 md:size-20" : size === "md" ? "size-11" : "size-8";
  const type =
    size === "lg"
      ? "text-4xl md:text-6xl"
      : size === "md"
        ? "text-lg md:text-xl"
        : "text-sm";
  return (
    <span className="flex items-center gap-3">
      <span className="relative grid place-items-center">
        <span className="absolute inset-[-18%] rounded-full bg-white/50 blur-md" />
        <Crest className={cn("relative drop-shadow-sm", crest)} />
      </span>
      <span className={cn("wordmark leading-none text-ink", type)}>UnyKorn</span>
    </span>
  );
}
