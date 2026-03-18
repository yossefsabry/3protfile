/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from 'react';
import { COLORS, getThemeColors } from '../../styles/colors';

export const SceneFallback = ({ theme, onReady }: { theme: 'light' | 'dark'; onReady?: () => void }) => {
  const calledRef = useRef(false);
  const isDark = theme === 'dark';
  const colors = getThemeColors(isDark);

  useEffect(() => {
    if (calledRef.current) return;
    calledRef.current = true;
    onReady?.();
  }, [onReady]);

  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        background: isDark
          ? `radial-gradient(circle at 50% 45%, rgba(197, 160, 89, 0.15) 0%, ${COLORS.dark.background}f2 65%)`
          : `radial-gradient(circle at 50% 45%, rgba(197, 160, 89, 0.2) 0%, ${COLORS.light.background} 65%)`
      }}
    />
  );
};
