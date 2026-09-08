import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import { Suspense, lazy, useState, useEffect } from 'react';
import { Preloader } from './components/ui/Preloader';
import { PageTransition } from './components/layout/PageTransition';
import { CustomCursor } from './components/ui/CustomCursor';

const Home = lazy(() => import('./pages/Home').then((module) => ({ default: module.Home })));
const StartProject = lazy(() => import('./pages/StartProject').then((module) => ({ default: module.StartProject })));

function AnimatedRoutes() {
  const location = useLocation();
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsInitialLoad(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isInitialLoad && <Preloader key="preloader" />}
      </AnimatePresence>

      {!isInitialLoad && (
        <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
          <Suspense fallback={<div className="min-h-screen bg-background" aria-busy="true" />}>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<PageTransition><Home /></PageTransition>} />
              <Route path="/start-project" element={<PageTransition><StartProject /></PageTransition>} />
            </Routes>
          </Suspense>
        </AnimatePresence>
      )}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <CustomCursor />
      <AnimatedRoutes />
    </BrowserRouter>
  );
}
