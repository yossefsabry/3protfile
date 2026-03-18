/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, PerspectiveCamera } from '@react-three/drei';
import { SceneLoadWatcher } from './SceneLoadWatcher';
import { SceneInvalidateBridge } from './SceneInvalidateBridge';
import { PixelsAsFrequencies } from './PixelsAsFrequencies';
import { COLORS } from '../../styles/colors';
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
        dpr={reducedMotion || lowPower ? 1 : [1, 1.5]}
        gl={{ antialias: !(reducedMotion || lowPower), powerPreference: 'high-performance', alpha: true }}
        frameloop={active ? 'always' : 'demand'}
        style={{ background: 'transparent' }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={60} />
        <ambientLight intensity={isDark ? 0.5 : 0.8} />
        <pointLight position={[10, 10, 10]} intensity={isDark ? 2 : 1.5} color={isDark ? COLORS.nobelGold : '#fff'} />

        <SceneLoadWatcher onReady={onReady} reducedMotion={reducedMotion} lowPower={lowPower} />
        <SceneInvalidateBridge onInvalidateReady={onInvalidateReady} />

        <Suspense fallback={null}>
          <PixelsAsFrequencies
            theme={theme}
            lowPower={lowPower}
            reducedMotion={reducedMotion}
            active={active}
          />
          {!reducedMotion && !lowPower && (
            <Environment preset={isDark ? 'night' : 'city'} />
          )}
        </Suspense>
      </Canvas>
    </div>
  );
};
