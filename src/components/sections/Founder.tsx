import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { useMobile } from '@/hooks/useMobile';
import { ShaderBackground } from '@/components/ui/ShaderBackground';
import { Braces, Layers3, Sparkles } from 'lucide-react';

const founderData = {
  role: "FOUNDER & CEO",
  primaryStatement: "Tasarım ve geliştirmeyi aynı süreçte ele alarak web deneyimleri, yazılım ürünleri ve dijital sistemler geliştiriyor.",
  secondaryStatement: "TEMUR; teknik üretimle görsel düşünceyi birbirinden ayırmadan, ihtiyaca göre şekillenen dijital işler üretmek için kuruldu.",
  capabilities: "WEB / SOFTWARE / BRAND / DIGITAL"
};

const disciplines = [
  { label: 'STRATEJİ', icon: Sparkles, position: 'top-0 left-1/2 -translate-x-1/2' },
  { label: 'TASARIM', icon: Layers3, position: 'bottom-8 -left-2 md:left-0' },
  { label: 'GELİŞTİRME', icon: Braces, position: 'bottom-8 -right-2 md:right-0' },
] as const;

export function Founder() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useMobile();
  const shouldReduceMotion = prefersReducedMotion || isMobile;
  
  // Only use scroll for a simple opacity fade-in — no spring, no parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start center"]
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="founder" ref={containerRef} data-testid="founder-section" className="py-16 md:py-32 relative bg-surface border-t border-white/5 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-80 mix-blend-lighten">
        <ShaderBackground className="w-full h-full" />
      </div>
      
      {/* Static structural lines — no animation */}
      <div className="absolute inset-0 pointer-events-none hidden lg:block">
        <div className="absolute left-[10%] top-0 bottom-0 w-[1px] bg-white/[0.02]" />
        <div className="absolute right-[10%] top-0 bottom-0 w-[1px] bg-white/[0.02]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-10 md:gap-16 lg:gap-24 items-stretch">
          
          {/* LEFT: Content — simple fade in, no parallax */}
          <motion.div 
            style={{ opacity: shouldReduceMotion ? 1 : opacity }}
            className="w-full lg:w-[55%] flex flex-col justify-center"
          >

            
            <div className="mb-8 md:mb-12 lg:mb-16 relative">
              <h3 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/40 tracking-tighter leading-[0.9] md:leading-[0.85] mb-5 md:mb-6 drop-shadow-2xl">
                ÖMER<br />TEMURTAŞ
              </h3>
              <div className="inline-flex items-center gap-3 px-3 py-1.5 border border-white/10 bg-white/5">
                <span className="w-1.5 h-1.5 rounded-full bg-white/60"></span>
                <p className="text-[10px] md:text-xs font-mono tracking-widest text-white/70 uppercase">
                  {founderData.role}
                </p>
              </div>
            </div>
            
            <div className="relative space-y-6 md:space-y-8 max-w-xl lg:mb-16">
              <div className="absolute left-0 top-2 bottom-2 w-[1px] bg-white/10 hidden md:block" />
              
              <p className="text-xl md:text-[28px] text-white/95 leading-[1.35] md:leading-[1.3] text-balance font-medium tracking-tight md:pl-8">
                {founderData.primaryStatement}
              </p>
              
              <p className="text-sm md:text-base text-white/50 leading-relaxed text-balance md:pl-8">
                {founderData.secondaryStatement}
              </p>
            </div>
            
            <div className="hidden lg:block pt-10 mt-auto">
              <div className="flex items-center gap-4">
                <span className="w-4 h-[1px] bg-white/20"></span>
                <p className="text-[10px] font-mono tracking-[0.3em] text-white/30 uppercase">
                  {founderData.capabilities}
                </p>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: Studio disciplines map — static, no parallax */}
          <div className="w-full lg:w-[45%] flex items-center justify-center lg:justify-end relative">
            <motion.div 
              data-testid="founder-map"
              style={{ opacity: shouldReduceMotion ? 1 : opacity }}
              className="relative w-full max-w-[280px] sm:max-w-[320px] md:max-w-[400px] aspect-square"
            >
              <div className="absolute inset-[12%] rounded-full border border-white/[0.08]" />
              <div className="absolute inset-[22%] rounded-full border border-dashed border-white/[0.12]" />
              <div className="absolute left-1/2 top-[15%] h-[70%] w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-white/[0.12] to-transparent" />
              <div className="absolute top-1/2 left-[15%] h-px w-[70%] -translate-y-1/2 bg-gradient-to-r from-transparent via-white/[0.12] to-transparent" />

              <div className="absolute inset-0 pointer-events-none" style={{
                background: 'radial-gradient(circle at center, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.02) 24%, transparent 55%)'
              }} />

              <div className="absolute inset-[31%] z-10 flex flex-col items-center justify-center rounded-full border border-white/20 bg-background/80 text-center shadow-[0_0_60px_rgba(255,255,255,0.06)]">
                <span className="font-mono text-[9px] tracking-[0.28em] text-white/40">TEMUR</span>
                <span className="mt-1 font-display text-2xl font-semibold tracking-tight text-white">STUDIO</span>
                <span className="mt-3 h-px w-7 bg-white/25" />
                <span className="mt-3 font-mono text-[8px] tracking-[0.16em] text-white/45">FİKİRDEN ÜRÜNE</span>
              </div>

              {disciplines.map(({ label, icon: Icon, position }) => (
                <div key={label} className={`absolute z-20 ${position}`}>
                  <div className="flex items-center gap-2 bg-surface px-3 py-2">
                    <Icon aria-hidden="true" size={13} strokeWidth={1.5} className="text-white/65" />
                    <span className="font-mono text-[9px] tracking-[0.16em] text-white/75">{label}</span>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Mobile capabilities */}
          <div className="block lg:hidden w-full pt-6 border-t border-white/5">
            <div className="flex items-center justify-center gap-3">
              <span className="w-3 h-[1px] bg-white/20"></span>
              <p className="text-[9px] sm:text-[10px] font-mono tracking-[0.3em] text-white/30 uppercase text-center">
                {founderData.capabilities}
              </p>
              <span className="w-3 h-[1px] bg-white/20"></span>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
