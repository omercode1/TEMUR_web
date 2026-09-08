import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { motion } from "motion/react";

export function GradientBackground({ children, className }: { children?: ReactNode; className?: string }) {
  return (
    <div className={cn("w-full relative min-h-[100svh] isolate overflow-x-hidden", className)}>
      {/* Background Pattern with Subtle Animation */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          className="absolute -inset-[10%] -z-10 h-[120%] w-[120%]"
          style={{ background: 'radial-gradient(125% 125% at 50% 10%, #000 40%, #63e 100%)' }}
          animate={{
            x: ["-1%", "1%", "-1%"],
            y: ["-1%", "1%", "-1%"],
            scale: [1, 1.02, 1]
          }}
          transition={{
            duration: 18,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        />
      </div>
      <div className="relative z-10 flex flex-col h-full w-full flex-1">
        {children}
      </div>
    </div>
  );
}
