import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { useMobile } from '@/hooks/useMobile';

const projects = [
  {
    id: 1,
    category: "DIGITAL PRODUCT",
    title: "Finansal Yönetim Paneli",
    desc: "Büyük ölçekli veri setlerini işleyen ve görselleştiren modern bir kurumsal finans platformu arayüzü.",
    image: "/images/project1.png",
  },
  {
    id: 2,
    category: "BRAND / WEB EXPERIENCE",
    title: "E-Ticaret Dönüşümü",
    desc: "Performans odaklı, başsız (headless) mimari ile geliştirilmiş yeni nesil alışveriş deneyimi.",
    image: "/images/project2.png",
  },
  {
    id: 3,
    category: "CUSTOM SOFTWARE / AUTOMATION",
    title: "İş Akışı Otomasyonu",
    desc: "Tekrarlayan operasyonel görevleri yapay zeka destekli modüllerle otomatize eden iç yazılım.",
    image: "/images/project3.png",
  }
];

export function SelectedWork() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useMobile();
  const shouldReduceMotion = prefersReducedMotion || isMobile;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section id="work" className="py-32 relative bg-background border-t border-white/5 overflow-hidden">
      
      {/* Background elements to match CapabilityStatement and ProjectCTA */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
          backgroundSize: '64px 64px'
        }}
      />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-32 bg-gradient-to-b from-white/20 to-transparent z-10" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-20">
        <div className="mb-32 flex flex-col items-center text-center">
          <div className="w-16 h-16 border border-white/10 mb-8 flex items-center justify-center">
             <div className="w-2 h-2 bg-white/40" />
          </div>
          <h3 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white tracking-tight mb-6">
            Öne Çıkan Çalışmalar
          </h3>
          <p className="text-text-secondary max-w-2xl text-balance text-lg md:text-xl font-medium">
            Estetik, performans ve kullanılabilirlik odaklı dijital ürün konseptleri ve platform mimarileri.
          </p>
        </div>
        
        <div ref={containerRef} className="relative w-full">
          {projects.map((project, i) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              index={i} 
              total={projects.length} 
              progress={scrollYProgress}
              prefersReducedMotion={!!shouldReduceMotion}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index, total, progress, prefersReducedMotion }: { 
  project: any, index: number, total: number, progress: any, prefersReducedMotion: boolean 
}) {
  const targetScale = 1 - ((total - index - 1) * 0.02);
  const range = [index * (1 / total), 1];
  
  const scale = useTransform(progress, range, [1, prefersReducedMotion ? 1 : targetScale]);
  
  return (
    <div className="relative py-8 md:py-16 flex items-center justify-center md:sticky md:top-32">
      <motion.div 
        style={{ scale }}
        className="group flex flex-col gap-8 w-full max-w-6xl mx-auto bg-surface border border-white/5 p-4 md:p-8 shadow-2xl"
      >
        <div className="relative aspect-[4/3] md:aspect-[21/9] overflow-hidden bg-background border border-white/5">
          
          {/* Project Image */}
          <div className="absolute inset-0">
            <img 
              src={project.image} 
              alt={project.title}
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700"
            />
            {/* Subtle overlay to blend with the dark theme */}
            <div className="absolute inset-0 bg-background/20 group-hover:bg-transparent transition-colors duration-700" />
          </div>
          
          {/* Tech/Grid Overlay */}
          <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay"
            style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
              backgroundSize: '32px 32px'
            }}
          />
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80 pointer-events-none" />
          
          <div className="absolute top-4 right-4 md:top-6 md:right-6 z-20">
            <div className="w-10 h-10 md:w-12 md:h-12 border border-white/10 bg-surface/80 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-colors duration-300">
              <ArrowUpRight className="text-white/70 group-hover:text-black transition-colors duration-300" size={18} />
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pt-2 px-2 md:px-4 pb-4">
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-[10px] md:text-xs font-mono tracking-[0.25em] text-white/40 uppercase">
                {String(index + 1).padStart(2, '0')} — {project.category}
              </span>
            </div>
            <h4 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white tracking-tight mb-4 group-hover:text-white/90 transition-colors">
              {project.title}
            </h4>
            <p className="text-lg text-text-secondary leading-relaxed font-light">
              {project.desc}
            </p>
          </div>
          
          <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-white/50 uppercase group-hover:text-white transition-colors mt-2 md:mt-0">
            İncele 
            <span className="w-8 h-[1px] bg-white/20 group-hover:bg-white transition-colors" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
