import React from 'react';
import { motion } from 'framer-motion';
import { MatrixRainCanvas } from '../components/MatrixIntro/MatrixRainCanvas';
import { CountdownOverlay } from '../components/MatrixIntro/CountdownOverlay';
import { birthdayConfig } from '../config/birthdayConfig';
import { Sparkles, ArrowRight } from 'lucide-react';

interface Scene01CountdownProps {
  onNext: () => void;
}

export const Scene01Countdown: React.FC<Scene01CountdownProps> = ({ onNext }) => {
  return (
    <div className="relative w-full h-full min-h-screen flex items-center justify-center bg-[#050508] overflow-hidden">
      {/* Pink Matrix Rain Canvas Background */}
      <MatrixRainCanvas opacity={0.9} speedMultiplier={1.1} />

      {/* Center Countdown */}
      <CountdownOverlay
        startNumber={birthdayConfig.intro.countdownSeconds}
        onComplete={onNext}
      />

      {/* Subtle bottom skip/start prompt */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 0.7, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 z-20 flex flex-col items-center gap-2"
      >
        <button
          onClick={onNext}
          className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-950/40 border border-pink-500/30 text-pink-300 text-xs tracking-wider uppercase backdrop-blur-sm hover:border-pink-500/70 hover:text-white transition-all active:scale-95 shadow-[0_0_15px_rgba(255,46,147,0.2)]"
        >
          <Sparkles className="w-3 h-3 text-pink-400" />
          <span>Skip Intro</span>
          <ArrowRight className="w-3 h-3 text-pink-400" />
        </button>
      </motion.div>
    </div>
  );
};

