/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import type { MutableRefObject } from 'react';
import { getThemeColors } from '../../../styles/colors';

export const useCursorColors = (
  theme: 'light' | 'dark',
  trailColorRef: MutableRefObject<string>,
  drawColorRef: MutableRefObject<string>
) => {
  useEffect(() => {
    const colors = getThemeColors(theme === 'dark');
    trailColorRef.current = colors.cursorTrail;
    drawColorRef.current = colors.cursorRing;
  }, [drawColorRef, theme, trailColorRef]);
};
