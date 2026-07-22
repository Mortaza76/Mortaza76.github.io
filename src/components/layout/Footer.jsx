import React from 'react';
import { profile } from '../../data/content';

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/5 py-10">
      <div className="section-shell">
        <div className="cyber-divider mb-8" />
        <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-muted">
            <span className="text-cyan">●</span> System online · {profile.name}
          </p>
          <p className="text-sm text-ink-muted">
            © {new Date().getFullYear()} {profile.fullName}. Crafted for clarity and impact.
          </p>
        </div>
      </div>
    </footer>
  );
}
