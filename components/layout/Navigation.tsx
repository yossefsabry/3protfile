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
  <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-[#191724]/78 backdrop-blur-xl shadow-[0_16px_60px_rgba(11,10,17,0.46)] py-3' : 'bg-transparent py-6'}`}>
    <div className="container mx-auto px-6 flex justify-between items-center">
      <div className="flex items-center gap-4 cursor-pointer group" onClick={onScrollTop}>
        <div className="flex items-center justify-center transition-transform group-hover:scale-110">
          <span className="font-serif text-3xl leading-none text-[#f6c177]">和宮</span>
        </div>
        <div className="mx-1 h-4 w-px bg-[#907aa9]/24"></div>
        <span className={`font-sans font-black text-sm tracking-[0.5em] uppercase text-[#e0def4] transition-all ${scrolled ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 md:opacity-100 md:translate-x-0'}`}>
          YON3
        </span>
      </div>

      <div className="hidden md:flex items-center gap-8 text-xs font-bold tracking-[0.2em] text-[#e0def4]/88">
        <a href="#about" onClick={onScrollTo('about')} className="cursor-pointer uppercase transition-colors hover:text-[#f6c177]">About</a>
        <a href="#projects" onClick={onScrollTo('projects')} className="cursor-pointer uppercase transition-colors hover:text-[#f6c177]">Projects</a>
        <a href="#contact" onClick={onScrollTo('contact')} className="cursor-pointer uppercase transition-colors hover:text-[#f6c177]">Contact</a>

        <div className="mx-2 h-6 w-[1px] bg-[#907aa9]/20"></div>

        <AudioMenuButton
          isAudioPlaying={isAudioPlaying}
          onToggleAudio={onToggleAudio}
          tracks={tracks}
          activeTrackId={activeTrackId}
          onSelectTrack={onSelectTrack}
          buttonClassName="rounded-xl border border-[#907aa9]/30 bg-[#c4a7e7]/10 p-2.5 text-[#e0def4] shadow-sm transition-all hover:bg-[#c4a7e7]/16 active:scale-95"
          iconSize={18}
        />

        <a
          href="/cv.html"
          className="cursor-pointer rounded-xl border border-[#f6c177]/45 px-6 py-2.5 text-[#f6e7ca] transition-all hover:bg-[#f6c177]/10 hover:shadow-md active:scale-95"
        >
          VIEW CV
        </a>

        <a
          href="https://github.com/yossefsabry"
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-pointer rounded-xl bg-[#56949f] px-6 py-2.5 text-[#191724] shadow-md transition-all hover:bg-[#6baab5] hover:shadow-xl active:scale-95"
        >
          VIEW GITHUB
        </a>
      </div>

      <div className="md:hidden flex items-center gap-4">
        <AudioMenuButton
          isAudioPlaying={isAudioPlaying}
          onToggleAudio={onToggleAudio}
          tracks={tracks}
          activeTrackId={activeTrackId}
          onSelectTrack={onSelectTrack}
          buttonClassName="rounded-lg border border-[#907aa9]/30 bg-[#c4a7e7]/10 p-2 text-[#e0def4]"
          iconSize={20}
        />
        <button className="rounded-lg bg-[#56949f] p-2 text-[#191724]" onClick={onToggleMenu}>
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
    </div>
  </nav>
);
