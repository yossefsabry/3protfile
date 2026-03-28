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
  LoadingScreen: () => <div data-testid="loading-screen" />,
}));

vi.mock('../components/ui/ThemeWaterTransition', () => ({
  ThemeWaterTransition: () => null,
}));

vi.mock('../components/layout/Navigation', () => ({
  Navigation: () => <nav data-testid="navigation" />,
}));

vi.mock('../components/layout/MobileMenu', () => ({
  MobileMenu: () => null,
}));

vi.mock('../components/layout/SceneLayers', () => ({
  SceneLayers: () => <div data-testid="legacy-scene-layers" />,
}));

vi.mock('../components/layout/Footer', () => ({
  Footer: () => <footer data-testid="footer" />,
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
    activeTrackId: null,
    setSelectedTrackId: vi.fn(),
    toggleTheme: vi.fn(),
    toggleAudio: vi.fn(),
  }),
}));

vi.mock('../hooks/useDeviceProfile', () => ({
  useDeviceProfile: () => ({
    isPhone: false,
    isLowPower: false,
    canRender3d: false,
  }),
}));

vi.mock('../hooks/useLoadingSequence', () => ({
  useLoadingSequence: () => ({
    isLoading: false,
    setSceneReady: vi.fn(),
  }),
}));

vi.mock('../hooks/useSceneActivity', () => ({
  useSceneActivity: () => ({
    markSceneActive: vi.fn(),
    setSceneInvalidate: vi.fn(),
    invalidateScene: vi.fn(),
  }),
}));

vi.mock('../hooks/useSceneScroll', () => ({
  useSceneScroll: () => ({
    scrollStateRef: { current: { progress: 0, velocity: 0, direction: 1, fade: 1 } },
    sceneWrapperRef: { current: null },
    meteorWrapperRef: { current: null },
    footerRef: { current: null },
  }),
}));

vi.mock('../hooks/useScrolledState', () => ({
  useScrolledState: () => false,
}));

vi.mock('../hooks/useThemeTransition', () => ({
  useThemeTransition: () => ({
    theme: 'dark' as const,
    isThemeTransitioning: false,
    transitionTheme: null,
    toggleTheme: vi.fn(),
  }),
}));

describe('App shell', () => {
  const originalReplaceState = window.history.replaceState;
  const renderApp = async () => {
    await act(async () => {
      render(<App />);
    });
    await act(async () => {
      await Promise.resolve();
    });
  };

  beforeEach(() => {
    window.history.replaceState({}, '', '/');
  });

  afterEach(() => {
    cleanup();
    window.history.replaceState = originalReplaceState;
  });

  it('shows the matrix background on the main site but not on /cv', async () => {
    await renderApp();
    expect(screen.getByTestId('matrix-background')).toBeInTheDocument();

    cleanup();
    window.history.replaceState({}, '', '/cv');
    await renderApp();
    expect(screen.queryByTestId('matrix-background')).not.toBeInTheDocument();
  });

  it('renders a dedicated matrix canvas layer on the main site', async () => {
    await renderApp();
    expect(screen.getByTestId('matrix-background').querySelector('canvas')).toBeInTheDocument();
  });

  it('applies the matrix shell class on the main site', async () => {
    await renderApp();
    expect(screen.getByTestId('app-shell')).toHaveClass('matrix-shell');
    expect(screen.getByTestId('app-shell')).toHaveClass('rose-pine-shell');
  });

  it('does not render the legacy scene container in the main shell', async () => {
    await renderApp();
    expect(screen.queryByTestId('legacy-scene-layers')).not.toBeInTheDocument();
  });
});
