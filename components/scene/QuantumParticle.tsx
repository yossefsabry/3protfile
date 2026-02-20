/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere } from '@react-three/drei';
import * as THREE from 'three';

type QuantumParticleProps = {
  position: [number, number, number];
  color: string;
  scale?: number;
};

export const QuantumParticle = ({ position, color, scale = 1 }: QuantumParticleProps) => {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.getElapsedTime();
      ref.current.position.y = position[1] + Math.sin(t * 1.5 + position[0]) * 0.15;
      ref.current.rotation.x = t * 0.4;
      ref.current.rotation.z = t * 0.25;
    }
  });

  return (
    <Sphere ref={ref} args={[1, 16, 16]} position={position} scale={scale}>
      <MeshDistortMaterial
        color={color}
        envMapIntensity={0.8}
        clearcoat={0.5}
        metalness={0.6}
        distort={0.3}
        speed={1.5}
      />
    </Sphere>
  );
};
