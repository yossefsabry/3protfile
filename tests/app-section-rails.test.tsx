import React from 'react';
import { act, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import App from '../App';

vi.mock('../hooks/useActiveSectionRail', () => ({
  useActiveSectionRail: () => ({ activeSectionId: 'projects' }),
}));

vi.mock('framer-motion', async () => {
  const actual = await vi.importActual<typeof import('framer-motion')>('framer-motion');
  return {
    ...actual,
    AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    useReducedMotion: () => false,
  };
});

vi.mock('../components/ui/LoadingScreen', () => ({
  LoadingScreen: () => null,
}));

vi.mock('../components/layout/Footer', () => ({
  Footer: () => <footer data-testid="footer" />,
}));

vi.mock('../components/effects/MatrixBackground', () => ({
  MatrixBackground: () => <div data-testid="matrix-background" />,
}));

vi.mock('../components/layout/Navigation', () => ({
  Navigation: () => <nav data-testid="navigation" />,
}));

vi.mock('../components/layout/MobileMenu', () => ({
  MobileMenu: () => null,
}));

vi.mock('../components/sections/HeroSection', () => ({
  HeroSection: ({ activeSectionId }: { activeSectionId: string }) => <section data-testid="hero-section" data-active={activeSectionId} />,
}));

vi.mock('../components/sections/AboutSection', () => ({
  AboutSection: ({ activeSectionId }: { activeSectionId: string }) => <section data-testid="about-section" data-active={activeSectionId} />,
}));

vi.mock('../components/sections/AsciiArenaSection', () => ({
  AsciiArenaSection: () => <section data-testid="ascii-arena" />,
}));

vi.mock('../components/sections/ProjectsSection', () => ({
  ProjectsSection: ({ activeSectionId }: { activeSectionId: string }) => <section data-testid="projects-section" data-active={activeSectionId} />,
}));

vi.mock('../components/sections/ContactSection', () => ({
  ContactSection: ({ activeSectionId }: { activeSectionId: string }) => <section data-testid="contact-section" data-active={activeSectionId} />,
}));

vi.mock('../hooks/useAudioController', () => ({
  useAudioController: () => ({
    audioRef: { current: null },
    sfxRef: { current: null },
    activeTrackUrl: 'about:blank',
    sfxUrl: 'about:blank',
    needsAudioUnlock: false,
    requestAudioStart: vi.fn(),
    isAudioPlaying: false,
    tracks: [],
    activeTrackId: '',
    setSelectedTrackId: vi.fn(),
    toggleAudio: vi.fn(),
  }),
}));

vi.mock('../hooks/useDeviceProfile', () => ({
  useDeviceProfile: () => ({
    isPhone: false,
    isLowPower: false,
  }),
}));

vi.mock('../hooks/useLoadingSequence', () => ({
  useLoadingSequence: () => ({
    isLoading: false,
  }),
}));

vi.mock('../hooks/useScrolledState', () => ({
  useScrolledState: () => false,
}));

describe('App section rails', () => {
  it('passes one shared active section id into all major sections', async () => {
    await act(async () => {
      render(<App />);
    });

    await act(async () => {
      await Promise.resolve();
    });

    expect(await screen.findByTestId('hero-section')).toHaveAttribute('data-active', 'projects');
    expect(screen.getByTestId('about-section')).toHaveAttribute('data-active', 'projects');
    expect(screen.getByTestId('projects-section')).toHaveAttribute('data-active', 'projects');
    expect(screen.getByTestId('contact-section')).toHaveAttribute('data-active', 'projects');
  });
});
