import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useMobile } from '@/hooks/useMobile';

export type TabItem = {
  id: string;
  title: string;
  description: string;
  image: string;
};

interface VerticalTabsProps {
  tabs: TabItem[];
  title?: string;
  subtitle?: string;
  autoPlayDuration?: number;
}

export function VerticalTabs({ 
  tabs, 
  title = "How I can help you", 
  subtitle = "(SERVICES)",
  autoPlayDuration = 5000 
}: VerticalTabsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const isMobile = useMobile();

  const handleNext = useCallback(() => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % tabs.length);
  }, [tabs.length]);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + tabs.length) % tabs.length);
  }, [tabs.length]);

  const handleTabClick = (index: number) => {
    if (index === activeIndex) return;
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
    setIsPaused(true);
  };

  useEffect(() => {
    if (isPaused || isMobile) return;

    const interval = setInterval(() => {
      handleNext();
    }, autoPlayDuration);

    return () => clearInterval(interval);
  }, [activeIndex, isPaused, isMobile, handleNext, autoPlayDuration]);

  const variants = {
    enter: (direction: number) => ({
      y: direction > 0 ? "-100%" : "100%",
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      y: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      y: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Content */}
        <div className="lg:col-span-5 flex flex-col justify-center order-2 lg:order-1 pt-4">
          <div className="space-y-4 mb-12">
            <h2 className="tracking-tighter text-balance text-4xl font-display font-bold md:text-5xl lg:text-6xl text-white">
              {title}
            </h2>
            {subtitle && (
              <span className="text-sm font-mono text-white/50 uppercase tracking-[0.2em] block ml-0.5">
                {subtitle}
              </span>
            )}
          </div>

          <div className="flex flex-col space-y-0 relative pl-4">
            {/* Background Line for the track */}
            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-white/5" />
            
            {tabs.map((tab, index) => {
              const isActive = activeIndex === index;
              return (
                <div
                  key={tab.id}
                  onClick={() => handleTabClick(index)}
                  className={cn(
                    "hover-target group relative flex items-start gap-4 py-5 md:py-6 text-left transition-all duration-500",
                    isActive
                      ? "text-white"
                      : "text-white/40 hover:text-white/80"
                  )}
                >
                  <div className="absolute left-[-16px] top-0 bottom-0 w-[2px]">
                    {isActive && (
                      <motion.div
                        key={`progress-${index}-${isPaused}`}
                        className="absolute top-0 left-0 w-full bg-white origin-top shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                        initial={{ height: "0%" }}
                        animate={
                          isPaused ? { height: "0%" } : { height: "100%" }
                        }
                        transition={{
                          duration: autoPlayDuration / 1000,
                          ease: "linear",
                        }}
                      />
                    )}
                  </div>

                  <span className="text-xs font-mono mt-1 opacity-60">
                    /{tab.id}
                  </span>

                  <div className="flex flex-col gap-2 flex-1">
                    <span
                      className={cn(
                        "text-2xl md:text-3xl font-display font-semibold tracking-tight transition-colors duration-500",
                        isActive ? "text-white" : ""
                      )}
                    >
                      {tab.title}
                    </span>

                    <AnimatePresence mode="wait">
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{
                            duration: 0.22,
                            ease: [0.23, 1, 0.32, 1],
                          }}
                          className="overflow-hidden"
                        >
                          <p className="text-white/70 text-base md:text-lg font-light leading-relaxed max-w-sm pb-2 mt-2">
                            {tab.description}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-7 flex flex-col justify-end h-full order-1 lg:order-2">
          <div
            className="relative group/gallery"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="relative aspect-[4/3] sm:aspect-square md:aspect-[4/3] lg:aspect-[4/5] xl:aspect-square rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden bg-surface border border-white/10 shadow-2xl">
              <AnimatePresence
                initial={false}
                custom={direction}
                mode="popLayout"
              >
                <motion.div
                  key={activeIndex}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    y: { type: "spring", stiffness: 360, damping: 28 },
                    opacity: { duration: 0.3 },
                  }}
                  className="hover-target absolute inset-0 w-full h-full"
                  onClick={handleNext}
                >
                  {/* Grain/Texture overlay on images for aesthetic */}
                  <div className="absolute inset-0 z-10 opacity-30 mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />
                  
                  <img
                    src={tabs[activeIndex].image}
                    alt={tabs[activeIndex].title}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105 opacity-80"
                  />

                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background via-background/40 to-transparent opacity-90 z-10" />
                </motion.div>
              </AnimatePresence>

              <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 flex gap-2 md:gap-3 z-20">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrev();
                  }}
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-surface/80 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all active:scale-90"
                  aria-label="Previous"
                >
                  <ArrowLeft size={20} className="text-white/80" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-surface/80 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all active:scale-90"
                  aria-label="Next"
                >
                  <ArrowRight size={20} className="text-white/80" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
