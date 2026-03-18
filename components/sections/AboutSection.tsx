/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'framer-motion';

export const AboutSection = () => (
  <section id="about" className="relative py-32 md:py-48 overflow-hidden bg-rose-dawn-base/40 dark:bg-rose-base/20 backdrop-blur-sm transition-colors duration-500">
    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-rose-gold/20 to-transparent" />
    
    <div className="container mx-auto px-6 md:px-12 relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-5"
        >
          <div className="text-[10px] font-black tracking-[0.4em] text-rose-gold uppercase mb-8">
            About
          </div>
          <div className="relative inline-block mb-8">
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.1] text-rose-dawn-text dark:text-rose-text tracking-tight">
              Architecting systems that don't just work, but <span className="text-rose-gold italic">excel</span> under pressure
            </h2>
            <div className="mt-6 h-1 w-24 bg-rose-gold opacity-40" />
          </div>
          <p className="text-base sm:text-lg text-rose-dawn-subtle dark:text-rose-subtle italic font-serif leading-relaxed opacity-70">
            "try be smarter"
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-7 pt-2"
        >
          <div className="space-y-8 text-lg sm:text-xl text-rose-dawn-text dark:text-rose-text leading-relaxed font-light">
            <p>
              <span className="text-5xl sm:text-6xl float-left mr-5 mt-1 font-serif text-rose-gold font-bold leading-[0.5]">I</span>
              am Yossef from Egypt. I build ambitious software across AI, systems, complex backends, and graphics.
            </p>
            <p className="opacity-80">
              I enjoy building complex systems ;)
            </p>
            
            <div className="pt-6">
              <div className="p-6 rounded-none border border-rose-muted/20 bg-rose-base/5 dark:bg-rose-text/5 backdrop-blur-sm">
                <h3 className="font-sans font-bold text-sm uppercase tracking-[0.2em] mb-3 text-rose-dawn-text dark:text-rose-text">
                  Current focus:
                </h3>
                <p className="text-base sm:text-lg text-rose-dawn-subtle dark:text-rose-subtle">
                  AI-powered tools, system-level experiments.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);
