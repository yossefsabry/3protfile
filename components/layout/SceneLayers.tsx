/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Suspense, useMemo } from 'react';
import { SceneErrorBoundary } from '../ui/SceneErrorBoundary';
import { SceneFallback } from '../ui/SceneFallback';

const HeroScene = React.lazy(() => import('../QuantumScene').then((m) => ({ default: m.HeroScene })));

type SceneLayersProps = {
  theme: 'light' | 'dark';
  shouldRender3d: boolean;
  reducedMotion: boolean;
  lowPower: boolean;
  isPhone: boolean;
  active: boolean;
  onSceneReady: () => void;
  onInvalidateReady: (invalidate: (() => void) | null) => void;
  scrollStateRef: React.MutableRefObject<{ progress: number; velocity: number; direction: number; fade: number }>;
  sceneWrapperRef: React.RefObject<HTMLDivElement>;
  meteorWrapperRef: React.RefObject<HTMLDivElement>;
};

export const SceneLayers = ({
  theme,
  shouldRender3d,
  reducedMotion,
  lowPower,
  isPhone,
  active,
  onSceneReady,
  onInvalidateReady,
  scrollStateRef,
  sceneWrapperRef,
  meteorWrapperRef,
}: SceneLayersProps) => {
  // scrollStateRef is updated by useSceneScroll hook
  
  return (
    <>
      <div className="film-grain" aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />
      
      <div ref={sceneWrapperRef} className="site-3d" aria-hidden="true">
        {shouldRender3d ? (
          <Suspense fallback={<div className="absolute inset-0 bg-nobel-cream dark:bg-nobel-dark transition-colors duration-500" />}>
            <SceneErrorBoundary fallback={<SceneFallback theme={theme} onReady={onSceneReady} />}>
              <HeroScene
                theme={theme}
                scrollState={scrollStateRef}
                reducedMotion={reducedMotion}
                lowPower={lowPower}
                isPhone={isPhone}
                active={active}
                onReady={onSceneReady}
                onInvalidateReady={onInvalidateReady}
              />
            </SceneErrorBoundary>
          </Suspense>
        ) : (
          <SceneFallback theme={theme} onReady={onSceneReady} />
        )}
      </div>
    </>
  );
};
