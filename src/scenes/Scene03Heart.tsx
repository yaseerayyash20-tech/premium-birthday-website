import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { BeatingHeart } from '../components/HeartAnimation/BeatingHeart';
import { MatrixRainCanvas } from '../components/MatrixIntro/MatrixRainCanvas';
import { Sparkles } from 'lucide-react';

interface Scene03HeartProps {
  onNext: () => void;
}

export const Scene03Heart: React.FC<Scene03HeartProps> = ({ onNext }) => {
  useEffect(() => {
    // Automatically transition into the cosmic galaxy after ~2.8 seconds of heartbeat
    const timer = setTimeout(() => {
      onNext();
    }, 2800);

    return () => clearTimeout(timer);
  }, [onNext]);

  return (
    <div
      onClick={onNext}
      className="relative w-full h-full min-h-screen flex flex-col items-center justify-center bg-[#050508] overflow-hidden cursor-pointer select-none"
    >
      {/* Fading Matrix Background */}
      <MatrixRainCanvas opacity={0.35} speedMultiplier={0.7} />

      {/* Floating Sparkle Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 18 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x: Math.random() * window.innerWidth,
              y: window.innerHeight + 20,
              opacity: 0,
              scale: 0.5 + Math.random() * 0.8,
            }}
            animate={{
              y: -50,
              opacity: [0, 0.8, 0],
              x: `calc(${Math.random() * window.innerWidth}px + ${(Math.random() - 0.5) * 60}px)`,
            }}
            transition={{
              duration: 3 + Math.random() * 2.5,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: 'easeOut',
            }}
            className="absolute text-pink-400/80 drop-shadow-[0_0_8px_#FF2E93]"
          >
            ♥
          </motion.div>
        ))}
      </div>

      {/* Center Beating Heart */}
      <motion.div
        initial={{ scale: 0.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 1.5, opacity: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 flex flex-col items-center"
      >
        <BeatingHeart size={160} glowIntensity="high" />

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-8 flex items-center gap-2 text-pink-200/90 font-medium text-sm sm:text-base tracking-widest uppercase drop-shadow-[0_0_10px_#FF2E93]"
        >
          <Sparkles className="w-4 h-4 text-pink-400" />
          <span>Pure Love & Warmth</span>
          <Sparkles className="w-4 h-4 text-pink-400" />
        </motion.div>
      </motion.div>

      {/* Tap hint */}
      <div className="absolute bottom-6 text-pink-300/40 text-xs tracking-wider uppercase select-none pointer-events-none">
        Tap anywhere to enter the cosmos
      </div>
    </div>
  );
};

