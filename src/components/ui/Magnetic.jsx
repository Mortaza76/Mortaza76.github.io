import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * Slight cursor-pull effect for CTAs and chips.
 * Disabled automatically when the user prefers reduced motion or coarse pointer.
 */
export default function Magnetic({
  children,
  className = '',
  strength = 0.28,
  disabled = false,
  ...props
}) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 260, damping: 18, mass: 0.4 });

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const onMove = (e) => {
    if (disabled) return;
    if (typeof window !== 'undefined') {
      const fine = window.matchMedia('(pointer: fine)').matches;
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!fine || reduced) return;
    }
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    x.set(dx * strength);
    y.set(dy * strength);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: springX, y: springY }}
      onMouseMove={onMove}
      onMouseLeave={reset}
      {...props}
    >
      {children}
    </motion.div>
  );
}
