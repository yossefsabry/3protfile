/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'framer-motion';

export const AboutSection = () => (
  <section id="about" className="relative overflow-hidden py-32 md:py-48">
    <div className="matrix-line absolute left-0 top-0 h-px w-full" />
    
    <div className="container mx-auto px-6 md:px-12 relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
        <motion.div 
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="matrix-panel rounded-[2rem] p-8 lg:col-span-5"
        >
          <div className="mb-8 text-[10px] font-black uppercase tracking-[0.4em] text-[#c4a7e7]">
            About
          </div>
          <div className="relative inline-block mb-8">
            <h2 className="font-serif text-4xl leading-[1.1] tracking-tight text-[#f6f2ff] sm:text-5xl lg:text-6xl">
              Architecting systems that don't just work, but <span className="text-[#c4a7e7] italic">excel</span> under pressure
            </h2>
            <div className="mt-6 h-1 w-24 bg-[#907aa9]/70" />
          </div>
          <p className="font-serif text-base italic leading-relaxed text-[#e0def4]/66 sm:text-lg">
            "try be smarter"
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="matrix-panel rounded-[2rem] p-8 lg:col-span-7 lg:pt-10"
        >
          <div className="space-y-8 text-lg font-light leading-relaxed text-[#f6f2ff]/88 sm:text-xl">
            <p>
              <span className="float-left mr-5 mt-1 font-serif text-5xl font-bold leading-[0.5] text-[#c4a7e7] sm:text-6xl">I</span>
              am Yossef from Egypt. I build ambitious software across AI, systems, complex backends, and graphics.
            </p>
            <p className="opacity-80">
              I enjoy building complex systems ;)
            </p>
            
            <div className="pt-6">
              <div className="border border-[#907aa9]/24 bg-[#c4a7e7]/10 p-6">
                <h3 className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#f6c177]">
                  Current focus:
                </h3>
                <p className="text-base text-[#e0def4]/76 sm:text-lg">
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
