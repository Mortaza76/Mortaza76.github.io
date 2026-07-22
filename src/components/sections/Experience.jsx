import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useScroll, useSpring } from 'framer-motion';
import { experience } from '../../data/content';
import { GlassPanel, SectionHeading } from '../ui/Primitives';

function TimelineNode({ active, index }) {
  return (
    <motion.span
      className={`absolute -left-[2.4rem] top-6 flex h-3.5 w-3.5 items-center justify-center rounded-full border bg-void sm:-left-[2.65rem] ${
        active
          ? 'border-cyan shadow-[0_0_16px_rgba(0,245,255,0.55)]'
          : 'border-cyan/50 shadow-cyan-sm'
      }`}
      initial={{ scale: 0.4, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ type: 'spring', stiffness: 320, damping: 18, delay: index * 0.05 }}
      aria-hidden="true"
    >
      <span
        className={`h-1.5 w-1.5 rounded-full bg-cyan ${
          active ? 'animate-signal-pulse scale-125' : ''
        }`}
      />
    </motion.span>
  );
}

function TimelineItem({ item, index, active, onActivate }) {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.45, margin: '-10% 0px -35% 0px' });

  useEffect(() => {
    if (inView) onActivate(item.id);
  }, [inView, item.id, onActivate]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.55, delay: index * 0.05 }}
      className="relative"
    >
      <TimelineNode active={active} index={index} />

      <GlassPanel
        className={`p-5 sm:p-6 transition-[border-color,box-shadow] duration-300 ${
          active ? 'border-cyan/30 shadow-cyan-sm' : ''
        }`}
        accent={index % 2 ? 'violet' : 'cyan'}
      >
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-cyan/25 bg-cyan/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-cyan">
            {item.type}
          </span>
          <span className="font-mono text-xs text-ink-muted">{item.period}</span>
          {active && (
            <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.18em] text-cyan">
              signal live
            </span>
          )}
        </div>
        <h3 className="mt-3 font-display text-xl text-white">{item.title}</h3>
        <p className="mt-1 text-sm text-ink-soft">{item.org}</p>
        <ul className="mt-4 space-y-2">
          {item.points.map((point, pi) => (
            <motion.li
              key={point}
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + pi * 0.04 }}
              className="flex gap-2 text-sm leading-relaxed text-ink-soft"
            >
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-cyan/80" />
              {point}
            </motion.li>
          ))}
        </ul>
      </GlassPanel>
    </motion.div>
  );
}

export default function Experience() {
  const trackRef = useRef(null);
  const [activeId, setActiveId] = useState(experience[0]?.id ?? null);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start 75%', 'end 35%'],
  });
  const lineScale = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  return (
    <section id="experience" className="relative z-10 py-24">
      <div className="section-shell">
        <SectionHeading
          eyebrow="04 · Timeline"
          title="Experience"
          description="Roles, internships, leadership, and education from my CV."
        />

        <div ref={trackRef} className="relative ml-2 space-y-6 border-l border-cyan/15 pl-8 sm:ml-4">
          <motion.div
            className="pointer-events-none absolute -left-px top-0 w-[2px] origin-top bg-gradient-to-b from-cyan via-violet to-cyan/20 shadow-[0_0_12px_rgba(0,245,255,0.35)]"
            style={{ scaleY: lineScale, height: '100%' }}
            aria-hidden="true"
          />

          {experience.map((item, index) => (
            <TimelineItem
              key={item.id}
              item={item}
              index={index}
              active={activeId === item.id}
              onActivate={setActiveId}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
