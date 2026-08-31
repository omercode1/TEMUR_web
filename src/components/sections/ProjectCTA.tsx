import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { MotionButton } from '@/components/ui/21st/motion-button';
import { FloatingPaths } from '@/components/ui/21st/floating-paths';

export function ProjectCTA() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 0.5]);

  return (
    <section id="start-project" ref={containerRef} className="py-48 relative overflow-hidden bg-background border-t border-white/5">
      {/* Background Grids & Elements */}
      <div className="absolute inset-0 bg-accent/5" />
      
      <motion.div 
        style={prefersReducedMotion ? {} : { y, opacity }}
        className="absolute inset-0 pointer-events-none opacity-20 flex justify-center items-center"
      >
        <div className="w-full h-[200%] bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTY0IDBMMCAwTDAgNjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSg3OSwgNzAsIDIyOS,IDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvc3ZnPg==')] opacity-50" />
      </motion.div>
      
      <div className="absolute inset-0 z-0 opacity-40">
        <FloatingPaths position={2} />
      </div>

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-32 bg-gradient-to-b from-accent to-transparent z-10" />

      <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-20 text-center flex flex-col items-center">
        <div className="w-16 h-16 border border-accent/30 bg-accent/10 tech-corners mb-12 flex items-center justify-center">
          <div className="w-2 h-2 bg-accent animate-pulse" />
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
      </div>
    </section>
  );
}
