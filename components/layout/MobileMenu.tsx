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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-[#09090b]/98 backdrop-blur-xl"
      >
        <a href="#about" onClick={onScrollTo('about')} className="text-2xl font-light text-white/80 transition-colors hover:text-white">
          About
        </a>
        <a href="#projects" onClick={onScrollTo('projects')} className="text-2xl font-light text-white/80 transition-colors hover:text-white">
          Projects
        </a>
        <a href="#contact" onClick={onScrollTo('contact')} className="text-2xl font-light text-white/80 transition-colors hover:text-white">
          Contact
        </a>

        <div className="mt-4 flex gap-4">
          <a
            href="/cv.html"
            className="rounded-lg border border-white/10 px-6 py-3 text-sm text-white/70 transition-all hover:border-white/20 hover:text-white"
          >
            View CV
          </a>
          <a
            href="https://github.com/yossefsabry"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-white px-6 py-3 text-sm font-medium text-[#09090b]"
          >
            GitHub
          </a>
        </div>

        <button
          onClick={onClose}
          className="mt-8 rounded-full border border-white/10 p-3 text-white/50 transition-colors hover:text-white"
        >
          <X size={24} />
        </button>
      </motion.div>
    )}
  </AnimatePresence>
);
