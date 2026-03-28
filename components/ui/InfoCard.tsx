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
      <h3 className="mb-3 text-center font-serif text-2xl text-[#f6f2ff]">{title}</h3>
      <div className="mb-4 h-0.5 w-12 bg-[#907aa9] opacity-80"></div>
      <p className="text-center text-xs font-bold uppercase leading-relaxed tracking-widest text-[#e0def4]/72">{detail}</p>
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="matrix-panel flex w-full max-w-xs flex-col items-center rounded-xl p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[#c4a7e7]/40 hover:shadow-[0_30px_80px_rgba(11,10,17,0.38)]"
        style={{ animationDelay: delay }}
        {...animationProps}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.div
      className="matrix-panel flex w-full max-w-xs flex-col items-center rounded-xl p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[#c4a7e7]/40 hover:shadow-[0_30px_80px_rgba(11,10,17,0.38)]"
      style={{ animationDelay: delay }}
      {...animationProps}
    >
      {content}
    </motion.div>
  );
});
