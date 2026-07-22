import React, { Suspense, lazy } from 'react';
import { LazyMotion, domMax } from 'framer-motion';
import CyberBackground from './components/effects/CyberBackground';
import CustomCursor from './components/effects/CustomCursor';
import ScrollProgress from './components/effects/ScrollProgress';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import SmoothScrollProvider from './components/SmoothScrollProvider';

const Skills = lazy(() => import('./components/sections/Skills'));
const Projects = lazy(() => import('./components/sections/Projects'));
const Experience = lazy(() => import('./components/sections/Experience'));
const Certifications = lazy(() => import('./components/sections/Certifications'));
const Contact = lazy(() => import('./components/sections/Contact'));

function SectionFallback() {
  return (
    <div className="relative z-10 py-24 text-center font-mono text-sm text-ink-muted">
      Loading module…
    </div>
  );
}

export default function App() {
  return (
    <LazyMotion features={domMax}>
      <SmoothScrollProvider>
        <div className="relative min-h-screen bg-void text-white">
          <CyberBackground />
          <CustomCursor />
          <ScrollProgress />
          <Navbar />
          <main className="relative z-10">
            <Hero />
            <About />
            <Suspense fallback={<SectionFallback />}>
              <Skills />
              <Projects />
              <Experience />
              <Certifications />
              <Contact />
            </Suspense>
          </main>
          <Footer />
        </div>
      </SmoothScrollProvider>
    </LazyMotion>
  );
}
