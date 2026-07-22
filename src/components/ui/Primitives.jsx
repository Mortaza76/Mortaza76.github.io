import React from 'react';
import { motion } from 'framer-motion';
import Magnetic from './Magnetic';

const accentMap = {
  cyan: 'from-cyan/20 via-transparent to-violet/10 border-cyan/20',
  violet: 'from-violet/20 via-transparent to-cyan/10 border-violet/20',
  emerald: 'from-emerald/15 via-transparent to-cyan/10 border-emerald/20',
};

export function GlassPanel({
  children,
  className = '',
  hud = false,
  accent = 'cyan',
  hover = true,
  ...props
}) {
  return (
    <motion.div
      className={`glass-panel ${hud ? 'hud-corners' : ''} ${hover ? 'transition-all duration-300 hover:-translate-y-1 hover:border-cyan/30 hover:shadow-cyan-sm' : ''} ${className}`}
      {...props}
    >
      <div
        className={`pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-br opacity-70 ${accentMap[accent] || accentMap.cyan}`}
        aria-hidden="true"
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

export function SectionHeading({ eyebrow, title, description }) {
  return (
    <motion.div
      className="mb-12 max-w-3xl"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.45 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      {eyebrow && (
        <motion.p
          initial={{ opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.45 }}
          className="mb-3 font-mono text-xs uppercase tracking-[0.28em] text-cyan"
        >
          {eyebrow}
        </motion.p>
      )}
      <h2 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-ink-soft sm:text-lg">
          {description}
        </p>
      )}
      <motion.div
        className="cyber-divider mt-8 max-w-xs origin-left"
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      />
    </motion.div>
  );
}

export function Button({
  children,
  href,
  variant = 'primary',
  className = '',
  download,
  type = 'button',
  onClick,
  disabled,
  magnetic = true,
  ...props
}) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-panel px-6 py-3 font-display text-sm font-semibold tracking-wide transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan disabled:cursor-not-allowed disabled:opacity-50';

  const variants = {
    primary:
      'bg-cyan text-void shadow-cyan-sm hover:bg-white hover:shadow-cyan',
    secondary:
      'border border-cyan/40 bg-cyan/10 text-cyan hover:border-cyan hover:bg-cyan/20',
    ghost:
      'border border-white/10 bg-white/[0.03] text-ink-soft hover:border-white/25 hover:text-white',
  };

  const classes = `${base} ${variants[variant]} ${className}`;

  const inner = href ? (
    <motion.a
      href={href}
      download={download}
      className={classes}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      data-cursor="hover"
      {...props}
    >
      {children}
    </motion.a>
  ) : (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      whileHover={disabled ? undefined : { scale: 1.02 }}
      whileTap={disabled ? undefined : { scale: 0.98 }}
      data-cursor="hover"
      {...props}
    >
      {children}
    </motion.button>
  );

  if (!magnetic || disabled) return inner;

  return (
    <Magnetic strength={0.22} className="inline-flex">
      {inner}
    </Magnetic>
  );
}
