/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from 'react';

export const SceneFallback = ({ theme, onReady }: { theme: 'light' | 'dark'; onReady?: () => void }) => {
  const calledRef = useRef(false);

  useEffect(() => {
    if (calledRef.current) return;
    calledRef.current = true;
    onReady?.();
  }, [onReady]);

  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        background: theme === 'dark'
          ? 'radial-gradient(circle at 50% 45%, rgba(197,160,89,0.15) 0%, rgba(15,17,21,0.95) 65%)'
          : 'radial-gradient(circle at 50% 45%, rgba(197,160,89,0.2) 0%, rgba(249,248,244,1) 65%)'
      }}
    />
  );
};
