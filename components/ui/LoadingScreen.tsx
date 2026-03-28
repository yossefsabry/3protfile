/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export const LoadingScreen = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      key="loading-screen"
      className="fixed inset-0 z-[70] flex items-center justify-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      style={{ backgroundColor: '#191724' }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(196,167,231,0.14),transparent_30%),linear-gradient(180deg,rgba(25,23,36,0.08),rgba(25,23,36,0.78))]" />
      <div className="relative z-10 flex flex-col items-center gap-4 rounded-[2rem] border border-[#c4a7e7]/20 bg-[#1f1d2e]/60 px-10 py-8 shadow-[0_0_80px_rgba(196,167,231,0.1)] backdrop-blur-xl">
        <div className="font-serif text-4xl tracking-[0.18em] text-[#e0def4]">
          和宮
        </div>
        <div className="text-[10px] uppercase tracking-[0.42em] text-[#907aa9]/85">
          Booting portfolio
        </div>
        <div className="mt-3 h-[3px] w-44 overflow-hidden rounded-full bg-[#26233a]">
          <motion.div
            className="h-full w-1/3 bg-nobel-gold"
            initial={{ x: '-40%' }}
            animate={prefersReducedMotion ? { x: '0%' } : { x: '140%' }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
            style={{ backgroundColor: '#c4a7e7' }}
          />
        </div>
      </div>
    </motion.div>
  );
};
