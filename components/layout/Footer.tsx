/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

type FooterProps = {
  footerRef: React.RefObject<HTMLElement>;
};

export const Footer = ({ footerRef }: FooterProps) => (
  <footer ref={footerRef} className="relative z-10 bg-stone-900 dark:bg-black text-stone-500 py-24 border-t border-stone-800">
    <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-16">
      <div className="md:col-span-2">
        <div className="text-white font-serif font-bold text-3xl mb-6">YON3</div>
        <p className="text-lg max-w-md mb-8 font-light">TECH GEEK building ambitious software across AI, systems, and expressive UI.</p>
        <div className="flex gap-6">
          <a href="https://github.com/yossefsabry" target="_blank" rel="noopener noreferrer" className="hover:text-nobel-gold transition-colors font-bold text-xs uppercase tracking-widest">GitHub</a>
          <a href="https://yossefsabry.me" target="_blank" rel="noopener noreferrer" className="hover:text-nobel-gold transition-colors font-bold text-xs uppercase tracking-widest">Website</a>
        </div>
      </div>
      <div className="flex flex-col justify-end text-xs font-mono space-y-2">
        <div className="text-stone-400">CONTACT:</div>
        <p>yossefsabry66@gmail.com</p>
        <p className="text-stone-700">EGYPT &middot; TECH GEEK &middot; YON3</p>
      </div>
    </div>
  </footer>
);
