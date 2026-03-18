/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useProgress } from '@react-three/drei';

type SceneLoadWatcherProps = {
  onReady?: () => void;
  reducedMotion: boolean;
  lowPower: boolean;
};

export const SceneLoadWatcher = ({ onReady, reducedMotion, lowPower }: SceneLoadWatcherProps) => {
  const { active, progress, total } = useProgress();
  const progressRef = useRef({ active, progress, total });
  const calledRef = useRef(false);
  const settledFramesRef = useRef(0);

  // Sync progress state to ref to avoid triggering re-renders of this component
  // during the render phase of other components (like EnvironmentCube)
  React.useEffect(() => {
    progressRef.current = { active, progress, total };
  }, [active, progress, total]);

  useFrame(() => {
    if (calledRef.current) return;

    const current = progressRef.current;
    const assetsLoaded = current.total === 0 || current.progress >= 100;
    const allowEarlyReady = reducedMotion || lowPower || current.total === 0;
    const readyToSettle = !current.active && (assetsLoaded || allowEarlyReady);

    if (!readyToSettle) {
      settledFramesRef.current = 0;
      return;
    }

    settledFramesRef.current += 1;
    if (settledFramesRef.current < 6) return;
    calledRef.current = true;

    // Defer the callback to ensure it happens after the current render/frame cycle
    setTimeout(() => {
      onReady?.();
    }, 0);
  });

  return null;
};
