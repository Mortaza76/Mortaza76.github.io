import React, { useEffect, useRef } from 'react';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';

export default function CyberBackground() {
  const canvasRef = useRef(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const { scrollYProgress } = useScroll();

  const smoothX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 60, damping: 20 });
  const smoothScroll = useSpring(scrollYProgress, { stiffness: 50, damping: 20 });

  const meshX = useTransform(smoothX, [0, 1], ['-4%', '4%']);
  const meshY = useTransform(smoothY, [0, 1], ['-3%', '3%']);
  const orb1X = useTransform(smoothX, [0, 1], ['-8%', '10%']);
  const orb1Y = useTransform([smoothY, smoothScroll], ([y, s]) => `${(y - 0.5) * 12 + s * 18}%`);
  const orb2X = useTransform(smoothX, [0, 1], ['6%', '-8%']);
  const orb2Y = useTransform([smoothY, smoothScroll], ([y, s]) => `${(0.5 - y) * 10 + s * 12}%`);
  const orb3X = useTransform(smoothX, [0, 1], ['-6%', '6%']);
  const orb3Y = useTransform(smoothScroll, [0, 1], ['0%', '-12%']);
  const gridOpacity = useTransform(smoothScroll, [0, 0.5, 1], [0.55, 0.78, 0.42]);
  const gridScale = useTransform(smoothScroll, [0, 1], [1, 1.08]);

  const glowX = useTransform(smoothX, (v) => `${v * 100}%`);
  const glowY = useTransform(smoothY, (v) => `${v * 100}%`);
  const glowSpot = useMotionTemplate`radial-gradient(520px circle at ${glowX} ${glowY}, rgba(0,245,255,0.12), transparent 55%)`;

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fine = window.matchMedia('(pointer: fine)').matches;

    const onMove = (e) => {
      if (reduced || !fine) return;
      mouseX.set(e.clientX / window.innerWidth);
      mouseY.set(e.clientY / window.innerHeight);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext('2d');
    let raf = 0;
    let particles = [];
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let pointer = { x: 0.5, y: 0.5 };

    const unsubX = mouseX.on('change', (v) => {
      pointer.x = v;
    });
    const unsubY = mouseY.on('change', (v) => {
      pointer.y = v;
    });

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const count = Math.min(52, Math.floor((canvas.width * canvas.height) / 42000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.4 + 0.3,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        a: Math.random() * 0.45 + 0.15,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const tx = pointer.x * canvas.width;
      const ty = pointer.y * canvas.height;

      particles.forEach((p) => {
        if (!reduced) {
          const dx = tx - p.x;
          const dy = ty - p.y;
          const dist = Math.hypot(dx, dy) || 1;
          p.vx += (dx / dist) * 0.002;
          p.vy += (dy / dist) * 0.002;
          p.vx *= 0.98;
          p.vy *= 0.98;
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0) p.x = canvas.width;
          if (p.x > canvas.width) p.x = 0;
          if (p.y < 0) p.y = canvas.height;
          if (p.y > canvas.height) p.y = 0;
        }
        ctx.beginPath();
        ctx.fillStyle = `rgba(0, 245, 255, ${p.a})`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      unsubX();
      unsubY();
    };
  }, [mouseX, mouseY]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-void" />

      <motion.div className="absolute inset-0 bg-mesh-glow" style={{ x: meshX, y: meshY }} />
      <motion.div className="absolute inset-0" style={{ background: glowSpot }} />

      <motion.div
        className="absolute inset-0 bg-cyber-grid animate-grid-drift"
        style={{
          opacity: gridOpacity,
          scale: gridScale,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan/40 to-transparent animate-pulse-line" />

      <motion.div
        className="absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-cyan/10 blur-[100px]"
        style={{ x: orb1X, y: orb1Y }}
      />
      <motion.div
        className="absolute -right-20 top-1/3 h-80 w-80 rounded-full bg-violet/15 blur-[110px]"
        style={{ x: orb2X, y: orb2Y }}
      />
      <motion.div
        className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-emerald/5 blur-[90px]"
        style={{ x: orb3X, y: orb3Y }}
      />

      <canvas ref={canvasRef} className="absolute inset-0 opacity-70" />
      <div className="absolute inset-0 bg-gradient-to-b from-void/20 via-transparent to-void" />
    </div>
  );
}
