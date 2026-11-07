import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SceneId } from './types';
import { Scene01Countdown } from './scenes/Scene01Countdown';
import { Scene02Reveal } from './scenes/Scene02Reveal';
import { Scene03Heart } from './scenes/Scene03Heart';
import { Scene04Galaxy } from './scenes/Scene04Galaxy';
import { Scene05BirthdayCard } from './scenes/Scene05BirthdayCard';
import { Scene06PhotoMemories } from './scenes/Scene06PhotoMemories';
import { Scene08HeartGallery } from './scenes/Scene08HeartGallery';
import { AudioPlayer } from './components/AudioPlayer/AudioPlayer';
import { FloatingControls } from './components/UI/FloatingControls';
import { CommercialModal } from './components/UI/CommercialModal';

export const App: React.FC = () => {
  const [currentScene, setCurrentScene] = useState<SceneId>('scene01_countdown');
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  // Scene progression callbacks
  const goToScene02 = () => setCurrentScene('scene02_reveal');
  const goToScene03 = () => setCurrentScene('scene03_heart');
  const goToScene04 = () => setCurrentScene('scene04_galaxy');
  const goToScene05 = () => setCurrentScene('scene05_card');
  const goToScene06 = () => setCurrentScene('scene06_memories');
  const goToScene08 = () => setCurrentScene('scene08_heart_gallery');
  const restartExperience = () => setCurrentScene('scene01_countdown');

  return (
    <main className="relative w-full h-full min-h-screen bg-[#050508] overflow-hidden select-none">
      {/* Persistent Audio Controller */}
      <AudioPlayer />

      {/* Persistent Quick Controls & Demo Watermark */}
      <FloatingControls
        currentScene={currentScene}
        onSelectScene={setCurrentScene}
        onOpenOrderModal={() => setIsOrderModalOpen(true)}
      />

      {/* Commercial DM Order Modal */}
      <CommercialModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
      />

      {/* Cinematic Scene Transition Router */}
      <AnimatePresence mode="wait">
        {currentScene === 'scene01_countdown' && (
          <motion.div
            key="scene01"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.6 }}
            className="w-full h-full min-h-screen absolute inset-0"
          >
            <Scene01Countdown onNext={goToScene02} />
          </motion.div>
        )}

        {currentScene === 'scene02_reveal' && (
          <motion.div
            key="scene02"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.6 }}
            className="w-full h-full min-h-screen absolute inset-0"
          >
            <Scene02Reveal onNext={goToScene03} />
          </motion.div>
        )}

        {currentScene === 'scene03_heart' && (
          <motion.div
            key="scene03"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 0.7 }}
            className="w-full h-full min-h-screen absolute inset-0"
          >
            <Scene03Heart onNext={goToScene04} />
          </motion.div>
        )}

        {currentScene === 'scene04_galaxy' && (
          <motion.div
            key="scene04"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="w-full h-full min-h-screen absolute inset-0"
          >
            <Scene04Galaxy onNext={goToScene05} />
          </motion.div>
        )}

        {currentScene === 'scene05_card' && (
          <motion.div
            key="scene05"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.6 }}
            className="w-full h-full min-h-screen absolute inset-0"
          >
            <Scene05BirthdayCard onOpenCard={goToScene06} />
          </motion.div>
        )}

        {currentScene === 'scene06_memories' && (
          <motion.div
            key="scene06"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6 }}
            className="w-full h-full min-h-screen absolute inset-0"
          >
            <Scene06PhotoMemories onProceedToHeart={goToScene08} />
          </motion.div>
        )}

        {currentScene === 'scene08_heart_gallery' && (
          <motion.div
            key="scene08"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full h-full min-h-screen absolute inset-0"
          >
            <Scene08HeartGallery
              onRestart={restartExperience}
              onOpenOrderModal={() => setIsOrderModalOpen(true)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};
export default App;

