/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';

type MobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
  onScrollTo: (id: string) => (event: React.MouseEvent) => void;
};

export const MobileMenu = ({ isOpen, onClose, onScrollTo }: MobileMenuProps) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-[#000000]/95 text-2xl font-display text-[#f6f2ff]"
      >
        <a href="#about" onClick={onScrollTo('about')} className="transition-colors hover:text-[#f6c177]">About</a>
        <a href="#projects" onClick={onScrollTo('projects')} className="transition-colors hover:text-[#f6c177]">Projects</a>
        <a href="#contact" onClick={onScrollTo('contact')} className="transition-colors hover:text-[#f6c177]">Contact</a>
        <a
          href="/cv.html"
          className="rounded-xl border border-[#f6c177]/45 px-8 py-3 text-[#f6e7ca] shadow-lg"
        >
          View CV
        </a>
        <a
          href="https://github.com/yossefsabry"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xl bg-[#56949f] px-8 py-3 text-[#000000] shadow-lg"
        >
          View GitHub
        </a>
        <button onClick={onClose} className="mt-8 rounded-full border border-[#907aa9]/24 p-4 text-[#e0def4]/72">
          <X size={32} />
        </button>
      </motion.div>
    )}
  </AnimatePresence>
);
