/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { AudioMenuButton } from '../ui/AudioMenuButton';
import type { MusicTrack } from '../../data/audio';

type NavigationProps = {
  scrolled: boolean;
  menuOpen: boolean;
  theme: 'light' | 'dark';
  isThemeTransitioning: boolean;
  isLoading: boolean;
  isAudioPlaying: boolean;
  tracks: MusicTrack[];
  activeTrackId: string;
  onSelectTrack: (trackId: string) => void;
  onToggleTheme: () => void;
  onToggleAudio: () => void;
  onToggleMenu: () => void;
  onScrollTop: () => void;
  onScrollTo: (id: string) => (event: React.MouseEvent) => void;
};

export const Navigation = ({
  scrolled,
  menuOpen,
  theme,
  isThemeTransitioning,
  isLoading,
  isAudioPlaying,
  tracks,
  activeTrackId,
  onSelectTrack,
  onToggleTheme,
  onToggleAudio,
  onToggleMenu,
  onScrollTop,
  onScrollTo,
}: NavigationProps) => (
  <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-white/80 dark:bg-nobel-dark/80 backdrop-blur-xl shadow-lg py-3' : 'bg-transparent py-6'}`}>
    <div className="container mx-auto px-6 flex justify-between items-center">
      <div className="flex items-center gap-4 cursor-pointer group" onClick={onScrollTop}>
        <div className="w-10 h-10 bg-nobel-gold rounded-xl flex items-center justify-center text-white font-serif font-bold text-2xl shadow-lg transition-transform group-hover:scale-110 pb-1">Y</div>
        <span className={`font-serif font-bold text-xl tracking-wider transition-all ${scrolled ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 md:opacity-100 md:translate-x-0 dark:text-white'}`}>
          YON3
        </span>
      </div>

      <div className="hidden md:flex items-center gap-8 text-xs font-bold tracking-[0.2em] text-stone-600 dark:text-stone-400">
        <a href="#about" onClick={onScrollTo('about')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">About</a>
        <a href="#projects" onClick={onScrollTo('projects')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Projects</a>
        <a href="#contact" onClick={onScrollTo('contact')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Contact</a>

        <div className="w-[1px] h-6 bg-stone-200 dark:bg-stone-800 mx-2"></div>

        <button
          onClick={onToggleTheme}
          disabled={isThemeTransitioning || isLoading}
          className="p-2.5 rounded-xl bg-stone-100 dark:bg-stone-900 hover:bg-stone-200 dark:hover:bg-stone-800 transition-all text-stone-900 dark:text-stone-100 shadow-sm active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
          aria-label="Toggle Theme"
        >
          {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
        </button>

        <AudioMenuButton
          isAudioPlaying={isAudioPlaying}
          onToggleAudio={onToggleAudio}
          tracks={tracks}
          activeTrackId={activeTrackId}
          onSelectTrack={onSelectTrack}
          buttonClassName="p-2.5 rounded-xl bg-stone-100 dark:bg-stone-900 hover:bg-stone-200 dark:hover:bg-stone-800 transition-all text-stone-900 dark:text-stone-100 shadow-sm active:scale-95"
          iconSize={18}
        />

        <a
          href="https://github.com/yossefsabry"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-2.5 bg-stone-900 dark:bg-white dark:text-stone-900 text-white rounded-xl hover:bg-stone-800 dark:hover:bg-stone-100 transition-all shadow-md hover:shadow-xl active:scale-95 cursor-pointer"
        >
          VIEW GITHUB
        </a>
      </div>

      <div className="md:hidden flex items-center gap-4">
        <button
          onClick={onToggleTheme}
          disabled={isThemeTransitioning || isLoading}
          className="p-2 rounded-lg bg-stone-100 dark:bg-stone-900 text-stone-900 dark:text-stone-100 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
        <AudioMenuButton
          isAudioPlaying={isAudioPlaying}
          onToggleAudio={onToggleAudio}
          tracks={tracks}
          activeTrackId={activeTrackId}
          onSelectTrack={onSelectTrack}
          buttonClassName="p-2 rounded-lg bg-stone-100 dark:bg-stone-900 text-stone-900 dark:text-stone-100"
          iconSize={20}
        />
        <button className="p-2 rounded-lg bg-stone-900 dark:bg-white text-white dark:text-stone-900" onClick={onToggleMenu}>
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
    </div>
  </nav>
);
