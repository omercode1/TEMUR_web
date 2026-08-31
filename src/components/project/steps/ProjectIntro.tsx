import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface ProjectIntroProps {
  onNext: () => void;
}

export function ProjectIntro({ onNext }: ProjectIntroProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <motion.span 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-xs font-mono tracking-widest text-accent uppercase mb-6 block"
      >
        START A PROJECT
      </motion.span>
      
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white tracking-tight mb-6"
      >
        Ne inşa etmek istiyorsunuz?
      </motion.h1>
      
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-lg text-text-secondary max-w-xl mx-auto mb-12"
      >
        Projenizi birkaç adımda birlikte tanımlayalım.
      </motion.p>
      
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        onClick={onNext}
        className="tech-corners group relative inline-flex items-center justify-center gap-4 px-10 py-5 font-semibold text-sm uppercase tracking-widest text-white bg-surface border border-white/20 hover:bg-accent hover:border-accent transition-all active:scale-95"
      >
        Başlayalım
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </motion.button>
      
      <motion.span 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-xs text-white/30 mt-6"
      >
        Yaklaşık 2 dakika
      </motion.span>
    </div>
  );
}
