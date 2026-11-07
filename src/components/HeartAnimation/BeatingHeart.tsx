import React from 'react';
import { motion } from 'framer-motion';

interface BeatingHeartProps {
  size?: number;
  glowIntensity?: 'normal' | 'high';
}

export const BeatingHeart: React.FC<BeatingHeartProps> = ({
  size = 140,
}) => {
  return (
    <div className="relative flex items-center justify-center select-none">
      {/* Radiating pulse ripples */}
      <motion.div
        animate={{
          scale: [1, 1.8, 2.4],
          opacity: [0.6, 0.25, 0],
        }}
        transition={{
          duration: 1.6,
          repeat: Infinity,
          ease: 'easeOut',
        }}
        style={{ width: size, height: size }}
        className="absolute rounded-full border-2 border-pink-400/50 pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 2.1, 2.9],
          opacity: [0.5, 0.15, 0],
        }}
        transition={{
          duration: 1.6,
          delay: 0.35,
          repeat: Infinity,
          ease: 'easeOut',
        }}
        style={{ width: size, height: size }}
        className="absolute rounded-full border border-pink-500/30 pointer-events-none"
      />

      {/* Ambient pink backglow */}
      <div 
        style={{ width: size * 1.5, height: size * 1.5 }}
        className="absolute rounded-full bg-pink-500/30 blur-2xl pointer-events-none"
      />

      {/* Main Beating SVG Heart */}
      <motion.div
        animate={{
          scale: [1, 1.16, 1.04, 1.22, 1],
        }}
        transition={{
          duration: 1.35,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{ width: size, height: size }}
        className="relative z-10 cursor-pointer drop-shadow-[0_0_25px_#FF007F]"
      >
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full filter drop-shadow-[0_0_15px_rgba(255,46,147,0.9)]"
        >
          <defs>
            <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#FF69B4" />
              <stop offset="45%" stop-color="#FF1493" />
              <stop offset="100%" stop-color="#FF007F" />
            </linearGradient>
            <radialGradient id="heartHighlight" cx="35%" cy="30%" r="35%">
              <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.8" />
              <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0" />
            </radialGradient>
          </defs>

          {/* Heart path */}
          <path
            d="M50 82 C22 62 10 46 10 30 C10 17 21 8 34 8 C42 8 47 12 50 17 C53 12 58 8 66 8 C79 8 90 17 90 30 C90 46 78 62 50 82 Z"
            fill="url(#heartGradient)"
          />

          {/* Soft specular sheen */}
          <ellipse cx="34" cy="24" rx="10" ry="7" fill="url(#heartHighlight)" />
        </svg>
      </motion.div>
    </div>
  );
};

