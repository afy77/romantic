import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export const CuteCursor = () => {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).tagName.toLowerCase() === 'button' || 
          (e.target as HTMLElement).closest('button') ||
          (e.target as HTMLElement).style.cursor === 'pointer' ||
          (e.target as HTMLElement).closest('[role="button"]')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-50 flex items-center justify-center mix-blend-difference hidden sm:flex"
      animate={{
        x: mousePos.x - 16,
        y: mousePos.y - 16,
        scale: isHovering ? 1.5 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 25,
        mass: 0.5
      }}
    >
      <div className={`w-8 h-8 rounded-full bg-pink-300 blur-[2px] opacity-70 transition-all duration-300 ${isHovering ? 'bg-pink-400 opacity-90' : ''}`} />
    </motion.div>
  );
};
