import React from 'react';

export const CartoonHands: React.FC = () => {
  return (
    <div className="absolute -bottom-8 left-0 right-0 flex justify-between px-6 pointer-events-none z-20">
      {/* Left Hand */}
      <div className="w-16 h-14 sm:w-20 sm:h-16 transform -rotate-12 translate-y-2">
        <svg viewBox="0 0 80 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)]">
          {/* Sleeve cuff */}
          <rect x="5" y="40" width="28" height="15" rx="5" fill="#FFE5EC" stroke="#4A3E4E" strokeWidth="2.5" />
          {/* Palm & thumb */}
          <path d="M18 42 C18 30 25 22 36 22 C44 22 50 28 50 36 C50 44 42 46 32 46 Z" fill="#FFE8D6" stroke="#4A3E4E" strokeWidth="2.5" />
          {/* Cute fingers curling over card edge */}
          <rect x="30" y="16" width="9" height="18" rx="4.5" fill="#FFE8D6" stroke="#4A3E4E" strokeWidth="2" />
          <rect x="38" y="12" width="9" height="22" rx="4.5" fill="#FFE8D6" stroke="#4A3E4E" strokeWidth="2" />
          <rect x="46" y="14" width="9" height="20" rx="4.5" fill="#FFE8D6" stroke="#4A3E4E" strokeWidth="2" />
          <rect x="54" y="20" width="8" height="16" rx="4" fill="#FFE8D6" stroke="#4A3E4E" strokeWidth="2" />
          {/* Thumb */}
          <path d="M22 28 Q26 22 32 26 Q35 32 30 36 Z" fill="#FFE8D6" stroke="#4A3E4E" strokeWidth="2" />
        </svg>
      </div>

      {/* Right Hand */}
      <div className="w-16 h-14 sm:w-20 sm:h-16 transform rotate-12 translate-y-2 scale-x-[-1]">
        <svg viewBox="0 0 80 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)]">
          {/* Sleeve cuff */}
          <rect x="5" y="40" width="28" height="15" rx="5" fill="#FFE5EC" stroke="#4A3E4E" strokeWidth="2.5" />
          {/* Palm & thumb */}
          <path d="M18 42 C18 30 25 22 36 22 C44 22 50 28 50 36 C50 44 42 46 32 46 Z" fill="#FFE8D6" stroke="#4A3E4E" strokeWidth="2.5" />
          {/* Cute fingers curling over card edge */}
          <rect x="30" y="16" width="9" height="18" rx="4.5" fill="#FFE8D6" stroke="#4A3E4E" strokeWidth="2" />
          <rect x="38" y="12" width="9" height="22" rx="4.5" fill="#FFE8D6" stroke="#4A3E4E" strokeWidth="2" />
          <rect x="46" y="14" width="9" height="20" rx="4.5" fill="#FFE8D6" stroke="#4A3E4E" strokeWidth="2" />
          <rect x="54" y="20" width="8" height="16" rx="4" fill="#FFE8D6" stroke="#4A3E4E" strokeWidth="2" />
          {/* Thumb */}
          <path d="M22 28 Q26 22 32 26 Q35 32 30 36 Z" fill="#FFE8D6" stroke="#4A3E4E" strokeWidth="2" />
        </svg>
      </div>
    </div>
  );
};

