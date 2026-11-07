import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Starfield } from '../components/GalaxyScene/Starfield';
import { CartoonHands } from '../components/BirthdayCard/CartoonHands';
import { birthdayConfig } from '../config/birthdayConfig';
import { Heart } from 'lucide-react';

interface Scene05BirthdayCardProps {
  onOpenCard: () => void;
}

export const Scene05BirthdayCard: React.FC<Scene05BirthdayCardProps> = ({ onOpenCard }) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleCardClick = () => {
    if (isOpening) return;
    setIsOpening(true);

    // Celebration Confetti burst
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#FF2E93', '#FF007F', '#FF69B4', '#FFFFFF', '#FFE5F1'],
      });
    } catch {
      // Confetti fallback
    }

    // Allow 3D card open animation to play before transitioning to memories
    setTimeout(() => {
      onOpenCard();
    }, 750);
  };

  return (
    <div className="relative w-full h-full min-h-screen flex items-center justify-center bg-[#050508] overflow-hidden select-none">
      {/* Galaxy Starfield */}
      <Starfield starCount={birthdayConfig.theme.starCount} />

      {/* Interactive Card Presentation Container */}
      <div className="relative z-10 flex flex-col items-center justify-center perspective-1000 px-4">
        {/* Card Motion Wrapper */}
        <motion.div
          initial={{ scale: 0.7, opacity: 0, y: 40 }}
          animate={{
            scale: isOpening ? 1.05 : 1,
            opacity: 1,
            y: isOpening ? -10 : 0,
            rotateY: isOpening ? -90 : 0,
          }}
          transition={{
            duration: isOpening ? 0.7 : 0.8,
            ease: isOpening ? 'easeInOut' : 'easeOut',
          }}
          onClick={handleCardClick}
          className="relative w-72 h-96 sm:w-80 sm:h-[26rem] bg-white rounded-3xl p-6 flex flex-col items-center justify-center cursor-pointer shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_35px_rgba(255,46,147,0.35)] hover:shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_50px_rgba(255,46,147,0.55)] transition-shadow duration-300 active:scale-95 border-4 border-pink-100"
        >
          {/* Decorative Card Border / Inner Stitching */}
          <div className="absolute inset-3 border-2 border-dashed border-pink-200/80 rounded-2xl pointer-events-none" />

          {/* Central Pulsing Heart Icon */}
          <motion.div
            animate={{
              scale: [1, 1.22, 1],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-pink-50 flex items-center justify-center shadow-[0_0_20px_rgba(255,61,154,0.3)] mb-4"
          >
            <Heart className="w-10 h-10 sm:w-12 sm:h-12 text-[#FF2E93] fill-[#FF2E93] drop-shadow-[0_0_8px_#FF2E93]" />
          </motion.div>

          {/* Card Invitation Text */}
          <span
            className="text-gray-800 text-xl sm:text-2xl font-bold tracking-wide text-center"
            style={{ fontFamily: "'Dancing Script', cursive" }}
          >
            For Anita 💕
          </span>

          <span className="text-pink-600/70 text-xs sm:text-sm font-medium mt-2 tracking-wider uppercase animate-pulse">
            {birthdayConfig.messages.cardCoverText}
          </span>

          {/* Cute Cartoon Hands Holding the Card from Below */}
          <CartoonHands />
        </motion.div>

        {/* Pulsing Helper indicator below */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-12 text-pink-300 text-xs sm:text-sm font-medium tracking-widest uppercase flex items-center gap-2"
        >
          <span>Tap the card to reveal your memories</span>
        </motion.div>
      </div>

      {/* Corner floating heart */}
      <div className="absolute bottom-6 right-6 z-20 text-pink-500 text-2xl drop-shadow-[0_0_10px_#FF007F] animate-bounce">
        ♥
      </div>
    </div>
  );
};

