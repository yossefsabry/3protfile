/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';

export const useDeviceProfile = (prefersReducedMotion: boolean) => {
  const [isPhone, setIsPhone] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(pointer: coarse)').matches;
  });
  const [isLowPower, setIsLowPower] = useState(false);
  const [canRender3d, setCanRender3d] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      setCanRender3d(!!gl);
    } catch {
      setCanRender3d(false);
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    type NavigatorWithMemory = Navigator & { deviceMemory?: number };

    const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
    const reducedMotion = prefersReducedMotion || window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const deviceMemory = (navigator as NavigatorWithMemory).deviceMemory;
    const hardwareConcurrency = navigator.hardwareConcurrency;

    setIsPhone(coarsePointer);

    const lowPower = Boolean(
      reducedMotion ||
      coarsePointer ||
      (typeof deviceMemory === 'number' && deviceMemory <= 4) ||
      (typeof hardwareConcurrency === 'number' && hardwareConcurrency <= 4)
    );

    setIsLowPower(lowPower);
    document.documentElement.classList.toggle('low-power', lowPower);

    return () => {
      document.documentElement.classList.remove('low-power');
    };
  }, [prefersReducedMotion]);

  return { isPhone, isLowPower, canRender3d };
};
