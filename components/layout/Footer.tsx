/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

type FooterProps = {
  footerRef: React.RefObject<HTMLElement>;
};

export const Footer = ({ footerRef }: FooterProps) => (
  <footer ref={footerRef} className="relative z-10 border-t border-[#907aa9]/22 bg-[#191724]/96 py-24 text-[#e0def4]/62">
    <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-16">
      <div className="md:col-span-2">
        <div className="mb-6 font-serif text-3xl font-bold text-[#f6f2ff]">YON3</div>
        <p className="text-lg max-w-md mb-8 font-light">TECH GEEK building ambitious software across AI, systems, and expressive UI.</p>
        <div className="flex gap-6">
          <a href="https://github.com/yossefsabry" target="_blank" rel="noopener noreferrer" className="font-bold text-xs uppercase tracking-widest transition-colors hover:text-[#f6c177]">GitHub</a>
          <a href="https://yossefsabry.me" target="_blank" rel="noopener noreferrer" className="font-bold text-xs uppercase tracking-widest transition-colors hover:text-[#f6c177]">Website</a>
        </div>
      </div>
      <div className="flex flex-col justify-end text-xs font-mono space-y-2">
        <div className="text-[#907aa9]">CONTACT:</div>
        <p>yossefsabry66@gmail.com</p>
        <p className="text-[#6e6a86]">EGYPT &middot; TECH GEEK &middot; YON3</p>
      </div>
    </div>
  </footer>
);
