/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, PerspectiveCamera, AdaptiveDpr, AdaptiveEvents, Preload, PerformanceMonitor } from '@react-three/drei';
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
  isPhone?: boolean;
  active?: boolean;
  onReady?: () => void;
  onInvalidateReady?: (invalidate: (() => void) | null) => void;
};

export const HeroScene: React.FC<HeroSceneProps> = ({
  theme,
  scrollState,
  reducedMotion = false,
  lowPower = false,
  isPhone = false,
  active = true,
  onReady,
  onInvalidateReady,
}) => {
  const isDark = theme === 'dark';
  const [dpr, setDpr] = useState<number>(reducedMotion || lowPower ? 1 : 1.5);

  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas
        dpr={dpr}
        gl={{ 
          antialias: !(reducedMotion || lowPower), 
          powerPreference: 'high-performance', 
          alpha: true,
          stencil: false,
          depth: false 
        }}
        frameloop={active ? 'always' : 'demand'}
        style={{ background: 'transparent' }}
      >
        <PerformanceMonitor onDecline={() => setDpr(1)} />
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />

        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={60} />
        <ambientLight intensity={isDark ? 0.5 : 0.8} />
        <pointLight position={[10, 10, 10]} intensity={isDark ? 2 : 1.5} color={isDark ? COLORS.nobelGold : '#fff'} />

        <SceneLoadWatcher onReady={onReady} reducedMotion={reducedMotion} lowPower={lowPower} />
        <SceneInvalidateBridge onInvalidateReady={onInvalidateReady} />

        <Suspense fallback={null}>
          <PixelsAsFrequencies
            theme={theme}
            lowPower={lowPower}
            isPhone={isPhone}
            reducedMotion={reducedMotion}
            active={active}
          />
          {!reducedMotion && !lowPower && (
            <Environment preset={isDark ? 'night' : 'city'} />
          )}
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
};
