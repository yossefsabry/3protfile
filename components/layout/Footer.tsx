/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

type FooterProps = {
  footerRef: React.RefObject<HTMLElement>;
};

export const Footer = ({ footerRef }: FooterProps) => (
  <footer
    ref={footerRef}
    className="relative z-10 border-t border-white/[0.06] bg-[#09090b] py-16"
  >
    <div className="container mx-auto flex max-w-6xl flex-col items-center justify-between gap-8 px-6 md:flex-row">
      <div>
        <p className="font-display text-lg font-bold text-white">Yossef Sabry</p>
        <p className="mt-1 text-sm text-white/30">Software Engineer & AI Builder</p>
      </div>

      <div className="flex items-center gap-6 text-sm text-white/30">
        <a
          href="https://github.com/yossefsabry"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors hover:text-white/60"
        >
          GitHub
        </a>
        <a
          href="mailto:yossefsabry66@gmail.com"
          className="transition-colors hover:text-white/60"
        >
          Email
        </a>
        <a
          href="https://0xyon3.netlify.app"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors hover:text-white/60"
        >
          Blog
        </a>
      </div>
    </div>
  </footer>
);
