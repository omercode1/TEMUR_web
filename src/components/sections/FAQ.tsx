import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    q: "Ne tür projeler geliştiriyorsunuz?",
    a: "Kurumsal web siteleri, web uygulamaları, özel iş yazılımları, iş akışı otomasyonları ve yapay zekâ entegrasyonları geliştiriyoruz. Her işi mevcut sürece, kullanıcı ihtiyacına ve ürün hedeflerine göre şekillendiriyoruz."
  },
  {
    q: "Özel yazılım geliştirme süreci nasıl ilerliyor?",
    a: "Önce problemi, hedefleri ve teknik gereksinimleri birlikte netleştiriyoruz. Ardından kapsamı, kullanıcı akışlarını ve mimariyi tanımlayıp tasarım, geliştirme, test ve yayına alma adımlarını görünür bir planla yürütüyoruz."
  },
  {
    q: "Mevcut sistemlere yapay zekâ entegrasyonu yapılabilir mi?",
    a: "Uygun veri akışları ve iş kuralları olan sistemlerde, yapay zekâ destekli asistanları, sınıflandırma veya analiz akışlarını mevcut ürün ve operasyonlara entegre edecek çözümler tasarlıyoruz."
  },
  {
    q: "Web uygulamaları mobil uyumlu geliştiriliyor mu?",
    a: "Evet. Kullanıcıların farklı ekran boyutlarında rahatça tamamlayabildiği, erişilebilir ve performanslı arayüzleri ürünün gereksinimlerine göre tasarlıyor ve test ediyoruz."
  },
  {
    q: "Bir projeye nasıl başlanır?",
    a: "Proje başlat formunda fikrinizi, hedefinizi ve mevcut ihtiyacınızı paylaşabilirsiniz. İlk değerlendirmede kapsamı netleştirir; doğru ürün yaklaşımı, öncelikler ve sonraki adımlar için birlikte bir çalışma çerçevesi oluştururuz."
  }
];

export function FAQ() {
  return (
    <section id="faq" aria-labelledby="faq-heading" className="py-24 md:py-32 bg-background border-t border-white/5">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <h2 id="faq-heading" className="text-3xl md:text-4xl font-display font-bold text-text-primary tracking-tight mb-16 text-center">
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
