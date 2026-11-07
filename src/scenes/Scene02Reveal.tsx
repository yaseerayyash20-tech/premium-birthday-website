import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MatrixRainCanvas } from '../components/MatrixIntro/MatrixRainCanvas';
import { birthdayConfig } from '../config/birthdayConfig';
import { Sparkles } from 'lucide-react';

interface Scene02RevealProps {
  onNext: () => void;
}

export const Scene02Reveal: React.FC<Scene02RevealProps> = ({ onNext }) => {
  // Sequence of words: "HAPPY" -> "BIRTHDAY" -> "TO" -> "ANITA"
  const words = birthdayConfig.intro.revealWords;
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    // If we've shown all words, hold the final name a moment then progress to Scene 03
    if (currentIndex >= words.length) {
      const finishTimer = setTimeout(() => {
        onNext();
      }, 1600);
      return () => clearTimeout(finishTimer);
    }

    // Time to display each word: 1.1s for earlier words, 1.8s for the grand reveal name
    const delay = currentIndex === words.length - 1 ? 1800 : 1100;
    const timer = setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
    }, delay);

    return () => clearTimeout(timer);
  }, [currentIndex, words.length, onNext]);

  const currentWord = currentIndex < words.length ? words[currentIndex] : words[words.length - 1];
  const isFinalName = currentIndex === words.length - 1 || currentIndex >= words.length;

  return (
    <div 
      onClick={onNext}
      className="relative w-full h-full min-h-screen flex items-center justify-center bg-[#050508] overflow-hidden cursor-pointer"
    >
      {/* Pink Matrix Digital Rain Canvas */}
      <MatrixRainCanvas opacity={0.8} speedMultiplier={1.0} />

      {/* Center Typography Reveal */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentWord}
            initial={{ scale: 0.5, opacity: 0, filter: 'blur(12px)', letterSpacing: '0.05em' }}
            animate={{
              scale: isFinalName ? [0.6, 1.15, 1.0] : [0.6, 1.1, 1.0],
              opacity: 1,
              filter: 'blur(0px)',
              letterSpacing: isFinalName ? '0.15em' : '0.08em',
            }}
            exit={{
              scale: 1.25,
              opacity: 0,
              filter: 'blur(10px)',
              y: -15,
            }}
            transition={{
              duration: 0.85,
              times: [0, 0.45, 1],
              ease: 'easeOut',
            }}
            className="flex flex-col items-center"
          >
            {isFinalName && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 mb-2 text-pink-300/80 text-sm sm:text-base tracking-widest uppercase font-medium"
              >
                <Sparkles className="w-4 h-4 text-pink-400 animate-spin" />
                <span>Our Shining Star</span>
                <Sparkles className="w-4 h-4 text-pink-400 animate-spin" />
              </motion.div>
            )}

            <h1
              className={`font-black tracking-wider transition-all duration-300 ${
                isFinalName
                  ? 'text-6xl sm:text-8xl md:text-9xl text-white drop-shadow-[0_0_35px_#FF007F]'
                  : 'text-5xl sm:text-7xl md:text-8xl text-pink-400 drop-shadow-[0_0_25px_#FF2E93]'
              }`}
              style={{
                fontFamily: "'Outfit', 'Poppins', sans-serif",
                textShadow: isFinalName
                  ? '0 0 15px #FFF, 0 0 35px #FF007F, 0 0 70px #FF2E93, 0 0 120px #FF007F'
                  : '0 0 15px #FF2E93, 0 0 35px #FF007F, 0 0 60px rgba(255, 46, 147, 0.7)',
              }}
            >
              {currentWord}
            </h1>

            {/* Glowing radial backdrop for the final name */}
            {isFinalName && (
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1.2, opacity: 0.35 }}
                className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-pink-500 blur-3xl pointer-events-none -z-10"
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Tap hint */}
      <div className="absolute bottom-6 text-pink-300/40 text-xs tracking-wider uppercase select-none pointer-events-none">
        Tap anywhere to continue
      </div>
    </div>
  );
};

