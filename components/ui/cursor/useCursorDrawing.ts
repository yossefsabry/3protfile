/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import type { MutableRefObject, RefObject } from 'react';

type CursorDrawingProps = {
  drawRef: RefObject<HTMLCanvasElement>;
  drawColorRef: MutableRefObject<string>;
  drawingRef: MutableRefObject<boolean>;
};

export const useCursorDrawing = ({ drawRef, drawColorRef, drawingRef }: CursorDrawingProps) => {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    if (!finePointer) return;

    const drawCanvas = drawRef.current;
    const drawCtx = drawCanvas ? drawCanvas.getContext('2d') : null;
    const dpr = window.devicePixelRatio || 1;
    let lastDraw = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let fadeRaf = 0;
    let fadeTimeout = 0;
    let isFading = false;
    let lastTapTime = 0;
    let lastTapPos = { x: 0, y: 0 };
    const doubleTapDelay = 320;
    const doubleTapDistance = 24;

    const resizeCanvas = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      if (drawCanvas) {
        drawCanvas.width = width * dpr;
        drawCanvas.height = height * dpr;
        drawCanvas.style.width = `${width}px`;
        drawCanvas.style.height = `${height}px`;
        if (drawCtx) drawCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
    };

    resizeCanvas();

    const fadeOutDrawing = () => {
      if (!drawCtx || isFading) return;
      isFading = true;
      const width = window.innerWidth;
      const height = window.innerHeight;
      let step = 0;
      const maxSteps = 24;

      const fade = () => {
        if (!drawCtx) return;
        drawCtx.save();
        drawCtx.globalCompositeOperation = 'destination-out';
        drawCtx.fillStyle = 'rgba(0, 0, 0, 0.08)';
        drawCtx.fillRect(0, 0, width, height);
        drawCtx.restore();
        step += 1;
        if (step < maxSteps) {
          fadeRaf = window.requestAnimationFrame(fade);
        } else {
          drawCtx.clearRect(0, 0, width, height);
          isFading = false;
        }
      };

      fade();
    };

    const scheduleFadeOut = (delayMs: number) => {
      if (fadeTimeout) window.clearTimeout(fadeTimeout);
      fadeTimeout = window.setTimeout(() => fadeOutDrawing(), delayMs);
    };

    const handleMove = (event: PointerEvent) => {
      if (!drawingRef.current || !drawCtx) return;
      drawCtx.strokeStyle = drawColorRef.current;
      drawCtx.lineWidth = 1.6;
      drawCtx.lineCap = 'round';
      drawCtx.lineJoin = 'round';
      drawCtx.beginPath();
      drawCtx.moveTo(lastDraw.x, lastDraw.y);
      drawCtx.lineTo(event.clientX, event.clientY);
      drawCtx.stroke();
      lastDraw = { x: event.clientX, y: event.clientY };
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (event.pointerType === 'touch') {
        const now = Date.now();
        const dist = Math.hypot(event.clientX - lastTapPos.x, event.clientY - lastTapPos.y);
        if (now - lastTapTime < doubleTapDelay && dist < doubleTapDistance) {
          if (fadeRaf) window.cancelAnimationFrame(fadeRaf);
          if (fadeTimeout) window.clearTimeout(fadeTimeout);
          isFading = false;
          drawingRef.current = true;
          lastDraw = { x: event.clientX, y: event.clientY };
          event.preventDefault();
        }
        lastTapTime = now;
        lastTapPos = { x: event.clientX, y: event.clientY };
        return;
      }

      if (event.button === 2) {
        if (fadeRaf) window.cancelAnimationFrame(fadeRaf);
        if (fadeTimeout) window.clearTimeout(fadeTimeout);
        isFading = false;
        drawingRef.current = true;
        lastDraw = { x: event.clientX, y: event.clientY };
        event.preventDefault();
      }
      if (event.button === 0) {
        fadeOutDrawing();
      }
    };

    const handlePointerUp = (event: PointerEvent) => {
      if (event.pointerType === 'touch') {
        if (drawingRef.current) {
          drawingRef.current = false;
          scheduleFadeOut(2000);
        }
        return;
      }
      if (event.button === 2) drawingRef.current = false;
      scheduleFadeOut(2000);
    };

    const handlePointerCancel = () => {
      if (drawingRef.current) {
        drawingRef.current = false;
        scheduleFadeOut(2000);
      }
    };

    window.addEventListener('pointermove', handleMove);
    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerCancel);
    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerCancel);
      window.removeEventListener('resize', resizeCanvas);
      if (fadeRaf) window.cancelAnimationFrame(fadeRaf);
      if (fadeTimeout) window.clearTimeout(fadeTimeout);
    };
  }, [drawColorRef, drawRef, drawingRef]);
};
