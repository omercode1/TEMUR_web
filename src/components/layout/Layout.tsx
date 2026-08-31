import { ReactNode } from 'react';
import { SmoothScroll } from './SmoothScroll';
import { Header } from './Header';
import { Footer } from './Footer';

export function Layout({ children }: { children: ReactNode }) {
  return (
    <SmoothScroll>
      <div className="min-h-screen flex flex-col relative overflow-hidden bg-background selection:bg-accent/30 selection:text-white">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </div>
    </SmoothScroll>
  );
}
