import React from 'react';
import { motion } from 'framer-motion';
import { BadgeCheck, ExternalLink, FileText, Trophy } from 'lucide-react';
import { certifications, microsoftLearn } from '../../data/content';
import { GlassPanel, SectionHeading, Button } from '../ui/Primitives';
import CountUp from '../ui/CountUp';

export default function Certifications() {
  const paths = microsoftLearn.featuredLearningPaths || [];

  return (
    <section id="certifications" className="relative z-10 py-24">
      <div className="section-shell">
        <SectionHeading
          eyebrow="05 · Credentials"
          title="Certifications"
          description="Verifiable credentials plus selected Microsoft Learn paths across Azure AI, ML, and data."
        />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.45 }}
          className="mb-8"
        >
          <GlassPanel className="p-6 sm:p-8" hud accent="cyan">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-2xl">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-cyan">
                  Learning Hub
                </p>
                <h3 className="mt-2 font-display text-2xl text-white">
                  {microsoftLearn.label}
                  <span className="text-ink-muted"> · </span>
                  {microsoftLearn.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft sm:text-base">
                  {microsoftLearn.blurb}
                </p>
              </div>
              <div className="flex shrink-0 flex-col gap-3 sm:items-end">
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full border border-cyan/25 bg-cyan/10 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-cyan">
                    Lvl{' '}
                    <CountUp to={microsoftLearn.stats.level} className="tabular-nums" />
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-ink-soft">
                    <CountUp to={microsoftLearn.stats.badges} className="tabular-nums" /> badges
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-ink-soft">
                    <CountUp to={microsoftLearn.stats.trophies} className="tabular-nums" /> trophies
                  </span>
                </div>
                <Button
                  href={microsoftLearn.achievementsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="secondary"
                >
                  View all on Learn <ExternalLink size={16} />
                </Button>
              </div>
            </div>

            <div className="mt-8">
              <div className="mb-4 flex items-center gap-2">
                <Trophy size={16} className="text-cyan" />
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">
                  Featured paths · {paths.length} of {microsoftLearn.stats.pathCount}
                </p>
              </div>
              <ul className="grid gap-2 sm:grid-cols-2">
                {paths.map((path) => (
                  <li key={path.url}>
                    <a
                      href={path.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex h-full flex-col rounded-panel border border-white/10 bg-void/40 px-3 py-3 transition hover:border-cyan/30 hover:bg-cyan/5"
                      data-cursor="hover"
                    >
                      <span className="text-sm font-medium text-white group-hover:text-cyan">
                        {path.title}
                      </span>
                      <span className="mt-2 font-mono text-[10px] uppercase tracking-wider text-ink-muted">
                        Completed {path.completed}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </GlassPanel>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2">
          {certifications.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.06, duration: 0.45 }}
            >
              <GlassPanel className="flex h-full flex-col p-5" hud accent={item.accent}>
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan">
                      {item.issuer}
                    </p>
                    <h3 className="mt-2 font-display text-lg text-white">{item.title}</h3>
                    <p className="mt-2 text-sm text-ink-soft">
                      Issued {item.issued}
                      {item.expires ? ` · Expires ${item.expires}` : ''}
                    </p>
                  </div>
                  {item.badge ? (
                    <img
                      src={item.badge}
                      alt={`${item.issuer} badge`}
                      className="h-16 w-14 shrink-0 object-contain"
                      loading="lazy"
                    />
                  ) : (
                    <div
                      className={`flex items-center gap-1 rounded-full border px-2 py-1 ${
                        item.verifyUrl
                          ? 'border-emerald/30 bg-emerald/10 text-emerald'
                          : 'border-amber-400/30 bg-amber-400/10 text-amber-200'
                      }`}
                    >
                      {item.verifyUrl ? <BadgeCheck size={14} /> : <FileText size={14} />}
                      <span className="font-mono text-[10px] uppercase tracking-wider">
                        {item.status}
                      </span>
                    </div>
                  )}
                </div>

                {item.badge && (
                  <div className="mt-3 inline-flex w-fit items-center gap-1 rounded-full border border-emerald/30 bg-emerald/10 px-2 py-1 text-emerald">
                    <BadgeCheck size={14} />
                    <span className="font-mono text-[10px] uppercase tracking-wider">
                      {item.status}
                    </span>
                  </div>
                )}

                {item.note && (
                  <p className="mt-3 text-xs leading-relaxed text-ink-muted">{item.note}</p>
                )}

                <div className="mt-auto flex flex-wrap gap-2 pt-5">
                  {item.verifyUrl && (
                    <a
                      href={item.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-panel border border-cyan/30 bg-cyan/10 px-3 py-2 font-mono text-[11px] uppercase tracking-wider text-cyan transition hover:bg-cyan/20"
                      data-cursor="hover"
                    >
                      <ExternalLink size={14} /> Verify
                    </a>
                  )}
                  <a
                    href={item.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-panel border border-white/10 bg-white/[0.03] px-3 py-2 font-mono text-[11px] uppercase tracking-wider text-ink-soft transition hover:border-white/25 hover:text-white"
                    data-cursor="hover"
                  >
                    <FileText size={14} /> {item.verifyUrl ? 'View PDF' : 'View accreditation PDF'}
                  </a>
                </div>
              </GlassPanel>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
