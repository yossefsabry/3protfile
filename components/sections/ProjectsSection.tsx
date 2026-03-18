/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Sparkles, Zap, Terminal } from 'lucide-react';
import { SurfaceCodeDiagram } from '../Diagrams';

export const ProjectsSection = () => (
  <section id="projects" className="relative py-32 md:py-48 overflow-hidden bg-rose-dawn-base/30 dark:bg-rose-base/10 transition-colors duration-500">
    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-rose-gold/20 to-transparent" />
    
    <div className="container mx-auto px-6 relative">
      <div className="flex flex-col items-center gap-16 md:gap-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl text-center"
        >
          <div className="inline-flex items-center gap-3 px-5 py-2 bg-rose-dawn-surface/40 dark:bg-rose-surface/40 backdrop-blur-xl text-rose-gold text-[10px] font-black tracking-[0.4em] uppercase rounded-full mb-10 border border-rose-text/20 dark:border-rose-text/5 shadow-2xl">
            <Terminal size={14} /> System Logs: Projects
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl mb-10 text-rose-dawn-text dark:text-rose-text leading-[1.1]">
            Architecting the <span className="text-rose-gold italic">unconventional</span>
          </h2>
          <p className="text-xl md:text-2xl text-rose-dawn-text/90 dark:text-rose-text/90 mb-12 leading-relaxed font-light max-w-2xl mx-auto">
            These initiatives pushed the boundaries of systems engineering, AI orchestration, and performance-critical tooling.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <motion.div 
              whileHover={{ y: -5 }}
              className="p-6 rounded-3xl border border-rose-text/20 bg-rose-text/10 dark:bg-rose-text/5 backdrop-blur-md"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-rose-gold/20 flex items-center justify-center text-rose-gold">
                  <Sparkles size={18} />
                </div>
                <h3 className="font-bold uppercase tracking-widest text-xs">AI + Intelligence</h3>
              </div>
              <p className="text-sm text-rose-dawn-text/80 dark:text-rose-text/80">Models, tools, and infrastructure designed to scale with precision and intelligence.</p>
            </motion.div>
            <motion.div 
              whileHover={{ y: -5 }}
              className="p-6 rounded-3xl border border-rose-text/20 bg-rose-text/10 dark:bg-rose-text/5 backdrop-blur-md"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-rose-gold/20 flex items-center justify-center text-rose-gold">
                  <Zap size={18} />
                </div>
                <h3 className="font-bold uppercase tracking-widest text-xs">Systems + Speed</h3>
              </div>
              <p className="text-sm text-rose-dawn-text/80 dark:text-rose-text/80">High-performance kernels and UI systems built for sub-millisecond interaction loops.</p>
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
          <div className="absolute -inset-10 bg-rose-gold/5 blur-[100px] rounded-full -z-10 animate-pulse" />
          <div className="relative rounded-[3rem] overflow-hidden border border-rose-text/10 shadow-[0_50px_100px_rgba(0,0,0,0.2)]">
            <SurfaceCodeDiagram />
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);
