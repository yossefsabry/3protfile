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
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.72, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

const studioNotes = [
  {
    label: 'Current desk',
    text: 'Model serving, product-grade ML, and backend systems.',
  },
  {
    label: 'Working style',
    text: 'Small teams, clear interfaces, fast demos, careful shipping.',
  },
  {
    label: 'Tools I reach for',
    text: 'TypeScript, Python, React, PyTorch, Docker, Linux.',
  },
];

export const HeroSection = ({
  onScrollTo,
  reducedMotion = false,
  sectionRef,
}: HeroSectionProps) => (
  <header
    ref={sectionRef}
    id="hero"
    className="relative isolate flex min-h-[100dvh] items-center overflow-hidden px-6 py-28 sm:py-32"
  >
    <div className="pointer-events-none absolute inset-0 -z-10 bg-[#080705]" />
    <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.16] [background-image:linear-gradient(rgba(248,244,234,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(248,244,234,0.1)_1px,transparent_1px)] [background-size:72px_72px]" />
    <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_18%,rgba(217,119,6,0.18),transparent_34%),radial-gradient(circle_at_82%_72%,rgba(16,185,129,0.13),transparent_34%)]" />
    <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.08] [background-image:linear-gradient(115deg,transparent_0%,rgba(255,255,255,0.18)_45%,transparent_48%)]" />

    <div className="mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.75fr)]">
      <div className="relative z-10">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
          className="mb-6 inline-flex items-center gap-3 rounded-full border border-amber-200/15 bg-amber-100/[0.04] px-4 py-2 text-xs font-medium uppercase tracking-[0.28em] text-amber-100/70 backdrop-blur-sm"
        >
          <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_18px_rgba(110,231,183,0.75)]" />
          Available for thoughtful work
        </motion.p>

        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.08}
          className="max-w-4xl font-display text-[clamp(3.4rem,8vw,7.8rem)] font-black leading-[0.86] tracking-[-0.08em] text-[#f8f4ea]"
        >
          I build software that makes AI useful.
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.16}
          className="mt-8 max-w-2xl text-lg leading-8 text-stone-300/75 sm:text-xl"
        >
          Egypt-based engineer turning messy ideas into shipped tools, data
          pipelines, and model-serving systems that people can actually depend
          on.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.24}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a
            href="#projects"
            onClick={onScrollTo('projects')}
            className="group inline-flex items-center gap-3 rounded-full bg-[#f8f4ea] px-6 py-3 text-sm font-semibold text-[#11100d] shadow-[0_18px_60px_rgba(248,244,234,0.16)] transition-all hover:-translate-y-0.5 hover:bg-white"
          >
            See the work
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#contact"
            onClick={onScrollTo('contact')}
            className="inline-flex items-center gap-3 rounded-full border border-stone-200/15 bg-stone-100/[0.04] px-6 py-3 text-sm font-medium text-stone-200/80 transition-all hover:border-stone-100/30 hover:text-white"
          >
            Start a conversation
          </a>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.34}
          className="mt-12 flex max-w-2xl flex-wrap gap-3 text-xs uppercase tracking-[0.22em] text-stone-500"
        >
          <span className="rounded-full border border-stone-200/10 px-3 py-2">AI tools</span>
          <span className="rounded-full border border-stone-200/10 px-3 py-2">Data systems</span>
          <span className="rounded-full border border-stone-200/10 px-3 py-2">Reliable backends</span>
        </motion.div>
      </div>

      <motion.aside
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0.28}
        className="relative hidden lg:block"
        aria-label="Studio notes"
      >
        <motion.div
          animate={reducedMotion ? {} : { y: [0, -8, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="relative rounded-[2rem] border border-stone-200/12 bg-[#15120d]/72 p-5 shadow-[0_34px_120px_rgba(0,0,0,0.42)] backdrop-blur-xl"
        >
          <div className="absolute -left-8 top-10 h-28 w-3 rounded-full bg-amber-300/70 shadow-[0_0_30px_rgba(252,211,77,0.45)]" />
          <div className="absolute -right-5 bottom-16 h-20 w-20 rounded-full border border-emerald-200/20" />
          <div className="mb-5 flex items-center justify-between border-b border-stone-200/10 pb-4">
            <p className="font-display text-xl font-bold text-[#f8f4ea]">desk notes</p>
            <p className="text-[10px] uppercase tracking-[0.32em] text-stone-500">Y/S 04</p>
          </div>

          <div className="space-y-4">
            {studioNotes.map((note, index) => (
              <motion.div
                key={note.label}
                whileHover={{ rotate: index === 1 ? -1.2 : 1.2, y: -4 }}
                className={`rounded-2xl border p-5 ${
                  index === 0
                    ? 'border-amber-200/15 bg-amber-100/[0.06]'
                    : 'border-stone-200/10 bg-stone-50/[0.035]'
                }`}
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-amber-100/55">
                  {note.label}
                </p>
                <p className="mt-3 text-sm leading-6 text-stone-200/78">{note.text}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-5 grid grid-cols-[1fr_auto] items-end gap-5 rounded-2xl border border-emerald-200/15 bg-emerald-300/[0.045] p-5">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-emerald-100/55">
                Signal
              </p>
              <p className="mt-3 text-sm leading-6 text-stone-200/78">
                Designing systems with sharp edges hidden from users.
              </p>
            </div>
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-emerald-100/20 text-xs font-bold text-emerald-100/80">
              ship
            </div>
          </div>
        </motion.div>
      </motion.aside>

      <motion.a
        href="#about"
        onClick={onScrollTo('about')}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0.44}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-stone-500 transition-colors hover:text-stone-300 md:flex"
      >
        <span className="text-[10px] font-medium uppercase tracking-[0.32em]">Scroll</span>
        <motion.span
          animate={reducedMotion ? {} : { y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="h-8 w-px bg-gradient-to-b from-stone-400/60 to-transparent"
        />
      </motion.a>
    </div>
  </header>
);
