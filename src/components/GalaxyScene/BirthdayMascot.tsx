import React from 'react';
import { motion } from 'framer-motion';

export const BirthdayMascot: React.FC = () => {
  return (
    <div className="relative flex flex-col items-center justify-center pointer-events-none select-none">
      {/* Floating Animated Musical Notes */}
      <motion.div
        initial={{ opacity: 0, y: 0, x: -20 }}
        animate={{
          opacity: [0, 1, 0],
          y: [-10, -50],
          x: [-20, -35],
          scale: [0.8, 1.2, 0.9],
        }}
        transition={{
          duration: 2.2,
          repeat: Infinity,
          ease: "easeOut",
        }}
        className="absolute top-12 left-10 text-pink-400 font-bold text-xl drop-shadow-[0_0_8px_#FF2E93]"
      >
        ♪
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 0, x: 25 }}
        animate={{
          opacity: [0, 1, 0],
          y: [-15, -60],
          x: [25, 45],
          scale: [0.7, 1.3, 0.8],
        }}
        transition={{
          duration: 2.8,
          delay: 0.8,
          repeat: Infinity,
          ease: "easeOut",
        }}
        className="absolute top-8 right-10 text-yellow-300 font-bold text-2xl drop-shadow-[0_0_10px_#FFE600]"
      >
        ♫
      </motion.div>

      {/* Main Mascot Illustration */}
      <motion.div
        animate={{
          y: [-6, 6, -6],
          rotate: [-1.5, 1.5, -1.5],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="w-56 h-56 sm:w-64 sm:h-64 relative drop-shadow-[0_15px_25px_rgba(255,46,147,0.35)]"
      >
        <svg viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {/* Defs for gradients & filters */}
          <defs>
            <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#FFFFFF" />
              <stop offset="100%" stop-color="#F2EEF5" />
            </linearGradient>
            <linearGradient id="hatGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#FF59B3" />
              <stop offset="50%" stop-color="#FF1493" />
              <stop offset="100%" stop-color="#7B2CBF" />
            </linearGradient>
            <linearGradient id="ukuleleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#F6BD60" />
              <stop offset="100%" stop-color="#E76F51" />
            </linearGradient>
            <filter id="candleGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Birthday Candles Arc with "HAPPY BIRTHDAY" letters on top */}
          <g className="animate-pulse">
            {/* Candle 1 (H) */}
            <rect x="72" y="32" width="5" height="18" rx="2" fill="#FF5D8F" />
            <circle cx="74.5" cy="27" r="4.5" fill="#FFE066" filter="url(#candleGlow)" />
            <text x="74.5" y="44" fontSize="7" fontWeight="bold" fill="#FFF" textAnchor="middle">H</text>

            {/* Candle 2 (A) */}
            <rect x="88" y="26" width="5" height="20" rx="2" fill="#70D6FF" />
            <circle cx="90.5" cy="21" r="4.5" fill="#FFE066" filter="url(#candleGlow)" />
            <text x="90.5" y="38" fontSize="7" fontWeight="bold" fill="#FFF" textAnchor="middle">A</text>

            {/* Candle 3 (P) */}
            <rect x="104" y="22" width="5" height="22" rx="2" fill="#FF70A6" />
            <circle cx="106.5" cy="17" r="4.5" fill="#FFE066" filter="url(#candleGlow)" />
            <text x="106.5" y="34" fontSize="7" fontWeight="bold" fill="#FFF" textAnchor="middle">P</text>

            {/* Candle 4 (P) */}
            <rect x="120" y="20" width="5" height="23" rx="2" fill="#FF9770" />
            <circle cx="122.5" cy="15" r="4.5" fill="#FFE066" filter="url(#candleGlow)" />
            <text x="122.5" y="32" fontSize="7" fontWeight="bold" fill="#FFF" textAnchor="middle">P</text>

            {/* Candle 5 (Y) */}
            <rect x="136" y="22" width="5" height="22" rx="2" fill="#E9FF70" />
            <circle cx="138.5" cy="17" r="4.5" fill="#FFE066" filter="url(#candleGlow)" />
            <text x="138.5" y="34" fontSize="7" fontWeight="bold" fill="#333" textAnchor="middle">Y</text>

            {/* Candle 6 (B) */}
            <rect x="152" y="26" width="5" height="20" rx="2" fill="#A882FF" />
            <circle cx="154.5" cy="21" r="4.5" fill="#FFE066" filter="url(#candleGlow)" />
            <text x="154.5" y="38" fontSize="7" fontWeight="bold" fill="#FFF" textAnchor="middle">B</text>

            {/* Candle 7 (D) */}
            <rect x="168" y="32" width="5" height="18" rx="2" fill="#FF5D8F" />
            <circle cx="170.5" cy="27" r="4.5" fill="#FFE066" filter="url(#candleGlow)" />
            <text x="170.5" y="44" fontSize="7" fontWeight="bold" fill="#FFF" textAnchor="middle">D</text>
          </g>

          {/* Party Hat */}
          <polygon points="120,42 95,85 145,85" fill="url(#hatGrad)" />
          <circle cx="120" cy="40" r="6" fill="#FFF" />
          <path d="M98 83 Q120 79 142 83" stroke="#FFF" strokeWidth="3" fill="none" />
          <circle cx="108" cy="68" r="3" fill="#FFE066" />
          <circle cx="128" cy="72" r="3" fill="#70D6FF" />

          {/* Ears */}
          <ellipse cx="80" cy="85" rx="14" ry="18" fill="url(#bodyGrad)" stroke="#4A3E4E" strokeWidth="2.5" />
          <ellipse cx="80" cy="86" rx="8" ry="11" fill="#FFD1DC" />
          <ellipse cx="160" cy="85" rx="14" ry="18" fill="url(#bodyGrad)" stroke="#4A3E4E" strokeWidth="2.5" />
          <ellipse cx="160" cy="86" rx="8" ry="11" fill="#FFD1DC" />

          {/* Bear Head */}
          <ellipse cx="120" cy="115" rx="46" ry="40" fill="url(#bodyGrad)" stroke="#4A3E4E" strokeWidth="3" />

          {/* Happy Eyes (curved joyful eyes) */}
          <path d="M102 110 Q108 104 114 110" stroke="#3D2E3F" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          <path d="M126 110 Q132 104 138 110" stroke="#3D2E3F" strokeWidth="3.5" strokeLinecap="round" fill="none" />

          {/* Blushing Cheeks */}
          <ellipse cx="94" cy="120" rx="8" ry="5" fill="#FF8FAB" opacity="0.8" />
          <ellipse cx="146" cy="120" rx="8" ry="5" fill="#FF8FAB" opacity="0.8" />

          {/* Cute Nose and Smile */}
          <ellipse cx="120" cy="116" rx="4" ry="3" fill="#4A3E4E" />
          <path d="M120 119 L120 124" stroke="#4A3E4E" strokeWidth="2" strokeLinecap="round" />
          <path d="M114 123 Q120 128 126 123" stroke="#4A3E4E" strokeWidth="2.5" strokeLinecap="round" fill="none" />

          {/* Bear Body */}
          <path d="M85 145 Q120 135 155 145 Q170 185 155 205 Q120 215 85 205 Q70 185 85 145 Z" fill="url(#bodyGrad)" stroke="#4A3E4E" strokeWidth="3" />
          {/* White Belly */}
          <ellipse cx="120" cy="178" rx="24" ry="20" fill="#FFFFFF" />

          {/* Little Feet */}
          <ellipse cx="98" cy="208" rx="12" ry="8" fill="url(#bodyGrad)" stroke="#4A3E4E" strokeWidth="2.5" />
          <ellipse cx="142" cy="208" rx="12" ry="8" fill="url(#bodyGrad)" stroke="#4A3E4E" strokeWidth="2.5" />

          {/* Ukulele / Guitar */}
          <g transform="rotate(-15 120 170)">
            {/* Body */}
            <ellipse cx="120" cy="175" rx="20" ry="16" fill="url(#ukuleleGrad)" stroke="#6A2E1A" strokeWidth="2" />
            <ellipse cx="120" cy="175" rx="6" ry="6" fill="#4A1E11" />
            {/* Neck */}
            <rect x="75" y="172" width="35" height="6" rx="2" fill="#DDA15E" stroke="#6A2E1A" strokeWidth="1.5" />
            {/* Headstock */}
            <rect x="68" y="170" width="8" height="10" rx="2" fill="#BC6C25" />
            {/* Strings */}
            <line x1="70" y1="173.5" x2="135" y2="173.5" stroke="#FFFFFF" strokeWidth="1" opacity="0.9" />
            <line x1="70" y1="176.5" x2="135" y2="176.5" stroke="#FFFFFF" strokeWidth="1" opacity="0.9" />
          </g>

          {/* Arms / Hands holding guitar */}
          {/* Left paw */}
          <circle cx="82" cy="165" r="9" fill="url(#bodyGrad)" stroke="#4A3E4E" strokeWidth="2.5" />
          {/* Right paw strumming */}
          <circle cx="142" cy="168" r="9" fill="url(#bodyGrad)" stroke="#4A3E4E" strokeWidth="2.5" />
        </svg>
      </motion.div>
    </div>
  );
};

