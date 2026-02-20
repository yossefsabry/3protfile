/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useCallback, useEffect, useRef, useState } from 'react';

export const useSceneActivity = (shouldRender3d: boolean) => {
  const [isSceneActive, setIsSceneActive] = useState(true);
  const sceneInvalidateRef = useRef<(() => void) | null>(null);
  const sceneActiveRef = useRef(true);
  const sceneIdleTimeoutRef = useRef<number | null>(null);

  const setSceneInvalidate = useCallback((invalidate: (() => void) | null) => {
    sceneInvalidateRef.current = invalidate;
  }, []);

  const invalidateScene = useCallback(() => {
    sceneInvalidateRef.current?.();
  }, []);

  const markSceneActive = useCallback(() => {
    if (!sceneActiveRef.current) {
      sceneActiveRef.current = true;
      setIsSceneActive(true);
    }

    if (sceneIdleTimeoutRef.current) window.clearTimeout(sceneIdleTimeoutRef.current);
    sceneIdleTimeoutRef.current = window.setTimeout(() => {
      sceneActiveRef.current = false;
      setIsSceneActive(false);
      sceneInvalidateRef.current?.();
    }, 1800);

    sceneInvalidateRef.current?.();
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    if (!shouldRender3d) return undefined;
    markSceneActive();

    const handleActivity = () => markSceneActive();
    window.addEventListener('pointermove', handleActivity, { passive: true });
    window.addEventListener('pointerdown', handleActivity, { passive: true });
    window.addEventListener('resize', handleActivity);

    return () => {
      window.removeEventListener('pointermove', handleActivity);
      window.removeEventListener('pointerdown', handleActivity);
      window.removeEventListener('resize', handleActivity);
      if (sceneIdleTimeoutRef.current) window.clearTimeout(sceneIdleTimeoutRef.current);
    };
  }, [markSceneActive, shouldRender3d]);

  return { isSceneActive, markSceneActive, setSceneInvalidate, invalidateScene };
};
