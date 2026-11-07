import React, { useEffect, useRef } from 'react';
import { birthdayConfig } from '../../config/birthdayConfig';

interface MatrixRainCanvasProps {
  opacity?: number;
  speedMultiplier?: number;
}

export const MatrixRainCanvas: React.FC<MatrixRainCanvasProps> = ({
  opacity = 1,
  speedMultiplier = 1,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const characters = birthdayConfig.intro.matrixChars.split('');
    const fontSize = Math.max(14, Math.floor(width / 60));
    let columns = Math.floor(width / fontSize);

    // Drops store the y position of each column
    let drops: number[] = Array.from({ length: columns }, () => Math.floor(Math.random() * -50));
    // Individual column speed variations
    let speeds: number[] = Array.from({ length: columns }, () => 0.8 + Math.random() * 0.9);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      columns = Math.floor(width / fontSize);
      drops = Array.from({ length: columns }, () => Math.floor(Math.random() * -50));
      speeds = Array.from({ length: columns }, () => 0.8 + Math.random() * 0.9);
    };

    window.addEventListener('resize', handleResize);

    const render = () => {
      // Semi-transparent black background to create trailing fade effect
      ctx.fillStyle = 'rgba(5, 5, 8, 0.12)';
      ctx.fillRect(0, 0, width, height);

      ctx.font = `600 ${fontSize}px "Courier New", monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = characters[Math.floor(Math.random() * characters.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Leading head character: bright white-pink with intense glow
        ctx.shadowBlur = 12;
        ctx.shadowColor = '#FF007F';
        ctx.fillStyle = '#FFF0F7';
        ctx.fillText(text, x, y);

        // Body trails: neon pink and magenta
        if (drops[i] > 1) {
          const prevText = characters[Math.floor(Math.random() * characters.length)];
          ctx.shadowBlur = 6;
          ctx.shadowColor = '#FF2E93';
          ctx.fillStyle = Math.random() > 0.4 ? '#FF2E93' : '#FF1493';
          ctx.fillText(prevText, x, y - fontSize);
        }

        ctx.shadowBlur = 0;

        // Reset drop when past bottom with randomized respawn
        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
          speeds[i] = 0.8 + Math.random() * 0.9;
        }

        drops[i] += speeds[i] * speedMultiplier;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [speedMultiplier]);

  return (
    <canvas
      ref={canvasRef}
      style={{ opacity }}
      className="absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-1000 z-0"
    />
  );
};

