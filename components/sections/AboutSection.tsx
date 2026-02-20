/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

export const AboutSection = () => (
  <section id="about" className="py-24 md:py-32 bg-white/70 dark:bg-black/40 transition-colors duration-500">
    <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-16 items-start">
      <div className="md:col-span-5">
        <div className="inline-block mb-4 text-xs font-black tracking-[0.2em] text-nobel-gold uppercase">ABOUT</div>
        <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl mb-8 leading-tight text-stone-900 dark:text-white">Building hard things with taste</h2>
        <div className="w-24 h-1.5 bg-nobel-gold rounded-full mb-8"></div>
        <p className="text-stone-500 dark:text-stone-400 italic font-serif text-xl">
          "try be smarter"
        </p>
      </div>
      <div className="md:col-span-7 text-lg sm:text-xl text-stone-600 dark:text-stone-400 leading-relaxed space-y-6 md:space-y-8 font-light">
        <p>
          <span className="text-5xl sm:text-6xl md:text-7xl float-left mr-4 mt-[-4px] font-serif text-nobel-gold font-bold">I</span> am Yossef from Egypt. I build ambitious software across AI, systems, complex backends, and graphics.
        </p>
        <p>
          I enjoy building complex systems ;)
        </p>
        <div className="p-8 bg-stone-50 dark:bg-stone-900/40 rounded-3xl border border-stone-100 dark:border-stone-800">
          <p className="text-stone-900 dark:text-stone-100 font-medium mb-2">Current focus:</p>
          <p className="text-lg">AI-powered tools, system-level experiments.</p>
        </div>
      </div>
    </div>
  </section>
);
