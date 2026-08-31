import { useRef } from 'react';
import { motion, useInView } from 'motion/react';

const principles = [
  {
    title: "Amaca Yönelik Tasarım",
    desc: "Her ürün, gerçek bir problemi çözmek için tasarlanır. Gereksiz özellikler eklemiyoruz."
  },
  {
    title: "Performans Odaklı",
    desc: "Hız ve kullanılabilirlik, tasarımın ayrılmaz bir parçasıdır. Yavaş yüklenen sayfalara tahammülümüz yok."
  },
  {
    title: "Ölçeklenebilir Mimari",
    desc: "Bugün için inşa ederken, yarının büyümesini engellemeyecek sağlam altyapılar kuruyoruz."
  },
  {
    title: "Şeffaf İletişim",
    desc: "Geliştirme sürecinin her aşamasında müşterilerimizin ne olduğunu net olarak anlamasını sağlıyoruz."
  }
];

export function WhyUs() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section className="py-32 bg-surface">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white tracking-tight mb-6">
            Biz kimiz?
          </h2>
          <p className="text-lg md:text-xl text-text-secondary max-w-2xl leading-relaxed">
            TEMUR; tasarım, yazılım ve dijital üretimi aynı süreçte buluşturan bağımsız bir creative technology studio. Hızlı, şeffaf ve doğrudan iletişimle çalışıyoruz.
          </p>
        </div>

        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
          {principles.map((principle, i) => (
            <motion.div
              key={principle.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="flex flex-col gap-4"
            >
              <h3 className="text-xl font-display font-semibold text-text-primary">
                {principle.title}
              </h3>
              <p className="text-text-secondary leading-relaxed">
                {principle.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
