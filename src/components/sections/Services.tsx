import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

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
  return (
    <section id="services" data-testid="services-section" className="py-16 md:py-32 relative bg-surface border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-12 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8">
          <div>

            <h3 className="text-4xl md:text-5xl lg:text-7xl font-display font-bold text-white tracking-tight max-w-3xl">
              İhtiyaca göre tasarlıyor,<br className="hidden md:block"/> ürüne göre geliştiriyoruz.
            </h3>
          </div>
          <p className="text-text-secondary max-w-md text-balance text-base md:text-lg font-light">
            Hazır şablonlar değil, sistem mühendisliği ve dijital işçilik gerektiren özel çözümler üretiyoruz.
          </p>
        </div>

        <div className="flex flex-col">
          {services.map((service, i) => (
            <ServiceRow key={service.num} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceRow({ service, index }: { service: (typeof services)[number]; index: number }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(rowRef, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={rowRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      data-testid="service-row"
      className="hover-target group relative border-b border-white/5 py-6 md:py-16 flex flex-col lg:flex-row lg:items-center gap-3 md:gap-8 lg:cursor-none overflow-hidden"
    >
      {/* CSS-only hover highlight — no JS, no Magnetic, no spring */}
      <div className="absolute top-0 bottom-0 left-0 w-[2px] bg-white/60 scale-y-0 origin-top group-hover:scale-y-100 transition-transform duration-300" />
      
      <div className="relative z-10 lg:w-1/4">
        <span className="font-mono text-base md:text-xl text-white/30 group-hover:text-white/60 transition-colors duration-300">
          {service.num}
        </span>
      </div>
      
      <div className="relative z-10 lg:w-2/4">
        <h4 className="text-2xl md:text-5xl font-display font-semibold text-white mb-2 md:mb-4">
          {service.title}
        </h4>
        <p className="text-sm md:text-base leading-6 md:leading-relaxed max-w-xl group-hover:text-white transition-colors duration-300 font-light">
          {service.desc}
        </p>
      </div>

      <div className="relative z-10 lg:w-1/4 hidden lg:flex justify-end">
        <Link
          to="/start-project"
          aria-label={`${service.title} için proje başlat`}
          className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all duration-300 lg:cursor-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-surface"
        >
          <ArrowRight className="text-white/50 group-hover:text-black group-hover:-rotate-45 transition-all duration-300 w-5 h-5 lg:w-6 lg:h-6" />
        </Link>
      </div>
    </motion.div>
  );
}
