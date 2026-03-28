/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Cpu, BrainCircuit } from 'lucide-react';

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
          className="mb-8 rounded-full bg-gradient-to-r from-[#b4637a]/40 via-[#c4a7e7]/18 to-[#f6c177]/40 p-0.5 backdrop-blur-xl"
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
          <div className="matrix-panel rounded-[2rem] px-6 py-5 sm:px-10 sm:py-8">
            <h1 className="font-display text-[clamp(2.75rem,7.5vw,6rem)] font-bold leading-[0.9] tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-[#f6f2ff] via-[#e0def4] to-[#c4a7e7] drop-shadow-[0_0_15px_rgba(196,167,231,0.2)]">
              Yossef Sabry
            </h1>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ delay: 1, duration: 1 }}
              className="matrix-line mt-4 h-px opacity-80"
            />
            <div className="flex flex-wrap justify-center gap-3 mt-6">
              <span className="flex items-center gap-2 rounded-full border border-[#907aa9]/26 bg-[#c4a7e7]/10 px-4 py-1.5 text-xs font-medium text-[#e0def4] sm:text-sm">
                <Cpu size={14} className="text-[#c4a7e7]" /> Software Engineering
              </span>
              <span className="flex items-center gap-2 rounded-full border border-[#907aa9]/26 bg-[#c4a7e7]/10 px-4 py-1.5 text-xs font-medium text-[#e0def4] sm:text-sm">
                <BrainCircuit size={14} className="text-[#c4a7e7]" /> AI / ML Systems
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="max-w-4xl mx-auto mb-16 relative"
        >
          <div className="matrix-panel rounded-[1.5rem] px-6 py-6 sm:px-10 sm:py-8">
            <p className="text-lg font-light leading-relaxed text-[#f6f2ff]/92 sm:text-xl md:text-2xl">
              Software engineer focused on <span className="font-semibold text-[#c4a7e7]">AI applications</span> and the systems that scale them.
              I build data pipelines, model-serving stacks, and product-grade ML experiences.
              <span className="mt-4 block italic text-[#e0def4]/74">Interested in AI architecture or real-world ML? Let's talk.</span>
            </p>

            <motion.div
              className="mt-8 flex justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <a
                href="mailto:yossefsabry66@gmail.com"
                className="group flex items-center gap-3 border border-[#907aa9]/26 bg-[#c4a7e7]/10 px-8 py-4 font-mono transition-all hover:border-[#c4a7e7] hover:bg-[#c4a7e7]/14 active:scale-95"
              >
                <Mail size={16} className="text-[#c4a7e7]" />
                <span className="text-sm font-medium tracking-[0.18em] text-[#f6f2ff] sm:text-base">
                  yossefsabry66@gmail.com
                </span>
              </a>
            </motion.div>
          </div>
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
            className="group relative flex cursor-pointer flex-col items-center gap-4 text-[10px] font-black tracking-[0.5em] text-[#e0def4]/70 transition-colors hover:text-[#c4a7e7]"
          >
            <span className="uppercase">Initiate Sequence</span>
            <div className="flex h-20 w-12 justify-center rounded-full border-2 border-[#907aa9]/28 p-2 transition-all group-hover:border-[#c4a7e7]">
              <motion.div
                animate={{ y: [0, 24, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="h-1.5 w-1.5 rounded-full bg-[#c4a7e7] shadow-[0_0_12px_rgba(196,167,231,0.72)]"
              />
            </div>
          </a>
        </motion.div>
      </div>
    </div>
  </header>
);
