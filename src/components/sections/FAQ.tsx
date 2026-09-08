import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    q: "Ne tür projeler geliştiriyorsunuz?",
    a: "Kurumsal web siteleri, SaaS ürünleri, özel iş yazılımları, otomasyon araçları ve e-ticaret platformları dahil olmak üzere geniş bir yelpazede dijital ürünler geliştiriyoruz."
  },
  {
    q: "Bir web sitesi ne kadar sürede tamamlanır?",
    a: "Projenin kapsamına bağlı olarak değişmekle birlikte, standart kurumsal siteler 4-6 hafta, özel web uygulamaları ise 2-4 ay arasında sürebilmektedir."
  },
  {
    q: "Mevcut bir projeyi geliştirebilir misiniz?",
    a: "Evet. Mevcut yazılımlarınızın kod kalitesini artırabilir, performansını optimize edebilir veya yeni modüller ekleyerek modernleştirebiliriz."
  },
  {
    q: "Sadece web sitesi mi geliştiriyorsunuz?",
    a: "Hayır. Arayüz tasarımından (UI/UX), veritabanı mimarisine, API entegrasyonlarından sunucu kurulumuna kadar tam yığın (full-stack) yazılım hizmeti veriyoruz."
  },
  {
    q: "Proje sonrası destek sağlıyor musunuz?",
    a: "Kesinlikle. Yayına alma (launch) sonrası bakım, güvenlik güncellemeleri, performans takibi ve yeni özellik eklemeleri için uzun vadeli destek anlaşmaları yapıyoruz."
  }
];

export function FAQ() {
  return (
    <section className="py-24 md:py-32 bg-background border-t border-white/5">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-text-primary tracking-tight mb-16 text-center">
          Sıkça Sorulan Sorular
        </h2>
        
        <div className="flex flex-col divide-y divide-white/5 border-y border-white/5">
          {faqs.map((faq, i) => (
            <FAQItem key={i} faq={faq} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQItem({ faq, index }: { faq: { q: string; a: string }; index: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const buttonId = `faq-question-${index}`;
  const panelId = `faq-answer-${index}`;

  return (
    <div className="py-6">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-left gap-6 group"
        id={buttonId}
        aria-expanded={isOpen}
        aria-controls={panelId}
      >
        <span className="text-lg font-medium text-text-primary group-hover:text-accent transition-colors">
          {faq.q}
        </span>
        <div className="shrink-0 text-text-secondary group-hover:text-accent transition-colors">
          {isOpen ? <Minus size={20} /> : <Plus size={20} />}
        </div>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="pt-4 text-text-secondary leading-relaxed">
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
