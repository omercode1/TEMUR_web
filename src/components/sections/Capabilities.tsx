import { useRef } from 'react';
import { motion, useInView } from 'motion/react';

const capabilityGroups = [
  {
    title: "DESIGN",
    techs: ["Brand Systems", "UI/UX", "Web Design", "Digital Art Direction"]
  },
  {
    title: "DEVELOPMENT",
    techs: ["React", "TypeScript", "Web Applications", "Custom Software", "Desktop / Local Tools"]
  },
  {
    title: "SYSTEMS",
    techs: ["Automation", "APIs", "AI Integrations", "Data Workflows"]
  },
  {
    title: "DIGITAL",
    techs: ["Web Presence", "Content Systems", "Social Media Direction"]
  }
];

export function Capabilities() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section className="py-32 bg-background relative overflow-hidden border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          <div className="lg:w-1/3">
            <h2 className="text-xs font-mono tracking-widest text-accent uppercase mb-4">Yetkinlikler</h2>
            <h3 className="text-3xl md:text-4xl font-display font-bold text-text-primary tracking-tight mb-6">
              Uçtan uca dijital üretim.
            </h3>
            <p className="text-text-secondary leading-relaxed">
              Tasarım vizyonunu, teknik altyapı ve dijital stratejiyle birleştirerek eksiksiz sistemler kuruyoruz.
            </p>
          </div>

          <div ref={containerRef} className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-12">
            {capabilityGroups.map((group, groupIdx) => (
              <div key={group.title}>
                <h4 className="text-sm font-semibold text-text-primary mb-6 border-b border-white/10 pb-3">
                  {group.title}
                </h4>
                <ul className="flex flex-wrap gap-2">
                  {group.techs.map((tech, techIdx) => (
                    <motion.li
                      key={tech}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                      transition={{ 
                        duration: 0.4, 
                        delay: (groupIdx * 0.1) + (techIdx * 0.05),
                        ease: "easeOut"
                      }}
                      className="px-4 py-2 rounded-full bg-surface border border-white/5 text-sm text-text-secondary hover:text-text-primary hover:border-white/20 transition-colors cursor-default"
                    >
                      {tech}
                    </motion.li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
