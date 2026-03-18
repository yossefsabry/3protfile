/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Mail, Cpu, BrainCircuit } from 'lucide-react';
import { COLORS } from '../../styles/colors';

type HeroSectionProps = {
  onScrollTo: (id: string) => (event: React.MouseEvent) => void;
};

export const HeroSection = ({ onScrollTo }: HeroSectionProps) => (
  <header className="relative min-h-screen flex items-start lg:items-center justify-center overflow-hidden pt-28 sm:pt-32 lg:pt-36 pb-16">
    <div className="relative z-10 container mx-auto px-6">
      <div className="flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8 p-0.5 rounded-full bg-gradient-to-r from-nobel-gold/50 via-white/20 to-nobel-gold/50 backdrop-blur-xl"
        >
        {/*
          <div className="px-6 py-2 rounded-full bg-stone-900/40 dark:bg-stone-900/60 backdrop-blur-2xl border border-white/10">
            <span className="text-[10px] sm:text-xs tracking-[0.4em] uppercase font-black text-nobel-gold">
              Digital Architect &bull; AI Pioneer
            </span>
          </div>
        */}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="relative mb-12"
        >
          <h1 className="font-serif text-[clamp(3.5rem,10vw,9rem)] font-bold leading-[0.85] text-stone-700 dark:text-white tracking-tighter">
            Yossef Sabry
          </h1>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ delay: 1, duration: 1 }}
            className="h-px bg-gradient-to-r from-transparent via-nobel-gold to-transparent mt-4 opacity-50"
          />
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            <span className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-stone-900/10 dark:border-white/10 bg-stone-900/5 dark:bg-white/5 backdrop-blur-md text-xs sm:text-sm font-medium text-stone-600 dark:text-stone-400">
              <Cpu size={14} className="text-nobel-gold" /> Software Engineering
            </span>
            <span className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-stone-900/10 dark:border-white/10 bg-stone-900/5 dark:bg-white/5 backdrop-blur-md text-xs sm:text-sm font-medium text-stone-600 dark:text-stone-400">
              <BrainCircuit size={14} className="text-nobel-gold" /> AI / ML Systems
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="max-w-4xl mx-auto mb-16 relative"
        >
          <div className="absolute -inset-4 bg-gradient-to-b from-nobel-gold/5 to-transparent rounded-[2rem] blur-2xl -z-10" />
          <p className="text-xl sm:text-2xl md:text-3xl font-light leading-relaxed text-stone-700/90 dark:text-white/90">
            Software engineer focused on <span className="font-semibold text-nobel-gold">AI applications</span> and the systems that scale them. 
            I build data pipelines, model-serving stacks, and product-grade ML experiences. 
            <span className="block mt-4 italic opacity-90">Interested in AI architecture or real-world ML? Let's talk.</span>
          </p>
          
          <motion.div 
            className="mt-12 flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <a
              href="mailto:yossefsabry66@gmail.com"
              className="group flex items-center gap-3 px-8 py-4 rounded-none border border-nobel-gold/50 bg-stone-900/10 backdrop-blur-sm transition-all hover:bg-nobel-gold/10 hover:border-nobel-gold active:scale-95 shadow-2xl"
            >
              <span className="text-sm sm:text-base font-mono font-medium tracking-wider text-stone-700 dark:text-white">
                yossefsabry66@gmail.com
              </span>
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="flex justify-center"
        >
          <a 
            href="#about" 
            onClick={onScrollTo('about')} 
            className="group relative flex flex-col items-center gap-4 text-[10px] font-black tracking-[0.5em] text-stone-500 hover:text-nobel-gold transition-colors cursor-pointer"
          >
            <span className="uppercase">Initiate Sequence</span>
            <div className="w-12 h-20 rounded-full border-2 border-stone-200 dark:border-white/20 flex justify-center p-2 group-hover:border-nobel-gold transition-all">
              <motion.div 
                animate={{ y: [0, 24, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="w-1.5 h-1.5 rounded-full bg-nobel-gold shadow-[0_0_10px_#C5A059]"
                style={{ boxShadow: `0 0 10px #C5A059` }}
              />
            </div>
          </a>
        </motion.div>
      </div>
    </div>
  </header>
);
