import { VerticalTabs, type TabItem } from '@/components/ui/VerticalTabs';

const processStages: TabItem[] = [
  { 
    id: "01", 
    title: "Keşfet", 
    description: "Kod yazmadan önce problemi, iş hedeflerini ve teknik gereksinimleri analiz ediyoruz.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop"
  },
  { 
    id: "02", 
    title: "Tanımla", 
    description: "Projenin temel iskeletini, veri akışını ve sistem altyapısını planlıyoruz.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop"
  },
  { 
    id: "03", 
    title: "Tasarla", 
    description: "Marka kimliğine uygun, kullanıcı odaklı, temiz ve etkili arayüzler tasarlıyoruz.",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1200&auto=format&fit=crop"
  },
  { 
    id: "04", 
    title: "Geliştir", 
    description: "Ölçeklenebilir, performanslı ve modern standartlara uygun kod yazıyoruz.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop"
  },
  { 
    id: "05", 
    title: "Test Et", 
    description: "Güvenlik, hız, erişilebilirlik ve edge-case senaryolarını titizlikle test ediyoruz.",
    image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=1200&auto=format&fit=crop"
  },
  { 
    id: "06", 
    title: "Yayınla", 
    description: "Sıfır kesinti ve dikkatli bir izleme süreci ile ürünü production ortamına taşıyoruz.",
    image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=1200&auto=format&fit=crop"
  },
  { 
    id: "07", 
    title: "İyileştir", 
    description: "Gerçek kullanıcı verilerine dayanarak iterasyonlar yapıyor ve sistemi ölçeklendiriyoruz.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop"
  }
];

export function Process() {
  return (
    <section id="process" className="py-24 md:py-32 relative bg-background border-t border-white/5 overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEgMWgyMHYyMEgxVjF6IiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wMykiIHN0cm9rZS13aWR0aD0iMSIvPjwvc3ZnPg==')] opacity-30 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-surface via-transparent to-surface pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <VerticalTabs 
          tabs={processStages} 
          title="Fikirden ürüne giden yol." 
          subtitle="SÜREÇ" 
          autoPlayDuration={5000} 
        />
      </div>
    </section>
  );
}
