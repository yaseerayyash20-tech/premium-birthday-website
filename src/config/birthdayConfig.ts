import { BirthdayConfig } from '../types';
import { contactConfig } from './contactConfig';

export const birthdayConfig: BirthdayConfig = {
  recipient: {
    name: "ANITA",
    nickname: "Sayang",
    greeting: "Happy Birthday Sayang 💕",
    age: 21,
  },
  intro: {
    countdownSeconds: 3,
    matrixChars: "01HAPPYBIRTHDAYANITA0123456789ABCDEF$#@%*&~♥",
    revealWords: [
      "HAPPY",
      "BIRTHDAY",
      "TO",
      "ANITA"
    ],
  },
  messages: {
    cardCoverText: "Tap to Open 💕",
    cardInsideGreeting: "Happy Birthday, Anita! ✨",
    finalHeartNote: "You are the sweetest part of my universe. Forever and always 💕",
  },
  memories: [
    {
      id: 1,
      title: "Happy Birthday Sayang 💕",
      subtitle: "Chapter One",
      message: "May your special day be filled with happiness, beautiful memories, endless smiles, and love.",
      photos: [
        "/assets/images/photo1.jpg",
        "/assets/images/photo2.jpg",
      ],
    },
    {
      id: 2,
      title: "Stay Happy, My Love 💕",
      subtitle: "Chapter Two",
      message: "As long as you're smiling, I'm happy. You deserve all the beautiful things life has to offer.",
      photos: [
        "/assets/images/photo3.jpg",
        "/assets/images/photo4.jpg",
      ],
    },
    {
      id: 3,
      title: "Forever Shining ✨",
      subtitle: "Chapter Three",
      message: "Thank you for bringing so much light, laughter, and warmth into every single day.",
      photos: [
        "/assets/images/photo5.jpg",
        "/assets/images/photo6.jpg",
      ],
    },
  ],
  heartGalleryPhotos: [
    "/assets/images/photo1.jpg",
    "/assets/images/photo2.jpg",
    "/assets/images/photo3.jpg",
    "/assets/images/photo4.jpg",
    "/assets/images/photo5.jpg",
    "/assets/images/photo6.jpg",
    "/assets/images/photo7.jpg",
    "/assets/images/photo8.jpg",
    "/assets/images/photo1.jpg",
    "/assets/images/photo2.jpg",
    "/assets/images/photo3.jpg",
    "/assets/images/photo4.jpg",
    "/assets/images/photo5.jpg",
    "/assets/images/photo6.jpg",
    "/assets/images/photo7.jpg",
    "/assets/images/photo8.jpg",
    "/assets/images/photo2.jpg",
    "/assets/images/photo4.jpg",
  ],
  audio: {
    bgMusicUrl: "/assets/audio/birthday-song.mp3",
    autoPlay: true,
    volume: 0.75,
    title: "Birthday Surprise Song",
    artist: "Special Dedication",
  },
  commercial: {
    creatorHandle: contactConfig.instagram.handle,
    instagramUrl: contactConfig.instagram.profileUrl,
    tiktokUrl: `https://www.instagram.com/${contactConfig.instagram.username}/`,
    whatsappUrl: contactConfig.whatsapp.getChatUrl(),
    orderPrompt: "Want a surprise website for your special someone? Send a DM to order your personalized experience!",
  },
  theme: {
    primaryColor: "#FF2E93",
    accentColor: "#FF007F",
    glowColor: "#FF1493",
    starCount: 1200,
  },
};

