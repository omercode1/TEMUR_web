import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { MotionButton } from '@/components/ui/MotionButton';
import { useMobile } from '@/hooks/useMobile';

export function ProjectCTA() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useMobile();
  const shouldReduceMotion = prefersReducedMotion || isMobile;
  
  // Simple scroll-based opacity only — no spring, no y parallax, no FloatingPaths
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"]
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="start-project" ref={containerRef} className="py-24 md:py-32 relative overflow-hidden bg-background border-t border-white/5">
      {/* Static background — no animated grid, no FloatingPaths */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
          backgroundSize: '64px 64px'
        }}
      />
      
      {/* Simple top line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-32 bg-gradient-to-b from-white/30 to-transparent z-10" />

      <motion.div 
        style={shouldReduceMotion ? {} : { opacity }}
        className="max-w-4xl mx-auto px-6 lg:px-8 relative z-20 text-center flex flex-col items-center"
      >
        <div className="w-16 h-16 border border-white/20 mb-12 flex items-center justify-center">
          <div className="w-2 h-2 bg-white/60" />
        </div>
        
        <h2 className="text-5xl md:text-7xl font-display font-bold tracking-tight mb-6 text-white">
          Bir fikrin mi var?
        </h2>
        <p className="text-xl md:text-2xl text-text-secondary font-medium mb-12 max-w-2xl mx-auto text-balance">
          Sadece konseptte kalmasın. Üretim sürecine geçelim ve birlikte çalışan bir ürüne dönüştürelim.
        </p>

        <MotionButton to="/start-project" className="uppercase tracking-widest text-sm">
          Projeyi Başlat
        </MotionButton>
      </motion.div>
    </section>
  );
}
