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
  <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-rose-dawn-base/80 dark:bg-rose-base/80 backdrop-blur-xl shadow-lg py-3' : 'bg-transparent py-6'}`}>
    <div className="container mx-auto px-6 flex justify-between items-center">
      <div className="flex items-center gap-4 cursor-pointer group" onClick={onScrollTop}>
        <div className="flex items-center justify-center transition-transform group-hover:scale-110">
          <span className="font-serif text-3xl text-rose-gold leading-none">和宮</span>
        </div>
        <div className="h-4 w-px bg-rose-muted/40 mx-1"></div>
        <span className={`font-sans font-black text-sm tracking-[0.5em] uppercase transition-all ${scrolled ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 md:opacity-100 md:translate-x-0 text-rose-dawn-text dark:text-rose-text'}`}>
          YON3
        </span>
      </div>

      <div className="hidden md:flex items-center gap-8 text-xs font-bold tracking-[0.2em] text-rose-dawn-subtle dark:text-rose-text">
        <a href="#about" onClick={onScrollTo('about')} className="hover:text-rose-gold transition-colors cursor-pointer uppercase">About</a>
        <a href="#projects" onClick={onScrollTo('projects')} className="hover:text-rose-gold transition-colors cursor-pointer uppercase">Projects</a>
        <a href="#contact" onClick={onScrollTo('contact')} className="hover:text-rose-gold transition-colors cursor-pointer uppercase">Contact</a>

        <div className="w-[1px] h-6 bg-rose-dawn-overlay dark:bg-rose-overlay mx-2"></div>

        <button
          onClick={onToggleTheme}
          disabled={isThemeTransitioning || isLoading}
          className="p-2.5 rounded-xl bg-rose-dawn-surface dark:bg-rose-surface hover:bg-rose-dawn-overlay dark:hover:bg-rose-overlay transition-all text-rose-dawn-text dark:text-rose-text shadow-sm active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
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
          buttonClassName="p-2.5 rounded-xl bg-rose-dawn-surface dark:bg-rose-surface hover:bg-rose-dawn-overlay dark:hover:bg-rose-overlay transition-all text-rose-dawn-text dark:text-rose-text shadow-sm active:scale-95"
          iconSize={18}
        />

        <a
          href="/cv.html"
          className="px-6 py-2.5 border border-rose-gold/70 text-rose-dawn-text dark:text-rose-text rounded-xl hover:bg-rose-gold/10 transition-all shadow-sm hover:shadow-md active:scale-95 cursor-pointer"
        >
          VIEW CV
        </a>

        <a
          href="https://github.com/yossefsabry"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-2.5 bg-rose-dawn-text dark:bg-rose-text dark:text-rose-base text-rose-dawn-base rounded-xl hover:bg-rose-dawn-subtle dark:hover:bg-rose-dawn-overlay transition-all shadow-md hover:shadow-xl active:scale-95 cursor-pointer"
        >
          VIEW GITHUB
        </a>
      </div>

      <div className="md:hidden flex items-center gap-4">
        <button
          onClick={onToggleTheme}
          disabled={isThemeTransitioning || isLoading}
          className="p-2 rounded-lg bg-rose-dawn-surface dark:bg-rose-surface text-rose-dawn-text dark:text-rose-text disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
        <AudioMenuButton
          isAudioPlaying={isAudioPlaying}
          onToggleAudio={onToggleAudio}
          tracks={tracks}
          activeTrackId={activeTrackId}
          onSelectTrack={onSelectTrack}
          buttonClassName="p-2 rounded-lg bg-rose-dawn-surface dark:bg-rose-surface text-rose-dawn-text dark:text-rose-text"
          iconSize={20}
        />
        <button className="p-2 rounded-lg bg-rose-dawn-text dark:bg-rose-text text-rose-dawn-base dark:text-rose-base" onClick={onToggleMenu}>
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
    </div>
  </nav>
);
