/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useId } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export const ThemeWaterTransition = ({ toTheme }: { toTheme: 'light' | 'dark' }) => {
  const prefersReducedMotion = useReducedMotion();
  const idBase = useId().replace(/:/g, '');
  const maskId = `${idBase}-mask`;
  const filterId = `${idBase}-filter`;
  const overlayColor = toTheme === 'dark' ? '#0F1115' : '#F9F8F4';
  const highlightColor = toTheme === 'dark'
    ? 'rgba(197, 160, 89, 0.12)'
    : 'rgba(197, 160, 89, 0.18)';

  return (
    <motion.div
      className="fixed inset-0 z-[60] pointer-events-none"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: prefersReducedMotion ? 0.1 : 0.3 }}
    >
      <motion.svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <filter id={filterId}>
            <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="2" seed="2" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="12" xChannelSelector="R" yChannelSelector="G" />
          </filter>
          <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100">
            <motion.circle
              cx="100"
              cy="0"
              r="0"
              fill="white"
              filter={`url(#${filterId})`}
              initial={{ r: 0 }}
              animate={{ r: prefersReducedMotion ? 120 : 140 }}
              transition={{ duration: prefersReducedMotion ? 0.4 : 0.9, ease: [0.22, 1, 0.36, 1] }}
            />
          </mask>
        </defs>
        <rect width="100%" height="100%" fill={overlayColor} mask={`url(#${maskId})`} />
      </motion.svg>
      <div
        className="absolute inset-0"
        style={{ background: `radial-gradient(120% 120% at 100% 0%, ${highlightColor} 0%, transparent 65%)` }}
      />
    </motion.div>
  );
};
