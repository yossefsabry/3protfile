/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { STACK } from './focusData';

export const PerformanceMetricDiagram = memo(() => (
  <div className="flex flex-col gap-6 sm:gap-8 items-center p-6 sm:p-8 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 rounded-xl my-6 sm:my-8 border border-stone-200 dark:border-stone-800 shadow-lg transition-colors">
    <div className="text-center">
      <h3 className="font-serif text-xl sm:text-2xl mb-2 text-stone-900 dark:text-stone-100">Stack & Tools</h3>
      <p className="text-stone-500 dark:text-stone-400 text-sm">Built for speed, clarity, and flexibility.</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 w-full">
      {STACK.map((group, index) => (
        <motion.div
          key={group.title}
          className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950/40 p-5 sm:p-6"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.05 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="text-sm uppercase tracking-[0.3em] text-stone-500 dark:text-stone-400 mb-3">
            {group.title}
          </div>
          <div className="flex flex-wrap gap-2">
            {group.items.map((item) => (
              <span
                key={`${group.title}-${item}`}
                className="px-3 py-1 text-[11px] rounded-full bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-300"
              >
                {item}
              </span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  </div>
));
