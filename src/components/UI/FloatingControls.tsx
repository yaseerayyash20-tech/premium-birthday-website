import React, { useState } from 'react';
import { SceneId } from '../../types';
import { Layers, Sparkles, ChevronUp, ChevronDown } from 'lucide-react';

interface FloatingControlsProps {
  currentScene: SceneId;
  onSelectScene: (scene: SceneId) => void;
  onOpenOrderModal: () => void;
}

export const FloatingControls: React.FC<FloatingControlsProps> = ({
  currentScene,
  onSelectScene,
  onOpenOrderModal,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const scenes: { id: SceneId; label: string }[] = [
    { id: 'scene01_countdown', label: '1. Countdown Intro' },
    { id: 'scene02_reveal', label: '2. Name Reveal' },
    { id: 'scene03_heart', label: '3. Beating Heart' },
    { id: 'scene04_galaxy', label: '4. Galaxy & Mascot' },
    { id: 'scene05_card', label: '5. Greeting Card' },
    { id: 'scene06_memories', label: '6. Photo Memories' },
    { id: 'scene08_heart_gallery', label: '8. 3D Heart Finale' },
  ];

  return (
    <>
      {/* Top Left Demo Header Watermark (Inspired by madeforanita.vercel.app in reference video) */}
      <div className="fixed top-4 left-4 z-40 flex items-center gap-2 pointer-events-auto">
        <div 
          onClick={onOpenOrderModal}
          className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-pink-500/30 text-pink-200/90 text-xs font-mono tracking-tight shadow-[0_0_15px_rgba(255,46,147,0.2)] hover:border-pink-500/70 cursor-pointer active:scale-95"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-ping" />
          <span>madeforanita.demo</span>
        </div>
      </div>

      {/* Bottom Left Quick Scene Switcher Drawer for demo testing */}
      <div className="fixed bottom-4 left-4 z-40 pointer-events-auto">
        <div className="relative">
          {isOpen && (
            <div className="absolute bottom-12 left-0 w-48 bg-[#0D0814]/90 backdrop-blur-xl border border-pink-500/30 rounded-2xl p-2 shadow-[0_0_30px_rgba(0,0,0,0.8)] flex flex-col gap-1 mb-1">
              <span className="text-[10px] uppercase font-bold text-pink-400/80 px-2 py-1 tracking-wider">
                Jump to Scene
              </span>
              {scenes.map((s) => (
                <button
                  key={s.id}
                  onClick={() => {
                    onSelectScene(s.id);
                    setIsOpen(false);
                  }}
                  className={`text-left text-xs px-2.5 py-1.5 rounded-lg transition-colors ${
                    currentScene === s.id
                      ? 'bg-pink-600/40 text-white font-medium border border-pink-400/40'
                      : 'text-pink-200/70 hover:bg-pink-900/30 hover:text-white'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          )}

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-pink-500/30 text-pink-300 text-xs hover:border-pink-400 transition-all shadow-[0_0_15px_rgba(255,46,147,0.2)]"
          >
            <Layers className="w-3.5 h-3.5 text-pink-400" />
            <span className="hidden sm:inline">Scenes</span>
            {isOpen ? <ChevronDown className="w-3 h-3" /> : <ChevronUp className="w-3 h-3" />}
          </button>
        </div>
      </div>
    </>
  );
};

