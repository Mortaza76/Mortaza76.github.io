import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

function Centered({ children }) {
  return (
    <div className="absolute left-0 top-0" style={{ transform: 'translate(-50%, -50%)' }}>
      {children}
    </div>
  );
}

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [textMode, setTextMode] = useState(false);
  const [visible, setVisible] = useState(false);

  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  // Shared position so core + ring stay aligned; ring only lags visually via size/rotate
  const x = useSpring(rawX, { stiffness: 450, damping: 32, mass: 0.2 });
  const y = useSpring(rawY, { stiffness: 450, damping: 32, mass: 0.2 });
  const lagX = useSpring(rawX, { stiffness: 160, damping: 22, mass: 0.4 });
  const lagY = useSpring(rawY, { stiffness: 160, damping: 22, mass: 0.4 });

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduced) return undefined;

    setEnabled(true);
    document.documentElement.classList.add('cyber-cursor');

    const onMove = (e) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      setVisible(true);
    };

    const onOver = (e) => {
      const textEl = e.target.closest('input, textarea, [contenteditable="true"]');
      const hoverEl = e.target.closest(
        'a, button, label, summary, [role="button"], [data-cursor="hover"]'
      );
      setTextMode(Boolean(textEl));
      setActive(Boolean(hoverEl) && !textEl);
    };

    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerover', onOver, { passive: true });
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    return () => {
      document.documentElement.classList.remove('cyber-cursor');
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerover', onOver);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
    };
  }, [rawX, rawY]);

  if (!enabled) return null;

  const ringSize = textMode ? 28 : active ? 54 : pressed ? 30 : 40;

  return (
    <>
      {/* Soft trailing aura (lags behind) */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[98] hidden md:block"
        style={{ x: lagX, y: lagY }}
        animate={{ opacity: visible ? 0.35 : 0 }}
      >
        <Centered>
          <div
            className="rounded-full bg-cyan/20 blur-md"
            style={{ width: ringSize + 18, height: ringSize + 18 }}
          />
        </Centered>
      </motion.div>

      {/* Outer targeting ring */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[99] hidden md:block"
        style={{ x, y }}
        animate={{ opacity: visible ? 1 : 0 }}
      >
        <Centered>
          <motion.div
            className={`relative rounded-full border ${
              active
                ? 'border-cyan shadow-[0_0_18px_rgba(0,245,255,0.45)]'
                : 'border-cyan/45'
            }`}
            animate={{
              width: ringSize,
              height: ringSize,
              rotate: active ? 90 : 0,
            }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
          >
            <span className="absolute left-1/2 top-0 h-1.5 w-px -translate-x-1/2 bg-cyan/80" />
            <span className="absolute bottom-0 left-1/2 h-1.5 w-px -translate-x-1/2 bg-cyan/80" />
            <span className="absolute left-0 top-1/2 h-px w-1.5 -translate-y-1/2 bg-cyan/80" />
            <span className="absolute right-0 top-1/2 h-px w-1.5 -translate-y-1/2 bg-cyan/80" />

            <span className="absolute left-1 top-1 h-2 w-2 border-l border-t border-cyan/70" />
            <span className="absolute right-1 top-1 h-2 w-2 border-r border-t border-cyan/70" />
            <span className="absolute bottom-1 left-1 h-2 w-2 border-b border-l border-cyan/70" />
            <span className="absolute bottom-1 right-1 h-2 w-2 border-b border-r border-cyan/70" />

            {active && (
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[8px] uppercase tracking-[0.24em] text-cyan text-glow">
                lock
              </span>
            )}
          </motion.div>
        </Centered>
      </motion.div>

      {/* Core reticle — same x/y as ring so it stays dead-center */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden md:block"
        style={{ x, y }}
        animate={{ opacity: visible ? 1 : 0 }}
      >
        <Centered>
          {textMode ? (
            <div className="h-5 w-[2px] bg-cyan shadow-[0_0_10px_rgba(0,245,255,0.8)] animate-terminal-blink" />
          ) : (
            <motion.div
              animate={{ scale: pressed ? 0.75 : active ? 1.25 : 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className="relative flex h-3 w-3 items-center justify-center"
            >
              <span className="absolute left-1/2 top-1/2 h-px w-3 -translate-x-1/2 -translate-y-1/2 bg-cyan shadow-[0_0_8px_rgba(0,245,255,0.9)]" />
              <span className="absolute left-1/2 top-1/2 h-3 w-px -translate-x-1/2 -translate-y-1/2 bg-cyan shadow-[0_0_8px_rgba(0,245,255,0.9)]" />
              <span className="relative h-1 w-1 rounded-full bg-white shadow-[0_0_10px_rgba(0,245,255,1)]" />
            </motion.div>
          )}
        </Centered>
      </motion.div>
    </>
  );
}
