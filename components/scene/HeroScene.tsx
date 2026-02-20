/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { SceneLoadWatcher } from './SceneLoadWatcher';
import { SceneInvalidateBridge } from './SceneInvalidateBridge';
import { ScrollRig } from './ScrollRig';
import type { ScrollStateRef, ThemeMode } from './types';

type HeroSceneProps = {
  theme: ThemeMode;
  scrollState: ScrollStateRef;
  reducedMotion?: boolean;
  lowPower?: boolean;
  active?: boolean;
  onReady?: () => void;
  onInvalidateReady?: (invalidate: (() => void) | null) => void;
};

export const HeroScene: React.FC<HeroSceneProps> = ({
  theme,
  scrollState,
  reducedMotion = false,
  lowPower = false,
  active = true,
  onReady,
  onInvalidateReady,
}) => {
  const isDark = theme === 'dark';

  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 40 }}
        dpr={reducedMotion || lowPower ? 1 : [1, 1.5]}
        gl={{ antialias: !(reducedMotion || lowPower), powerPreference: 'high-performance', alpha: true }}
        frameloop={active ? 'always' : 'demand'}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={isDark ? 0.2 : 0.6} />
        <pointLight position={[10, 10, 10]} intensity={isDark ? 1.5 : 1} color={isDark ? '#C5A059' : '#fff'} />

        <SceneLoadWatcher onReady={onReady} reducedMotion={reducedMotion} lowPower={lowPower} />
        <SceneInvalidateBridge onInvalidateReady={onInvalidateReady} />
        <ScrollRig scrollState={scrollState} reducedMotion={reducedMotion} isDark={isDark} />

        {!reducedMotion && !lowPower && (
          <Suspense fallback={null}>
            <Environment preset={isDark ? 'night' : 'city'} />
          </Suspense>
        )}
      </Canvas>
    </div>
  );
};
