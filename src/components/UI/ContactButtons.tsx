import React, { useState } from 'react';
import { Share2, Check, ExternalLink } from 'lucide-react';
import { contactConfig } from '../../config/contactConfig';

// Official WhatsApp Vector Icon
export const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
  </svg>
);

// Official Instagram Vector Icon
export const InstagramIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

interface ContactButtonsProps {
  customMessage?: string;
  onActionClick?: () => void;
}

export const ContactButtons: React.FC<ContactButtonsProps> = ({
  customMessage,
  onActionClick,
}) => {
  const [copied, setCopied] = useState(false);

  const whatsappUrl = contactConfig.whatsapp.getChatUrl(customMessage);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Safe Instagram opening with DM primary and profile fallback
  const handleInstagramClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onActionClick) onActionClick();
    // Default <a> with target="_blank" opens contactConfig.instagram.dmUrl safely.
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      {/* 1. WHATSAPP BUSINESS BUTTON */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onActionClick}
        aria-label="Order via WhatsApp Business with instant reply"
        className="relative group w-full flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 hover:from-emerald-400 hover:via-green-400 hover:to-emerald-500 text-white font-semibold text-sm transition-all duration-300 shadow-[0_4px_18px_rgba(34,197,94,0.35)] hover:shadow-[0_6px_25px_rgba(34,197,94,0.55)] active:scale-98 overflow-hidden"
      >
        {/* Subtle shine sheen */}
        <div className="absolute inset-0 w-1/2 h-full bg-white/20 skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-in-out pointer-events-none" />

        <WhatsAppIcon className="w-5 h-5 flex-shrink-0 transition-transform group-hover:scale-110 duration-200" />
        <span className="tracking-wide">Order via WhatsApp (Instant Reply)</span>
      </a>

      {/* 2. INSTAGRAM DM & SHARE LINK BUTTONS */}
      <div className="grid grid-cols-2 gap-2.5 w-full">
        {/* Instagram DM Button */}
        <a
          href={contactConfig.instagram.dmUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleInstagramClick}
          aria-label={`Open Instagram DM with ${contactConfig.instagram.username}`}
          className="relative group flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-rose-500 hover:from-purple-500 hover:via-pink-500 hover:to-rose-400 text-white font-medium text-xs transition-all duration-300 shadow-[0_4px_15px_rgba(236,72,153,0.3)] hover:shadow-[0_6px_20px_rgba(236,72,153,0.5)] active:scale-98 overflow-hidden"
        >
          <InstagramIcon className="w-4 h-4 flex-shrink-0 transition-transform group-hover:scale-110 duration-200" />
          <span>Instagram DM</span>
          <ExternalLink className="w-3 h-3 opacity-70 group-hover:opacity-100 transition-opacity" />
        </a>

        {/* Share Demo Link Button */}
        <button
          onClick={handleShare}
          type="button"
          aria-label="Copy website link to clipboard"
          className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/15 text-pink-200 border border-pink-400/30 hover:border-pink-400/60 font-medium text-xs transition-all duration-200 active:scale-98 shadow-sm"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-green-400" />
              <span className="text-green-300 font-semibold">Link Copied!</span>
            </>
          ) : (
            <>
              <Share2 className="w-3.5 h-3.5 text-pink-400" />
              <span>Share Demo Link</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

