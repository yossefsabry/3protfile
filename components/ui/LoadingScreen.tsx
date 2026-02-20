/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export const LoadingScreen = ({ theme }: { theme: 'light' | 'dark' }) => {
  const prefersReducedMotion = useReducedMotion();
  const isDark = theme === 'dark';

  return (
    <motion.div
      key="loading-screen"
      className="fixed inset-0 z-[70] flex items-center justify-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      style={{ backgroundColor: isDark ? '#0F1115' : '#F9F8F4' }}
    >
      <motion.div
        aria-hidden="true"
        className="absolute inset-0"
        initial={{ clipPath: 'circle(12% at 100% 0%)' }}
        animate={prefersReducedMotion ? undefined : {
          clipPath: [
            'circle(12% at 100% 0%)',
            'circle(28% at 100% 0%)',
            'circle(12% at 100% 0%)'
          ]
        }}
        transition={prefersReducedMotion ? undefined : { duration: 2.4, ease: 'easeInOut', repeat: Infinity }}
        style={{ background: isDark ? 'rgba(197,160,89,0.12)' : 'rgba(197,160,89,0.18)' }}
      />
      <div className="relative z-10 flex flex-col items-center gap-4">
        <div
          className="font-serif text-4xl tracking-wide"
          style={{ color: isDark ? '#F9F8F4' : '#0F1115' }}
        >
          YON3
        </div>
        <div
          className="text-[10px] uppercase tracking-[0.4em]"
          style={{ color: isDark ? '#A1A1AA' : '#6B7280' }}
        >
          Loading portfolio
        </div>
        <div
          className="mt-3 h-[3px] w-44 rounded-full overflow-hidden"
          style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(15,17,21,0.1)' }}
        >
          <motion.div
            className="h-full w-1/3 bg-nobel-gold"
            initial={{ x: '-40%' }}
            animate={prefersReducedMotion ? { x: '0%' } : { x: '140%' }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </div>
    </motion.div>
  );
};
