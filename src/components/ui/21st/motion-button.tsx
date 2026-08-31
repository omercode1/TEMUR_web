import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useState, ReactNode } from "react";
import { Link } from "react-router-dom";

export function MotionButton({ href, to, onClick, children, className = "" }: { href?: string, to?: string, onClick?: () => void, children: ReactNode, className?: string }) {
  const [isHovered, setIsHovered] = useState(false);

  const innerContent = (
    <>
      <motion.div
        className="absolute inset-0 bg-accent z-0"
        initial={{ x: "-100%" }}
        animate={{ x: isHovered ? "0%" : "-100%" }}
        transition={{ type: "tween", ease: [0.16, 1, 0.3, 1], duration: 0.5 }}
      />
      <span className="relative z-10">{children}</span>
      <div className="relative z-10 w-6 h-6 overflow-hidden flex items-center justify-center">
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: isHovered ? 24 : 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 flex items-center"
        >
          <ArrowRight size={18} />
        </motion.div>
        <motion.div
          initial={{ x: -24 }}
          animate={{ x: isHovered ? 0 : -24 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 flex items-center"
        >
          <ArrowRight size={18} />
        </motion.div>
      </div>
    </>
  );

  const baseClasses = `relative inline-flex items-center justify-center gap-4 px-12 py-5 overflow-hidden font-semibold transition-transform active:scale-95 border border-white/20 bg-background text-white tech-corners ${className}`;

  if (to) {
    return (
      <Link
        to={to}
        className={baseClasses}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick}
      >
        {innerContent}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        className={baseClasses}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick}
      >
        {innerContent}
      </a>
    );
  }

  return (
    <button
      className={baseClasses}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {innerContent}
    </button>
  );
}
