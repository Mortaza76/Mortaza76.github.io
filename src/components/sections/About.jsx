import React from 'react';
import { motion } from 'framer-motion';
import { about, profile } from '../../data/content';
import { GlassPanel, SectionHeading, Button } from '../ui/Primitives';
import { Download } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="relative z-10 py-24">
      <div className="section-shell">
        <SectionHeading
          eyebrow="01 · Identity"
          title="About"
          description="AI systems and data platforms at the intersection of engineering and impact."
        />

        <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
          <div className="space-y-4">
            {about.highlights.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ delay: i * 0.09, duration: 0.5 }}
              >
                <GlassPanel className="p-5" hud accent={i === 1 ? 'violet' : 'cyan'}>
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-cyan">
                    {item.label}
                  </p>
                  <p className="mt-2 font-display text-lg text-white">{item.value}</p>
                </GlassPanel>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, delay: 0.12 }}
          >
            <GlassPanel className="p-6 sm:p-8" accent="violet">
              <h3 className="font-display text-2xl text-white">{profile.title}</h3>
              <div className="mt-6 space-y-4 text-ink-soft leading-relaxed">
                {about.paragraphs.map((p, i) => (
                  <motion.p
                    key={p.slice(0, 32)}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 + i * 0.08 }}
                  >
                    {p}
                  </motion.p>
                ))}
              </div>
              <div className="mt-8">
                <Button href={profile.resume} download variant="secondary">
                  <Download size={16} /> Download CV
                </Button>
              </div>
            </GlassPanel>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
