import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const imgRef = useRef(null);
  const heroSectionRef = useRef(null);

  useEffect(() => {
    if (!imgRef.current || !heroSectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imgRef.current,
        { scale: 1 },
        {
          scale: 1.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: heroSectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    }, heroSectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroSectionRef}
      id="home"
      className="min-h-screen flex flex-col justify-center items-center text-gray-900 dark:text-white relative overflow-hidden py-20 bg-white dark:bg-gray-900"
    >
      <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-b from-slate-50 via-blue-50/40 to-slate-100 dark:from-gray-900 dark:via-slate-900 dark:to-gray-950" />
      <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(59,130,246,0.18),transparent_55%)] dark:bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(59,130,246,0.22),transparent_55%)]" />
      <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_60%_50%_at_80%_80%,rgba(236,72,153,0.12),transparent_50%)] dark:bg-[radial-gradient(ellipse_60%_50%_at_80%_80%,rgba(236,72,153,0.14),transparent_50%)]" />

      <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 gap-5">
        <motion.img
          ref={imgRef}
          src="/graduation1.jpg"
          alt="Ameer Mortaza"
          loading="eager"
          width="256"
          height="256"
          className="w-36 h-36 md:w-48 md:h-48 rounded-full border-4 border-white/20 dark:border-gray-600/20 shadow-2xl object-cover"
          style={{ objectPosition: '60% 70%' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        />

        <motion.h1
          className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Ameer Mortaza
        </motion.h1>

        <motion.h2
          className="text-2xl md:text-3xl font-semibold text-gray-700 dark:text-gray-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          AI & Data Scientist
        </motion.h2>

        <motion.p
          className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-xl leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          Building machine learning systems and turning data into real-world impact.
        </motion.p>

        <motion.div
          className="flex flex-wrap items-center justify-center gap-4 mt-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <a
            href="#projects"
            className="px-8 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 shadow-lg transition-all duration-300"
            data-interactive="true"
          >
            View Projects
          </a>
          <a
            href="/cv.pdf"
            download
            className="px-8 py-3 rounded-xl font-semibold border border-gray-400/40 dark:border-white/30 text-gray-900 dark:text-white hover:bg-white/10 transition-all duration-300"
            data-interactive="true"
          >
            Download CV
          </a>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-gray-400/40 dark:border-white/30 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-gray-500/60 dark:bg-gray-400/60 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
