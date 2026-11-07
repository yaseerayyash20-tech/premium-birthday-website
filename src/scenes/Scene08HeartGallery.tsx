import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Starfield } from '../components/GalaxyScene/Starfield';
import { HeartPhotoCanvas } from '../components/HeartPhotoGallery/HeartPhotoCanvas';
import { birthdayConfig } from '../config/birthdayConfig';
import { RotateCcw, Heart, Sparkles, MessageCircle, ExternalLink } from 'lucide-react';

interface Scene08HeartGalleryProps {
  onRestart: () => void;
  onOpenOrderModal: () => void;
}

export const Scene08HeartGallery: React.FC<Scene08HeartGalleryProps> = ({
  onRestart,
  onOpenOrderModal,
}) => {
  const [assembled, setAssembled] = useState(false);

  const handleAssembled = () => {
    setAssembled(true);
    // Burst celebratory fireworks confetti
    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#FF2E93', '#FF007F', '#FF69B4', '#FFF', '#FFE600'],
      });
    } catch {
      // Confetti fallback
    }
  };

  return (
    <div className="relative w-full h-full min-h-screen flex flex-col items-center justify-between bg-[#050508] overflow-hidden select-none">
      {/* Galaxy Cosmic Background */}
      <Starfield starCount={birthdayConfig.theme.starCount} />

      {/* 3D Heart Photo Canvas */}
      <HeartPhotoCanvas onAssembled={handleAssembled} />

      {/* Top Floating Loving Note */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="relative z-20 pt-6 px-4 text-center max-w-lg pointer-events-none"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-950/40 border border-pink-500/30 backdrop-blur-md shadow-[0_0_20px_rgba(255,46,147,0.3)] mb-2">
          <Heart className="w-3.5 h-3.5 text-pink-400 fill-pink-400 animate-pulse" />
          <span className="text-pink-200 text-xs tracking-wider uppercase font-medium">
            Grand Finale Collage
          </span>
          <Heart className="w-3.5 h-3.5 text-pink-400 fill-pink-400 animate-pulse" />
        </div>

        <p
          className="text-white text-lg sm:text-2xl font-bold tracking-wide drop-shadow-[0_0_15px_#FF2E93]"
          style={{ fontFamily: "'Dancing Script', cursive" }}
        >
          {birthdayConfig.messages.finalHeartNote}
        </p>
      </motion.div>

      {/* Bottom Floating Control Bar */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="relative z-20 pb-6 px-4 flex flex-wrap items-center justify-center gap-3 w-full max-w-xl"
      >
        {/* Restart Experience Button */}
        <button
          onClick={onRestart}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-black/60 border border-pink-500/40 text-pink-200 text-xs sm:text-sm font-semibold tracking-wider uppercase backdrop-blur-md hover:bg-pink-900/40 hover:border-pink-300 transition-all shadow-[0_0_20px_rgba(255,46,147,0.3)] active:scale-95"
        >
          <RotateCcw className="w-4 h-4 text-pink-400" />
          <span>Replay Story</span>
        </button>

        {/* Commercial Demo: Order Custom Surprise Button */}
        <button
          onClick={onOpenOrderModal}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white text-xs sm:text-sm font-bold tracking-wider uppercase backdrop-blur-md hover:opacity-95 transition-all shadow-[0_0_25px_rgba(255,46,147,0.6)] active:scale-95 animate-pulse"
        >
          <Sparkles className="w-4 h-4 text-yellow-200" />
          <span>Create Yours (DM Me)</span>
          <ExternalLink className="w-3.5 h-3.5 opacity-80" />
        </button>
      </motion.div>

      {/* Floating corner indicator */}
      <div className="absolute bottom-6 right-6 z-20 text-pink-500 text-2xl drop-shadow-[0_0_10px_#FF007F] animate-bounce">
        ♥
      </div>
    </div>
  );
};

