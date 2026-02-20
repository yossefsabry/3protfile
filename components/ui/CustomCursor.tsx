/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from 'react';
import { useCursorColors } from './cursor/useCursorColors';
import { useCursorDrawing } from './cursor/useCursorDrawing';
import { useCursorMotion } from './cursor/useCursorMotion';

export const CustomCursor = ({ theme, disabled = false }: { theme: 'light' | 'dark'; disabled?: boolean }) => {
  if (disabled) return null;
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const trailRef = useRef<HTMLCanvasElement | null>(null);
  const drawRef = useRef<HTMLCanvasElement | null>(null);
  const trailColorRef = useRef('rgba(15, 17, 21, 0.35)');
  const drawColorRef = useRef('rgba(15, 17, 21, 0.55)');
  const drawingRef = useRef(false);

  useCursorColors(theme, trailColorRef, drawColorRef);
  useCursorMotion({ dotRef, ringRef, trailRef, drawRef, trailColorRef, drawingRef });
  useCursorDrawing({ drawRef, drawColorRef, drawingRef });

  return (
    <div className="custom-cursor" aria-hidden="true">
      <canvas ref={trailRef} className="cursor-trail" />
      <canvas ref={drawRef} className="cursor-draw" />
      <div ref={ringRef} className="cursor-ring" />
      <div ref={dotRef} className="cursor-dot" />
    </div>
  );
};
