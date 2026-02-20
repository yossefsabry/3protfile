/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Torus } from '@react-three/drei';
import * as THREE from 'three';

export const MacroscopicWave = () => {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.getElapsedTime();
      ref.current.rotation.x = Math.sin(t * 0.1) * 0.15;
      ref.current.rotation.y = t * 0.08;
    }
  });

  return (
    <Torus ref={ref} args={[3, 0.05, 12, 64]} rotation={[Math.PI / 2, 0, 0]}>
      <meshStandardMaterial color="#C5A059" emissive="#C5A059" emissiveIntensity={0.3} transparent opacity={0.4} wireframe />
    </Torus>
  );
};
