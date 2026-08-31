import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export function ProjectSuccess() {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center text-center py-20"
    >
      {/* Abstract completed node visual */}
      <div className="w-20 h-20 mb-8 relative flex items-center justify-center">
        <div className="absolute inset-0 border border-accent/20 rounded-full animate-ping" />
        <div className="w-10 h-10 bg-accent rounded-sm rotate-45 flex items-center justify-center shadow-[0_0_30px_rgba(79,70,229,0.4)]">
          <div className="w-2 h-2 bg-white rounded-full" />
        </div>
      </div>
      
      <span className="text-xs font-mono tracking-widest text-accent uppercase mb-6 block">
        PROJECT RECEIVED
      </span>
      
      <h2 className="text-4xl md:text-5xl font-display font-bold text-white tracking-tight mb-6">
        Projenizi aldık.
      </h2>
      
      <p className="text-lg text-text-secondary max-w-xl mx-auto mb-12">
        Detayları inceleyip sizinle en kısa sürede iletişime geçeceğiz.
      </p>
      
      <Link
        to="/"
        className="tech-corners group relative inline-flex items-center justify-center gap-4 px-10 py-5 font-semibold text-sm uppercase tracking-widest text-white bg-surface border border-white/20 hover:bg-white/5 transition-all"
      >
        Ana Sayfaya Dön
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </Link>
    </motion.div>
  );
}
