import { motion } from "framer-motion";
import { type ReactNode } from "react";

interface MarqueeProps {
  children: ReactNode;
  direction?: "left" | "right";
  duration?: number;
  className?: string;
  pauseOnHover?: boolean;
}

export function Marquee({
  children,
  direction = "left",
  duration = 30,
  className = "",
  pauseOnHover = false,
}: MarqueeProps) {
  const distance = direction === "left" ? "-50%" : "0%";
  const start = direction === "left" ? "0%" : "-50%";

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <motion.div
        className={`flex w-max ${pauseOnHover ? "hover:[animation-play-state:paused]" : ""}`}
        animate={{ x: [start, distance] }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
      >
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0" aria-hidden="true">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
