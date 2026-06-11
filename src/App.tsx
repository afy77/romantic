import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Volume2, VolumeX } from 'lucide-react';
import { useAudio } from './hooks/useAudio';
import { FloatingHearts } from './components/FloatingHearts';
import { CuteCursor } from './components/CuteCursor';
import { fireConfetti } from './lib/confetti';

const COMPLIMENTS = [
  "Ada senyum yang selalu kurindu di antara bising dan ramainya dunia ini... 🌸",
  "Di matamu, aku menemukan rumah hangat tempat segala lelahku bermuara. 🏡",
  "Aku ingin mencintaimu dengan sederhana; seperti kata yang tak sempat diucapkan kayu kepada api yang menjadikannya abu. 🔥",
  "Terima kasih telah hadir dan membuat dunia yang dingin ini terasa jauh lebih lembut. 🎀",
  "Bagiku, kamu adalah keindahan arunika di pagi hari dan kedamaian swastamita di kala senja. 🌅",
  "Kamu adalah perpaduan paling indah antara takdir dan semesta yang selalu kusemogakan. 🌌",
  "Aku takkan pernah lelah mendoakanmu, karena dalam setiap hening, namamu senantiasa kurapal. ✨",
  "Yang fana adalah waktu, namun rasa ini akan selalu abadi. Klik sekali lagi untuk kejutan terakhir... 🎁"
];

const photoModules = import.meta.glob('/public/*.{jpg,jpeg,png,webp,gif}');
const PHOTOS = Object.keys(photoModules).map(path => path.replace('/public', ''));


const LOVE_LETTER = `Hai kamu yang paling manis...

Terima kasih ya sudah selalu ada,
Bahkan di hari-hari yang mungkin tidak selalu indah.

Melihat senyummu adalah bagian favoritku setiap hari.
Aku harap, kita bisa terus membuat banyak kenangan indah bersama.

Tetaplah jadi dirimu yang sekarang,
Karena itulah alasan aku jatuh hati padamu.

I love you, lebih dari kata-kata. 💕`;

const TypewriterText = ({ text }: { text: string }) => {
  const [displayedText, setDisplayedText] = useState("");

  React.useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, i + 1));
      i++;
      if (i === text.length) clearInterval(interval);
    }, 70); // Typing speed
    return () => clearInterval(interval);
  }, [text]);

  return <span className="whitespace-pre-line">{displayedText}</span>;
};

