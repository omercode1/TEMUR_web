import { TextReveal } from '@/components/ui/TextReveal';

export function CapabilityStatement() {
  return (
    <section className="bg-background relative z-10 border-t border-white/5 overflow-hidden">
      {/* Deep Space / Nebula Theme Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* SVG Stars */}
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='800' height='800' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fff' fill-opacity='0.8'%3E%3Ccircle cx='154' cy='113' r='1.5'/%3E%3Ccircle cx='41' cy='431' r='1'/%3E%3Ccircle cx='612' cy='231' r='2' opacity='0.6'/%3E%3Ccircle cx='742' cy='651' r='1.5' opacity='0.8'/%3E%3Ccircle cx='342' cy='751' r='1'/%3E%3Ccircle cx='242' cy='551' r='2' opacity='0.5'/%3E%3Ccircle cx='542' cy='151' r='1'/%3E%3Ccircle cx='100' cy='700' r='1.5' opacity='0.9'/%3E%3Ccircle cx='700' cy='100' r='1'/%3E%3Ccircle cx='400' cy='400' r='2' opacity='0.4'/%3E%3Ccircle cx='50' cy='50' r='1'/%3E%3Ccircle cx='750' cy='750' r='1.5' opacity='0.7'/%3E%3Ccircle cx='300' cy='200' r='1.5' opacity='0.6'/%3E%3Ccircle cx='600' cy='600' r='1' opacity='0.5'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '400px 400px',
            backgroundRepeat: 'repeat'
          }}
        />
        {/* Nebula Glows - using radial gradients instead of expensive blur filters */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse at 25% 25%, rgba(255,255,255,0.04) 0%, transparent 50%), radial-gradient(ellipse at 75% 75%, rgba(255,255,255,0.03) 0%, transparent 50%)'
        }} />
        
        {/* Vertical gradients to smoothly blend into the previous and next sections */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      </div>

      <TextReveal 
        className="relative z-10"
        text="Biz sadece web sitesi yapmıyoruz. İhtiyaca yönelik, estetik ve sağlam temelli dijital sistemler tasarlıyoruz."
      />
    </section>
  );
}
