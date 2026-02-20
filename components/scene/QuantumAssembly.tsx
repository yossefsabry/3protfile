/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Cylinder, Float, Torus } from '@react-three/drei';
import * as THREE from 'three';

export const QuantumAssembly = ({ isDark }: { isDark: boolean }) => {
  const assemblyRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!assemblyRef.current) return;
    const t = state.clock.getElapsedTime();
    assemblyRef.current.position.x = Math.sin(t * 0.35) * 0.35;
    assemblyRef.current.position.y = 0.35 + Math.cos(t * 0.5) * 0.18;
    assemblyRef.current.rotation.y = Math.sin(t * 0.25) * 0.2;
    assemblyRef.current.rotation.z = Math.cos(t * 0.2) * 0.05;
  });

  return (
    <Float rotationIntensity={0.4} floatIntensity={0.25} speed={1.1}>
      <group ref={assemblyRef}>
        <Cylinder args={[1.2, 1.2, 0.08, 32]} position={[0, 1, 0]}>
          <meshStandardMaterial color={isDark ? '#8a6d3b' : '#C5A059'} metalness={1} roughness={0.1} />
        </Cylinder>

        <Cylinder args={[1, 1, 0.08, 32]} position={[0, 0.2, 0]}>
          <meshStandardMaterial color={isDark ? '#8a6d3b' : '#C5A059'} metalness={1} roughness={0.1} />
        </Cylinder>

        <Cylinder args={[0.6, 0.6, 0.08, 32]} position={[0, -0.6, 0]}>
          <meshStandardMaterial color={isDark ? '#8a6d3b' : '#C5A059'} metalness={1} roughness={0.1} />
        </Cylinder>

        {[0.5, -0.5].map((x, i) => (
          <Cylinder key={`rod-${i}`} args={[0.03, 0.03, 0.8, 8]} position={[x, 0.6, 0]}>
            <meshStandardMaterial color={isDark ? '#444' : '#D1D5DB'} metalness={0.9} roughness={0.1} />
          </Cylinder>
        ))}

        <Torus args={[0.7, 0.012, 12, 48]} position={[0, -0.2, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color="#B87333" metalness={0.9} roughness={0.2} />
        </Torus>

        <Box args={[0.25, 0.04, 0.25]} position={[0, -0.7, 0]}>
          <meshStandardMaterial
            color={isDark ? '#000' : '#111'}
            metalness={0.8}
            roughness={0.2}
            emissive={isDark ? '#C5A059' : '#000'}
            emissiveIntensity={isDark ? 0.3 : 0}
          />
        </Box>
      </group>
    </Float>
  );
};
