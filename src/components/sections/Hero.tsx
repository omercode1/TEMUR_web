import { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { MotionButton } from '@/components/ui/MotionButton';
import { HeroBackground } from '@/components/ui/HeroBackground';
import { useMobile } from '@/hooks/useMobile';

export function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useMobile();
  const shouldReduceMotion = prefersReducedMotion || isMobile;
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 0.98]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  return (
    <section id="hero" ref={containerRef} className="relative w-full min-h-[100svh] md:min-h-screen bg-background overflow-hidden flex items-center">
      <motion.div 
        className="absolute inset-0 z-0 origin-center pointer-events-auto"
        style={shouldReduceMotion ? {} : { scale: bgScale, y: bgY }}
      >
        <HeroBackground />
      </motion.div>

      <div className="relative z-10 flex h-full min-h-[92svh] items-center px-4 sm:px-6 md:min-h-screen lg:px-20 max-w-7xl mx-auto w-full pointer-events-none">
        <div className="max-w-[50rem] mt-32 md:mt-0 relative text-center md:text-left w-full mx-auto md:mx-0 flex flex-col items-center md:items-start pointer-events-auto">
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-4 mb-10"
          >
            <span className="w-12 md:w-20 h-[1px] bg-white/50 hidden md:block"></span>
            <span className="text-xs md:text-sm font-mono tracking-[0.3em] text-white/80 uppercase" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
              CREATIVE TECHNOLOGY STUDIO
            </span>
            <span className="w-12 md:w-20 h-[1px] bg-white/50 hidden md:block"></span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-7xl lg:text-[7.5rem] font-display font-bold text-white tracking-tighter leading-[1] text-balance mb-8 drop-shadow-xl"
          >
            Sistemler<br className="hidden md:block"/> inşa ediyoruz.
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-2xl text-white/70 max-w-2xl leading-relaxed mb-16 text-balance font-light" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}
          >
            Dijital kaosu düzenliyor, işinizi büyütecek <span className="text-white font-medium">kusursuz yapılar</span> kuruyoruz.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto"
          >
            <MotionButton to="/start-project" variant="white" className="w-full sm:w-auto uppercase tracking-widest text-sm py-4 px-10 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]">
              Proje Başlat
            </MotionButton>
            
            <a 
              href="#work"
              className="hover-target group relative flex items-center justify-center gap-3 px-10 py-4 w-full sm:w-auto text-white font-semibold uppercase tracking-widest text-sm overflow-hidden"
            >
              <span className="absolute inset-0 w-full h-full border border-white/20 transition-all duration-500 ease-out group-hover:border-white"></span>
              <span className="absolute inset-0 w-0 h-full bg-white/5 transition-all duration-500 ease-out group-hover:w-full"></span>
              <span className="relative z-10 transition-transform duration-500 group-hover:x-2">Çalışmalarımız</span>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator - Removed mix-blend for perf */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={isLoaded ? { opacity: 1 } : {}}
        transition={{ duration: 2, delay: 2 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-white/60 z-10"
      >
        <span className="text-[10px] font-mono tracking-[0.3em] text-white/40 uppercase block">
          Scroll
        </span>
        <div className="w-[1px] h-16 bg-white/10 relative overflow-hidden mt-4">
          <motion.div 
            animate={{ y: ['-100%', '100%'] }}
            transition={{ repeat: Infinity, duration: 2, ease: [0.65, 0, 0.35, 1] }}
            className="absolute inset-0 bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]"
          />
        </div>
      </motion.div>
    </section>
  );
}
