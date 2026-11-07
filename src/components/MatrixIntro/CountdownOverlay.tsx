import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CountdownOverlayProps {
  onComplete: () => void;
  startNumber?: number;
}

export const CountdownOverlay: React.FC<CountdownOverlayProps> = ({
  onComplete,
  startNumber = 3,
}) => {
  const [currentNumber, setCurrentNumber] = useState<number>(startNumber);

  useEffect(() => {
    if (currentNumber <= 0) {
      const timer = setTimeout(() => {
        onComplete();
      }, 400);
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => {
      setCurrentNumber((prev) => prev - 1);
    }, 1100);

    return () => clearTimeout(timer);
  }, [currentNumber, onComplete]);

  return (
    <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none select-none">
      <AnimatePresence mode="wait">
        {currentNumber > 0 && (
          <motion.div
            key={currentNumber}
            initial={{ scale: 0.4, opacity: 0, filter: 'blur(10px)' }}
            animate={{
              scale: [0.4, 1.25, 1.0],
              opacity: 1,
              filter: 'blur(0px)',
            }}
            exit={{
              scale: 1.4,
              opacity: 0,
              filter: 'blur(8px)',
              y: -25,
            }}
            transition={{
              duration: 0.95,
              times: [0, 0.4, 1],
              ease: 'easeOut',
            }}
            className="flex flex-col items-center justify-center"
          >
            <span
              className="text-8xl sm:text-9xl md:text-[13rem] font-black tracking-tighter"
              style={{
                color: '#FFF0F7',
                textShadow:
                  '0 0 20px #FF007F, 0 0 40px #FF2E93, 0 0 80px #FF007F, 0 0 120px rgba(255, 46, 147, 0.8)',
                fontFamily: "'Outfit', 'Poppins', sans-serif",
              }}
            >
              {currentNumber}
            </span>

            {/* Subtle glow circle behind number */}
            <div className="absolute w-48 h-48 sm:w-72 sm:h-72 rounded-full bg-pink-500/20 blur-3xl pointer-events-none -z-10" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

