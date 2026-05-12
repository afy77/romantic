import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export const FloatingHearts = ({ count = 15 }: { count?: number }) => {
  const [hearts, setHearts] = useState<{ id: number; left: number; top: number; delay: number; duration: number; size: number }[]>([]);

  useEffect(() => {
    // Generate random hearts
    const newHearts = Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: Math.random() * 100, // random % from left
      top: 110, // start slightly below screen
      delay: Math.random() * 10,
      duration: 10 + Math.random() * 15, // float up over 10-25s
      size: 1 + Math.random() * 2 // em
    }));
    setHearts(newHearts);
  }, [count]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <AnimatePresence>
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            initial={{ y: "110vh", x: `calc(${heart.left}vw)` }}
            animate={{ 
              y: "-10vh", 
              x: [`calc(${heart.left}vw)`, `calc(${heart.left + 5}vw)`, `calc(${heart.left - 5}vw)`, `calc(${heart.left}vw)`] 
            }}
            transition={{
              y: {
                duration: heart.duration,
                repeat: Infinity,
                ease: "linear",
                delay: heart.delay,
              },
              x: {
                duration: heart.duration / 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: heart.delay,
              }
            }}
            className="absolute text-pink-300 opacity-30 select-none drop-shadow-md"
            style={{ fontSize: `${heart.size}rem` }}
          >
            🌸
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
