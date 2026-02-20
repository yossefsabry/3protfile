/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { musicTracks, themeSwitchTrack } from '../data/audio';

export const useAudioController = () => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [needsAudioUnlock, setNeedsAudioUnlock] = useState(false);
  const [selectedTrackId, setSelectedTrackId] = useState(() => {
    if (typeof window === 'undefined') return musicTracks[0]?.id || '';
    const saved = localStorage.getItem('bg-music-track');
    if (saved && musicTracks.some((track) => track.id === saved)) return saved;
    return musicTracks[0]?.id || '';
  });
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const sfxRef = useRef<HTMLAudioElement | null>(null);
  const audioAutoplayRef = useRef(false);
  const resumeAfterSfxRef = useRef(false);

  const activeTrack = useMemo(
    () => musicTracks.find((track) => track.id === selectedTrackId) || musicTracks[0],
    [selectedTrackId]
  );
  const activeTrackUrl = activeTrack?.url || '';

  const attemptAudioPlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const playPromise = audio.play();
    if (playPromise) {
      playPromise
        .then(() => setNeedsAudioUnlock(false))
        .catch(() => {
          setIsAudioPlaying(false);
          setNeedsAudioUnlock(true);
        });
    }
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.12;
    audio.loop = true;
    audio.muted = false;
    audio.defaultMuted = false;

    const handlePlay = () => {
      audioAutoplayRef.current = true;
      setIsAudioPlaying(true);
      setNeedsAudioUnlock(false);
    };
    const handlePause = () => setIsAudioPlaying(false);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    attemptAudioPlay();

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
    };
  }, [attemptAudioPlay]);

  useEffect(() => {
    if (!activeTrack?.id) return;
    localStorage.setItem('bg-music-track', activeTrack.id);
  }, [activeTrack?.id]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !activeTrackUrl) return;
    const wasPlaying = !audio.paused;
    audio.load();
    if (wasPlaying) {
      const playPromise = audio.play();
      if (playPromise) {
        playPromise.catch(() => {
          setIsAudioPlaying(false);
          setNeedsAudioUnlock(true);
        });
      }
    }
  }, [activeTrackUrl]);

  useEffect(() => {
    const sfx = sfxRef.current;
    if (!sfx) return;
    sfx.volume = 0.3;
    sfx.loop = false;

    const handleEnded = () => {
      const bg = audioRef.current;
      if (!bg || !resumeAfterSfxRef.current) return;
      const playPromise = bg.play();
      if (playPromise) {
        playPromise.catch(() => setIsAudioPlaying(false));
      }
    };

    sfx.addEventListener('ended', handleEnded);
    return () => sfx.removeEventListener('ended', handleEnded);
  }, []);

  useEffect(() => {
    const handleFirstInteraction = () => {
      if (audioAutoplayRef.current) return;
      attemptAudioPlay();
    };

    window.addEventListener('pointerdown', handleFirstInteraction);
    return () => window.removeEventListener('pointerdown', handleFirstInteraction);
  }, [attemptAudioPlay]);

  useEffect(() => {
    const handlePageShow = () => {
      attemptAudioPlay();
    };

    window.addEventListener('pageshow', handlePageShow);
    return () => window.removeEventListener('pageshow', handlePageShow);
  }, [attemptAudioPlay]);

  const toggleAudio = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      attemptAudioPlay();
    } else {
      resumeAfterSfxRef.current = false;
      audio.pause();
    }
  }, [attemptAudioPlay]);

  const playThemeSwitchSfx = useCallback(() => {
    const bg = audioRef.current;
    const sfx = sfxRef.current;
    if (!bg || !sfx) return;
    resumeAfterSfxRef.current = !bg.paused;
    if (!bg.paused) bg.pause();
    sfx.currentTime = 0;
    const playPromise = sfx.play();
    if (playPromise) {
      playPromise.catch(() => {
        resumeAfterSfxRef.current = false;
      });
    }
  }, []);

  return {
    audioRef,
    sfxRef,
    isAudioPlaying,
    needsAudioUnlock,
    toggleAudio,
    tracks: musicTracks,
    activeTrackId: activeTrack?.id || '',
    setSelectedTrackId,
    activeTrackUrl,
    sfxUrl: themeSwitchTrack,
    playThemeSwitchSfx,
    requestAudioStart: attemptAudioPlay,
  };
};
