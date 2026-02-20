/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { InfoCard } from '../ui/InfoCard';

export const ContactSection = () => (
  <section id="contact" className="py-24 md:py-32 bg-white/50 dark:bg-black/20">
    <div className="container mx-auto px-6">
      <div className="text-center mb-12 md:mb-20">
        <h2 className="font-serif text-4xl sm:text-5xl mb-6 text-stone-900 dark:text-white">Contact & Links</h2>
        <p className="text-stone-500 dark:text-stone-400 text-lg">Find me and my work across the web.</p>
      </div>
      <div className="flex flex-col md:flex-row gap-10 justify-center items-stretch flex-wrap">
        <InfoCard title="GitHub" detail="github.com/yossefsabry" href="https://github.com/yossefsabry" delay="0s" />
        {/* comment for now because i gone use only one website for protfile */} 
        {/* <InfoCard title="Website" detail="yossefsabry.me" href="https://yossefsabry.me" delay="0.1s" /> */}
        <InfoCard title="Email" detail="yossefsabry66@gmail.com" href="https://mail.google.com/mail/?view=cm&to=yossefsabry66@gmail.com" delay="0.2s" />
        <InfoCard title="Notes & Blog" detail="0xyon3.netlify.app" href="https://0xyon3.netlify.app" delay="0.3s" />
      </div>
    </div>
  </section>
);
