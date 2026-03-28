/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'framer-motion';
import React from 'react';
import { InfoCard } from '../ui/InfoCard';

export const ContactSection = () => (
  <section id="contact" className="py-24 md:py-32">
    <div className="container mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.7 }}
        className="matrix-panel mb-12 rounded-[2rem] px-8 py-10 text-center md:mb-20"
      >
        <h2 className="mb-6 font-serif text-4xl text-[#f6f2ff] sm:text-5xl">Contact & Links</h2>
        <p className="text-lg text-[#e0def4]/74">Find me and my work across the web.</p>
      </motion.div>
      <div className="flex flex-col md:flex-row gap-10 justify-center items-center md:items-stretch flex-wrap">
        <InfoCard title="GitHub" detail="github.com/yossefsabry" href="https://github.com/yossefsabry" delay="0s" />
        {/* comment for now because i gone use only one website for protfile */} 
        {/* <InfoCard title="Website" detail="yossefsabry.me" href="https://yossefsabry.me" delay="0.1s" /> */}
        <InfoCard title="Email" detail="yossefsabry66@gmail.com" href="https://mail.google.com/mail/?view=cm&to=yossefsabry66@gmail.com" delay="0.2s" />
        <InfoCard title="Notes & Blog" detail="0xyon3.netlify.app" href="https://0xyon3.netlify.app" delay="0.3s" />
      </div>
    </div>
  </section>
);
