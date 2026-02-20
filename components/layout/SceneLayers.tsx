/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Suspense } from 'react';
import { SceneErrorBoundary } from '../ui/SceneErrorBoundary';
import { SceneFallback } from '../ui/SceneFallback';

const HeroScene = React.lazy(() => import('../QuantumScene').then((m) => ({ default: m.HeroScene })));

type SceneLayersProps = {
  theme: 'light' | 'dark';
  shouldRender3d: boolean;
  reducedMotion: boolean;
  lowPower: boolean;
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
  active,
  onSceneReady,
  onInvalidateReady,
  scrollStateRef,
  sceneWrapperRef,
  meteorWrapperRef,
}: SceneLayersProps) => (
  <>
    <div className="starfield-far" aria-hidden="true" />
    <div className="starfield" aria-hidden="true" />
    <div className="starfield-near" aria-hidden="true" />
    <div className="nebula" aria-hidden="true" />
    <div className="film-grain" aria-hidden="true" />
    <div className="vignette" aria-hidden="true" />
    <div className="hero-glow" aria-hidden="true" />
    <div ref={meteorWrapperRef} className="meteor-field" aria-hidden="true">
      <span className="meteor meteor-1" />
      <span className="meteor meteor-2" />
      <span className="meteor meteor-3" />
      <span className="meteor meteor-4 meteor-hero" />
    </div>
    <div ref={sceneWrapperRef} className="site-3d" aria-hidden="true">
      {shouldRender3d ? (
        <Suspense fallback={<div className="absolute inset-0 bg-nobel-cream dark:bg-nobel-dark transition-colors duration-500" />}>
          <SceneErrorBoundary fallback={<SceneFallback theme={theme} onReady={onSceneReady} />}>
            <HeroScene
              theme={theme}
              scrollState={scrollStateRef}
              reducedMotion={reducedMotion}
              lowPower={lowPower}
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
