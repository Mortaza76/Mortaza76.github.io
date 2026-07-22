import React, { useState } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import {
  Code2,
  Brain,
  Sparkles,
  Database,
  Server,
  Cloud,
  BarChart3,
} from 'lucide-react';
import { skillCategories } from '../../data/content';
import { GlassPanel, SectionHeading } from '../ui/Primitives';
import Magnetic from '../ui/Magnetic';

const icons = {
  Code2,
  Brain,
  Sparkles,
  Database,
  Server,
  Cloud,
  BarChart3,
};

const FEATURED = new Set(['Python', 'Databricks', 'Kafka', 'Apache Kafka', 'Neo4j']);

function SkillChip({ skill, index }) {
  const featured = FEATURED.has(skill);

  return (
    <Magnetic strength={0.35} className="inline-flex">
      <motion.span
        layout
        initial={{ opacity: 0, y: 10, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: index * 0.025, duration: 0.35 }}
        whileHover={{ y: -2, scale: 1.04 }}
        className={`skill-chip group relative overflow-hidden rounded-full border px-3 py-1.5 text-sm transition ${
          featured
            ? 'animate-signal-pulse border-cyan/45 bg-cyan/15 text-cyan'
            : 'border-white/10 bg-void/50 text-ink-soft hover:border-cyan/30 hover:text-cyan'
        }`}
        data-cursor="hover"
      >
        <span
          className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-cyan/25 to-transparent opacity-0 transition duration-500 group-hover:translate-x-full group-hover:opacity-100"
          aria-hidden="true"
        />
        <span className="relative z-10 inline-flex items-center gap-1.5">
          {featured && (
            <span className="flex h-1.5 w-1.5 rounded-full bg-cyan shadow-[0_0_8px_rgba(0,245,255,0.8)]" />
          )}
          {skill}
        </span>
      </motion.span>
    </Magnetic>
  );
}

export default function Skills() {
  const [active, setActive] = useState(0);
  const category = skillCategories[active];
  const Icon = icons[category.icon] || Code2;

  return (
    <section id="skills" className="relative z-10 py-24">
      <div className="section-shell">
        <SectionHeading
          eyebrow="02 · Capability Matrix"
          title="Skills"
          description="Core tools across AI, data engineering, analytics, MLOps, and automation."
        />

        <LayoutGroup>
          <motion.div
            className="mb-8 flex flex-wrap gap-2"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.05 } },
            }}
          >
            {skillCategories.map((cat, index) => {
              const CatIcon = icons[cat.icon] || Code2;
              const selected = index === active;
              return (
                <Magnetic key={cat.id} strength={0.3} className="inline-flex">
                  <motion.button
                    type="button"
                    layout
                    variants={{
                      hidden: { opacity: 0, y: 12 },
                      show: { opacity: 1, y: 0 },
                    }}
                    onClick={() => setActive(index)}
                    className={`relative inline-flex items-center gap-2 overflow-hidden rounded-panel border px-3 py-2 font-mono text-[11px] uppercase tracking-[0.14em] transition ${
                      selected
                        ? 'border-cyan/40 bg-cyan/15 text-cyan shadow-cyan-sm'
                        : 'border-white/10 bg-white/[0.03] text-ink-muted hover:border-white/20 hover:text-white'
                    }`}
                    data-cursor="hover"
                    aria-pressed={selected}
                  >
                    {selected && (
                      <motion.span
                        layoutId="skill-filter-glow"
                        className="pointer-events-none absolute inset-0 bg-cyan/10"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                    <CatIcon size={14} className="relative z-10" />
                    <span className="relative z-10 hidden sm:inline">{cat.title}</span>
                    <span className="relative z-10 sm:hidden">{cat.title.split(' ')[0]}</span>
                  </motion.button>
                </Magnetic>
              );
            })}
          </motion.div>
        </LayoutGroup>

        <AnimatePresence mode="wait">
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            layout
          >
            <GlassPanel className="p-6 sm:p-8" hud>
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-panel border border-cyan/30 bg-cyan/10 text-cyan">
                  <Icon size={20} />
                </div>
                <div>
                  <h3 className="font-display text-xl text-white">{category.title}</h3>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">
                    Module {String(active + 1).padStart(2, '0')}
                  </p>
                </div>
              </div>

              <motion.div layout className="flex flex-wrap gap-2">
                {category.skills.map((skill, i) => (
                  <SkillChip key={skill} skill={skill} index={i} />
                ))}
              </motion.div>
            </GlassPanel>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
