import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUp } from 'lucide-react';

const VISIBILITY_OFFSET = 480;

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let frameId: number | null = null;

    const updateVisibility = () => {
      frameId = null;
      const nextVisible = window.scrollY > VISIBILITY_OFFSET;
      setIsVisible((currentVisible) =>
        currentVisible === nextVisible ? currentVisible : nextVisible,
      );
    };

    const onScroll = () => {
      if (frameId === null) {
        frameId = window.requestAnimationFrame(updateVisibility);
      }
    };

    updateVisibility();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frameId !== null) window.cancelAnimationFrame(frameId);
    };
  }, []);

  const scrollToTop = () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  };

  return createPortal(
    <AnimatePresence>
      {isVisible && (
        <motion.button
          type="button"
          aria-label="Sayfanın başına dön"
          title="Yukarı çık"
          initial={{ opacity: 0, y: 12, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.92 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.92 }}
          onClick={scrollToTop}
          className="group fixed right-5 bottom-5 z-40 grid h-12 w-12 place-items-center border border-white/15 bg-background/85 text-white shadow-2xl backdrop-blur-md transition-colors hover:border-white/40 hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:right-8 sm:bottom-8"
        >
          <ArrowUp
            aria-hidden="true"
            size={18}
            strokeWidth={1.6}
            className="transition-transform duration-300 ease-out group-hover:-translate-y-1"
          />
        </motion.button>
      )}
    </AnimatePresence>
    ,
    document.body,
  );
}
