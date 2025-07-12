import React, { useRef, useEffect } from 'react';
import useDarkMode from '../hooks/useDarkMode';

// Vibrant, elegant color palettes
const DAY_COLORS = [
  '#a855f7', // purple
  '#38bdf8', // blue
  '#fbbf24', // gold
  '#ec4899', // pink
  '#22d3ee', // cyan
  '#f472b6', // rose
  '#f59e42', // orange
];
const NIGHT_COLORS = [
  '#f472b6', // rose
  '#fbbf24', // gold
  '#a21caf', // deep purple
  '#06b6d4', // cyan
  '#f43f5e', // red
  '#818cf8', // indigo
  '#facc15', // yellow
];

const NUM_PARTICLES = 14;
const MIN_RADIUS = 36;
const MAX_RADIUS = 70;
const MERGE_DISTANCE = 0.6;
const MERGE_PROB = 0.07; // Lower merge probability
const CANVAS_BG_DAY = '#18181b';
const CANVAS_BG_NIGHT = '#101014';

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function randomColor(palette) {
  return palette[Math.floor(Math.random() * palette.length)];
}

const AnimatedBackground = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const { isDark } = useDarkMode();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Responsive resize
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', handleResize);

    // Particle system
    let palette = isDark ? NIGHT_COLORS : DAY_COLORS;
    let bgColor = isDark ? CANVAS_BG_NIGHT : CANVAS_BG_DAY;
    let particles = Array.from({ length: NUM_PARTICLES }).map(() => {
      const angle = Math.random() * Math.PI * 2;
      const speed = lerp(2.2, 4.2, Math.random()); // much faster
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        r: lerp(MIN_RADIUS, MAX_RADIUS, Math.random()),
        color: randomColor(palette),
        mergeCooldown: 0,
        squish: 1,
        squishVel: 0,
      };
    });

    function drawParticles() {
      ctx.clearRect(0, 0, width, height);
      ctx.save();
      ctx.globalAlpha = 1;
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, width, height);
      ctx.restore();
      for (const p of particles) {
        // Clamp squish to avoid invalid ellipse
        p.squish = Math.max(0.4, Math.min(2.5, isNaN(p.squish) ? 1 : p.squish));
        const rx = Math.max(2, Math.abs(p.r * p.squish));
        const ry = Math.max(2, Math.abs(p.r / p.squish));
        ctx.save();
        ctx.beginPath();
        ctx.ellipse(p.x, p.y, rx, ry, 0, 0, Math.PI * 2);
        ctx.closePath();
        ctx.shadowColor = p.color;
        ctx.shadowBlur = isDark ? 40 : 22;
        ctx.globalAlpha = isDark ? 0.93 : 0.82;
        ctx.fillStyle = p.color;
        ctx.filter = `blur(${isDark ? 2.5 : 1.2}px)`;
        ctx.fill();
        ctx.restore();
      }
      ctx.filter = 'none';
    }

    function updateParticles() {
      // Move
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        // Bounce off walls
        if (p.x - p.r < 0) { p.x = p.r; p.vx *= -1.15; p.squishVel = -0.25; }
        if (p.x + p.r > width) { p.x = width - p.r; p.vx *= -1.15; p.squishVel = -0.25; }
        if (p.y - p.r < 0) { p.y = p.r; p.vy *= -1.15; p.squishVel = 0.25; }
        if (p.y + p.r > height) { p.y = height - p.r; p.vy *= -1.15; p.squishVel = 0.25; }
        if (p.mergeCooldown > 0) p.mergeCooldown--;
        // Squish relax
        p.squish += p.squishVel;
        p.squishVel *= 0.7;
        p.squish = lerp(p.squish, 1, 0.12);
      }
      // Collisions & merging
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < a.r + b.r) {
            // Sometimes merge, sometimes bounce
            if (dist < (a.r + b.r) * MERGE_DISTANCE && a.mergeCooldown === 0 && b.mergeCooldown === 0 && Math.random() < MERGE_PROB) {
              // Merge: absorb smaller into larger
              let big, small;
              if (a.r > b.r) { big = a; small = b; } else { big = b; small = a; }
              big.r = Math.min(MAX_RADIUS, Math.sqrt(big.r * big.r + small.r * small.r));
              big.vx = lerp(big.vx, small.vx, 0.5);
              big.vy = lerp(big.vy, small.vy, 0.5);
              big.mergeCooldown = 60;
              small.x = Math.random() * width;
              small.y = Math.random() * height;
              small.r = lerp(MIN_RADIUS, MAX_RADIUS, Math.random());
              small.color = randomColor(palette);
              small.mergeCooldown = 60;
            } else {
              // Harder, more energetic bounce
              const nx = dx / dist;
              const ny = dy / dist;
              const p1 = a.vx * nx + a.vy * ny;
              const p2 = b.vx * nx + b.vy * ny;
              const bounce = 1.25;
              a.vx += (p2 - p1) * nx * bounce;
              a.vy += (p2 - p1) * ny * bounce;
              b.vx += (p1 - p2) * nx * bounce;
              b.vy += (p1 - p2) * ny * bounce;
              // Squish effect
              a.squishVel -= 0.18;
              b.squishVel += 0.18;
            }
          }
        }
      }
      // Smooth velocity
      for (const p of particles) {
        p.vx = lerp(p.vx, Math.max(-6, Math.min(6, p.vx)), 0.97);
        p.vy = lerp(p.vy, Math.max(-6, Math.min(6, p.vy)), 0.97);
      }
    }

    function animate() {
      updateParticles();
      drawParticles();
      animationRef.current = requestAnimationFrame(animate);
    }
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
    // eslint-disable-next-line
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full z-0 pointer-events-none select-none"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
        userSelect: 'none',
        background: isDark ? CANVAS_BG_NIGHT : CANVAS_BG_DAY,
        transition: 'background 0.3s',
      }}
      aria-hidden="true"
    />
  );
};

export default AnimatedBackground; 