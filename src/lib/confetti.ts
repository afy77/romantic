import confetti from 'canvas-confetti';

export const fireConfetti = () => {
  const duration = 3000;
  const end = Date.now() + duration;

  const frame = () => {
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: ['#ffb6c1', '#ffc0cb', '#ffe4e1', '#ffffff'] // Pastel pinks and whites
    });
    confetti({
      particleCount: 5,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: ['#ffb6c1', '#ffc0cb', '#ffe4e1', '#ffffff']
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  };
  
  frame();
};
