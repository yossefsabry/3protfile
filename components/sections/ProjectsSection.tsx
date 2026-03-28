/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Zap, Terminal } from 'lucide-react';
import { SurfaceCodeDiagram } from '../Diagrams';

export const ProjectsSection = () => (
  <section id="projects" className="relative overflow-hidden py-24 md:py-36">
    <div className="matrix-line absolute left-0 top-0 h-px w-full" />

    <div className="container mx-auto px-6 relative">
      <div className="flex flex-col items-center gap-16 md:gap-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="matrix-panel max-w-4xl rounded-[1.5rem] px-6 py-8 text-center"
        >
          <div className="mb-10 inline-flex items-center gap-3 rounded-full border border-[#907aa9]/24 bg-[#c4a7e7]/10 px-5 py-2 text-[10px] font-black uppercase tracking-[0.4em] text-[#c4a7e7] shadow-2xl">
            <Terminal size={14} /> System Logs: Projects
          </div>
          <h2 className="mb-8 font-display text-3xl leading-[1.1] text-[#f6f2ff] sm:text-4xl md:text-5xl">
            Architecting the <span className="text-[#c4a7e7] italic">unconventional</span>
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-xl font-light leading-relaxed text-[#f6f2ff]/84 md:text-2xl">
            These initiatives pushed the boundaries of systems engineering, AI orchestration, and performance-critical tooling.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <motion.div
              whileHover={{ y: -5 }}
              className="rounded-3xl border border-[#907aa9]/24 bg-[#c4a7e7]/10 p-6"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#56949f]/12 text-[#56949f]">
                  <Sparkles size={18} />
                </div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-[#e0def4]">AI + Intelligence</h3>
              </div>
              <p className="text-sm text-[#e0def4]/74">Models, tools, and infrastructure designed to scale with precision and intelligence.</p>
            </motion.div>
            <motion.div
              whileHover={{ y: -5 }}
              className="rounded-3xl border border-[#907aa9]/24 bg-[#c4a7e7]/10 p-6"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#b4637a]/14 text-[#b4637a]">
                  <Zap size={18} />
                </div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-[#e0def4]">Systems + Speed</h3>
              </div>
              <p className="text-sm text-[#e0def4]/74">High-performance kernels and UI systems built for sub-millisecond interaction loops.</p>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative w-full max-w-[85rem]"
        >
          <div className="absolute -inset-10 -z-10 rounded-full bg-[#907aa9]/16 blur-[100px]" />
          <div className="relative overflow-hidden rounded-[3rem] border border-[#907aa9]/24 shadow-[0_50px_100px_rgba(11,10,17,0.4)]">
            <SurfaceCodeDiagram />
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);
