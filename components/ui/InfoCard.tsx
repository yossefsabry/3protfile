/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { memo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

type InfoCardProps = {
  title: string;
  detail: string;
  href?: string;
  delay: string;
};

export const InfoCard = memo(({ title, detail, href, delay }: InfoCardProps) => {
  const prefersReducedMotion = useReducedMotion();
  const animationProps = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0.6, delay: parseFloat(delay) || 0 },
        viewport: { once: true, amount: 0.35 },
      };

  const content = (
    <>
      <h3 className="font-serif text-2xl text-stone-900 dark:text-stone-100 text-center mb-3">{title}</h3>
      <div className="w-12 h-0.5 bg-nobel-gold mb-4 opacity-60"></div>
      <p className="text-xs text-stone-500 dark:text-stone-400 font-bold uppercase tracking-widest text-center leading-relaxed">{detail}</p>
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col group animate-fade-in-up items-center p-8 bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 shadow-sm hover:shadow-md transition-all duration-300 w-full max-w-xs hover:border-nobel-gold/50"
        style={{ animationDelay: delay }}
        {...animationProps}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.div
      className="flex flex-col group animate-fade-in-up items-center p-8 bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 shadow-sm hover:shadow-md transition-all duration-300 w-full max-w-xs hover:border-nobel-gold/50"
      style={{ animationDelay: delay }}
      {...animationProps}
    >
      {content}
    </motion.div>
  );
});
