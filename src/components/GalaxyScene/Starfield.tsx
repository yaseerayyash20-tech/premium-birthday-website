import React, { useEffect, useRef } from 'react';

interface StarfieldProps {
  starCount?: number;
}

interface Star {
  x: number;
  y: number;
  z: number;
  size: number;
  baseAlpha: number;
  twinkleSpeed: number;
  color: string;
}

export const Starfield: React.FC<StarfieldProps> = ({ starCount = 600 }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const colors = ['#FFFFFF', '#FFE5F1', '#FFB3D9', '#E0AAFF', '#C77DFF'];

    // Generate stars
    const stars: Star[] = Array.from({ length: starCount }, () => ({
      x: (Math.random() - 0.5) * width * 1.5,
      y: (Math.random() - 0.5) * height * 1.5,
      z: Math.random() * 1000 + 100,
      size: Math.random() * 1.8 + 0.6,
      baseAlpha: Math.random() * 0.7 + 0.3,
      twinkleSpeed: Math.random() * 0.05 + 0.01,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    let time = 0;

    const render = () => {
      time += 0.02;

      // Dark cosmos gradient
      const bgGrad = ctx.createRadialGradient(
        width / 2,
        height / 2,
        100,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.8
      );
      bgGrad.addColorStop(0, '#0D0817');
      bgGrad.addColorStop(0.5, '#07050E');
      bgGrad.addColorStop(1, '#030206');

      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Subtle atmospheric nebula clouds
      ctx.save();
      const nebula1 = ctx.createRadialGradient(
        width * 0.3,
        height * 0.4,
        20,
        width * 0.3,
        height * 0.4,
        width * 0.5
      );
      nebula1.addColorStop(0, 'rgba(255, 46, 147, 0.07)');
      nebula1.addColorStop(0.5, 'rgba(155, 81, 224, 0.04)');
      nebula1.addColorStop(1, 'transparent');
      ctx.fillStyle = nebula1;
      ctx.fillRect(0, 0, width, height);

      const nebula2 = ctx.createRadialGradient(
        width * 0.75,
        height * 0.65,
        30,
        width * 0.75,
        height * 0.65,
        width * 0.45
      );
      nebula2.addColorStop(0, 'rgba(123, 44, 191, 0.06)');
      nebula2.addColorStop(0.6, 'rgba(255, 0, 127, 0.03)');
      nebula2.addColorStop(1, 'transparent');
      ctx.fillStyle = nebula2;
      ctx.fillRect(0, 0, width, height);
      ctx.restore();

      // Render Stars with subtle forward drift and twinkle
      const cx = width / 2;
      const cy = height / 2;

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        // Slow camera forward drift
        star.z -= 0.35;
        if (star.z <= 0) {
          star.z = 1000;
          star.x = (Math.random() - 0.5) * width * 1.5;
          star.y = (Math.random() - 0.5) * height * 1.5;
        }

        const k = 400 / star.z;
        const px = star.x * k + cx;
        const py = star.y * k + cy;

        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          const alpha = star.baseAlpha * (0.6 + 0.4 * Math.sin(time * star.twinkleSpeed * 10 + i));
          ctx.beginPath();
          ctx.arc(px, py, star.size * Math.min(k, 1.8), 0, Math.PI * 2);
          ctx.fillStyle = star.color;
          ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
          ctx.shadowBlur = star.size > 1.2 ? 6 : 0;
          ctx.shadowColor = star.color;
          ctx.fill();
        }
      }

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, [starCount]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
};

