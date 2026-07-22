import React, { useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import { ArrowDownRight, Download, ExternalLink, FileText, Mail, Shield } from 'lucide-react';
import { certifications, profile } from '../../data/content';
import { Button } from '../ui/Primitives';
import TerminalType from '../ui/TerminalType';
import Magnetic from '../ui/Magnetic';

const fade = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.08 * i, ease: [0.22, 1, 0.36, 1] },
  }),
};

const accentBorder = {
  cyan: 'border-cyan/50',
  violet: 'border-violet/50',
  emerald: 'border-emerald/45',
};

const accentText = {
  cyan: 'text-cyan',
  violet: 'text-violet',
  emerald: 'text-emerald',
};

const accentGlow = {
  cyan: 'shadow-[0_0_40px_rgba(0,245,255,0.35),0_0_80px_rgba(0,245,255,0.12)]',
  violet: 'shadow-[0_0_40px_rgba(139,92,246,0.35),0_0_80px_rgba(139,92,246,0.12)]',
  emerald: 'shadow-[0_0_40px_rgba(16,185,129,0.3),0_0_80px_rgba(16,185,129,0.1)]',
};

function HoloBadge({
  cert,
  index,
  active,
  dimmed,
  finePointer,
  onActivate,
  onDeactivate,
}) {
  const shortTitle =
    cert.title.length > 36 ? `${cert.title.slice(0, 34)}…` : cert.title;
  const accent = cert.accent || 'cyan';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, rotateX: 18, y: 24 }}
      animate={{
        opacity: dimmed ? 0.35 : 1,
        rotateX: 0,
        y: 0,
        scale: dimmed ? 0.96 : active ? 1.04 : 1,
        z: active ? 56 : 0,
        filter: dimmed ? 'blur(1px)' : 'blur(0px)',
      }}
      transition={{
        layout: { type: 'spring', stiffness: 280, damping: 24 },
        opacity: { duration: 0.25 },
        delay: active || dimmed ? 0 : 0.2 + index * 0.1,
      }}
      onMouseEnter={finePointer ? onActivate : undefined}
      onMouseLeave={finePointer ? onDeactivate : undefined}
      onFocus={onActivate}
      onBlur={onDeactivate}
      onClick={() => {
        if (finePointer) return;
        active ? onDeactivate() : onActivate();
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          active ? onDeactivate() : onActivate();
        }
      }}
      role="button"
      tabIndex={0}
      aria-expanded={active}
      aria-label={`${cert.issuer}: ${cert.title}`}
      style={{
        transformStyle: 'preserve-3d',
        animationDelay: `${index * 0.35}s`,
        zIndex: active ? 20 : 1,
      }}
      className={`holo-badge-card relative block cursor-pointer rounded-panel border p-3 outline-none transition-[box-shadow,border-color] duration-300 focus-visible:ring-2 focus-visible:ring-cyan/50 ${
        accentBorder[accent]
      } ${active ? accentGlow[accent] : ''} ${!active ? 'holo-float' : ''}`}
      data-cursor="hover"
    >
      <div className="holo-scanlines pointer-events-none absolute inset-0 rounded-panel" />
      <div className="holo-sheen pointer-events-none absolute inset-0 rounded-panel opacity-60" />
      <div
        className="pointer-events-none absolute inset-0 rounded-panel bg-cyber-grid opacity-30"
        style={{ backgroundSize: '16px 16px' }}
      />

      {active && (
        <div className="pointer-events-none absolute -inset-px rounded-panel border border-cyan/30 opacity-80" />
      )}

      <div
        className="relative z-10 flex items-center gap-3"
        style={{ transform: 'translateZ(18px)' }}
      >
        {cert.badge ? (
          <motion.img
            src={cert.badge}
            alt=""
            animate={{ scale: active ? 1.12 : 1, rotateY: active ? -8 : 0 }}
            className="h-14 w-12 shrink-0 object-contain drop-shadow-[0_0_18px_rgba(0,245,255,0.55)]"
            loading="lazy"
          />
        ) : (
          <motion.div
            animate={{ scale: active ? 1.1 : 1 }}
            className={`flex h-14 w-12 shrink-0 items-center justify-center rounded-lg border border-white/20 bg-void/60 shadow-[0_0_20px_rgba(0,245,255,0.2)] ${
              accentText[accent]
            }`}
          >
            <Shield size={22} />
          </motion.div>
        )}

        <div className="min-w-0 flex-1">
          <p
            className={`font-mono text-[10px] uppercase tracking-[0.18em] text-glow ${
              accentText[accent]
            }`}
          >
            {cert.issuer}
          </p>
          <p className="mt-1 text-sm font-medium text-white">
            {active ? cert.title : shortTitle}
          </p>
          {!active && (
            <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-ink-muted">
              {cert.status}
              {cert.verifyUrl ? ' · Verifiable' : ' · PDF'}
            </p>
          )}
        </div>

        <span
          className={`shrink-0 font-mono text-[10px] uppercase tracking-wider transition ${
            active ? accentText[accent] : 'text-ink-muted'
          }`}
        >
          {active ? 'SCAN' : cert.verifyUrl ? <ExternalLink size={14} /> : <FileText size={14} />}
        </span>
      </div>

      <AnimatePresence initial={false}>
        {active && (
          <motion.div
            key="detail"
            initial={{ opacity: 0, height: 0, y: -8 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -6 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            className="relative z-10 overflow-hidden"
            style={{ transform: 'translateZ(28px)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="cyber-divider my-3" />

            <div className="grid gap-2 font-mono text-[11px] text-ink-soft sm:grid-cols-2">
              <div className="rounded-lg border border-white/10 bg-void/40 px-2.5 py-2">
                <p className="text-[9px] uppercase tracking-[0.2em] text-ink-muted">Issued</p>
                <p className="mt-1 text-white">{cert.issued}</p>
              </div>
              <div className="rounded-lg border border-white/10 bg-void/40 px-2.5 py-2">
                <p className="text-[9px] uppercase tracking-[0.2em] text-ink-muted">Expires</p>
                <p className="mt-1 text-white">{cert.expires || 'No expiry'}</p>
              </div>
              <div className="rounded-lg border border-white/10 bg-void/40 px-2.5 py-2 sm:col-span-2">
                <p className="text-[9px] uppercase tracking-[0.2em] text-ink-muted">Status</p>
                <p className={`mt-1 ${accentText[accent]}`}>
                  {cert.status}
                  {cert.verifyUrl ? ' · Public verification available' : ' · Document credential'}
                </p>
              </div>
            </div>

            {cert.note && (
              <p className="mt-3 text-xs leading-relaxed text-ink-muted">{cert.note}</p>
            )}

            <div className="mt-3 flex flex-wrap gap-2">
              {cert.verifyUrl && (
                <a
                  href={cert.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-panel border border-cyan/35 bg-cyan/15 px-3 py-2 font-mono text-[10px] uppercase tracking-wider text-cyan transition hover:bg-cyan/25"
                  data-cursor="hover"
                >
                  <ExternalLink size={12} /> Verify
                </a>
              )}
              {cert.pdf && (
                <a
                  href={cert.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-panel border border-white/15 bg-white/5 px-3 py-2 font-mono text-[10px] uppercase tracking-wider text-white transition hover:border-cyan/30 hover:text-cyan"
                  data-cursor="hover"
                >
                  <FileText size={12} /> PDF
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function HoloBadgeRack() {
  const ref = useRef(null);
  const [finePointer, setFinePointer] = useState(true);
  const [activeId, setActiveId] = useState(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), {
    stiffness: 160,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]), {
    stiffness: 160,
    damping: 18,
  });
  const glareX = useTransform(x, [-0.5, 0.5], [10, 90]);
  const glareY = useTransform(y, [-0.5, 0.5], [20, 80]);
  const glareBackground = useMotionTemplate`radial-gradient(420px circle at ${glareX}% ${glareY}%, rgba(0,245,255,0.18), transparent 55%)`;

  const onMove = (e) => {
    if (activeId != null) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
    setActiveId(null);
  };

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setFinePointer(fine && !reduced);
  }, []);

  useEffect(() => {
    if (activeId != null) {
      x.set(0);
      y.set(0);
    }
  }, [activeId, x, y]);

  return (
    <div className="relative mx-auto w-full max-w-md" style={{ perspective: 1100 }}>
      <div className="holo-beam pointer-events-none absolute -top-8 left-1/2 h-16 w-24 -translate-x-1/2 opacity-70" />
      <div className="holo-floor pointer-events-none absolute -bottom-6 left-1/2 h-10 w-[85%] -translate-x-1/2" />

      <motion.div
        ref={ref}
        onMouseMove={finePointer ? onMove : undefined}
        onMouseLeave={onLeave}
        style={
          finePointer && activeId == null
            ? { rotateX, rotateY, transformStyle: 'preserve-3d' }
            : { transformStyle: 'preserve-3d', rotateX: 0, rotateY: 0 }
        }
        className={`holo-frame holo-flicker hud-corners relative rounded-hud p-5 sm:p-6 ${
          activeId != null ? 'overflow-visible' : 'overflow-hidden'
        }`}
      >
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-hud"
          style={{ background: glareBackground }}
        />
        <div className="holo-scanlines pointer-events-none absolute inset-0 rounded-hud" />
        <div className="holo-sheen pointer-events-none absolute inset-0 rounded-hud opacity-40" />
        <div
          className="pointer-events-none absolute inset-0 rounded-hud bg-cyber-grid opacity-35"
          style={{ backgroundSize: '24px 24px' }}
        />

        <div className="relative z-10" style={{ transform: 'translateZ(24px)' }}>
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-cyan text-glow">
                Holo Projection // Credentials
              </p>
              <p className="mt-1 font-display text-lg text-white">
                {activeId != null ? 'Credential unlocked' : 'Badge rack online'}
              </p>
            </div>
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan/35 bg-cyan/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-cyan shadow-cyan-sm">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan" />
              {activeId != null ? 'scanning' : `${certifications.length} signals`}
            </span>
          </div>

          <div className="space-y-3" style={{ transformStyle: 'preserve-3d' }}>
            {certifications.map((cert, i) => (
              <HoloBadge
                key={cert.id}
                cert={cert}
                index={i}
                active={activeId === cert.id}
                dimmed={activeId != null && activeId !== cert.id}
                finePointer={finePointer}
                onActivate={() => setActiveId(cert.id)}
                onDeactivate={() => setActiveId((id) => (id === cert.id ? null : id))}
              />
            ))}
          </div>

          <a
            href="#certifications"
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-panel border border-cyan/25 bg-cyan/10 px-3 py-2.5 font-mono text-[11px] uppercase tracking-wider text-cyan transition hover:bg-cyan/20 hover:shadow-cyan-sm"
            data-cursor="hover"
            style={{ transform: 'translateZ(12px)' }}
          >
            Open credentials vault
          </a>
        </div>
      </motion.div>
    </div>
  );
}

export default function Hero() {
  return (
    <section
      id="home"
      className="relative z-10 flex min-h-screen items-center pb-20 pt-28"
    >
      <div className="section-shell grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <motion.p
            custom={0}
            variants={fade}
            initial="hidden"
            animate="show"
            className="mb-5 font-mono text-xs uppercase tracking-[0.3em] text-cyan"
          >
            AI Systems · GIKI ’25
          </motion.p>

          <TerminalType className="mb-5" text="> uplink ready" />

          <motion.h1
            custom={1}
            variants={fade}
            initial="hidden"
            animate="show"
            className="font-display text-5xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl"
          >
            {profile.name}
          </motion.h1>

          <motion.h2
            custom={2}
            variants={fade}
            initial="hidden"
            animate="show"
            className="mt-4 font-display text-2xl font-medium text-cyan sm:text-3xl"
          >
            {profile.title}
          </motion.h2>

          <motion.div
            custom={3}
            variants={fade}
            initial="hidden"
            animate="show"
            className="mt-5 flex flex-wrap gap-2"
          >
            {profile.specialties.map((item) => (
              <Magnetic key={item} strength={0.35} className="inline-flex">
                <span
                  className="rounded-full border border-cyan/25 bg-cyan/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.16em] text-cyan"
                  data-cursor="hover"
                >
                  {item}
                </span>
              </Magnetic>
            ))}
          </motion.div>

          <motion.p
            custom={4}
            variants={fade}
            initial="hidden"
            animate="show"
            className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft"
          >
            {profile.tagline}
          </motion.p>

          <motion.div
            custom={5}
            variants={fade}
            initial="hidden"
            animate="show"
            className="mt-8 flex flex-wrap gap-3"
          >
            <Button href="#projects">
              View Projects <ArrowDownRight size={16} />
            </Button>
            <Button href={profile.resume} download variant="secondary">
              <Download size={16} /> Download Resume
            </Button>
            <Button href="#contact" variant="ghost">
              <Mail size={16} /> Contact Me
            </Button>
          </motion.div>
        </div>

        <motion.div custom={6} variants={fade} initial="hidden" animate="show">
          <HoloBadgeRack />
        </motion.div>
      </div>
    </section>
  );
}
