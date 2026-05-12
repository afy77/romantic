import { Howl, Howler } from 'howler';
import { useEffect, useRef, useState } from 'react';

// A soft satisfying pop sound for bubble clicks (base64 to avoid missing files)
// This is a minimal valid base64 audio string representing a generic blip
const popSoundBase64 = "data:audio/mp3;base64,//OExAA... (I will use a simpler approach or a public URL)";

export const useAudio = () => {
  const [isMuted, setIsMuted] = useState(false);
  
  // A gentle pop sound
  const popRef = useRef<Howl | null>(null);
  
  // A soft emotional lofi piano royalty free background music
  const bgmRef = useRef<Howl | null>(null);

  useEffect(() => {
    // Initialize howls
    popRef.current = new Howl({
      src: ['https://actions.google.com/sounds/v1/water/bubbles_popping.ogg'],
      volume: 0.5,
    });

    // We use a high quality public domain/CC0 Lofi loop (Placeholder, normally we'd host it)
    bgmRef.current = new Howl({
      src: ['https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3'],
      html5: true, // Force HTML5 Audio so it streams and doesn't wait to load the whole file
      loop: true,
      volume: 0.3, // Soft background volume
    });

    return () => {
      popRef.current?.unload();
      bgmRef.current?.unload();
    };
  }, []);

  useEffect(() => {
    Howler.mute(isMuted);
  }, [isMuted]);

  const toggleMute = () => setIsMuted((prev) => !prev);

  const playBgm = () => {
    if (bgmRef.current && !bgmRef.current.playing()) {
      bgmRef.current.play();
    }
  };

  const playPop = () => {
    if (popRef.current) {
      // Create a slight pitch variation for more "satisfying" and organic feeling
      const playbackRate = 0.9 + Math.random() * 0.3;
      popRef.current.rate(playbackRate);
      popRef.current.play();
    }
  };

  return { isMuted, toggleMute, playBgm, playPop };
};
