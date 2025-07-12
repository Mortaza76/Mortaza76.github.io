import React, { useEffect, useRef, createContext, useContext } from 'react';
import Lenis from 'lenis';

export const LenisContext = createContext(null);

const SmoothScrollProvider = ({ children }) => {
  const lenisRef = useRef(null);

  useEffect(() => {
    // Initialize Lenis smooth scrolling
    lenisRef.current = new Lenis({
      duration: 1.5, // More inertia for Apple-like feel
      // Cubic ease-out for buttery inertia
      easing: (t) => 1 - Math.pow(1 - t, 3),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: true, // Enable for iOS-like inertia
      touchMultiplier: 2,
      infinite: false,
    });

    // RAF loop for Lenis
    function raf(time) {
      lenisRef.current?.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Cleanup
    return () => {
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
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