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
        className="fixed inset-0 z-40 bg-white dark:bg-nobel-dark flex flex-col items-center justify-center gap-8 text-2xl font-serif"
      >
        <a href="#about" onClick={onScrollTo('about')} className="hover:text-nobel-gold transition-colors dark:text-white">About</a>
        <a href="#projects" onClick={onScrollTo('projects')} className="hover:text-nobel-gold transition-colors dark:text-white">Projects</a>
        <a href="#focus" onClick={onScrollTo('focus')} className="hover:text-nobel-gold transition-colors dark:text-white">Focus</a>
        <a href="#contact" onClick={onScrollTo('contact')} className="hover:text-nobel-gold transition-colors dark:text-white">Contact</a>
        <a
          href="https://github.com/yossefsabry"
          target="_blank"
          rel="noopener noreferrer"
          className="px-8 py-3 bg-stone-900 dark:bg-white dark:text-stone-900 text-white rounded-xl shadow-lg"
        >
          View GitHub
        </a>
        <button onClick={onClose} className="mt-8 p-4 rounded-full border border-stone-200 dark:border-stone-800 text-stone-400">
          <X size={32} />
        </button>
      </motion.div>
    )}
  </AnimatePresence>
);
