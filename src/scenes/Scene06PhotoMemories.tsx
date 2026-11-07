import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Starfield } from '../components/GalaxyScene/Starfield';
import { birthdayConfig } from '../config/birthdayConfig';
import { ArrowRight, Sparkles, ChevronLeft, ChevronRight, Heart } from 'lucide-react';

interface Scene06PhotoMemoriesProps {
  onProceedToHeart: () => void;
}

export const Scene06PhotoMemories: React.FC<Scene06PhotoMemoriesProps> = ({
  onProceedToHeart,
}) => {
  const memories = birthdayConfig.memories;
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [direction, setDirection] = useState<number>(1);

  const currentMemory = memories[currentPage];
  const isLastPage = currentPage === memories.length - 1;

  const handleNext = () => {
    if (isLastPage) {
      onProceedToHeart();
    } else {
      setDirection(1);
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setDirection(-1);
      setCurrentPage((prev) => prev - 1);
    }
  };

  // 3D Page turn transition variants
  const pageVariants = {
    enter: (dir: number) => ({
      rotateY: dir > 0 ? 80 : -80,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      rotateY: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.65,
        ease: [0.25, 1, 0.5, 1],
      },
    },
    exit: (dir: number) => ({
      rotateY: dir > 0 ? -80 : 80,
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.5,
        ease: 'easeInOut',
      },
    }),
  };

  return (
    <div className="relative w-full h-full min-h-screen flex flex-col items-center justify-center bg-[#050508] overflow-hidden px-4 py-8 select-none">
      {/* Galaxy Cosmic Background */}
      <Starfield starCount={birthdayConfig.theme.starCount} />

      <div className="relative z-10 w-full max-w-2xl flex flex-col items-center perspective-1000">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentPage}
            custom={direction}
            variants={pageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full flex flex-col items-center gap-5 preserve-3d"
          >
            {/* Top White Birthday Greeting Banner Card */}
            <div className="w-full bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 shadow-[0_15px_35px_rgba(0,0,0,0.7),0_0_25px_rgba(255,61,154,0.3)] border-2 border-pink-100 flex flex-col items-center text-center">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
                <h2
                  className="text-gray-900 text-2xl sm:text-3xl font-bold tracking-wide"
                  style={{ fontFamily: "'Dancing Script', cursive" }}
                >
                  {currentMemory.title}
                </h2>
                <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
              </div>

              {currentMemory.message && (
                <p className="text-gray-600 text-xs sm:text-sm font-medium mt-1.5 max-w-lg leading-relaxed">
                  {currentMemory.message}
                </p>
              )}
            </div>

            {/* Bottom Dual Photo Memory Cards */}
            <div 
              onClick={handleNext}
              className="w-full grid grid-cols-2 gap-3 sm:gap-6 cursor-pointer"
            >
              {/* Photo 1 (Left Card with gentle negative tilt) */}
              <motion.div
                whileHover={{ scale: 1.03, rotate: -2 }}
                whileTap={{ scale: 0.97 }}
                className="relative rounded-2xl sm:rounded-3xl overflow-hidden aspect-[3/4] bg-neutral-900 border-2 sm:border-4 border-pink-400/80 shadow-[0_15px_30px_rgba(0,0,0,0.8),0_0_25px_rgba(255,46,147,0.4)] group"
              >
                <img
                  src={currentMemory.photos[0]}
                  alt="Memory 1"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
                
                {/* Subtle soft sheen highlight */}
                <div className="absolute inset-0 bg-pink-500/10 mix-blend-overlay" />
              </motion.div>

              {/* Photo 2 (Right Card with gentle positive tilt) */}
              <motion.div
                whileHover={{ scale: 1.03, rotate: 2 }}
                whileTap={{ scale: 0.97 }}
                className="relative rounded-2xl sm:rounded-3xl overflow-hidden aspect-[3/4] bg-neutral-900 border-2 sm:border-4 border-pink-400/80 shadow-[0_15px_30px_rgba(0,0,0,0.8),0_0_25px_rgba(255,46,147,0.4)] group"
              >
                <img
                  src={currentMemory.photos[1]}
                  alt="Memory 2"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
                <div className="absolute inset-0 bg-pink-500/10 mix-blend-overlay" />
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Floating Center Heart between/under photos */}
        <div className="my-3 flex items-center justify-center">
          <Heart className="w-5 h-5 text-pink-500 fill-pink-500 drop-shadow-[0_0_8px_#FF007F] animate-heart-pulse" />
        </div>

        {/* Navigation & Action Bar */}
        <div className="w-full flex items-center justify-between gap-4 mt-2">
          {/* Previous button */}
          <button
            onClick={handlePrev}
            disabled={currentPage === 0}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full border text-xs font-medium tracking-wider uppercase transition-all ${
              currentPage === 0
                ? 'opacity-30 border-gray-700 text-gray-500 cursor-not-allowed'
                : 'border-pink-500/40 text-pink-300 bg-black/40 hover:bg-pink-600/20 hover:border-pink-400'
            }`}
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Previous</span>
          </button>

          {/* Page Indicator dots */}
          <div className="flex items-center gap-2">
            {memories.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setDirection(idx > currentPage ? 1 : -1);
                  setCurrentPage(idx);
                }}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  idx === currentPage
                    ? 'w-6 bg-pink-500 shadow-[0_0_10px_#FF2E93]'
                    : 'bg-pink-900/60 hover:bg-pink-700/60'
                }`}
                aria-label={`Go to memory page ${idx + 1}`}
              />
            ))}
          </div>

          {/* Next / Grand Finale Button */}
          <button
            onClick={handleNext}
            className={`flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(255,46,147,0.4)] active:scale-95 ${
              isLastPage
                ? 'bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white border border-pink-300 animate-pulse'
                : 'bg-pink-600/40 hover:bg-pink-600/60 border border-pink-400 text-white'
            }`}
          >
            <span>{isLastPage ? 'Grand Finale 3D Heart' : 'Next Memory'}</span>
            {isLastPage ? <Sparkles className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Floating corner heart */}
      <div className="absolute bottom-6 right-6 z-20 text-pink-500 text-2xl drop-shadow-[0_0_10px_#FF007F] animate-pulse">
        ♥
      </div>
    </div>
  );
};

