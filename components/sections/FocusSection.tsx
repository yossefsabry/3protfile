/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { TransformerDecoderDiagram } from '../Diagrams';

export const FocusSection = () => (
  <section id="focus" className="py-24 md:py-32 bg-stone-900/70 dark:bg-black/70 text-white overflow-hidden relative">
    <div className="container mx-auto px-6 relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24 items-center">
        <div className="order-2 lg:order-1 lg:scale-110">
          <TransformerDecoderDiagram />
        </div>
        <div className="order-1 lg:order-2">
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-stone-800 text-nobel-gold text-xs font-black tracking-widest uppercase rounded-2xl mb-8 border border-stone-700 shadow-xl">
            FOCUS
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl mb-8 leading-tight">Precision, speed,<br />and clean systems</h2>
          <p className="text-lg md:text-xl text-stone-600 dark:text-stone-400 leading-relaxed font-light mb-8">
            I like systems that feel deliberate: tight UI, strong architecture, and experiments that actually ship.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            <div className="border-l-2 border-nobel-gold pl-6">
              <div className="text-3xl font-serif mb-1">70+</div>
              <div className="text-xs text-stone-500 dark:text-stone-500 uppercase font-bold tracking-widest">Public Repos</div>
            </div>
            <div className="border-l-2 border-nobel-gold pl-6">
              <div className="text-3xl font-serif mb-1">AI + C</div>
              <div className="text-xs text-stone-500 dark:text-stone-500 uppercase font-bold tracking-widest">Hybrid Focus</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);
