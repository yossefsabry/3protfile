/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

type HeroSectionProps = {
  onScrollTo: (id: string) => (event: React.MouseEvent) => void;
  reducedMotion?: boolean;
  sectionRef?: React.Ref<HTMLElement>;
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export const HeroSection = ({
  onScrollTo,
  reducedMotion = false,
  sectionRef,
}: HeroSectionProps) => (
  <header
    ref={sectionRef}
    id="hero"
    className="relative flex min-h-[100dvh] items-center justify-center"
  >
    {/* Subtle grid pattern */}
    <div
      className="pointer-events-none absolute inset-0 opacity-[0.03]"
      style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
        backgroundSize: '64px 64px',
      }}
    />

    <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
      {/* Status badge */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0}
        className="mb-8"
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-white/60 backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          Available for work
        </span>
      </motion.div>

      {/* Headline */}
      <motion.h1
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0.1}
        className="font-display text-[clamp(2.5rem,7vw,5.5rem)] font-bold leading-[1.05] tracking-tight text-white"
      >
        Software Engineer
        <br />
        <span className="bg-gradient-to-r from-[#c4a7e7] to-[#56949f] bg-clip-text text-transparent">
          & AI Builder
        </span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0.2}
        className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/50 sm:text-xl"
      >
        I build AI applications, data pipelines, and model-serving stacks.
        Focused on systems that scale with precision and ship with quality.
      </motion.p>

      {/* CTAs */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0.3}
        className="mt-10 flex flex-wrap items-center justify-center gap-4"
      >
        <a
          href="#projects"
          onClick={onScrollTo('projects')}
          className="group inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-medium text-[#09090b] transition-all hover:bg-white/90"
        >
          View Projects
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
        </a>
        <a
          href="#contact"
          onClick={onScrollTo('contact')}
          className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-6 py-3 text-sm text-white/70 transition-all hover:border-white/20 hover:text-white"
        >
          Get in Touch
        </a>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0.5}
        className="mt-24"
      >
        <a
          href="#about"
          onClick={onScrollTo('about')}
          className="inline-flex flex-col items-center gap-2 text-white/20 transition-colors hover:text-white/40"
        >
          <span className="text-[10px] font-medium uppercase tracking-[0.3em]">Scroll</span>
          <motion.div
            animate={reducedMotion ? {} : { y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg width="16" height="24" viewBox="0 0 16 24" fill="none" className="opacity-50">
              <rect x="1" y="1" width="14" height="22" rx="7" stroke="currentColor" strokeWidth="1.5" />
              <motion.circle
                cx="8"
                cy="8"
                r="2"
                fill="currentColor"
                animate={reducedMotion ? {} : { cy: [8, 14, 8] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
            </svg>
          </motion.div>
        </a>
      </motion.div>
    </div>
  </header>
);
