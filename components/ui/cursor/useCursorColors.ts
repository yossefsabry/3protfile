/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import type { MutableRefObject } from 'react';

export const useCursorColors = (
  theme: 'light' | 'dark',
  trailColorRef: MutableRefObject<string>,
  drawColorRef: MutableRefObject<string>
) => {
  useEffect(() => {
    trailColorRef.current = theme === 'dark'
      ? 'rgba(255, 255, 255, 0.45)'
      : 'rgba(15, 17, 21, 0.45)';
    drawColorRef.current = theme === 'dark'
      ? 'rgba(255, 255, 255, 0.7)'
      : 'rgba(15, 17, 21, 0.6)';
  }, [drawColorRef, theme, trailColorRef]);
};
