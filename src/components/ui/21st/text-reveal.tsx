import { FC, ReactNode, useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "motion/react";

interface TextRevealProps {
  text: string;
  className?: string;
}

export const TextReveal: FC<TextRevealProps> = ({ text, className }) => {
  const targetRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start 60%", "end 70%"],
  });

  const words = text.split(" ");

  return (
    <div ref={targetRef} className={"relative z-0 h-[115vh] " + (className || "")}>
      <div className="sticky top-[25vh] mx-auto flex max-w-4xl items-center bg-transparent px-[1rem] py-[2rem]">
        <p className="flex flex-wrap p-5 text-3xl md:text-5xl lg:text-6xl font-display font-bold text-white/20">
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            return (
              <Word key={i} progress={scrollYProgress} range={[start, end]}>
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
}

const Word: FC<WordProps> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0, 1]);
  return (
    <span className="xl:lg-3 relative mx-1 lg:mx-2.5">
      <span className="absolute opacity-100 text-white/20">{children}</span>
      <motion.span style={{ opacity }} className="text-white relative z-10">
        {children}
      </motion.span>
    </span>
  );
};
