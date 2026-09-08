type ClientLogo = {
  name: string;
  src: string;
  className?: string;
};

const CLIENT_LOGOS: ClientLogo[] = [
  { name: 'AtaDoor', src: '/images/clients/atadoor.svg', className: 'brightness-0 invert' },
  { name: 'Kumaş Bahçesi', src: '/images/clients/kumas-bahcesi.svg', className: 'rounded-xl' },
  { name: 'Nasrin Health', src: '/images/clients/nasrin-health.png', className: 'grayscale brightness-0 invert' },
  { name: 'Vizem.net', src: '/images/clients/vizem.webp', className: 'grayscale brightness-0 invert' },
  { name: 'Argon Soft', src: '/images/clients/argon-soft.png' },
  { name: 'İskit Bey', src: '/images/clients/iskit-bey.jpg', className: 'rounded-full' },
];

const marqueeLogos = [...CLIENT_LOGOS, ...CLIENT_LOGOS];

export function LogoMarquee() {
  return (
    <section className="relative overflow-hidden border-t border-white/5 bg-surface py-20 md:py-24">
      <div className="mx-auto mb-10 sm:mb-12 max-w-7xl px-4 sm:px-6 text-center lg:px-8">
        <h2 className="logo-marquee-title font-display font-bold tracking-tight text-white">
          Birlikte çalıştıklarımız
        </h2>
      </div>

      <div
        className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
        aria-label="Birlikte çalıştığımız markalar"
      >
        <div className="logo-marquee-track flex w-max items-center gap-12 pr-12 sm:gap-20 sm:pr-20">
          {marqueeLogos.map((logo, index) => {
            const isDuplicate = index >= CLIENT_LOGOS.length;

            return (
              <div
                key={`${logo.name}-${index}`}
                className="flex h-16 w-36 shrink-0 items-center justify-center sm:w-44"
                aria-hidden={isDuplicate || undefined}
              >
                <img
                  src={logo.src}
                  alt={isDuplicate ? '' : logo.name}
                  className={`max-h-12 max-w-full object-contain opacity-65 transition duration-300 hover:opacity-100 ${logo.className ?? ''}`}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