export default function App() {
  const [step, setStep] = useState<'intro' | 'bubbles' | 'gift' | 'gallery' | 'letter'>('intro');
  const [bubbleIndex, setBubbleIndex] = useState(0);
  const { isMuted, toggleMute, playBgm, playPop } = useAudio();

  const handleStart = () => {
    playBgm();
    setStep('bubbles');
  };

  const handleBubbleClick = () => {
    playPop();
    if (bubbleIndex < COMPLIMENTS.length - 1) {
      setBubbleIndex(prev => prev + 1);
    } else {
      setStep('gift');
    }
  };

  const handleGiftClick = () => {
    playPop();
    fireConfetti();
    setStep('gallery');
  };

  // Determine background based on step
  let bgClass = "bg-gradient-to-br from-pink-50 to-white";
  if (step === 'bubbles') {
    // Make it slightly more glowing as we click
    const glowIntensity = Math.min(bubbleIndex * 10, 50);
    bgClass = `bg-gradient-to-br from-pink-100 to-pink-50 transition-colors duration-1000`;
  } else if (step === 'gift') {
    bgClass = "bg-neutral-900 transition-colors duration-2000";
  } else if (step === 'gallery') {
    bgClass = "bg-[#1a0b2e] transition-colors duration-1000"; // Dreamy night sky
  } else if (step === 'letter') {
    bgClass = "bg-rose-950 transition-colors duration-1000"; // Deep romantic red/pink
  }

  return (
    <div className={`min-h-screen w-full relative overflow-hidden flex flex-col items-center justify-center ${bgClass}`}>
      <CuteCursor />
      <FloatingHearts count={step === 'bubbles' ? 15 + bubbleIndex * 5 : step === 'gallery' ? 30 : 10} />
      
      {/* Audio Control */}
      <button 
        onClick={toggleMute}
        className="fixed top-6 right-6 z-50 p-3 rounded-full bg-white/20 backdrop-blur-md shadow-sm hover:bg-white/40 transition-all text-pink-400 hover:text-pink-500 hover:scale-110 active:scale-95"
      >
        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </button>

      <AnimatePresence mode="wait">
        {step === 'intro' && (
          <motion.div 
            key="intro"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
            transition={{ duration: 1 }}
            className="flex flex-col items-center text-center z-10 px-6 gap-8"
          >
            <motion.h1 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ repeat: Infinity, repeatType: "reverse", duration: 3, ease: "easeInOut" }}
              className="text-2xl md:text-4xl font-cute text-pink-400/90 font-medium tracking-wide drop-shadow-sm"
            >
              seseorang menyiapkan kejutan manis untukmu 🎀
            </motion.h1>
            
            <motion.button
              onClick={handleStart}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white/60 backdrop-blur-md border border-pink-100 rounded-full shadow-[0_8px_30px_rgb(255,182,193,0.3)] text-pink-500 font-medium text-lg flex items-center gap-2 hover:bg-white/80 hover:shadow-[0_8px_40px_rgb(255,182,193,0.5)] transition-all"
            >
              buka yuk 💖
            </motion.button>
          </motion.div>
        )}

        {step === 'bubbles' && (
          <motion.div 
            key="bubbles"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2, filter: "blur(10px)" }}
            transition={{ duration: 0.8, type: "spring" }}
            className="z-10 flex flex-col items-center justify-center p-6 w-full max-w-lg"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={bubbleIndex}
                initial={{ opacity: 0, y: 30, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, scale: 0.8 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="w-full relative flex items-center justify-center"
              >
                <motion.button
                  onClick={handleBubbleClick}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-full p-8 md:p-12 bg-white/40 backdrop-blur-xl border border-white/60 rounded-3xl shadow-[0_0_40px_rgba(255,182,193,0.4)] hover:shadow-[0_0_60px_rgba(255,182,193,0.6)] flex items-center justify-center text-center cursor-pointer overflow-hidden group"
                >
                  {/* Subtle shine effect on hover */}
                  <div className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-[150%] skew-x-[-45deg] group-hover:animate-[shine_1.5s_ease-in-out_infinite]" />
                  
                  <h2 className="text-xl md:text-3xl font-cute font-medium text-pink-500/90 leading-relaxed px-4">
                    {COMPLIMENTS[bubbleIndex]}
                  </h2>
                </motion.button>
              </motion.div>
            </AnimatePresence>
            
            <div className="mt-12 flex gap-2">
              {COMPLIMENTS.map((_, i) => (
                <div 
                  key={i} 
                  className={`h-2 rounded-full transition-all duration-500 ${i === bubbleIndex ? 'w-8 bg-pink-400' : 'w-2 bg-pink-200/50'}`}
                />
              ))}
            </div>
          </motion.div>
        )}

        {step === 'gift' && (
          <motion.div 
            key="gift"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="z-10 flex flex-col items-center justify-center gap-10"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 1 }}
              className="text-pink-300 font-cute text-2xl tracking-widest font-light"
            >
              ada satu hal lagi...
            </motion.h2>
            
            <motion.button
              onClick={handleGiftClick}
              animate={{ 
                y: [0, -15, 0],
                rotate: [0, -2, 2, 0]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 2,
                ease: "easeInOut"
              }}
              whileHover={{ scale: 1.1, filter: "brightness(1.2)" }}
              whileTap={{ scale: 0.9 }}
              className="relative w-40 h-40 md:w-56 md:h-56 cursor-pointer drop-shadow-[0_0_50px_rgba(255,182,193,0.5)]"
            >
              <div className="w-full h-full bg-pink-200 rounded-2xl shadow-inner border-4 border-pink-300 flex items-center justify-center relative overflow-hidden">
                <div className="absolute w-8 h-full bg-pink-400/50" />
                <div className="absolute h-8 w-full bg-pink-400/50" />
                <Heart size={64} className="text-white fill-white shadow-xl z-10" />
              </div>
            </motion.button>
          </motion.div>
        )}

        {step === 'gallery' && (
          <motion.div 
            key="gallery"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="z-10 w-full max-w-5xl h-[80vh] relative flex items-center justify-center"
          >
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 pointer-events-none mix-blend-overlay" />
            
            {PHOTOS.map((src, i) => {
              const randomRotate = (i % 2 === 0 ? 1 : -1) * (Math.random() * 10 + 5);
              const isLast = i === PHOTOS.length - 1;
              return (
                <motion.div
                  key={i}
                  drag
                  dragConstraints={{ top: -100, left: -200, right: 200, bottom: 100 }}
                  whileHover={{ scale: 1.05, zIndex: 50 }}
                  whileDrag={{ scale: 1.1, zIndex: 60, rotate: 0 }}
                  initial={{ opacity: 0, y: 100, rotate: randomRotate, scale: 0.5 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0, 
                    rotate: randomRotate,
                    scale: 1,
                    transition: { delay: i * 0.4 + 0.5, type: "spring", damping: 15 }
                  }}
                  className="absolute p-4 pb-12 bg-white rounded-lg shadow-2xl cursor-grab active:cursor-grabbing border border-pink-50"
                  style={{ 
                    zIndex: i,
                    marginLeft: `${(i - PHOTOS.length / 2) * 20}px`,
                    marginTop: `${(i % 2) * 20}px`
                  }}
                >
                  <div className="w-48 h-64 md:w-64 md:h-80 relative overflow-hidden rounded bg-pink-50">
                    <img 
                      src={src} 
                      alt="memory" 
                      className="w-full h-full object-cover select-none pointer-events-none opacity-90"
                      draggable={false}
                    />
                  </div>
                  {isLast && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: PHOTOS.length * 0.4 + 1 }}
                      className="absolute bottom-3 left-0 w-full text-center text-pink-400 font-cute font-medium flex justify-center items-center gap-2"
                    >
                      <span>geser foto-foto nya ✨</span>
                      <Heart size={14} className="fill-pink-400" />
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
            
            {/* Button to go to letter */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: PHOTOS.length * 0.4 + 2, duration: 1 }}
              className="absolute bottom-8 md:bottom-12 z-50"
            >
              <button 
                onClick={() => setStep('letter')}
                className="px-6 py-3 bg-white/20 backdrop-blur-md border border-white/40 rounded-full shadow-lg text-white font-cute text-lg flex items-center gap-2 hover:bg-white/30 hover:scale-105 active:scale-95 transition-all"
              >
                ada satu pesan lagi buat kamu 💌
              </button>
            </motion.div>
          </motion.div>
        )}

        {step === 'letter' && (
          <motion.div 
            key="letter"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5 }}
            className="z-10 w-full max-w-2xl p-8 md:p-12"
          >
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 md:p-10 rounded-3xl shadow-2xl text-pink-50 font-cute text-lg md:text-xl leading-relaxed tracking-wide min-h-[60vh] flex flex-col justify-center">
              <TypewriterText text={LOVE_LETTER} />
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 20 }} // Shows up roughly after typing is done
                className="mt-12 text-center"
              >
                <Heart size={32} className="inline-block text-pink-400 fill-pink-400 animate-pulse" />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
