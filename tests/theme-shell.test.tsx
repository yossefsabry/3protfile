import React from 'react';
import { act, cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import App from '../App';

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
  HeroSection: () => <section>Hero</section>,
}));

vi.mock('../components/sections/AboutSection', () => ({
  AboutSection: () => <section>About</section>,
}));

vi.mock('../components/sections/ProjectsSection', () => ({
  ProjectsSection: () => <section>Projects</section>,
}));

vi.mock('../components/sections/ContactSection', () => ({
  ContactSection: () => <section>Contact</section>,
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

describe('Theme shell', () => {
  const renderApp = async () => {
    await act(async () => {
      render(<App />);
    });
    await act(async () => {
      await Promise.resolve();
    });
  };

  beforeEach(() => {
    window.localStorage.removeItem('theme');
    window.history.replaceState({}, '', '/');
  });

  afterEach(() => {
    cleanup();
  });

  it('applies a theme marker to the app shell from live theme state', async () => {
    await renderApp();
    expect(screen.getByTestId('app-shell')).toHaveAttribute('data-theme', 'dark');
  });
});
