import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

const projects = [
  {
    id: 1,
    category: "DIGITAL PRODUCT",
    title: "Finansal Yönetim Paneli",
    desc: "Büyük ölçekli veri setlerini işleyen ve görselleştiren modern bir kurumsal finans platformu arayüzü.",
    color: "from-blue-500/10 to-indigo-500/10",
    renderMockup: () => (
      <div className="absolute inset-0 flex items-center justify-center p-8 opacity-70 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
        <div className="w-full max-w-3xl aspect-[16/10] border border-white/10 bg-background/50 backdrop-blur-md tech-corners p-4 flex flex-col gap-4 shadow-2xl">
          <div className="flex justify-between items-center border-b border-white/10 pb-4">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-white/20" />
              <div className="w-3 h-3 rounded-full bg-white/20" />
              <div className="w-3 h-3 rounded-full bg-white/20" />
            </div>
            <div className="h-2 w-24 bg-white/10 rounded" />
          </div>
          <div className="flex-1 grid grid-cols-4 gap-4">
            <div className="col-span-1 border border-white/5 bg-white/5" />
            <div className="col-span-3 flex flex-col gap-4">
              <div className="h-32 border border-white/5 bg-white/5 flex items-end p-4 gap-2">
                <div className="w-full h-[40%] bg-accent/20" />
                <div className="w-full h-[60%] bg-accent/30" />
                <div className="w-full h-[30%] bg-accent/20" />
                <div className="w-full h-[80%] bg-accent/40" />
                <div className="w-full h-[50%] bg-accent/30" />
                <div className="w-full h-[100%] bg-accent/50" />
              </div>
              <div className="flex-1 grid grid-cols-2 gap-4">
                <div className="border border-white/5 bg-white/5 p-4 flex flex-col gap-2 justify-center">
                  <div className="h-2 w-16 bg-white/20" />
                  <div className="h-6 w-32 bg-white/40" />
                </div>
                <div className="border border-white/5 bg-white/5 p-4 flex flex-col gap-2 justify-center">
                  <div className="h-2 w-16 bg-white/20" />
                  <div className="h-6 w-32 bg-white/40" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 2,
    category: "BRAND / WEB EXPERIENCE",
    title: "E-Ticaret Dönüşümü",
    desc: "Performans odaklı, başsız (headless) mimari ile geliştirilmiş yeni nesil alışveriş deneyimi.",
    color: "from-emerald-500/10 to-teal-500/10",
    renderMockup: () => (
      <div className="absolute inset-0 flex items-center justify-center p-8 opacity-70 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
        <div className="w-full max-w-3xl aspect-[16/10] border border-white/10 bg-background/50 backdrop-blur-md tech-corners p-4 flex flex-col gap-4 shadow-2xl">
          <div className="flex justify-between items-center border-b border-white/10 pb-4">
            <div className="h-4 w-32 bg-white/20" />
            <div className="flex gap-4">
              <div className="h-2 w-12 bg-white/10" />
              <div className="h-2 w-12 bg-white/10" />
            </div>
          </div>
          <div className="flex-1 flex gap-4">
            <div className="w-1/2 border border-white/5 bg-white/5 relative overflow-hidden">
               <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTIwIDBMMCAyMEwyMCA0MEw0MCAyMEwyMCAwWiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3N2Zz4=')] opacity-50" />
            </div>
            <div className="w-1/2 flex flex-col gap-4 py-8">
              <div className="h-8 w-3/4 bg-white/30" />
              <div className="h-4 w-1/4 bg-accent/50 mb-4" />
              <div className="h-2 w-full bg-white/10" />
              <div className="h-2 w-5/6 bg-white/10" />
              <div className="h-2 w-4/6 bg-white/10" />
              <div className="mt-auto h-12 w-full bg-white/20 tech-corners flex items-center justify-center">
                <div className="h-3 w-24 bg-white/40" />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 3,
    category: "CUSTOM SOFTWARE / AUTOMATION",
    title: "İş Akışı Otomasyonu",
    desc: "Tekrarlayan operasyonel görevleri yapay zeka destekli modüllerle otomatize eden iç yazılım.",
    color: "from-orange-500/10 to-red-500/10",
    renderMockup: () => (
      <div className="absolute inset-0 flex items-center justify-center p-8 opacity-70 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
        <svg className="w-full max-w-3xl h-full" viewBox="0 0 800 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Grid */}
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1"/>
          </pattern>
          <rect width="800" height="400" fill="url(#grid)" />
          
          {/* Connection Lines */}
          <path d="M 200 200 C 300 200, 300 120, 400 120" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeDasharray="4 4" className="animate-[dash_20s_linear_infinite]" />
          <path d="M 200 200 C 300 200, 300 280, 400 280" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
          <path d="M 520 120 C 600 120, 600 200, 680 200" stroke="rgba(79,70,229,0.5)" strokeWidth="2" />
          <path d="M 520 280 C 600 280, 600 200, 680 200" stroke="rgba(79,70,229,0.5)" strokeWidth="2" />
          
          {/* Nodes */}
          <rect x="80" y="160" width="120" height="80" rx="4" fill="#12121a" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
          <rect x="100" y="195" width="80" height="10" rx="2" fill="rgba(255,255,255,0.2)" />
          
          <rect x="400" y="80" width="120" height="80" rx="4" fill="#12121a" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
          <rect x="420" y="115" width="80" height="10" rx="2" fill="rgba(255,255,255,0.2)" />

          <rect x="400" y="240" width="120" height="80" rx="4" fill="#12121a" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
          <rect x="420" y="275" width="80" height="10" rx="2" fill="rgba(255,255,255,0.2)" />

          <rect x="680" y="160" width="80" height="80" rx="40" fill="#4f46e5" fillOpacity="0.2" stroke="#4f46e5" strokeWidth="2" />
          <circle cx="720" cy="200" r="10" fill="#818cf8" />
        </svg>
      </div>
    )
  }
];

export function SelectedWork() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section id="work" className="py-32 lg:py-48 relative bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <h2 className="text-xs font-mono tracking-widest text-accent uppercase mb-4">SELECTED WORK / 03</h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
              Ne inşa ediyoruz?
            </h3>
          </div>
          <p className="text-text-secondary max-w-md text-balance">
            Estetik, performans ve kullanılabilirlik odaklı dijital ürün konseptleri ve platform mimarileri.
          </p>
        </div>
        
        <div ref={containerRef} className="relative w-full">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} total={projects.length} progress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index, total, progress }: { key?: React.Key, project: any, index: number, total: number, progress: any }) {
  const targetScale = 1 - ((total - index - 1) * 0.05);
  
  const range = [index * (1 / total), 1];
  const scale = useTransform(progress, range, [1, targetScale]);
  const opacity = useTransform(progress, range, [1, 0.5]);
  const y = useTransform(progress, range, [0, -50]);

  return (
    <div className="h-[90vh] md:h-[110vh] flex items-center justify-center sticky top-0" style={{ paddingTop: `calc(10vh + ${index * 20}px)` }}>
      <motion.div
        style={{ scale, opacity, y }}
        className="group flex flex-col gap-8 w-full max-w-6xl mx-auto bg-background origin-top"
      >
        <div
          className="relative aspect-[4/3] md:aspect-[21/9] bg-surface overflow-hidden border border-white/10 tech-corners cursor-pointer"
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-20 group-hover:opacity-40 transition-opacity duration-700`} />
          
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTY0IDBMMCAwTDAgNjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAyKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9zdmc+')] opacity-50" />
          
          {project.renderMockup()}
          
          <div className="absolute top-6 right-6 z-10">
            <div className="w-12 h-12 border border-white/20 bg-background/50 backdrop-blur-sm flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all duration-500 overflow-hidden tech-corners">
              <ArrowUpRight className="text-white group-hover:text-black group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-500" />
            </div>
          </div>
        </div>
        
        <div
          className="flex flex-col md:flex-row md:items-start justify-between gap-6 px-2 pb-12"
        >
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-xs font-mono tracking-widest text-accent uppercase">
                {project.category}
              </span>
              <div className="h-px bg-white/10 flex-1 md:hidden" />
            </div>
            <h4 className="text-3xl md:text-4xl font-display font-semibold text-white mb-4">
              {project.title}
            </h4>
            <p className="text-lg text-text-secondary leading-relaxed">
              {project.desc}
            </p>
          </div>
          
          <button className="text-sm font-semibold text-white hover:text-accent transition-colors flex items-center gap-2 mt-2 md:mt-0 font-mono tracking-wider uppercase">
            İncele <ArrowUpRight size={16} />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
