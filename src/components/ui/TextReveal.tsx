import { FC, ReactNode, useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useMobile } from "@/hooks/useMobile";

interface TextRevealProps {
  text: string;
  className?: string;
}

export const TextReveal: FC<TextRevealProps> = ({ text, className }) => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useMobile();
  const shouldReduceMotion = prefersReducedMotion || isMobile;
  const hasEnteredView = useInView(targetRef, { amount: 0.2, once: true });

  const words = text.split(" ");

  return (
    <div ref={targetRef} data-testid="text-reveal" className={`relative z-0 py-24 md:py-32 ${className || ""}`}>
      <div className="mx-auto flex max-w-4xl items-center justify-center bg-transparent px-[1rem]">
        <p className="flex flex-wrap justify-center text-3xl md:text-5xl lg:text-6xl font-display font-bold">
          {words.map((word, i) => {
            return (
              <Word
                key={i}
                delay={i * 0.22}
                isActive={hasEnteredView}
                shouldReduceMotion={shouldReduceMotion}
              >
                {word}
              </Word>
            );
          })}
        </p>
      </div>
    </div>
  );
};

interface WordProps {
  children: ReactNode;
  delay: number;
  isActive: boolean;
  shouldReduceMotion?: boolean;
}

const Word: FC<WordProps> = ({ children, delay, isActive, shouldReduceMotion }) => {
  const dimmedShadow = "0 0 0 rgba(255, 255, 255, 0), 0 0 0 rgba(255, 255, 255, 0)";
  const brightShadow = "0 0 26px rgba(255, 255, 255, 0.9), 0 0 62px rgba(255, 255, 255, 0.35)";
  const settledShadow = "0 0 12px rgba(255, 255, 255, 0.16), 0 0 28px rgba(255, 255, 255, 0)";

  return (
    <span className="relative inline-block mx-1 lg:mx-2.5 mb-2 lg:mb-4">
      {shouldReduceMotion ? (
        <span className="text-white">{children}</span>
      ) : (
        <motion.span
          data-testid="text-reveal-word"
          className="text-white inline-block will-change-transform"
          initial={{ filter: "brightness(0.45)", opacity: 0.1, textShadow: dimmedShadow, y: 12 }}
          animate={isActive ? {
            filter: ["brightness(0.45)", "brightness(1.55)", "brightness(1)"],
            opacity: [0.1, 0.5, 1],
            textShadow: [dimmedShadow, brightShadow, settledShadow],
            y: [12, 2, 0],
          } : undefined}
          transition={{ delay, duration: 1.8, ease: "easeOut", times: [0, 0.58, 1] }}
        >
          {children}
        </motion.span>
      )}
    </span>
  );
};
