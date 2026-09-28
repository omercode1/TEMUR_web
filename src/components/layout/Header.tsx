import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MotionButton } from '@/components/ui/MotionButton';
import { NAV_LINKS, SITE } from '@/config/site';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const scrolled = window.scrollY > 50;
        setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));
        ticking = false;
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 will-change-transform ${isScrolled ? 'bg-surface/90 backdrop-blur-sm border-b border-white/5 py-4' : 'bg-transparent py-6'}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link to="/" className="z-50 flex font-display text-xl font-bold tracking-tight text-white transition-colors hover:text-white/80">
            {SITE.name}<span className="text-white/30 font-normal ml-1.5 text-lg">{SITE.tag}</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center">
            <MotionButton
              to="/start-project"
              className="px-6 py-2 text-xs uppercase tracking-widest"
              hideArrow
            >
              Proje Başlat
            </MotionButton>
          </div>

          <button
            type="button"
            className="relative z-50 -mr-2 grid min-h-11 min-w-11 place-items-center text-text-secondary transition-colors hover:bg-white/5 hover:text-white md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Menüyü kapat' : 'Menüyü aç'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl pt-[max(6rem,calc(env(safe-area-inset-top)+5rem))] px-4 sm:px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] flex flex-col md:hidden"
          >
            <nav id="mobile-navigation" aria-label="Mobil navigasyon" className="flex flex-col gap-6 mt-8">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 + 0.1 }}
                  className="font-display text-3xl font-medium text-text-primary transition-colors hover:text-white/70"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </motion.a>
              ))}
              <MotionButton
                to="/start-project"
                className="mt-8 px-8 py-4 w-full uppercase tracking-widest text-sm"
                onClick={() => setMobileMenuOpen(false)}
                hideArrow
              >
                Proje Başlat
              </MotionButton>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
