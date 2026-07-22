import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function TerminalType({
  text = '> uplink ready',
  className = '',
  startDelay = 700,
  charDelay = 42,
}) {
  const [shown, setShown] = useState('');

  useEffect(() => {
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduced) {
      setShown(text);
      return undefined;
    }

    let i = 0;
    let intervalId;
    const timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        i += 1;
        setShown(text.slice(0, i));
        if (i >= text.length) clearInterval(intervalId);
      }, charDelay);
    }, startDelay);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [text, startDelay, charDelay]);

  return (
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.35 }}
      className={`font-mono text-xs tracking-wide text-cyan/90 sm:text-sm ${className}`}
      aria-label={`${text}_`}
    >
      <span>{shown}</span>
      <span className="animate-terminal-blink text-cyan">_</span>
    </motion.p>
  );
}
