import { ArrowRight } from "lucide-react";
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface MotionButtonProps {
  href?: string;
  to?: string;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
  hideArrow?: boolean;
  variant?: "default" | "white";
}

export function MotionButton({ 
  href, 
  to, 
  onClick, 
  children, 
  className = "", 
  hideArrow = false,
  variant = "default" 
}: MotionButtonProps) {
  const isWhite = variant === "white";

  const innerContent = (
    <>
      <div 
        className={cn(
          "absolute inset-0 z-0 origin-left scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          isWhite ? "bg-black" : "bg-white"
        )} 
      />
      <span 
        className={cn(
          "relative z-10 transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          isWhite ? "text-black group-hover/btn:text-white" : "text-white group-hover/btn:text-background"
        )}
      >
        {children}
      </span>
      {!hideArrow && (
        <div className="relative z-10 w-6 h-6 overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 flex items-center transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/btn:translate-x-[24px]">
            <ArrowRight 
              size={18} 
              className={cn(
                "transition-colors duration-500",
                isWhite ? "text-black group-hover/btn:text-white" : "text-white group-hover/btn:text-background"
              )} 
            />
          </div>
          <div className="absolute inset-0 flex items-center -translate-x-[24px] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/btn:translate-x-0">
            <ArrowRight 
              size={18} 
              className={cn(
                "transition-colors duration-500",
                isWhite ? "text-black group-hover/btn:text-white" : "text-white group-hover/btn:text-background"
              )} 
            />
          </div>
        </div>
      )}
    </>
  );

  const baseClasses = cn(
    "group/btn relative inline-flex items-center justify-center gap-4 px-12 py-5 overflow-hidden font-semibold transition-all active:scale-95 tech-corners",
    isWhite 
      ? "bg-white text-black border border-white hover:border-white" 
      : "bg-background text-white border border-white/20 hover:border-white",
    className
  );

  if (to) {
    return (
      <Link to={to} className={baseClasses} onClick={onClick}>
        {innerContent}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={baseClasses} onClick={onClick}>
        {innerContent}
      </a>
    );
  }

  return (
    <button className={baseClasses} onClick={onClick}>
      {innerContent}
    </button>
  );
}
