export type SceneId = 
  | 'scene01_countdown'
  | 'scene02_reveal'
  | 'scene03_heart'
  | 'scene04_galaxy'
  | 'scene05_card'
  | 'scene06_memories'
  | 'scene08_heart_gallery';

export interface MemorySlide {
  id: number;
  title: string;
  subtitle?: string;
  message: string;
  photos: [string, string]; // Exactly 2 photos per page, matching reference video
}

export interface BirthdayConfig {
  recipient: {
    name: string;
    nickname: string;
    greeting: string;
    age?: number;
  };
  intro: {
    countdownSeconds: number;
    matrixChars: string;
    revealWords: string[];
  };
  messages: {
    cardCoverText: string;
    cardInsideGreeting: string;
    finalHeartNote: string;
  };
  memories: MemorySlide[];
  heartGalleryPhotos: string[];
  audio: {
    bgMusicUrl: string;
    autoPlay: boolean;
    volume: number;
    title: string;
    artist: string;
  };
  commercial: {
    creatorHandle: string;
    instagramUrl: string;
    tiktokUrl: string;
    whatsappUrl: string;
    orderPrompt: string;
  };
  theme: {
    primaryColor: string;
    accentColor: string;
    glowColor: string;
    starCount: number;
  };
}

