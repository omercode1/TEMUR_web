import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

interface TextCursorProximityProps {
  label: string;
  className?: string;
}

export function TextCursorProximity({ label, className = "" }: TextCursorProximityProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPointerFine, setIsPointerFine] = useState(false);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia("(pointer: fine)");
    setIsPointerFine(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setIsPointerFine(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isPointerFine || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    if (!isPointerFine) return;
    mouseX.set(0);
    mouseY.set(0);
  };

  const springConfig = { damping: 20, stiffness: 150 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const letters = label.split("");

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative inline-flex items-center justify-center ${className}`}
    >
      {letters.map((letter, index) => {
        // A simple proximity fake using index
        const centerIndex = (letters.length - 1) / 2;
        const distance = index - centerIndex; // -2, -1, 0, 1, 2
        
        const xOffset = useTransform(springX, [-200, 200], [distance * -2, distance * 2]);
        const yOffset = useTransform(springY, [-200, 200], [-5, 5]);
        
        return (
          <motion.span
            key={index}
            style={isPointerFine ? { x: xOffset, y: yOffset } : {}}
            className="inline-block"
          >
            {letter}
          </motion.span>
        );
      })}
    </div>
  );
}
