/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['Oxanium', 'system-ui', 'sans-serif'],
        sans: ['Manrope', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        void: '#05070D',
        panel: '#090A12',
        elevated: '#0F1117',
        cyan: {
          DEFAULT: '#00F5FF',
          dim: 'rgba(0, 245, 255, 0.15)',
          glow: 'rgba(0, 245, 255, 0.35)',
        },
        violet: {
          DEFAULT: '#8B5CF6',
          dim: 'rgba(139, 92, 246, 0.15)',
          glow: 'rgba(139, 92, 246, 0.35)',
        },
        emerald: {
          DEFAULT: '#34D399',
          dim: 'rgba(52, 211, 153, 0.12)',
        },
        ink: {
          DEFAULT: '#FFFFFF',
          soft: '#C4C9D4',
          muted: '#8B93A7',
          faint: '#5C657A',
        },
      },
      borderRadius: {
        panel: '14px',
        hud: '16px',
      },
      boxShadow: {
        glass: '0 8px 32px rgba(0, 0, 0, 0.45)',
        cyan: '0 0 24px rgba(0, 245, 255, 0.2)',
        'cyan-sm': '0 0 12px rgba(0, 245, 255, 0.15)',
        violet: '0 0 24px rgba(139, 92, 246, 0.2)',
      },
      backgroundImage: {
        'cyber-grid':
          'linear-gradient(rgba(0,245,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,255,0.04) 1px, transparent 1px)',
        'mesh-glow':
          'radial-gradient(ellipse 60% 40% at 20% 20%, rgba(0,245,255,0.12), transparent 60%), radial-gradient(ellipse 50% 40% at 80% 30%, rgba(139,92,246,0.14), transparent 55%), radial-gradient(ellipse 40% 50% at 50% 80%, rgba(52,211,153,0.06), transparent 50%)',
      },
      animation: {
        'grid-drift': 'grid-drift 40s linear infinite',
        'pulse-line': 'pulse-line 4s ease-in-out infinite',
        'fog-drift': 'fog-drift 28s ease-in-out infinite',
        'terminal-blink': 'terminal-blink 1.05s steps(1) infinite',
        'signal-pulse': 'signal-pulse 2.4s ease-in-out infinite',
        'skill-shimmer': 'skill-shimmer 2.8s ease-in-out infinite',
      },
      keyframes: {
        'grid-drift': {
          '0%': { backgroundPosition: '0 0, 0 0' },
          '100%': { backgroundPosition: '60px 60px, 60px 60px' },
        },
        'pulse-line': {
          '0%, 100%': { opacity: '0.35' },
          '50%': { opacity: '0.85' },
        },
        'fog-drift': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(2%, -1%) scale(1.05)' },
        },
        'terminal-blink': {
          '0%, 45%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
        'signal-pulse': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(0, 245, 255, 0.35)' },
          '50%': { boxShadow: '0 0 14px 2px rgba(0, 245, 255, 0.35)' },
        },
        'skill-shimmer': {
          '0%': { backgroundPosition: '120% 0' },
          '100%': { backgroundPosition: '-40% 0' },
        },
      },
    },
  },
  plugins: [],
};
