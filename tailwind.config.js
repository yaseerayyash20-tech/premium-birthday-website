/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neon: {
          pink: '#FF2E93',
          hot: '#FF007F',
          rose: '#FF69B4',
          glow: '#FF1493',
          purple: '#9B51E0',
          dark: '#050508',
          card: '#0D0814'
        }
      },
      fontFamily: {
        heading: ['Outfit', 'Poppins', 'sans-serif'],
        handwriting: ['"Dancing Script"', '"Caveat"', 'cursive'],
        body: ['Inter', 'sans-serif']
      },
      animation: {
        'heartbeat': 'heartbeat 1.4s ease-in-out infinite',
        'float-slow': 'float 4s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '14%': { transform: 'scale(1.18)' },
          '28%': { transform: 'scale(1.05)' },
          '42%': { transform: 'scale(1.24)' },
          '70%': { transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', filter: 'drop-shadow(0 0 10px #FF1493)' },
          '50%': { opacity: '1', filter: 'drop-shadow(0 0 25px #FF007F)' },
        }
      }
    },
  },
  plugins: [],
}

