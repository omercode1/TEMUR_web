import { LEGAL_LINKS, SITE, SOCIAL_LINKS } from '@/config/site';

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-background pt-24 pb-12 relative overflow-hidden">
      <div className="absolute inset-0 opacity-30 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
        backgroundSize: '64px 64px'
      }} />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className={`grid grid-cols-1 md:grid-cols-2 ${SOCIAL_LINKS.length ? 'lg:grid-cols-4' : 'lg:grid-cols-3'} gap-12 lg:gap-8 mb-24`}>
          <div className="lg:col-span-1">
            <span className="font-display font-bold text-3xl tracking-tight text-white flex flex-col">
              {SITE.name}
              <span className="text-white/50 text-xl font-normal">{SITE.tag}</span>
            </span>
            <p className="mt-6 text-text-secondary text-sm leading-relaxed max-w-xs font-mono">
              [SYS_END] Tasarım, yazılım ve dijital deneyimi tek bir sistemde bir araya getiriyoruz.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-6 font-mono text-xs tracking-widest uppercase">Navigasyon</h4>
            <ul className="flex flex-col gap-4 text-sm text-text-secondary">
              <li><a href="#" className="hover:text-accent transition-colors flex items-center gap-2"><span className="text-white/20">01</span> Anasayfa</a></li>
              <li><a href="#services" className="hover:text-accent transition-colors flex items-center gap-2"><span className="text-white/20">02</span> Hizmetler</a></li>
              <li><a href="#work" className="hover:text-accent transition-colors flex items-center gap-2"><span className="text-white/20">03</span> Projeler</a></li>
              <li><a href="#process" className="hover:text-accent transition-colors flex items-center gap-2"><span className="text-white/20">04</span> Süreç</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-6 font-mono text-xs tracking-widest uppercase">Yetenekler</h4>
            <ul className="flex flex-col gap-4 text-sm text-text-secondary">
              <li>Web Deneyimleri</li>
              <li>Web Uygulamaları</li>
              <li>Özel Yazılım</li>
              <li>Yapay Zeka Sistemleri</li>
            </ul>
          </div>

          {SOCIAL_LINKS.length > 0 && (
            <div>
              <h4 className="font-semibold text-white mb-6 font-mono text-xs tracking-widest uppercase">Bağlantılar</h4>
              <ul className="flex flex-col gap-4 text-sm text-text-secondary">
                {SOCIAL_LINKS.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className="hover:text-white transition-colors" target="_blank" rel="noreferrer">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-text-tertiary font-mono">
              © {new Date().getFullYear()} {SITE.title}.
            </p>
          {LEGAL_LINKS.length > 0 && (
            <div className="flex items-center gap-6 text-sm text-text-tertiary font-mono">
              {LEGAL_LINKS.map((link) => (
                <a key={link.href} href={link.href} className="hover:text-white transition-colors">
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
