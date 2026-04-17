/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Menu, X } from 'lucide-react';
import { AudioMenuButton } from '../ui/AudioMenuButton';
import type { MusicTrack } from '../../data/audio';

type NavigationProps = {
  scrolled: boolean;
  menuOpen: boolean;
  isLoading: boolean;
  isAudioPlaying: boolean;
  tracks: MusicTrack[];
  activeTrackId: string;
  onSelectTrack: (trackId: string) => void;
  onToggleAudio: () => void;
  onToggleMenu: () => void;
  onScrollTop: () => void;
  onScrollTo: (id: string) => (event: React.MouseEvent) => void;
  theme?: 'light' | 'dark';
};

export const Navigation = ({
  scrolled,
  menuOpen,
  isLoading,
  isAudioPlaying,
  tracks,
  activeTrackId,
  onSelectTrack,
  onToggleAudio,
  onToggleMenu,
  onScrollTop,
  onScrollTo,
}: NavigationProps) => (
  <nav
    className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled
        ? 'border-b border-white/[0.06] bg-[#09090b]/80 backdrop-blur-xl py-4'
        : 'bg-transparent py-6'
    }`}
  >
    <div className="container mx-auto flex max-w-6xl items-center justify-between px-6">
      {/* Logo */}
      <div className="flex cursor-pointer items-center gap-3 group" onClick={onScrollTop}>
        <span className="font-display text-xl font-bold tracking-tight text-white transition-colors group-hover:text-[#c4a7e7]">
          Yossef Sabry
        </span>
      </div>

      {/* Desktop nav */}
      <div className="hidden items-center gap-8 md:flex">
        <a href="#about" onClick={onScrollTo('about')} className="text-sm text-white/60 transition-colors hover:text-white">
          About
        </a>
        <a href="#projects" onClick={onScrollTo('projects')} className="text-sm text-white/60 transition-colors hover:text-white">
          Projects
        </a>
        <a href="#contact" onClick={onScrollTo('contact')} className="text-sm text-white/60 transition-colors hover:text-white">
          Contact
        </a>

        <div className="h-4 w-px bg-white/10" />

        <AudioMenuButton
          isAudioPlaying={isAudioPlaying}
          onToggleAudio={onToggleAudio}
          tracks={tracks}
          activeTrackId={activeTrackId}
          onSelectTrack={onSelectTrack}
          buttonClassName="rounded-lg border border-white/10 bg-white/5 p-2 text-white/60 transition-all hover:bg-white/10 hover:text-white"
          iconSize={16}
        />

        <a
          href="/cv.html"
          className="rounded-lg border border-white/10 px-4 py-2 text-sm text-white/70 transition-all hover:border-white/20 hover:text-white"
        >
          CV
        </a>

        <a
          href="https://github.com/yossefsabry"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-[#09090b] transition-all hover:bg-white/90"
        >
          GitHub
        </a>
      </div>

      {/* Mobile controls */}
      <div className="flex items-center gap-3 md:hidden">
        <AudioMenuButton
          isAudioPlaying={isAudioPlaying}
          onToggleAudio={onToggleAudio}
          tracks={tracks}
          activeTrackId={activeTrackId}
          onSelectTrack={onSelectTrack}
          buttonClassName="rounded-lg border border-white/10 bg-white/5 p-2 text-white/60"
          iconSize={18}
        />
        <button
          className="rounded-lg border border-white/10 bg-white/5 p-2 text-white/60"
          onClick={onToggleMenu}
        >
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>
    </div>
  </nav>
);
