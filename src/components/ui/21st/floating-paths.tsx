import { motion } from "motion/react";

export function FloatingPaths({ position = 1 }: { position?: number }) {
  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
      380 - i * 5 * position
    } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
      152 - i * 5 * position
    } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
      684 - i * 5 * position
    } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    color: i % 4 === 0 ? "rgba(79, 70, 229, 0.15)" : "rgba(255, 255, 255, 0.03)",
    width: i % 4 === 0 ? 1 : 0.5,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
      <svg
        className="w-full h-full"
        viewBox="0 0 696 316"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke={path.color}
            strokeWidth={path.width}
            strokeOpacity={0.5}
            initial={{ pathLength: 0.3, pathOffset: 1 }}
            animate={{
              pathOffset: 0,
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  );
}
