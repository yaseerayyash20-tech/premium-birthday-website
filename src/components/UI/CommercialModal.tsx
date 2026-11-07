import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, CheckCircle2 } from 'lucide-react';
import { contactConfig } from '../../config/contactConfig';
import { ContactButtons } from './ContactButtons';

interface CommercialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommercialModal: React.FC<CommercialModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/75 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: 20 }}
            className="relative w-full max-w-lg bg-[#0E0A17] border-2 border-pink-500/40 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(255,46,147,0.4)] text-white overflow-hidden z-10"
          >
            {/* Glowing corner gradient */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-pink-500/30 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-600/30 rounded-full blur-3xl pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-500 to-rose-400 flex items-center justify-center shadow-[0_0_20px_#FF2E93] mb-3">
                <Sparkles className="w-6 h-6 text-white" />
              </div>

              <h3 className="text-2xl font-bold tracking-tight">
                Order Your Custom 3D Website
              </h3>
              <p className="text-pink-200/80 text-xs sm:text-sm mt-1 max-w-xs">
                Surprise your girlfriend, boyfriend, best friend, or family with a magical digital keepsake!
              </p>
            </div>

            {/* Feature List */}
            <div className="mt-5 space-y-2.5 bg-black/40 rounded-2xl p-4 border border-pink-500/20 text-xs sm:text-sm text-pink-100/90">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-pink-400 flex-shrink-0" />
                <span>Personalized Name Reveal & Matrix Intro</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-pink-400 flex-shrink-0" />
                <span>Custom Photos in 3D Animated Heart Collage</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-pink-400 flex-shrink-0" />
                <span>Your Favorite Romantic Background Song</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-pink-400 flex-shrink-0" />
                <span>Permanent Shareable Link (e.g. madeforyou.app)</span>
              </div>
            </div>

            {/* Direct Contact Action Buttons (WhatsApp Business + Instagram DM) */}
            <div className="mt-6">
              <ContactButtons />
            </div>

            {/* Social Handle */}
            <p className="text-center text-pink-300/60 text-[11px] mt-4">
              Direct Contact: <a href={contactConfig.instagram.profileUrl} target="_blank" rel="noopener noreferrer" className="text-pink-300 hover:text-white font-medium underline underline-offset-2">{contactConfig.instagram.handle}</a> • WhatsApp: +94 75 155 8581
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
