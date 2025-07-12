import React, { useCallback, useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Particles } from '@tsparticles/react';
import { loadFull } from 'tsparticles';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useDarkMode from '../hooks/useDarkMode';

gsap.registerPlugin(ScrollTrigger);

const LAYER_CONFIGS = [
  {
    z: 20,
    size: 420,
    blur: 24,
    shadow: '0 8px 32px 0 rgba(168,85,247,0.10), 0 2px 8px 0 rgba(59,130,246,0.04)',
    opacity: 0.18,
  },
  {
    z: 10,
    size: 340,
    blur: 16,
    shadow: '0 4px 16px 0 rgba(59,130,246,0.10), 0 1.5px 4px 0 rgba(168,85,247,0.03)',
    opacity: 0.14,
  },
  {
    z: 5,
    size: 260,
    blur: 8,
    shadow: '0 2px 8px 0 rgba(59,130,246,0.08)',
    opacity: 0.10,
  },
];

const Hero = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    console.log('Particles loaded:', container);
  }, []);

  // Scroll-linked animation for the hero quote
  // const { scrollY } = useScroll();

  // GSAP scroll-triggered zoom and pin effect
  const imgRef = useRef(null);
  const heroSectionRef = useRef(null);
  const pinRef = useRef(null);
  const textBlockRefs = useRef([]);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const { isDark } = useDarkMode();

  useEffect(() => {
    if (!imgRef.current || !heroSectionRef.current || !pinRef.current) return;
    const ctx = gsap.context(() => {
      // Zoom effect
      gsap.fromTo(
        imgRef.current,
        { scale: 1 },
        {
          scale: 1.3,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: heroSectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
            pin: false,
            anticipatePin: 1,
          },
        }
      );
      // Pin effect
      ScrollTrigger.create({
        trigger: pinRef.current,
        start: 'top 20%',
        end: 'bottom 60%',
        pin: true,
        pinSpacing: true,
        scrub: false,
        anticipatePin: 1,
      });
      // Animate text blocks
      textBlockRefs.current.forEach((el, i) => {
        if (el) {
          gsap.fromTo(
            el,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: el,
                start: 'top 80%',
                end: 'top 60%',
                scrub: false,
                toggleActions: 'play none none reverse',
              },
              delay: i * 0.1,
            }
          );
        }
      });
    }, heroSectionRef);
    return () => ctx.revert();
  }, []);

  // Mouse parallax handler
  useEffect(() => {
    const handleMouseMove = (e) => {
      const rect = heroSectionRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      setMouse({ x, y });
    };
    const section = heroSectionRef.current;
    if (section) {
      section.addEventListener('mousemove', handleMouseMove);
      return () => section.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  return (
    <section ref={heroSectionRef} className="min-h-screen flex flex-col justify-center items-center text-gray-900 dark:text-white relative overflow-hidden py-20 bg-white dark:bg-gray-900">
      {/* Video Backgrounds with Smooth Transition */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <video
          src="/white.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
          style={{ opacity: isDark ? 0 : 1, transition: 'opacity 0.7s cubic-bezier(0.22,1,0.36,1)' }}
        />
        <video
          src="/dark.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
          style={{ opacity: isDark ? 1 : 0, transition: 'opacity 0.7s cubic-bezier(0.22,1,0.36,1)' }}
        />
        {/* Overlay for text clarity */}
        <div
          className="absolute inset-0"
          style={{
            background: isDark
              ? 'linear-gradient(120deg, rgba(0,0,0,0.60) 0%, rgba(30,30,34,0.60) 100%)'
              : 'linear-gradient(120deg, rgba(255,255,255,0.60) 0%, rgba(240,240,240,0.60) 100%)',
            zIndex: 1,
          }}
        />
      </div>
      {/* 3D Parallax Layers with Circular Windows */}
      {LAYER_CONFIGS.map((layer, i) => {
        // Parallax: closer layers move more
        const px = (mouse.x - 0.5) * (layer.z * 1.5);
        const py = (mouse.y - 0.5) * (layer.z * 1.5);
        return (
          <div
            key={i}
            className="absolute left-1/2 top-1/2 z-10 pointer-events-none"
            style={{
              zIndex: layer.z,
              width: layer.size,
              height: layer.size,
              transform: `translate(-50%, -50%) translate3d(${px}px, ${py}px, 0)`,
              boxShadow: layer.shadow,
              opacity: layer.opacity,
              borderRadius: '50%',
              backdropFilter: `blur(${layer.blur}px)`,
              WebkitBackdropFilter: `blur(${layer.blur}px)`,
              background: 'rgba(255,255,255,0.12)',
              clipPath: 'circle(48% at 50% 50%)',
              border: '2px solid rgba(168,85,247,0.10)',
            }}
            aria-hidden="true"
          />
        );
      })}
      {/* Enhanced Particles Background */}
      <Particles
        id="hero-particles"
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
                quantity: 6,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: ["#ffffff", "#a855f7", "#ec4899", "#3b82f6"],
            },
            links: {
              color: "#ffffff",
              distance: 150,
              enable: true,
              opacity: 0.3,
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
              speed: 1.5,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 80,
            },
            opacity: {
              value: 0.5,
              animation: {
                enable: true,
                speed: 1,
                minimumValue: 0.1,
              },
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 5 },
              animation: {
                enable: true,
                speed: 2,
                minimumValue: 0.1,
              },
            },
          },
          detectRetina: true,
        }}
        className="absolute inset-0"
      />

      {/* Main Content - Stacked Layout */}
      <div className="relative z-10 flex flex-col items-center justify-start text-center max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 gap-6 mt-8">
        {/* Top Centered Image */}
        <div ref={pinRef} className="flex justify-center items-center w-full mb-6">
          <motion.img
            ref={imgRef}
            src="/graduation1.jpg"
            alt="Profile"
            loading="lazy"
            width="320"
            height="320"
            className="w-40 h-40 md:w-64 md:h-64 rounded-full border-4 border-white/20 dark:border-gray-600/20 shadow-2xl object-cover animate-float"
            style={{ objectPosition: '60% 70%' }}
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
        </div>
        {/* Centered Text Content */}
        <h1
          ref={el => textBlockRefs.current[0] = el}
          className="text-5xl md:text-7xl lg:text-hero font-extrabold mb-2 tracking-tight text-gray-900 dark:text-white"
        >
          Ameer Mortaza
        </h1>
        <h2
          ref={el => textBlockRefs.current[1] = el}
          className="text-2xl md:text-3xl font-semibold mb-2 text-gray-700 dark:text-gray-300"
        >
          I am a Data Scientist
        </h2>
        <div
          ref={el => textBlockRefs.current[2] = el}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-2"
        >
          <span className="inline-block">
            GIKI Graduate | Data Science & AI Enthusiast
          </span>
        </div>
        <p
          ref={el => textBlockRefs.current[3] = el}
          className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed font-medium"
        >
          I am passionate about Data Science and Artificial Intelligence projects, and I love working on real-world analytics and machine learning solutions. Explore my portfolio to see my work and experience.
        </p>
      </div>
      {/* Scroll Indicator with Pulse */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1.1 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/30 dark:border-gray-600/30 rounded-full flex justify-center animate-pulse-glow"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-white/60 dark:bg-gray-400/60 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero; 