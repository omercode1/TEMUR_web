import React, { useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { ArrowRight } from 'lucide-react';

const services = [
  {
    num: "01",
    title: "Web Deneyimleri",
    desc: "Yüksek görsel etkiye ve akıcı performansa sahip, markanızı dijitalde konumlandıran premium web siteleri.",
  },
  {
    num: "02",
    title: "Web Uygulamaları",
    desc: "Karmaşık iş mantıklarını yöneten, ölçeklenebilir, güvenli ve kullanıcı odaklı özel tarayıcı tabanlı platformlar.",
  },
  {
    num: "03",
    title: "Özel Yazılım",
    desc: "İhtiyaca özel mimarilerle tasarlanmış, iş süreçlerinizi doğrudan hızlandıran iç sistemler ve operasyonel yazılımlar.",
  },
  {
    num: "04",
    title: "Otomasyon",
    desc: "Tekrarlayan görevleri ortadan kaldıran, sistemler arası veri akışını sağlayan akıllı entegrasyonlar ve botlar.",
  },
  {
    num: "05",
    title: "Yapay Zeka Sistemleri",
    desc: "Büyük dil modellerini (LLM) iş süreçlerinize entegre eden, akıllı asistanlar ve veri analiz sistemleri.",
  },
  {
    num: "06",
    title: "Marka & Dijital",
    desc: "Kurumsal kimlik, dijital tasarım sistemleri ve markanızı online dünyada güçlendirecek görsel stratejiler.",
  }
];

export function Services() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="services" className="pt-20 pb-32 lg:pt-32 lg:pb-48 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <h2 className="text-xs font-mono tracking-widest text-accent uppercase mb-4">CAPABILITIES / 01</h2>
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white tracking-tight max-w-3xl">
              İhtiyaca göre tasarlıyor,<br className="hidden md:block"/> ürüne göre geliştiriyoruz.
            </h3>
          </div>
          <p className="text-text-secondary max-w-md text-balance">
            Hazır şablonlar değil, sistem mühendisliği ve dijital işçilik gerektiren özel çözümler üretiyoruz.
          </p>
        </div>

        <div className="flex flex-col border-t border-white/10">
          {services.map((service, i) => (
            <ServiceRow 
              key={service.num} 
              service={service} 
              index={i}
              isHovered={hoveredIndex === i}
              onHover={() => setHoveredIndex(i)}
              onLeave={() => setHoveredIndex(null)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceRow({ service, index, isHovered, onHover, onLeave }: { key?: React.Key, service: any, index: number, isHovered: boolean, onHover: () => void, onLeave: () => void }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(rowRef, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={rowRef}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className="group relative border-b border-white/10 py-12 md:py-16 flex flex-col lg:flex-row lg:items-center gap-8 cursor-pointer overflow-hidden tech-corners"
    >
      {/* Background Hover Effect */}
      <div 
        className={`absolute inset-0 bg-white/[0.02] transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`} 
      />
      
      <div className="relative z-10 lg:w-1/4">
        <span className="font-mono text-xl text-text-tertiary group-hover:text-accent transition-colors duration-500">
          {service.num}
        </span>
      </div>
      
      <div className="relative z-10 lg:w-2/4">
        <h4 className="text-3xl md:text-4xl font-display font-semibold text-white mb-4 group-hover:translate-x-2 transition-transform duration-500 ease-out">
          {service.title}
        </h4>
        <p className="text-text-secondary leading-relaxed max-w-xl group-hover:text-white/90 transition-colors duration-500">
          {service.desc}
        </p>
      </div>

      <div className="relative z-10 lg:w-1/4 flex justify-start lg:justify-end">
        <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all duration-500">
          <ArrowRight className="text-white/50 group-hover:text-black group-hover:-rotate-45 transition-all duration-500" />
        </div>
      </div>
    </motion.div>
  );
}
