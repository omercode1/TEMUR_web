import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
  pulseSpeed: number;
  pulsePhase: number;
}

export function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 30 : 65;
    const connectionDistance = isMobile ? 100 : 150;
    const mouseDistance = 160;

    let mouseX = -1000;
    let mouseY = -1000;

    const particles: Particle[] = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 1.5 + 0.8,
      baseAlpha: Math.random() * 0.4 + 0.25,
      pulseSpeed: Math.random() * 0.02 + 0.005,
      pulsePhase: Math.random() * Math.PI * 2,
    }));

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    let time = 0;

    const render = () => {
      time += 0.01;
      ctx.clearRect(0, 0, width, height);

      // 1. Subtle Radial Ambient Glows
      const cx1 = width * 0.3 + Math.sin(time * 0.5) * 80;
      const cy1 = height * 0.4 + Math.cos(time * 0.4) * 60;
      const grad1 = ctx.createRadialGradient(cx1, cy1, 10, cx1, cy1, width * 0.45);
      grad1.addColorStop(0, 'rgba(56, 189, 248, 0.07)'); // soft cyan
      grad1.addColorStop(0.5, 'rgba(139, 92, 246, 0.04)'); // soft violet
      grad1.addColorStop(1, 'rgba(5, 5, 8, 0)');
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);

      const cx2 = width * 0.75 + Math.cos(time * 0.3) * 100;
      const cy2 = height * 0.6 + Math.sin(time * 0.6) * 70;
      const grad2 = ctx.createRadialGradient(cx2, cy2, 10, cx2, cy2, width * 0.5);
      grad2.addColorStop(0, 'rgba(255, 255, 255, 0.05)'); // soft white glow
      grad2.addColorStop(0.6, 'rgba(99, 102, 241, 0.03)'); // indigo
      grad2.addColorStop(1, 'rgba(5, 5, 8, 0)');
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, height);

      // 2. Particle Update & Node Connections
      for (let i = 0; i < particleCount; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        // Bounce gently off boundaries
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Mouse subtle push
        const dx = p.x - mouseX;
        const dy = p.y - mouseY;
        const dist = Math.hypot(dx, dy);
        if (dist < mouseDistance) {
          const force = (1 - dist / mouseDistance) * 0.8;
          p.x += (dx / dist) * force;
          p.y += (dy / dist) * force;
        }

        // Particle pulse
        p.pulsePhase += p.pulseSpeed;
        const alpha = p.baseAlpha + Math.sin(p.pulsePhase) * 0.15;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0, Math.min(1, alpha))})`;
        ctx.fill();

        // Connect nearby particles
        for (let j = i + 1; j < particleCount; j++) {
          const p2 = particles[j];
          const distBetween = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (distBetween < connectionDistance) {
            const lineAlpha = (1 - distBetween / connectionDistance) * 0.12;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${lineAlpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full block opacity-90" />
      {/* Tech grid overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.4) 1px, transparent 1px)',
          backgroundSize: '64px 64px'
        }}
      />
      {/* Vignette mask for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(5,5,8,0.7)_100%)] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050508] pointer-events-none" />
    </div>
  );
}
