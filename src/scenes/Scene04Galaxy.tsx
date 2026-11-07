import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Starfield } from '../components/GalaxyScene/Starfield';
import { BirthdayMascot } from '../components/GalaxyScene/BirthdayMascot';
import { birthdayConfig } from '../config/birthdayConfig';
import { Gift, ArrowRight } from 'lucide-react';

interface Scene04GalaxyProps {
  onNext: () => void;
}

export const Scene04Galaxy: React.FC<Scene04GalaxyProps> = ({ onNext }) => {
  useEffect(() => {
    // Automatically transition to the birthday card after the mascot plays its song
    const timer = setTimeout(() => {
      onNext();
    }, 4500);

    return () => clearTimeout(timer);
  }, [onNext]);

  return (
    <div
      onClick={onNext}
      className="relative w-full h-full min-h-screen flex flex-col items-center justify-center bg-[#050508] overflow-hidden cursor-pointer select-none"
    >
      {/* 3D Cosmic Starfield Canvas */}
      <Starfield starCount={birthdayConfig.theme.starCount} />

      {/* Mascot in the Center of the Universe */}
      <motion.div
        initial={{ scale: 0.3, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.7, opacity: 0, y: -20 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="relative z-10 flex flex-col items-center justify-center"
      >
        <BirthdayMascot />

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7 }}
          className="mt-4 flex flex-col items-center text-center px-4"
        >
          <span className="text-pink-300 font-semibold text-lg sm:text-xl tracking-wider drop-shadow-[0_0_12px_#FF2E93]">
            A Melody Written For You
          </span>
          <span className="text-pink-100/60 text-xs sm:text-sm mt-1 tracking-wide">
            In this vast galaxy, you shine the brightest ✨
          </span>
        </motion.div>
      </motion.div>

      {/* Little floating heart at bottom right (as seen in reference video) */}
      <motion.div
        animate={{
          scale: [1, 1.25, 1],
          y: [-2, 2, -2],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute bottom-6 right-6 z-20 text-pink-500 text-2xl drop-shadow-[0_0_10px_#FF007F]"
      >
        ♥
      </motion.div>

      {/* Continue button prompt */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 z-20"
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-pink-600/30 border border-pink-400/50 text-white font-medium text-xs sm:text-sm tracking-wider uppercase backdrop-blur-md hover:bg-pink-600/50 hover:border-pink-300 transition-all shadow-[0_0_20px_rgba(255,46,147,0.4)] active:scale-95"
        >
          <Gift className="w-4 h-4 text-pink-300" />
          <span>Open Your Surprise Card</span>
          <ArrowRight className="w-4 h-4 text-pink-300" />
        </button>
      </motion.div>
    </div>
  );
};

