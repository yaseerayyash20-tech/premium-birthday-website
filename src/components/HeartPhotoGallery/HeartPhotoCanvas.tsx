import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { PhotoCard3D } from './PhotoCard3D';
import { generateHeartLayout } from './heartMath';
import { birthdayConfig } from '../../config/birthdayConfig';

interface HeartPhotoCanvasProps {
  onAssembled?: () => void;
}

const HeartGroup: React.FC<{ isMobile: boolean; onAssembled?: () => void }> = ({
  isMobile,
  onAssembled,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const [progress, setProgress] = useState(0);

  const cards = useMemo(() => {
    return generateHeartLayout(birthdayConfig.heartGalleryPhotos);
  }, []);

  // Assembly animation timeline
  useEffect(() => {
    let start: number | null = null;
    const duration = 2200; // 2.2 seconds to assemble

    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const p = Math.min(1, elapsed / duration);
      // Smooth easeOutCubic curve
      const eased = 1 - Math.pow(1 - p, 3);
      setProgress(eased);

      if (p < 1) {
        requestAnimationFrame(step);
      } else {
        if (onAssembled) onAssembled();
      }
    };

    const anim = requestAnimationFrame(step);
    return () => cancelAnimationFrame(anim);
  }, [onAssembled]);

  // Gentle float, breathing, and mouse parallax
  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const t = state.clock.elapsedTime;

    // Slow gentle yaw rotation (breathing heart)
    const baseRotY = Math.sin(t * 0.4) * 0.12;
    const baseRotX = Math.cos(t * 0.3) * 0.06;

    // Interactive pointer parallax
    const mouseX = (state.pointer.x * 0.25);
    const mouseY = (state.pointer.y * 0.15);

    groupRef.current.rotation.y = THREE.MathUtils.damp(
      groupRef.current.rotation.y,
      baseRotY + mouseX,
      3,
      delta
    );
    groupRef.current.rotation.x = THREE.MathUtils.damp(
      groupRef.current.rotation.x,
      baseRotX - mouseY,
      3,
      delta
    );

    // Floating breathing bob
    groupRef.current.position.y = Math.sin(t * 1.2) * 0.12;
  });

  return (
    <group ref={groupRef}>
      {cards.map((card) => (
        <PhotoCard3D
          key={card.id}
          data={card}
          progress={progress}
          isMobile={isMobile}
        />
      ))}
    </group>
  );
};

export const HeartPhotoCanvas: React.FC<HeartPhotoCanvasProps> = ({ onAssembled }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Distance calculation: on small mobile screens, zoom out so the heart fits without overflow
  const cameraZ = isMobile ? 8.2 : 6.5;

  return (
    <div className="w-full h-full absolute inset-0 z-10 cursor-grab active:cursor-grabbing">
      <Canvas
        camera={{ position: [0, 0, cameraZ], fov: 50 }}
        dpr={[1, Math.min(2, window.devicePixelRatio)]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={1.5} />
        <pointLight position={[0, 0, 4]} intensity={2.5} color="#FFD1DC" />
        <pointLight position={[-4, 3, 2]} intensity={2} color="#FF2E93" />
        <pointLight position={[4, -3, 2]} intensity={2} color="#FF007F" />

        <HeartGroup isMobile={isMobile} onAssembled={onAssembled} />
      </Canvas>
    </div>
  );
};

