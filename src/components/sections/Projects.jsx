import React, { useEffect, useState } from 'react';
import {
  motion,
  AnimatePresence,
  LayoutGroup,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import { FaGithub } from 'react-icons/fa';
import { projects, projectCategories, githubProfile } from '../../data/content';
import { GlassPanel, SectionHeading, Button } from '../ui/Primitives';
import Magnetic from '../ui/Magnetic';

function ProjectCard({ project, index }) {
  const [hovered, setHovered] = useState(false);
  const [finePointer, setFinePointer] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-40, 40], [4, -4]), {
    stiffness: 200,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(x, [-40, 40], [-4, 4]), {
    stiffness: 200,
    damping: 20,
  });

  useEffect(() => {
    setFinePointer(window.matchMedia('(pointer: fine)').matches);
  }, []);

  const onMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
    setHovered(false);
  };

  const accents = {
    cyan: 'from-cyan/30 via-elevated to-violet/20',
    violet: 'from-violet/30 via-elevated to-cyan/20',
    emerald: 'from-emerald/25 via-elevated to-cyan/15',
  };

  const tagsActive = !finePointer || hovered;

  return (
    <motion.article
      layout
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onLeave}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay: index * 0.06 }}
      className="group h-full"
    >
      <GlassPanel
        className={`project-hud relative flex h-full flex-col overflow-hidden transition-[box-shadow,border-color] duration-300 ${
          hovered ? 'border-cyan/35 shadow-cyan-sm' : ''
        }`}
        hud
        accent={project.accent}
        hover={false}
      >
        {/* HUD corner brackets */}
        <span
          className={`project-bracket project-bracket-tl ${hovered ? 'is-lit' : ''}`}
          aria-hidden="true"
        />
        <span
          className={`project-bracket project-bracket-tr ${hovered ? 'is-lit' : ''}`}
          aria-hidden="true"
        />
        <span
          className={`project-bracket project-bracket-bl ${hovered ? 'is-lit' : ''}`}
          aria-hidden="true"
        />
        <span
          className={`project-bracket project-bracket-br ${hovered ? 'is-lit' : ''}`}
          aria-hidden="true"
        />

        {/* Scanline sweep */}
        <div
          className={`project-scanline pointer-events-none absolute inset-0 z-20 ${
            hovered ? 'is-active' : ''
          }`}
          aria-hidden="true"
        />

        <div
          className={`relative h-36 bg-gradient-to-br ${
            accents[project.accent] || accents.cyan
          }`}
        >
          <div
            className="absolute inset-0 bg-cyber-grid opacity-40"
            style={{ backgroundSize: '28px 28px' }}
          />
          <div className="absolute inset-0 flex items-end justify-between p-5">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-cyan">
                Project //{String(project.id).padStart(2, '0')}
              </p>
              <h3 className="mt-1 font-display text-xl text-white">{project.title}</h3>
            </div>
            <div className="flex flex-col items-end gap-2">
              <AnimatePresence>
                {hovered && (
                  <motion.span
                    key="open-repo"
                    initial={{ opacity: 0, y: 4, filter: 'blur(2px)' }}
                    animate={{
                      opacity: [0, 1, 0.4, 1, 0.7, 1],
                      y: 0,
                      filter: 'blur(0px)',
                      x: [0, -1, 1, 0],
                    }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.55, times: [0, 0.2, 0.35, 0.5, 0.7, 1] }}
                    className="font-mono text-[9px] uppercase tracking-[0.22em] text-cyan text-glow"
                  >
                    OPEN REPO
                  </motion.span>
                )}
              </AnimatePresence>
              <Magnetic strength={0.4}>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-white/15 bg-void/50 p-2 text-white transition hover:border-cyan/40 hover:text-cyan"
                  aria-label={`${project.title} on GitHub`}
                  data-cursor="hover"
                >
                  <FaGithub size={16} />
                </a>
              </Magnetic>
            </div>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-4 p-5">
          <p className="text-sm leading-relaxed text-ink-soft">{project.description}</p>
          {project.impact && (
            <p className="rounded-panel border border-emerald/20 bg-emerald/5 px-3 py-2 text-sm text-emerald">
              <span className="font-mono text-[10px] uppercase tracking-[0.16em]">Impact · </span>
              {project.impact}
            </p>
          )}
          <div className="mt-auto flex flex-wrap gap-2 overflow-hidden">
            {project.technologies.map((tech, ti) => (
              <motion.span
                key={tech}
                initial={false}
                animate={
                  tagsActive
                    ? { opacity: 1, y: 0, x: 0 }
                    : { opacity: 0.55, y: 10, x: 0 }
                }
                transition={{
                  type: 'spring',
                  stiffness: 320,
                  damping: 24,
                  delay: tagsActive && finePointer ? ti * 0.04 : 0,
                }}
                className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-ink-soft group-hover:border-cyan/25 group-hover:text-cyan"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>
      </GlassPanel>
    </motion.article>
  );
}

export default function Projects() {
  const [selected, setSelected] = useState('all');
  const filtered =
    selected === 'all' ? projects : projects.filter((p) => p.category === selected);

  return (
    <section id="projects" className="relative z-10 py-24">
      <div className="section-shell">
        <SectionHeading
          eyebrow="03 · Systems Archive"
          title="Featured Projects"
          description="Selected AI, data, and automation systems — with more work on GitHub."
        />

        <LayoutGroup>
          <motion.div
            className="mb-10 flex flex-wrap gap-2"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.06 } },
            }}
          >
            {projectCategories.map((cat) => (
              <Magnetic key={cat.id} strength={0.3} className="inline-flex">
                <motion.button
                  type="button"
                  layout
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    show: { opacity: 1, y: 0 },
                  }}
                  onClick={() => setSelected(cat.id)}
                  className={`relative overflow-hidden rounded-panel border px-4 py-2 font-mono text-xs uppercase tracking-[0.16em] transition ${
                    selected === cat.id
                      ? 'border-cyan/40 bg-cyan/15 text-cyan'
                      : 'border-white/10 text-ink-muted hover:text-white'
                  }`}
                  data-cursor="hover"
                  aria-pressed={selected === cat.id}
                >
                  {selected === cat.id && (
                    <motion.span
                      layoutId="project-filter-glow"
                      className="absolute inset-0 bg-cyan/10"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{cat.name}</span>
                </motion.button>
              </Magnetic>
            ))}
          </motion.div>
        </LayoutGroup>

        <AnimatePresence mode="popLayout">
          <motion.div layout className="grid gap-6 md:grid-cols-2">
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        <motion.div
          className="mt-10 flex justify-center"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Button href={githubProfile} target="_blank" rel="noopener noreferrer" variant="ghost">
            <FaGithub size={16} /> More on GitHub
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
