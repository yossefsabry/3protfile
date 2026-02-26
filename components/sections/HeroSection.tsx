/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

type HeroSectionProps = {
  onScrollTo: (id: string) => (event: React.MouseEvent) => void;
};

export const HeroSection = ({ onScrollTo }: HeroSectionProps) => (
  <header className="relative min-h-screen flex items-start lg:items-center justify-center overflow-hidden pt-28 sm:pt-32 lg:pt-36 pb-16">
    <div className="relative z-10 container mx-auto px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="inline-block mb-5 sm:mb-6 px-3 sm:px-4 py-1.5 border-2 border-nobel-gold text-nobel-gold text-[10px] sm:text-xs tracking-[0.25em] sm:tracking-[0.3em] uppercase font-black rounded-full backdrop-blur-md bg-white/60 dark:bg-black/40 drop-shadow-[0_2px_8px_rgba(0,0,0,0.2)]"
      >
        TECH GEEK &bull; EGYPT
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="font-serif text-[clamp(2.8rem,6vw,8.5rem)] font-bold leading-none mb-8 text-stone-950 dark:text-white tracking-tight drop-shadow-[0_6px_18px_rgba(0,0,0,0.35)]"
      >
        Yossef Sabry
        <span className="hero-scan-text italic font-light text-[clamp(1.05rem,2.2vw,3rem)] block w-fit mx-auto mt-5 sm:mt-6 tracking-normal drop-shadow-[0_3px_10px_rgba(0,0,0,0.25)] px-4 sm:px-5 py-2 rounded-full border border-white/60 dark:border-white/10 bg-white/70 dark:bg-black/40 backdrop-blur-md">Software Engineer | AI Engineer</span>
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="max-w-xl sm:max-w-2xl mx-auto mb-16 drop-shadow-[0_2px_10px_rgba(0,0,0,0.25)] bg-white/[0.02] dark:bg-black/[0.02] backdrop-blur-md border border-white/30 dark:border-white/10 rounded-3xl px-6 sm:px-8 py-5 sm:py-6 flex flex-col items-center gap-4"
      >
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-normal leading-relaxed text-stone-900 dark:text-stone-100">
          Software engineer focused on AI applications and the systems that scale them. I build data pipelines,
          model-serving stacks, and product-grade ML experiences.{' '}
          <span className="font-medium">Interested in AI architecture or real-world ML? Let's talk.</span>
        </p>
        <a
          href="mailto:yossefsabry66@gmail.com"
          className="inline-flex items-center gap-2 rounded-full border border-nobel-gold/50 bg-white/70 px-4 py-1.5 text-sm font-semibold text-stone-900 shadow-sm transition hover:border-nobel-gold hover:text-nobel-gold dark:border-nobel-gold/40 dark:bg-black/40 dark:text-stone-100"
        >
          yossefsabry66@gmail.com
        </a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="flex justify-center"
      >
        <a href="#about" onClick={onScrollTo('about')} className="group flex flex-col items-center gap-3 text-xs font-black tracking-[0.4em] text-stone-600 hover:text-nobel-gold transition-colors cursor-pointer">
          <span>EXPLORE</span>
          <span className="p-3 border-2 border-stone-300 dark:border-stone-800 rounded-2xl group-hover:border-nobel-gold transition-all bg-white/50 dark:bg-white/5 backdrop-blur-sm group-hover:-translate-y-1">
            <ArrowDown size={20} className="animate-bounce" />
          </span>
        </a>
      </motion.div>
    </div>
  </header>
);
