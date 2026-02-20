/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { QuantumAssembly } from './QuantumAssembly';
import type { ThemeMode } from './types';

export const QuantumComputerScene: React.FC<{ theme: ThemeMode }> = ({ theme }) => {
  const isDark = theme === 'dark';

  return (
    <div className="w-full h-full absolute inset-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 1.5]} gl={{ powerPreference: 'high-performance', antialias: true }}>
        <ambientLight intensity={isDark ? 0.35 : 1} />
        <spotLight position={[5, 5, 5]} angle={0.25} penumbra={1} intensity={isDark ? 3.2 : 2} color="#C5A059" />
        <pointLight position={[-5, -5, -5]} intensity={0.5} />
        <pointLight position={[0, 2.5, 2]} intensity={isDark ? 0.8 : 0.4} color="#F5E7C1" />
        <Suspense fallback={null}>
          <Environment preset={isDark ? 'night' : 'studio'} />
        </Suspense>
        <QuantumAssembly isDark={isDark} />
      </Canvas>
    </div>
  );
};
