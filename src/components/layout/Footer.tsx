import { TextCursorProximity } from '@/components/ui/21st/text-cursor-proximity';

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-background pt-24 pb-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTY0IDBMMCAwTDAgNjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAyKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9zdmc+')] opacity-50" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-24">
          <div className="lg:col-span-1">
            <span className="font-display font-bold text-3xl tracking-tight text-white flex flex-col">
              <TextCursorProximity label="TEMUR" />
              <span className="text-white/50 text-xl font-normal">STUDIO</span>
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

          <div>
            <h4 className="font-semibold text-white mb-6 font-mono text-xs tracking-widest uppercase">Bağlantılar</h4>
            <ul className="flex flex-col gap-4 text-sm text-text-secondary">
              <li><a href="#" className="hover:text-white transition-colors">Twitter (X)</a></li>
              <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
              <li><a href="#" className="hover:text-white transition-colors">GitHub</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Dribbble</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-text-tertiary font-mono">
              © {new Date().getFullYear()} TEMUR STUDIO.
            </p>
          <div className="flex items-center gap-6 text-sm text-text-tertiary font-mono">
            <a href="#" className="hover:text-white transition-colors">Gizlilik Politikası</a>
            <a href="#" className="hover:text-white transition-colors">Kullanım Şartları</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
