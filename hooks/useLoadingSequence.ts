/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from 'react';

export const useLoadingSequence = (shouldRender3d: boolean) => {
  const [isLoading, setIsLoading] = useState(true);
  const [pageReady, setPageReady] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);
  const loaderTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    let isMounted = true;
    if (typeof window === 'undefined') return undefined;

    const fontsReady = typeof document !== 'undefined' && 'fonts' in document
      ? document.fonts.ready
      : Promise.resolve();

    const loadPromise = new Promise<void>((resolve) => {
      if (document.readyState === 'complete') {
        resolve();
        return;
      }
      window.addEventListener('load', () => resolve(), { once: true });
    });

    const nextFrame = () => new Promise<void>((resolve) => window.requestAnimationFrame(() => resolve()));

    Promise.all([fontsReady, loadPromise])
      .then(() => nextFrame())
      .then(() => nextFrame())
      .then(() => {
        if (isMounted) setPageReady(true);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!shouldRender3d) setSceneReady(true);
  }, [shouldRender3d]);

  useEffect(() => {
    if (pageReady && sceneReady) setIsLoading(false);
  }, [pageReady, sceneReady]);

  useEffect(() => {
    if (!pageReady || sceneReady) {
      if (loaderTimeoutRef.current) window.clearTimeout(loaderTimeoutRef.current);
      return undefined;
    }

    loaderTimeoutRef.current = window.setTimeout(() => {
      setSceneReady(true);
    }, 10000);

    return () => {
      if (loaderTimeoutRef.current) window.clearTimeout(loaderTimeoutRef.current);
    };
  }, [pageReady, sceneReady]);

  useEffect(() => {
    return () => {
      if (loaderTimeoutRef.current) window.clearTimeout(loaderTimeoutRef.current);
    };
  }, []);

  return { isLoading, pageReady, sceneReady, setSceneReady };
};
