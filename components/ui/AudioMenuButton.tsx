/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useId, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import type { MusicTrack } from '../../data/audio';

type AudioMenuButtonProps = {
  isAudioPlaying: boolean;
  onToggleAudio: () => void;
  tracks: MusicTrack[];
  activeTrackId: string;
  onSelectTrack: (trackId: string) => void;
  buttonClassName: string;
  iconSize: number;
};

export const AudioMenuButton = ({
  isAudioPlaying,
  onToggleAudio,
  tracks,
  activeTrackId,
  onSelectTrack,
  buttonClassName,
  iconSize,
}: AudioMenuButtonProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const hoverTimerRef = useRef<number | null>(null);
  const pressTimerRef = useRef<number | null>(null);
  const suppressClickRef = useRef(false);
  const listId = useId().replace(/:/g, '');

  const clearHoverTimer = () => {
    if (hoverTimerRef.current) window.clearTimeout(hoverTimerRef.current);
    hoverTimerRef.current = null;
  };

  const clearPressTimer = () => {
    if (pressTimerRef.current) window.clearTimeout(pressTimerRef.current);
    pressTimerRef.current = null;
  };

  const handlePointerEnter = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (event.pointerType !== 'mouse' && event.pointerType !== 'pen') return;
    if (!tracks.length) return;
    clearHoverTimer();
    hoverTimerRef.current = window.setTimeout(() => setMenuOpen(true), 4000);
  };

  const handlePointerLeave = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (event.pointerType !== 'mouse' && event.pointerType !== 'pen') return;
    clearHoverTimer();
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (event.pointerType !== 'touch') return;
    if (!tracks.length) return;
    suppressClickRef.current = false;
    clearPressTimer();
    pressTimerRef.current = window.setTimeout(() => {
      suppressClickRef.current = true;
      setMenuOpen(true);
    }, 5000);
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (event.pointerType !== 'touch') return;
    clearPressTimer();
  };

  const handlePointerCancel = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (event.pointerType !== 'touch') return;
    clearPressTimer();
  };

  const handleClick = () => {
    if (suppressClickRef.current) {
      suppressClickRef.current = false;
      return;
    }
    onToggleAudio();
  };

  const handleSelectTrack = (trackId: string) => {
    onSelectTrack(trackId);
    setMenuOpen(false);
  };

  useEffect(() => {
    return () => {
      clearHoverTimer();
      clearPressTimer();
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const handlePointerDownOutside = (event: PointerEvent) => {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(event.target as Node)) setMenuOpen(false);
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };

    document.addEventListener('pointerdown', handlePointerDownOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDownOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [menuOpen]);

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        onClick={handleClick}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        className={buttonClassName}
        aria-label={isAudioPlaying ? 'Pause Music' : 'Play Music'}
        aria-haspopup="listbox"
        aria-expanded={menuOpen}
        aria-controls={`track-menu-${listId}`}
      >
        {isAudioPlaying ? <Volume2 size={iconSize} /> : <VolumeX size={iconSize} />}
      </button>
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="track-menu"
            id={`track-menu-${listId}`}
            role="listbox"
            aria-label="Background music"
            className="absolute right-0 mt-3 w-64 overflow-hidden rounded-2xl border border-stone-200/80 bg-white/95 shadow-2xl backdrop-blur-xl dark:border-stone-800/80 dark:bg-stone-900/95 z-50"
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 8, scale: 0.98 }}
            animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: prefersReducedMotion ? 0.1 : 0.18, ease: 'easeOut' }}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-stone-200/70 dark:border-stone-800/70">
              <span className="text-[10px] uppercase tracking-[0.28em] text-stone-500 dark:text-stone-400">Background music</span>
              <span className="text-[10px] text-stone-400 dark:text-stone-500">{tracks.length} tracks</span>
            </div>
            <div className="max-h-64 overflow-auto py-1">
              {tracks.map((track) => {
                const isActive = track.id === activeTrackId;
                return (
                  <button
                    key={track.id}
                    type="button"
                    role="option"
                    aria-selected={isActive}
                    onClick={() => handleSelectTrack(track.id)}
                    className={`flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left text-sm transition-colors ${isActive
                      ? 'bg-nobel-gold/15 text-nobel-gold'
                      : 'text-stone-700 hover:bg-stone-100 dark:text-stone-200 dark:hover:bg-stone-800/70'}`}
                  >
                    <span className="truncate">{track.name}</span>
                    {isActive && (
                      <span className="text-[10px] uppercase tracking-[0.2em] text-nobel-gold">Default</span>
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
