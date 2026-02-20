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
  const calledRef = useRef(false);
  const settledFramesRef = useRef(0);

  useFrame(() => {
    if (calledRef.current) return;
    const assetsLoaded = total === 0 || progress >= 100;
    const allowEarlyReady = reducedMotion || lowPower || total === 0;
    const readyToSettle = !active && (assetsLoaded || allowEarlyReady);

    if (!readyToSettle) {
      settledFramesRef.current = 0;
      return;
    }

    settledFramesRef.current += 1;
    if (settledFramesRef.current < 6) return;
    calledRef.current = true;
    onReady?.();
  });

  return null;
};
