import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const InspirationalQuote = () => {
  // Scroll-linked fade out
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 120], [1, 0]);
  const y = useTransform(scrollY, [0, 120], [0, -24]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-full z-40 flex justify-center pointer-events-none select-none"
      style={{ opacity, y }}
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="mt-2 mb-0 px-6 py-2 rounded-xl shadow-lg text-white text-base md:text-lg font-semibold italic max-w-2xl mx-auto pointer-events-auto select-none border border-white/10 backdrop-blur-md bg-gradient-to-r from-purple-700/80 via-pink-700/80 to-blue-700/80">
        "The best way to predict the future is to invent it." <span className="text-purple-200 font-normal not-italic">— Alan Kay</span>
      </div>
    </motion.div>
  );
};

export default InspirationalQuote; 