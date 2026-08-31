import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Hizmetler', href: '#services' },
    { name: 'Projeler', href: '#work' },
    { name: 'Süreç', href: '#process' },
    { name: 'Hakkımızda', href: '#about' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-surface/80 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6'}`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
          <a href="#" className="font-display font-bold text-xl tracking-tight text-white z-50 flex items-center">
            TEMUR<span className="text-white/30 font-normal ml-1.5 text-lg">STUDIO</span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
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
            <Link
              to="/start-project"
              className="tech-corners group relative inline-flex items-center justify-center px-6 py-2 text-sm font-semibold text-white bg-surface border border-white/20 hover:bg-accent hover:border-accent transition-colors overflow-hidden"
            >
              <span className="relative z-10 uppercase tracking-widest text-xs">Proje Başlat</span>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 -mr-2 text-text-secondary z-50 relative"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl pt-24 px-6 pb-6 flex flex-col md:hidden"
          >
            <nav className="flex flex-col gap-6 mt-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 + 0.1 }}
                  className="text-3xl font-display font-medium text-text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </motion.a>
              ))}
              <Link
                to="/start-project"
                className="tech-corners mt-8 inline-flex items-center justify-center px-8 py-4 text-sm font-semibold text-white bg-surface border border-white/20 hover:bg-accent hover:border-accent w-full uppercase tracking-widest"
                onClick={() => setMobileMenuOpen(false)}
              >
                Proje Başlat
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
