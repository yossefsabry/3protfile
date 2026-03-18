/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from 'react';
import { useProgress } from '@react-three/drei';

type SceneLoadWatcherProps = {
  onReady?: () => void;
  reducedMotion: boolean;
  lowPower: boolean;
};

export const SceneLoadWatcher = ({ onReady, reducedMotion, lowPower }: SceneLoadWatcherProps) => {
  const { active, progress, total } = useProgress();
  const calledRef = useRef(false);

  useEffect(() => {
    if (calledRef.current) return;

    const assetsLoaded = total === 0 || progress >= 100;
    const allowEarlyReady = reducedMotion || lowPower || total === 0;
    const readyToSettle = !active && (assetsLoaded || allowEarlyReady);

    if (readyToSettle) {
      calledRef.current = true;
      // Defer the callback to ensure it happens after the current render/frame cycle
      const timer = setTimeout(() => {
        onReady?.();
      }, 500); // Give it a bit more time to settle
      return () => clearTimeout(timer);
    }
  }, [active, progress, total, reducedMotion, lowPower, onReady]);

  return null;
};
