// Mathematical computation for 3D Heart-shaped photo arrangement
export interface HeartCardData {
  id: number;
  x: number;
  y: number;
  z: number;
  rotZ: number;
  rotY: number;
  rotX: number;
  photoUrl: string;
}

export function generateHeartLayout(photos: string[]): HeartCardData[] {
  const cards: HeartCardData[] = [];
  const perimeterCount = 15;
  const scale = 0.22;

  // 1. Perimeter cards following the parametric heart curve:
  // x = 16 * sin^3(t)
  // y = 13*cos(t) - 5*cos(2t) - 2*cos(3t) - cos(4t)
  for (let i = 0; i < perimeterCount; i++) {
    // Distribute parameter t from 0 to 2*PI, avoiding duplicate at 2*PI
    const t = (i / perimeterCount) * Math.PI * 2;

    const sinT = Math.sin(t);
    const cosT = Math.cos(t);

    const rawX = 16 * Math.pow(sinT, 3);
    const rawY = 13 * cosT - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);

    // Tangent derivative for natural card alignment along heart contour
    const dx = 48 * Math.pow(sinT, 2) * cosT;
    const dy = -13 * sinT + 10 * Math.sin(2 * t) + 6 * Math.sin(3 * t) + 4 * Math.sin(4 * t);
    const tangentAngle = Math.atan2(dy, dx);

    // Subtle 3D curvature: depth bows slightly forward at lobes, back at tip
    const zOffset = Math.sin(t) * 0.45;

    cards.push({
      id: i,
      x: rawX * scale,
      y: (rawY + 3) * scale, // Center vertically
      z: zOffset,
      rotZ: tangentAngle * 0.4, // Gentle alignment angle
      rotY: (rawX > 0 ? -0.15 : 0.15),
      rotX: 0,
      photoUrl: photos[i % photos.length],
    });
  }

  // 2. Interior fill cards (Center hero card and inner supports)
  const interiorCards = [
    { x: 0, y: -0.2, z: 0.35, rotZ: 0, rotY: 0, rotX: 0 }, // Hero Center Card
    { x: -1.4, y: 0.8, z: 0.15, rotZ: -0.12, rotY: 0.1, rotX: 0 },
    { x: 1.4, y: 0.8, z: 0.15, rotZ: 0.12, rotY: -0.1, rotX: 0 },
    { x: 0, y: -1.6, z: 0.25, rotZ: 0.05, rotY: 0, rotX: 0 },
  ];

  interiorCards.forEach((item, idx) => {
    const photoIdx = (perimeterCount + idx) % photos.length;
    cards.push({
      id: perimeterCount + idx,
      x: item.x,
      y: item.y,
      z: item.z,
      rotZ: item.rotZ,
      rotY: item.rotY,
      rotX: item.rotX,
      photoUrl: photos[photoIdx],
    });
  });

  return cards;
}

