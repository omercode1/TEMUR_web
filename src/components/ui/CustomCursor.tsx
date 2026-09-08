import { useEffect, useRef, useState } from 'react';

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!isFinePointer) return;

    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;
    let ringX = -100;
    let ringY = -100;
    let rafId = 0;
    let isHovered = false;
    let isClicked = false;
    let initialized = false;

    const moveCursor = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!initialized) {
        currentX = targetX;
        currentY = targetY;
        ringX = targetX;
        ringY = targetY;
        initialized = true;
        setIsVisible(true);
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      
      const interactiveEl = target.closest('a, button, input, textarea, [role="button"], .hover-target');
      
      if (interactiveEl && !interactiveEl.classList.contains('no-cursor-scale')) {
        isHovered = true;
      } else {
        isHovered = false;
      }
    };

    const handleMouseDown = () => { isClicked = true; };
    const handleMouseUp = () => { isClicked = false; };

    const updatePosition = () => {
      if (document.hidden) {
        rafId = requestAnimationFrame(updatePosition);
        return;
      }

      // Smooth lerp tracking
      currentX += (targetX - currentX) * 0.6;
      currentY += (targetY - currentY) * 0.6;
      ringX += (targetX - ringX) * 0.25;
      ringY += (targetY - ringY) * 0.25;

      const dotScale = isClicked ? 0.7 : isHovered ? 2.2 : 1;
      const ringScale = isClicked ? 0.5 : isHovered ? 1.5 : 1;
      const ringOpacity = isClicked ? 0.2 : isHovered ? 0.9 : 0.5;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%) scale(${dotScale})`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) scale(${ringScale})`;
        ringRef.current.style.opacity = String(ringOpacity);
      }

      rafId = requestAnimationFrame(updatePosition);
    };

    window.addEventListener('mousemove', moveCursor, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });

    rafId = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className={`pointer-events-none fixed top-0 left-0 z-[9999] h-3.5 w-3.5 rounded-full bg-white mix-blend-difference will-change-transform transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ transform: 'translate3d(-100px, -100px, 0) translate(-50%, -50%)' }}
      />
      <div
        ref={ringRef}
        className={`pointer-events-none fixed top-0 left-0 z-[9998] h-9 w-9 rounded-full border border-white/60 mix-blend-difference will-change-transform transition-opacity duration-300 ${
          isVisible ? 'opacity-50' : 'opacity-0'
        }`}
        style={{ transform: 'translate3d(-100px, -100px, 0) translate(-50%, -50%)' }}
      />
    </>
  );
}
