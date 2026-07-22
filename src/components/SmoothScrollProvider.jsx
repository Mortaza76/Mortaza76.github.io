import React, { useEffect, useRef, createContext, useContext } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

export const LenisContext = createContext(null);

/**
 * Tuned for a looser, more natural wheel feel:
 * - lerp (not long duration) so scroll stays responsive
 * - slightly higher wheelMultiplier so each notch travels more
 * - syncTouch off so phones keep native momentum
 */
const SmoothScrollProvider = ({ children }) => {
  const lenisRef = useRef(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return undefined;

    const lenis = new Lenis({
      // Lower lerp = creamier / more inertial smooth scroll
      lerp: 0.055,
      smoothWheel: true,
      wheelMultiplier: 1.1,
      touchMultiplier: 1.5,
      // Keep native touch scrolling — syncTouch feels rubbery on phones
      syncTouch: false,
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      autoRaf: true,
      anchors: false,
      infinite: false,
    });

    lenisRef.current = lenis;

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <LenisContext.Provider value={lenisRef}>
      {children}
    </LenisContext.Provider>
  );
};

export const useLenis = () => useContext(LenisContext);

export default SmoothScrollProvider;
