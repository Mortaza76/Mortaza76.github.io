import React, { useEffect, useRef } from 'react';
import useDarkMode from '../hooks/useDarkMode';

const CursorFollower = () => {
  const { isDark } = useDarkMode();
  const trailRefs = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationIdRef = useRef(null);

  useEffect(() => {
    // Show default cursor
    document.body.style.cursor = 'auto';

    // Initial positions
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let trailXY = Array(7).fill([x, y]);

    // Mouse move handler
    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };
    document.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    function animate() {
      trailXY = trailXY.map(([tx, ty], i) => {
        const ease = 0.12 + i * 0.04;
        const newX = tx + (mouseRef.current.x - tx) * ease;
        const newY = ty + (mouseRef.current.y - ty) * ease;
        if (trailRefs.current[i]) {
          trailRefs.current[i].style.transform = `translate3d(${newX - 8}px, ${newY - 8}px, 0)`;
          trailRefs.current[i].style.opacity = `${0.18 + 0.10 * (trailXY.length - 1 - i)}`;
          trailRefs.current[i].style.background = isDark
            ? 'rgba(255,255,255,0.85)'
            : 'rgba(30,30,34,0.7)';
          trailRefs.current[i].style.filter = `blur(${2 + i * 1.5}px)`;
        }
        return [newX, newY];
      });
      animationIdRef.current = requestAnimationFrame(animate);
    }
    animate();

    return () => {
      document.body.style.cursor = 'auto';
      document.removeEventListener('mousemove', handleMouseMove);
      if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);
    };
  }, [isDark]);

  return (
    <>
      {/* Trailing effect */}
      {[...Array(7)].map((_, index) => (
        <div
          key={index}
          ref={(el) => {
            if (el) trailRefs.current[index] = el;
          }}
          className="fixed top-0 left-0 w-4 h-4 rounded-full pointer-events-none z-50 select-none"
          style={{ transition: 'none', mixBlendMode: isDark ? 'screen' : 'multiply' }}
        />
      ))}
    </>
  );
};

export default CursorFollower; 