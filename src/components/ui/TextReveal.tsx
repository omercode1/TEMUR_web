import { FC, ReactNode, useRef } from "react";
import { motion, useScroll, useTransform, MotionValue, useReducedMotion } from "motion/react";
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

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start 85%", "center 50%"],
  });

  const words = text.split(" ");

  return (
    <div ref={targetRef} className={`relative z-0 py-24 md:py-32 ${className || ""}`}>
      <div className="mx-auto flex max-w-4xl items-center justify-center bg-transparent px-[1rem]">
        <p className="flex flex-wrap justify-center text-3xl md:text-5xl lg:text-6xl font-display font-bold">
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            return (
              <Word key={i} progress={scrollYProgress} range={[start, end]} shouldReduceMotion={shouldReduceMotion}>
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
  progress: MotionValue<number>;
  range: [number, number];
  shouldReduceMotion?: boolean;
}

const Word: FC<WordProps> = ({ children, progress, range, shouldReduceMotion }) => {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <span className="relative inline-block mx-1 lg:mx-2.5 mb-2 lg:mb-4">
      {shouldReduceMotion ? (
        <span className="text-white">{children}</span>
      ) : (
        <motion.span style={{ opacity }} className="text-white inline-block">
          {children}
        </motion.span>
      )}
    </span>
  );
};
