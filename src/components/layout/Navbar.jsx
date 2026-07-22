import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { navLinks } from '../../data/content';

function NavHudLink({ link, active }) {
  const [hovered, setHovered] = useState(false);
  const isOn = active || hovered;

  return (
    <li>
      <motion.a
        href={`#${link.id}`}
        data-cursor="hover"
        aria-current={active ? 'page' : undefined}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        animate={{
          y: hovered ? -4 : 0,
          scale: hovered ? 1.04 : 1,
        }}
        transition={{ type: 'spring', stiffness: 420, damping: 24 }}
        className={`nav-hud-link relative block rounded-md px-3 py-2 font-mono text-xs uppercase tracking-[0.16em] outline-none ${
          active ? 'text-cyan' : hovered ? 'text-cyan' : 'text-ink-muted'
        }`}
      >
        {/* HUD pop panel */}
        <motion.span
          className="pointer-events-none absolute inset-0 -z-10 rounded-md border border-cyan/40 bg-cyan/10 shadow-[0_0_20px_rgba(0,245,255,0.2)]"
          initial={false}
          animate={{
            opacity: hovered ? 1 : 0,
            scale: hovered ? 1 : 0.92,
          }}
          transition={{ type: 'spring', stiffness: 380, damping: 26 }}
          aria-hidden="true"
        />

        {/* Corner brackets */}
        <span
          className={`pointer-events-none absolute left-0.5 top-0.5 h-1.5 w-1.5 border-l border-t border-cyan transition ${
            hovered ? 'opacity-100' : 'opacity-0'
          }`}
          aria-hidden="true"
        />
        <span
          className={`pointer-events-none absolute right-0.5 top-0.5 h-1.5 w-1.5 border-r border-t border-cyan transition ${
            hovered ? 'opacity-100' : 'opacity-0'
          }`}
          aria-hidden="true"
        />
        <span
          className={`pointer-events-none absolute bottom-0.5 left-0.5 h-1.5 w-1.5 border-b border-l border-cyan transition ${
            hovered ? 'opacity-100' : 'opacity-0'
          }`}
          aria-hidden="true"
        />
        <span
          className={`pointer-events-none absolute bottom-0.5 right-0.5 h-1.5 w-1.5 border-b border-r border-cyan transition ${
            hovered ? 'opacity-100' : 'opacity-0'
          }`}
          aria-hidden="true"
        />

        {/* Scan sheen */}
        <AnimatePresence>
          {hovered && (
            <motion.span
              key="sheen"
              className="pointer-events-none absolute inset-0 overflow-hidden rounded-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              aria-hidden="true"
            >
              <motion.span
                className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-cyan/25 to-transparent"
                initial={{ left: '-60%' }}
                animate={{ left: '120%' }}
                transition={{ duration: 0.55, ease: 'easeOut' }}
              />
            </motion.span>
          )}
        </AnimatePresence>

        <span className="relative z-10">{link.label}</span>

        {/* Tiny target tag that pops above */}
        <AnimatePresence>
          {hovered && (
            <motion.span
              key="tag"
              initial={{ opacity: 0, y: 4, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 2 }}
              transition={{ type: 'spring', stiffness: 400, damping: 22 }}
              className="pointer-events-none absolute -top-3 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded border border-cyan/35 bg-void/90 px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-[0.2em] text-cyan shadow-[0_0_12px_rgba(0,245,255,0.25)]"
            >
              {`//${String(link.id).slice(0, 3)}`}
            </motion.span>
          )}
        </AnimatePresence>

        {active && (
          <motion.span
            layoutId="nav-indicator"
            className={`absolute inset-x-2 -bottom-0.5 h-px bg-cyan shadow-cyan-sm ${
              hovered ? 'opacity-0' : 'opacity-100'
            }`}
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
          />
        )}

        {isOn && !active && (
          <span className="absolute inset-x-2 -bottom-0.5 h-px bg-cyan/70 shadow-cyan-sm" />
        )}
      </motion.a>
    </li>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('home');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const sectionIds = ['home', ...navLinks.map((l) => l.id)];

    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target?.id) {
          setActive(visible[0].target.id);
        }
      },
      {
        root: null,
        rootMargin: '-25% 0px -55% 0px',
        threshold: [0.15, 0.35, 0.55],
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener('scroll', onScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:px-4 sm:pt-4">
      <motion.nav
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`flex w-full max-w-5xl items-center justify-between rounded-hud border px-4 py-3 backdrop-blur-xl transition-all duration-300 sm:px-5 ${
          scrolled
            ? 'border-cyan/20 bg-panel/80 shadow-glass'
            : 'border-white/10 bg-panel/50'
        }`}
        aria-label="Primary"
      >
        <a
          href="#home"
          className="font-display text-sm font-semibold tracking-wide text-white sm:text-base"
          data-cursor="hover"
        >
          <span className="text-cyan">/</span>
          Mortaza
          <span className="text-ink-muted">.ai</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <NavHudLink key={link.id} link={link} active={active === link.id} />
          ))}
        </ul>

        <motion.a
          href="#contact"
          data-cursor="hover"
          whileHover={{ y: -3, scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="nav-hud-cta relative hidden overflow-hidden rounded-panel border border-cyan/30 bg-cyan/10 px-3 py-1.5 font-mono text-xs uppercase tracking-wider text-cyan transition hover:border-cyan/50 hover:bg-cyan/20 hover:shadow-cyan-sm md:inline-flex"
        >
          <span className="relative z-10">Contact</span>
        </motion.a>

        <button
          type="button"
          className="inline-flex rounded-lg border border-white/10 p-2 text-white md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="absolute left-3 right-3 top-[4.5rem] rounded-hud border border-white/10 bg-panel/95 p-4 backdrop-blur-xl md:hidden"
          >
            <ul className="space-y-1">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={() => setOpen(false)}
                    className={`block rounded-lg px-3 py-3 font-mono text-sm uppercase tracking-wider ${
                      active === link.id ? 'bg-cyan/10 text-cyan' : 'text-ink-soft'
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
