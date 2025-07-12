import React, { useCallback, useEffect, useState, Suspense, lazy } from 'react';
import { Particles } from '@tsparticles/react';
import { loadFull } from 'tsparticles';
import { LazyMotion, domAnimation, AnimatePresence, motion } from 'framer-motion';
import Hero from './components/Hero';
import About from './components/About';
import InspirationalQuote from './components/InspirationalQuote';
import CursorFollower from './components/CursorFollower';
import AnimatedBackground from './components/AnimatedBackground';
import DarkModeToggle from './components/DarkModeToggle';
import SmoothScrollProvider, { useLenis } from './components/SmoothScrollProvider';
import { DarkModeProvider } from './hooks/useDarkMode';
const Projects = lazy(() => import('./components/Projects'));
const TechStackCarousel = lazy(() => import('./components/TechStackCarousel'));
const Links = lazy(() => import('./components/Links'));

function App() {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    console.log('Particles loaded:', container);
  }, []);

  // Global section transition overlay state
  const [showOverlay, setShowOverlay] = useState(false);

  // Use Lenis for smooth scroll (always call the hook at the top level)
  const lenisRef = useLenis();

  useEffect(() => {
    // Listen for hash changes (anchor navigation)
    const handleHashChange = () => {
      setShowOverlay(true);
      // Wait a bit, then scroll smoothly (if Lenis is available)
      setTimeout(() => {
        if (lenisRef && lenisRef.current) {
          const hash = window.location.hash;
          if (hash) {
            const el = document.querySelector(hash);
            if (el) {
              lenisRef.current.scrollTo(el, { offset: -32, duration: 1.2 });
            }
          }
        }
        // Fade out overlay after scroll
        setTimeout(() => setShowOverlay(false), 900);
      }, 200);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [lenisRef]);

  return (
    <DarkModeProvider>
      <LazyMotion features={domAnimation}>
        <SmoothScrollProvider>
          <div className="relative cursor-none select-none">
            {/* Global Section Transition Overlay */}
            <AnimatePresence>
              {showOverlay && (
                <motion.div
                  key="section-overlay"
                  className="fixed inset-0 z-50 pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  style={{
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    background: 'rgba(255,255,255,0.12)',
                  }}
                />
              )}
            </AnimatePresence>
            {/* Animated Background */}
            <AnimatedBackground />
            {/* Global Particles Background */}
            <Particles
              id="tsparticles"
              init={particlesInit}
              loaded={particlesLoaded}
              options={{
                background: {
                  color: {
                    value: "transparent",
                  },
                },
                fpsLimit: 120,
                interactivity: {
                  events: {
                    onClick: {
                      enable: true,
                      mode: "push",
                    },
                    onHover: {
                      enable: true,
                      mode: "repulse",
                    },
                    resize: true,
                  },
                  modes: {
                    push: {
                      quantity: 4,
                    },
                    repulse: {
                      distance: 200,
                      duration: 0.4,
                    },
                  },
                },
                particles: {
                  color: {
                    value: "#ffffff",
                  },
                  links: {
                    color: "#ffffff",
                    distance: 150,
                    enable: true,
                    opacity: 0.2,
                    width: 1,
                  },
                  collisions: {
                    enable: true,
                  },
                  move: {
                    direction: "none",
                    enable: true,
                    outModes: {
                      default: "bounce",
                    },
                    random: false,
                    speed: 0.8,
                    straight: false,
                  },
                  number: {
                    density: {
                      enable: true,
                      area: 800,
                    },
                    value: 40,
                  },
                  opacity: {
                    value: 0.3,
                  },
                  shape: {
                    type: "circle",
                  },
                  size: {
                    value: { min: 1, max: 3 },
                  },
                },
                detectRetina: true,
              }}
              className="fixed inset-0 pointer-events-none z-10"
            />
            {/* Dark Mode Toggle */}
            <DarkModeToggle />
            {/* Cursor Follower */}
            <CursorFollower />
            {/* Inspirational Quote */}
            <InspirationalQuote />
            {/* Main Content */}
            <div className="relative z-20">
              <Hero />
              <About />
              <Suspense fallback={<div className="text-center py-12 text-lg text-gray-400">Loading…</div>}>
                <TechStackCarousel />
                <Projects />
                <Links />
              </Suspense>
            </div>
          </div>
        </SmoothScrollProvider>
      </LazyMotion>
    </DarkModeProvider>
  );
}

export default App;
