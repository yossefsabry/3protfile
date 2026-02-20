/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import type { MutableRefObject, RefObject } from 'react';

type CursorMotionProps = {
  dotRef: RefObject<HTMLDivElement>;
  ringRef: RefObject<HTMLDivElement>;
  trailRef: RefObject<HTMLCanvasElement>;
  drawRef: RefObject<HTMLCanvasElement>;
  trailColorRef: MutableRefObject<string>;
  drawingRef: MutableRefObject<boolean>;
};

export const useCursorMotion = ({ dotRef, ringRef, trailRef, drawRef, trailColorRef, drawingRef }: CursorMotionProps) => {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    if (!finePointer) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dot = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ring = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const trailPoints: Array<{ x: number; y: number }> = [];
    const trailCanvas = trailRef.current;
    const trailCtx = trailCanvas ? trailCanvas.getContext('2d') : null;
    const drawCanvas = drawRef.current;
    const dpr = window.devicePixelRatio || 1;
    let rafId = 0;
    let idleTimeout = 0;
    let isRunning = false;
    let isHidden = document.hidden;

    const setVisible = (value: number) => {
      if (dotRef.current) dotRef.current.style.opacity = String(value);
      if (ringRef.current) ringRef.current.style.opacity = String(value);
      if (trailRef.current) trailRef.current.style.opacity = String(value);
    };

    const resizeCanvas = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      if (trailCanvas) {
        trailCanvas.width = width * dpr;
        trailCanvas.height = height * dpr;
        trailCanvas.style.width = `${width}px`;
        trailCanvas.style.height = `${height}px`;
        if (trailCtx) trailCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
      if (drawCanvas) {
        drawCanvas.width = width * dpr;
        drawCanvas.height = height * dpr;
        drawCanvas.style.width = `${width}px`;
        drawCanvas.style.height = `${height}px`;
      }
    };

    resizeCanvas();

    const update = () => {
      if (!isRunning || isHidden) return;
      if (!dotRef.current || !ringRef.current) return;
      const dotEase = prefersReducedMotion ? 1 : 0.35;
      const ringEase = prefersReducedMotion ? 1 : 0.15;
      dot.x += (target.x - dot.x) * dotEase;
      dot.y += (target.y - dot.y) * dotEase;
      ring.x += (target.x - ring.x) * ringEase;
      ring.y += (target.y - ring.y) * ringEase;

      dotRef.current.style.left = `${dot.x}px`;
      dotRef.current.style.top = `${dot.y}px`;
      ringRef.current.style.left = `${ring.x}px`;
      ringRef.current.style.top = `${ring.y}px`;

      if (!prefersReducedMotion && trailCtx) {
        const last = trailPoints[trailPoints.length - 1];
        const dx = last ? ring.x - last.x : 999;
        const dy = last ? ring.y - last.y : 999;
        if (!last || Math.hypot(dx, dy) > 2) {
          trailPoints.push({ x: ring.x, y: ring.y });
        }
        if (trailPoints.length > 14) {
          trailPoints.shift();
        }
        trailCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        if (trailPoints.length > 1) {
          for (let i = 1; i < trailPoints.length; i += 1) {
            const alpha = i / trailPoints.length;
            trailCtx.strokeStyle = trailColorRef.current.replace('0.45', (0.2 + alpha * 0.55).toFixed(2));
            trailCtx.lineWidth = 1.3;
            trailCtx.lineCap = 'round';
            trailCtx.lineJoin = 'round';
            trailCtx.beginPath();
            trailCtx.moveTo(trailPoints[i - 1].x, trailPoints[i - 1].y);
            trailCtx.lineTo(trailPoints[i].x, trailPoints[i].y);
            trailCtx.stroke();
          }
        }
      }

      rafId = window.requestAnimationFrame(update);
    };

    const startLoop = () => {
      if (isRunning || isHidden) return;
      isRunning = true;
      rafId = window.requestAnimationFrame(update);
    };

    const stopLoop = () => {
      if (!isRunning) return;
      isRunning = false;
      if (rafId) window.cancelAnimationFrame(rafId);
      rafId = 0;
    };

    const scheduleIdleStop = () => {
      if (idleTimeout) window.clearTimeout(idleTimeout);
      idleTimeout = window.setTimeout(() => {
        if (!drawingRef.current) stopLoop();
      }, 900);
    };

    const handleMove = (event: PointerEvent) => {
      target.x = event.clientX;
      target.y = event.clientY;
      setVisible(1);
      startLoop();
      scheduleIdleStop();
    };

    const handleLeave = () => {
      setVisible(0);
      stopLoop();
    };
    const handleEnter = () => {
      setVisible(1);
      startLoop();
      scheduleIdleStop();
    };

    const setHover = (isHover: boolean) => {
      if (!ringRef.current) return;
      ringRef.current.style.setProperty('--cursor-ring-scale', isHover ? '1.6' : '1');
    };

    const isInteractive = (targetEl: EventTarget | null) => {
      if (!(targetEl instanceof Element)) return false;
      return Boolean(targetEl.closest('a, button, [role="button"], input, textarea, select, label'));
    };

    const handlePointerOver = (event: PointerEvent) => setHover(isInteractive(event.target));
    const handlePointerOut = () => setHover(false);

    const handleVisibilityChange = () => {
      isHidden = document.hidden;
      if (isHidden) {
        stopLoop();
        setVisible(0);
      } else {
        setVisible(1);
        startLoop();
        scheduleIdleStop();
      }
    };

    const handleContextMenu = (event: MouseEvent) => {
      event.preventDefault();
    };

    window.addEventListener('pointermove', handleMove);
    window.addEventListener('pointerleave', handleLeave);
    window.addEventListener('pointerenter', handleEnter);
    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('resize', resizeCanvas);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    document.addEventListener('pointerover', handlePointerOver);
    document.addEventListener('pointerout', handlePointerOut);
    setVisible(1);
    scheduleIdleStop();

    return () => {
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('pointerleave', handleLeave);
      window.removeEventListener('pointerenter', handleEnter);
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('resize', resizeCanvas);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('pointerover', handlePointerOver);
      document.removeEventListener('pointerout', handlePointerOut);
      stopLoop();
      if (idleTimeout) window.clearTimeout(idleTimeout);
    };
  }, [dotRef, drawRef, drawingRef, ringRef, trailColorRef, trailRef]);
};
