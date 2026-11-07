# 💖 Premium Interactive 3D Birthday Surprise Website

A commercial-grade, cinematic 3D birthday surprise web application inspired by the viral reference video. Built with **React 18**, **TypeScript**, **Vite**, **Three.js**, **React Three Fiber**, **Framer Motion**, and **Tailwind CSS**.

Developed by **[@stylish_ayyash_aysh](https://www.instagram.com/stylish_ayyash_aysh/)**.

---

## 🌟 Live Demo Experience & Scene Breakdown

1. **Scene 01: Matrix Digital Rain & Countdown**
   * Neon pink (`#FF2E93`) & electric magenta falling digital code stream.
   * Glowing countdown (`3` → `2` → `1`) with scale-in bounce, bloom aura, and sound sync.
2. **Scene 02: Neon Name Reveal Sequence**
   * Staged typographic reveal: `HAPPY` → `BIRTHDAY` → `TO` → `ANITA`.
   * Particle glitter aura and deep neon text shadows.
3. **Scene 03: Magical Beating Heart**
   * Continuous double-pulse heartbeat animation with radiating light ripples.
   * Floating sparkle heart particles drifting upward.
4. **Scene 04: Galaxy Universe & Musical Mascot**
   * Deep space 3D starfield with subtle rose/violet cosmic nebula clouds.
   * Whimsical birthday bear mascot strumming a ukulele with candle flames and floating musical notes.
5. **Scene 05: Interactive Greeting Card**
   * Rounded white card supported from below by cute cartoon doodle hands.
   * Pulsing central pink heart inviting the user to tap.
   * Interactive tap triggers tactile feedback, 3D flip unfold, and celebratory confetti burst.
6. **Scene 06 & 07: Personal Love Letter & Dual Photo Memories**
   * Top banner greeting card with cursive handwriting typography.
   * Side-by-side portrait Polaroid-style cards with glowing pink borders and subtle 3D hover tilt.
   * 3D page flip transition between memory chapters.
7. **Scene 08: Grand Finale — 3D Heart-Shaped Photo Collage**
   * Multiple photo cards fly outward and lock into a volumetric 3D geometric heart shape.
   * Smooth continuous rotation, breathing pulsation, and interactive touch/cursor 3D parallax.
   * Mobile-responsive camera auto-framing (no overflow on smartphones or tablets).
8. **Audio & Commercial Features**
   * Rotating vinyl disc music player with smooth play/pause, mute/unmute, and continuous playback across all 8 scenes.
   * Official WhatsApp Business Click-to-Chat integration (`+94 75 155 8581`) with prefilled order inquiry.
   * Official Instagram DM integration (`@stylish_ayyash_aysh`).
   * "Order Yours" commercial conversion modal for social media client inquiries.
   * Quick scene navigation drawer for live demos.

---

## 🛠️ Technology Stack

* **Frontend:** React 18, TypeScript, Vite
* **3D & Canvas:** Three.js, `@react-three/fiber`, `@react-three/drei`, HTML5 Canvas 2D
* **Motion & Animation:** Framer Motion, Canvas Confetti
* **Icons & Styling:** Lucide React, Tailwind CSS, Google Fonts (*Dancing Script*, *Outfit*, *Poppins*)
* **Audio:** Web Audio API & HTML5 Audio with procedural fallback
* **Communication:** Official WhatsApp Click-to-Chat API & Instagram Direct Message deep linking

---

## 📁 Project Directory Structure

```text
Birthday/
├── public/
│   ├── assets/
│   │   ├── audio/
│   │   │   └── birthday-song.mp3       # Background song
│   │   └── images/
│   │       ├── photo1.jpg ... photo8.jpg # Fictional demo portraits
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── AudioPlayer/
│   │   │   ├── AudioPlayer.tsx          # Rotating vinyl disc audio controller
│   │   │   └── RomanticSynth.ts         # Procedural Web Audio fallback
│   │   ├── BirthdayCard/
│   │   │   ├── CartoonHands.tsx         # Hand illustration supporting card
│   │   │   └── InteractiveCard.tsx
│   │   ├── GalaxyScene/
│   │   │   ├── BirthdayMascot.tsx       # Animated ukulele-playing bear
│   │   │   └── Starfield.tsx            # Multi-layer 3D cosmos canvas
│   │   ├── HeartAnimation/
│   │   │   └── BeatingHeart.tsx         # Double-pulse heartbeat SVG
│   │   ├── HeartPhotoGallery/
│   │   │   ├── heartMath.ts             # Parametric 3D heart curve mathematics
│   │   │   ├── HeartPhotoCanvas.tsx     # Three.js / React Three Fiber scene
│   │   │   └── PhotoCard3D.tsx          # 3D texture-mapped photo card
│   │   ├── MatrixIntro/
│   │   │   ├── CountdownOverlay.tsx
│   │   │   └── MatrixRainCanvas.tsx     # Pink digital rain stream
│   │   └── UI/
│   │       ├── CommercialModal.tsx      # Customer order inquiry modal
│   │       ├── ContactButtons.tsx       # WhatsApp & Instagram integration
│   │       └── FloatingControls.tsx     # Scene switcher & demo watermark
│   ├── config/
│   │   ├── birthdayConfig.ts            # Central personalization settings
│   │   └── contactConfig.ts             # WhatsApp & Instagram business details
│   ├── styles/
│   │   └── index.css                    # Glow effects, keyframes & disc spin
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx                          # Scene orchestrator & state machine
│   └── main.tsx
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build
```bash
npm run build
```
Creates an optimized production bundle in the `dist/` directory.

### 4. Preview Production Build
```bash
npm run preview
```

---

## 📲 Business & Contact Configuration (`src/config/contactConfig.ts`)

All business contact information is centralized in [`src/config/contactConfig.ts`](file:///src/config/contactConfig.ts):

* **WhatsApp Business:** `+94 75 155 8581` (Sri Lanka)
  * Click-to-Chat URL: `https://wa.me/94751558581?text=...`
  * Automatically prefills inquiry message:
    > *"Hi! I'm interested in ordering a custom 3D Birthday Surprise Website. I saw your birthday website demo and would like to know more about the available packages, pricing and features. Please share the details."*
* **Instagram Profile & DM:**
  * Username: `stylish_ayyash_aysh`
  * DM URL: `https://ig.me/m/stylish_ayyash_aysh`
  * Profile URL: `https://www.instagram.com/stylish_ayyash_aysh/`

---

## 🎨 Single-File Birthday Personalization (`src/config/birthdayConfig.ts`)

To customize this website for a new client or special someone, simply modify [`src/config/birthdayConfig.ts`](file:///src/config/birthdayConfig.ts):

```typescript
export const birthdayConfig = {
  recipient: {
    name: "ANITA",                      // Central recipient name
    nickname: "Sayang",                  // Nickname / pet name
    greeting: "Happy Birthday Sayang 💕",
    age: 21,
  },
  intro: {
    countdownSeconds: 3,                 // Countdown duration
    revealWords: ["HAPPY", "BIRTHDAY", "TO", "ANITA"],
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
      message: "May your special day be filled with happiness...",
      photos: ["/assets/images/photo1.jpg", "/assets/images/photo2.jpg"],
    },
  ],
  heartGalleryPhotos: [
    // Array of 16-24 photo paths for the 3D heart collage
  ],
  audio: {
    bgMusicUrl: "/assets/audio/birthday-song.mp3",
    autoPlay: true,
    volume: 0.75,
    title: "Birthday Surprise Song",
  }
};
```

---

## 🌐 Deployment Instructions

### Deploy to Vercel (Recommended)
1. Push this repository to GitHub.
2. Go to [Vercel](https://vercel.com) and click **Add New Project**.
3. Import this repository (`premium-birthday-website`).
4. Framework Preset: **Vite**.
5. Build Command: `npm run build`.
6. Output Directory: `dist`.
7. Click **Deploy**.

### Deploy to Netlify
1. Connect your repository in [Netlify](https://netlify.com).
2. Build Command: `npm run build`.
3. Publish Directory: `dist`.
4. Click **Deploy Site**.

---

## 📱 Mobile Responsiveness

The application is engineered from the ground up for mobile screens:
* Viewport meta tags configured for full-screen web app presentation without accidental zoom.
* Clamped device pixel ratio for smooth 60fps performance on mobile GPUs.
* Dynamic camera distance calculation ensures the 3D heart fits naturally in both portrait mobile screens and landscape desktop displays.
