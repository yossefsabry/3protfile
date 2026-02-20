/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { FOCUS_AREAS } from './focusData';

export const TransformerDecoderDiagram = memo(() => (
  <div className="p-6 sm:p-8 lg:p-10 bg-stone-950/80 border border-stone-800 rounded-2xl shadow-2xl">
    <div className="flex items-center justify-between mb-8">
      <div>
        <h3 className="font-serif text-xl sm:text-2xl text-white">Focus Areas</h3>
        <p className="text-sm text-stone-400">Where I push for depth and polish.</p>
      </div>
      <div className="px-3 py-1 text-[10px] uppercase tracking-[0.4em] text-nobel-gold border border-stone-700 rounded-full">
        TECH GEEK
      </div>
    </div>
    <div className="grid gap-6">
      {FOCUS_AREAS.map((focus, index) => (
        <motion.div
          key={focus.title}
          className="rounded-xl border border-stone-800 bg-stone-900/60 p-5 sm:p-6"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.05 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="text-lg font-serif text-nobel-gold mb-2">{focus.title}</div>
          <div className="text-stone-300 text-sm mb-2">{focus.description}</div>
          <div className="text-stone-500 text-xs uppercase tracking-[0.2em]">{focus.detail}</div>
        </motion.div>
      ))}
    </div>
  </div>
));
