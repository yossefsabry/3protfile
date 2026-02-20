/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef } from 'react';

export const useSceneScroll = (markSceneActive: () => void) => {
  const sceneWrapperRef = useRef<HTMLDivElement | null>(null);
  const meteorWrapperRef = useRef<HTMLDivElement | null>(null);
  const footerRef = useRef<HTMLElement | null>(null);
  const scrollStateRef = useRef({ progress: 0, velocity: 0, direction: 1, fade: 1 });

  useEffect(() => {
    let rafId = 0;
    let lastScrollY = window.scrollY;

    const update = () => {
      rafId = 0;
      const footerEl = footerRef.current;
      if (!footerEl) return;

      const scrollY = window.scrollY;
      const deltaY = scrollY - lastScrollY;
      const direction = deltaY >= 0 ? 1 : -1;
      const velocity = Math.min(Math.abs(deltaY) / 120, 1);

      const footerTop = footerEl.getBoundingClientRect().top + window.scrollY;
      const viewportHeight = window.innerHeight;
      const maxScroll = Math.max(1, footerTop - viewportHeight);
      const progress = Math.min(Math.max(scrollY / maxScroll, 0), 1);

      const fadeRange = Math.max(200, viewportHeight * 0.5);
      const footerDistance = footerTop - (scrollY + viewportHeight);
      const fade = Math.min(Math.max(footerDistance / fadeRange, 0), 1);

      scrollStateRef.current.progress = progress;
      scrollStateRef.current.velocity = velocity;
      scrollStateRef.current.direction = direction;
      scrollStateRef.current.fade = fade;

      if (sceneWrapperRef.current) {
        sceneWrapperRef.current.style.opacity = fade.toFixed(3);
      }
      if (meteorWrapperRef.current) {
        meteorWrapperRef.current.style.opacity = fade.toFixed(3);
      }

      lastScrollY = scrollY;
      markSceneActive();
    };

    const onScroll = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(update);
    };

    const onResize = () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      update();
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    update();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [markSceneActive]);

  return { scrollStateRef, sceneWrapperRef, meteorWrapperRef, footerRef };
};
