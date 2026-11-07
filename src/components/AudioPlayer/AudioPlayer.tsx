import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, Volume2, VolumeX, Music } from 'lucide-react';
import { birthdayConfig } from '../../config/birthdayConfig';
import { romanticAudio } from './RomanticSynth';

interface AudioPlayerProps {
  className?: string;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ className = '' }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fallbackIndexRef = useRef<number>(0);
  const usingSynthRef = useRef<boolean>(false);

  // List of candidate audio URLs in priority order for resilience
  const audioCandidates = [
    birthdayConfig.audio.bgMusicUrl,
    '/assets/audio/birthday-song.mp3',
    '/assets/audio/birthday-song.mp3.mp3',
    '/assets/audio/romantic-melody.mp3',
    '/assets/audio/romantic-melody.wav',
  ];

  // Initialize and configure Audio element once
  useEffect(() => {
    const audio = new Audio();
    audio.loop = true; // Continuous looping requirement
    audio.preload = 'auto';
    audio.volume = birthdayConfig.audio.volume ?? 0.75;
    audioRef.current = audio;

    // Load initial candidate
    const primaryUrl = audioCandidates[0];
    audio.src = primaryUrl;

    const onPlayHandler = () => {
      setIsPlaying(true);
    };

    const onPauseHandler = () => {
      setIsPlaying(false);
    };

    const onErrorHandler = () => {
      // Graceful fallback to next candidate if current fails
      fallbackIndexRef.current += 1;
      if (fallbackIndexRef.current < audioCandidates.length) {
        const nextUrl = audioCandidates[fallbackIndexRef.current];
        audio.src = nextUrl;
        audio.load();
        if (hasInteracted) {
          audio.play().catch(() => {});
        }
      } else {
        // If all files fail, fall back seamlessly to procedural synthesizer
        usingSynthRef.current = true;
        if (hasInteracted) {
          romanticAudio.start();
          setIsPlaying(true);
        }
      }
    };

    audio.addEventListener('play', onPlayHandler);
    audio.addEventListener('pause', onPauseHandler);
    audio.addEventListener('error', onErrorHandler);

    return () => {
      audio.removeEventListener('play', onPlayHandler);
      audio.removeEventListener('pause', onPauseHandler);
      audio.removeEventListener('error', onErrorHandler);
      audio.pause();
      romanticAudio.stop();
    };
  }, []);

  // Safe Play action
  const playAudio = useCallback(() => {
    setHasInteracted(true);
    if (usingSynthRef.current) {
      romanticAudio.start();
      setIsPlaying(true);
      return;
    }

    if (audioRef.current) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            // Browser autoplay prevention or decode error fallback
            usingSynthRef.current = true;
            romanticAudio.start();
            setIsPlaying(true);
          });
      }
    }
  }, []);

  // Safe Pause action
  const pauseAudio = useCallback(() => {
    if (usingSynthRef.current) {
      romanticAudio.stop();
      setIsPlaying(false);
    } else if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  // Toggle Play / Pause
  const togglePlayPause = useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (isPlaying) {
      pauseAudio();
    } else {
      playAudio();
    }
  }, [isPlaying, playAudio, pauseAudio]);

  // Toggle Mute / Unmute
  const toggleMute = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);

    if (audioRef.current) {
      audioRef.current.muted = nextMuted;
    }
    romanticAudio.mute(nextMuted);
  }, [isMuted]);

  // Global first-interaction listener to start audio on user gesture
  useEffect(() => {
    const handleFirstGesture = () => {
      if (!hasInteracted && birthdayConfig.audio.autoPlay) {
        playAudio();
      }
      window.removeEventListener('pointerdown', handleFirstGesture);
      window.removeEventListener('click', handleFirstGesture);
      window.removeEventListener('touchstart', handleFirstGesture);
      window.removeEventListener('keydown', handleFirstGesture);
    };

    window.addEventListener('pointerdown', handleFirstGesture, { once: true });
    window.addEventListener('click', handleFirstGesture, { once: true });
    window.addEventListener('touchstart', handleFirstGesture, { once: true });
    window.addEventListener('keydown', handleFirstGesture, { once: true });

    return () => {
      window.removeEventListener('pointerdown', handleFirstGesture);
      window.removeEventListener('click', handleFirstGesture);
      window.removeEventListener('touchstart', handleFirstGesture);
      window.removeEventListener('keydown', handleFirstGesture);
    };
  }, [hasInteracted, playAudio]);

  return (
    <div
      className={`fixed top-4 right-4 z-50 flex items-center gap-2 select-none pointer-events-auto ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Floating Glassmorphic Music Controller Bar */}
      <div className="relative flex items-center bg-black/55 backdrop-blur-xl border border-pink-500/35 hover:border-pink-500/70 rounded-full p-1 sm:p-1.5 shadow-[0_4px_25px_rgba(255,46,147,0.3)] hover:shadow-[0_4px_30px_rgba(255,46,147,0.55)] transition-all duration-300">
        
        {/* ROTATING MUSIC VINYL DISC */}
        <div
          onClick={togglePlayPause}
          title={isPlaying ? 'Click to Pause' : 'Click to Play'}
          className="relative group/disc cursor-pointer flex-shrink-0"
        >
          {/* Outer vinyl disc container */}
          <div
            className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#110D18] border-2 border-pink-400/40 relative flex items-center justify-center shadow-lg transition-transform duration-200 active:scale-95 animate-disc-rotate ${
              isPlaying ? 'disc-running' : 'disc-paused'
            }`}
          >
            {/* Vinyl record concentric sound grooves */}
            <div className="absolute inset-1 rounded-full border border-neutral-700/60 pointer-events-none" />
            <div className="absolute inset-2 rounded-full border border-neutral-600/40 pointer-events-none" />
            <div className="absolute inset-3 rounded-full border border-neutral-700/60 pointer-events-none" />

            {/* Center Record Label */}
            <div className="w-5 h-5 sm:w-5.5 sm:h-5.5 rounded-full bg-gradient-to-tr from-pink-500 via-rose-500 to-purple-600 flex items-center justify-center shadow-[0_0_8px_#FF2E93] border border-white/60">
              {/* Spindle hole */}
              <div className="w-1.5 h-1.5 rounded-full bg-[#050508] border border-white/40" />
            </div>

            {/* Glossy reflection sheen */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
          </div>

          {/* Glowing Aura Ring when playing */}
          {isPlaying && !isMuted && (
            <div className="absolute -inset-1 rounded-full border border-pink-400/50 animate-ping pointer-events-none opacity-40" />
          )}
        </div>

        {/* CONTROLS & TRACK INFO CONTAINER */}
        <div className="flex items-center gap-2 pl-2.5 pr-2">
          
          {/* Track title and live equalizer (desktop & tablet) */}
          <div className="hidden sm:flex flex-col justify-center max-w-[130px] md:max-w-[160px] cursor-pointer" onClick={togglePlayPause}>
            <div className="flex items-center gap-1.5 overflow-hidden">
              <span className="text-xs font-semibold text-white tracking-wide truncate drop-shadow-[0_0_8px_rgba(255,46,147,0.5)]">
                {birthdayConfig.audio.title || 'Birthday Song'}
              </span>
            </div>

            {/* Status & Equalizer */}
            <div className="flex items-center gap-1.5 mt-0.5">
              {/* Animated Waveform Equalizer */}
              <div className="flex items-end gap-[2px] h-2.5">
                <span
                  className={`w-[2px] bg-pink-400 rounded-full transition-all duration-300 ${
                    isPlaying && !isMuted ? 'animate-pulse h-2.5' : 'h-1 opacity-40'
                  }`}
                />
                <span
                  className={`w-[2px] bg-pink-500 rounded-full transition-all duration-300 ${
                    isPlaying && !isMuted ? 'animate-bounce h-2' : 'h-1.5 opacity-40'
                  }`}
                />
                <span
                  className={`w-[2px] bg-pink-300 rounded-full transition-all duration-300 ${
                    isPlaying && !isMuted ? 'animate-pulse h-3' : 'h-1 opacity-40'
                  }`}
                />
              </div>

              <span className="text-[10px] text-pink-300/70 font-mono tracking-tight">
                {isPlaying ? (isMuted ? 'Muted' : 'Playing') : 'Paused'}
              </span>
            </div>
          </div>

          {/* ACTION BUTTONS: PLAY / PAUSE */}
          <button
            onClick={togglePlayPause}
            className="p-1.5 sm:p-2 rounded-full text-pink-200 hover:text-white bg-white/5 hover:bg-pink-500/25 border border-pink-500/20 hover:border-pink-400/50 transition-all duration-200 active:scale-95 shadow-sm"
            title={isPlaying ? 'Pause Music' : 'Play Music'}
            aria-label={isPlaying ? 'Pause Music' : 'Play Music'}
          >
            {isPlaying ? (
              <Pause className="w-3.5 h-3.5 fill-pink-300 text-pink-300" />
            ) : (
              <Play className="w-3.5 h-3.5 fill-pink-300 text-pink-300 translate-x-[1px]" />
            )}
          </button>

          {/* ACTION BUTTONS: MUTE / UNMUTE */}
          <button
            onClick={toggleMute}
            className={`p-1.5 sm:p-2 rounded-full transition-all duration-200 active:scale-95 border ${
              isMuted
                ? 'bg-pink-950/60 text-pink-400 border-pink-500/50 hover:bg-pink-900/60'
                : 'text-pink-300 hover:text-white bg-white/5 hover:bg-pink-500/25 border-pink-500/20 hover:border-pink-400/50'
            }`}
            title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
            aria-label={isMuted ? 'Unmute Audio' : 'Mute Audio'}
          >
            {isMuted ? (
              <VolumeX className="w-3.5 h-3.5 text-pink-400" />
            ) : (
              <Volume2 className="w-3.5 h-3.5 text-pink-200" />
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
