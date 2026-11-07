import React, { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { HeartCardData } from './heartMath';

interface PhotoCard3DProps {
  data: HeartCardData;
  progress: number; // 0 to 1 assembly progress
  isMobile: boolean;
}

export const PhotoCard3D: React.FC<PhotoCard3DProps> = ({
  data,
  progress,
  isMobile,
}) => {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  // Card dimensions: 3:4 portrait aspect ratio
  const cardWidth = isMobile ? 1.05 : 1.25;
  const cardHeight = isMobile ? 1.4 : 1.65;

  // Load texture with fallback
  const texture = useMemo(() => {
    const loader = new THREE.TextureLoader();
    const tex = loader.load(data.photoUrl);
    tex.generateMipmaps = true;
    tex.minFilter = THREE.LinearMipmapLinearFilter;
    return tex;
  }, [data.photoUrl]);

  // Initial dispersed spawn position (swirling in from center)
  const spawnPos = useMemo(() => {
    const angle = Math.random() * Math.PI * 2;
    const radius = 0.5 + Math.random() * 1.5;
    return new THREE.Vector3(
      Math.cos(angle) * radius,
      Math.sin(angle) * radius,
      -3 - Math.random() * 2
    );
  }, []);

  const targetPos = useMemo(() => {
    const mult = isMobile ? 0.8 : 1.0;
    return new THREE.Vector3(data.x * mult, data.y * mult, data.z * mult);
  }, [data.x, data.y, data.z, isMobile]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    // Smooth lerp assembly
    const currentProgress = THREE.MathUtils.clamp(progress, 0, 1);
    
    // Position interpolation
    const curX = THREE.MathUtils.lerp(spawnPos.x, targetPos.x, currentProgress);
    const curY = THREE.MathUtils.lerp(spawnPos.y, targetPos.y, currentProgress);
    const targetZ = targetPos.z + (hovered ? 0.6 : 0);
    const curZ = THREE.MathUtils.lerp(spawnPos.z, targetZ, currentProgress);

    meshRef.current.position.set(curX, curY, curZ);

    // Rotation interpolation
    const targetRotX = data.rotX + (hovered ? 0 : Math.sin(state.clock.elapsedTime * 1.5 + data.id) * 0.04);
    const targetRotY = data.rotY + (hovered ? 0 : Math.cos(state.clock.elapsedTime * 1.5 + data.id) * 0.04);
    const targetRotZ = THREE.MathUtils.lerp(spawnPos.x * 2, data.rotZ, currentProgress);

    meshRef.current.rotation.x = THREE.MathUtils.damp(meshRef.current.rotation.x, targetRotX, 4, delta);
    meshRef.current.rotation.y = THREE.MathUtils.damp(meshRef.current.rotation.y, targetRotY, 4, delta);
    meshRef.current.rotation.z = THREE.MathUtils.damp(meshRef.current.rotation.z, targetRotZ, 4, delta);

    // Scale interpolation with subtle hover pop
    const targetScale = currentProgress * (hovered ? 1.12 : 1.0);
    meshRef.current.scale.setScalar(THREE.MathUtils.damp(meshRef.current.scale.x, targetScale, 6, delta));
  });

  return (
    <group
      ref={meshRef}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => setHovered(false)}
    >
      {/* Photo Surface Mesh */}
      <mesh position={[0, 0, 0.01]}>
        <planeGeometry args={[cardWidth, cardHeight]} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>

      {/* Glowing White/Pink Frame Border Mesh */}
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[cardWidth + 0.08, cardHeight + 0.08]} />
        <meshBasicMaterial
          color={hovered ? '#FFFFFF' : '#FFD6E8'}
          toneMapped={false}
        />
      </mesh>

      {/* Soft Pink Outer Glow Outline */}
      <mesh position={[0, 0, -0.01]}>
        <planeGeometry args={[cardWidth + 0.16, cardHeight + 0.16]} />
        <meshBasicMaterial
          color="#FF007F"
          transparent
          opacity={hovered ? 0.9 : 0.6}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
};

