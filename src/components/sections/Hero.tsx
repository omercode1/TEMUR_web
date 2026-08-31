import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { FloatingPaths } from '@/components/ui/21st/floating-paths';
import { MotionButton } from '@/components/ui/21st/motion-button';

function useNarrow(query = "(max-width: 767px)") {
  const [narrow, setNarrow] = useState(false);
  useEffect(() => {
    const m = window.matchMedia(query);
    const sync = () => setNarrow(m.matches);
    sync();
    m.addEventListener("change", sync);
    return () => m.removeEventListener("change", sync);
  }, [query]);
  return narrow;
}

export function Hero() {
  const narrow = useNarrow();
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.2]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 30]);

  return (
    <section id="hero" ref={containerRef} className="relative w-full h-[120vh] bg-background">
      <motion.div style={prefersReducedMotion ? {} : { scale, opacity, y }} className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Background System */}
        <div className="absolute inset-0 z-0">
          <FloatingPaths position={1} />
          <FloatingPaths position={-1} />
          
          {/* Subtle Grid */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTQwIDBMMCAwTDAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAyKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9zdmc+')] opacity-50" />
          
          {/* Gradients for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background/50" />
        </div>

        <div className="relative z-10 flex h-full min-h-[92svh] items-start px-6 pt-32 md:min-h-screen md:items-center md:pt-0 lg:px-20 max-w-7xl mx-auto w-full">
          <div className="max-w-[42rem] mt-12 md:mt-0">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
              <span className="text-xs font-mono font-medium tracking-widest text-white/90 uppercase drop-shadow-md">
                TEMUR / CREATIVE TECHNOLOGY STUDIO
              </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-6xl lg:text-[5.5rem] font-display font-bold text-white tracking-tight leading-[1.05] text-balance mb-8 drop-shadow-lg"
            >
              Fikirleri çalışan<br className="hidden md:block"/> dijital ürünlere<br className="hidden md:block"/> dönüştürüyoruz.
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg md:text-xl text-white/80 max-w-2xl leading-relaxed mb-12 text-balance drop-shadow-md"
            >
              Tasarım, yazılım ve dijital deneyimi tek bir sistemde bir araya getiriyoruz.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
            >
              <MotionButton to="/start-project" className="w-full sm:w-auto uppercase tracking-widest text-sm">
                Proje Başlat
              </MotionButton>
              
              <a 
                href="#work"
                className="tech-corners group flex items-center justify-center gap-3 px-8 py-5 w-full sm:w-auto text-white font-semibold border border-white/30 backdrop-blur-sm hover:bg-white/10 hover:border-white/50 transition-colors uppercase tracking-widest text-sm"
              >
                <span>Çalışmalarımızı Gör</span>
              </a>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-8 left-6 lg:left-8 flex flex-col items-center gap-3 text-white/60 hidden md:flex z-10"
        >
          <span className="text-[10px] font-mono tracking-widest text-white/60 uppercase origin-left rotate-90 translate-y-[80px] translate-x-[-10px] block drop-shadow-md">
            Scroll
          </span>
          <div className="w-[1px] h-12 bg-white/30 relative overflow-hidden">
            <motion.div 
              animate={{ y: ['-100%', '100%'] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
              className="absolute inset-0 bg-white"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
