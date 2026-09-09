import { motion } from 'motion/react';

export function Preloader() {
  return (
    <motion.div
      initial={{ y: 0 }}
      exit={{ y: "-100%" }}
      transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1], delay: 0.05 }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-surface pointer-events-none"
    >
      <div className="overflow-hidden">
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
          className="flex flex-col items-center gap-6"
        >
          <span className="text-3xl md:text-5xl font-display font-bold text-white tracking-tighter flex items-center">
            TEMUR<span className="text-white/30 font-normal ml-1">STUDIO</span>
          </span>
          <motion.div 
            className="h-[1px] bg-white/10 w-32 relative overflow-hidden"
          >
            <motion.div 
              initial={{ x: "-100%" }}
              animate={{ x: "200%" }}
              transition={{ duration: 1.2, ease: "easeInOut", repeat: Infinity }}
              className="absolute top-0 bottom-0 left-0 w-1/2 bg-white"
            />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
