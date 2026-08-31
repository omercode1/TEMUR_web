import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';

const stages = [
  { num: "01", name: "Keşfet", desc: "Kod yazmadan önce problemi, iş hedeflerini ve teknik gereksinimleri analiz ediyoruz." },
  { num: "02", name: "Tanımla", desc: "Projenin temel iskeletini, veri akışını ve sistem altyapısını planlıyoruz." },
  { num: "03", name: "Tasarla", desc: "Marka kimliğine uygun, kullanıcı odaklı, temiz ve etkili arayüzler tasarlıyoruz." },
  { num: "04", name: "Geliştir", desc: "Ölçeklenebilir, performanslı ve modern standartlara uygun kod yazıyoruz." },
  { num: "05", name: "Test Et", desc: "Güvenlik, hız, erişilebilirlik ve edge-case senaryolarını titizlikle test ediyoruz." },
  { num: "06", name: "Yayınla", desc: "Sıfır kesinti ve dikkatli bir izleme süreci ile ürünü production ortamına taşıyoruz." },
  { num: "07", name: "İyileştir", desc: "Gerçek kullanıcı verilerine dayanarak iterasyonlar yapıyor ve sistemi ölçeklendiriyoruz." }
];

export function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  return (
    <section id="process" className="py-32 lg:py-48 relative bg-surface border-y border-white/5 overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEgMWgyMHYyMEgxVjF6IiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wMykiIHN0cm9rZS13aWR0aD0iMSIvPjwvc3ZnPg==')] opacity-30" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="mb-24 md:w-1/2">
          <h2 className="text-xs font-mono tracking-widest text-accent uppercase mb-4">PROCESS / 02</h2>
          <h3 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white tracking-tight text-balance">
            Fikirden ürüne giden yol.
          </h3>
        </div>

        <div ref={containerRef} className="relative mt-12 md:mt-0">
          {/* Vertical Progress Line Background */}
          <div className="absolute left-[11px] md:left-[19px] top-4 bottom-4 w-px bg-white/10" />
          
          {/* Active Progress Line */}
          <motion.div 
            className="absolute left-[11px] md:left-[19px] top-4 w-px bg-accent origin-top"
            style={{ scaleY: prefersReducedMotion ? 1 : scrollYProgress }}
          />

          <div className="flex flex-col gap-16 lg:gap-24 relative z-10 md:ml-12">
            {stages.map((stage, i) => {
              const start = i / stages.length;
              const end = (i + 1) / stages.length;

              return (
                <ProcessStep 
                  key={stage.num} 
                  stage={stage} 
                  progress={scrollYProgress} 
                  start={start}
                  end={end}
                  prefersReducedMotion={!!prefersReducedMotion}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProcessStep({ stage, progress, start, end, prefersReducedMotion }: { key?: React.Key, stage: any, progress: any, start: number, end: number, prefersReducedMotion: boolean }) {
  const opacity = useTransform(
    progress,
    [Math.max(0, start - 0.1), start, end, Math.min(1, end + 0.1)],
    [0.3, 1, 1, 0.3]
  );

  const dotColor = useTransform(
    progress,
    [start - 0.05, start],
    ["#1e1e24", "#4f46e5"] 
  );
  
  const xOffset = useTransform(
    progress,
    [start - 0.1, start],
    [20, 0]
  );

  return (
    <motion.div 
      style={{ 
        opacity: prefersReducedMotion ? 1 : opacity,
        x: prefersReducedMotion ? 0 : xOffset
      }} 
      className="flex gap-8 md:gap-16 items-start group"
    >
      <div className="relative shrink-0 mt-1">
        <motion.div 
          className="w-6 h-6 md:w-10 md:h-10 border border-white/20 flex items-center justify-center bg-surface rotate-45 transition-colors duration-500"
          style={{ borderColor: prefersReducedMotion ? "#4f46e5" : dotColor }}
        >
          <motion.div 
            className="w-1.5 h-1.5"
            style={{ backgroundColor: prefersReducedMotion ? "#4f46e5" : dotColor }}
          />
        </motion.div>
      </div>
      
      <div>
        <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6 mb-3">
          <span className="text-sm font-mono text-accent/80 font-medium tracking-wider">[{stage.num}]</span>
          <h4 className="text-2xl md:text-3xl font-display font-semibold text-white">
            {stage.name}
          </h4>
        </div>
        <p className="text-lg text-text-secondary max-w-2xl leading-relaxed">
          {stage.desc}
        </p>
      </div>
    </motion.div>
  );
}
