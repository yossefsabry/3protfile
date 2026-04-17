import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Navigation } from '../components/layout/Navigation';

vi.mock('../components/ui/AudioMenuButton', () => ({
  AudioMenuButton: () => <div data-testid="audio-menu" />,
}));

describe('Navigation', () => {
  it('shows a pet toggle control in navigation', () => {
    render(
      <Navigation
        scrolled={false}
        menuOpen={false}
        isLoading={false}
        isAudioPlaying={false}
        tracks={[]}
        activeTrackId=""
        onSelectTrack={vi.fn()}
        onToggleAudio={vi.fn()}
        onToggleMenu={vi.fn()}
        onScrollTop={vi.fn()}
        onScrollTo={() => vi.fn()}
        theme="dark"
        petsEnabled
        onTogglePets={vi.fn()}
        onTogglePetSettings={vi.fn()}
      />,
    );

    expect(screen.getByRole('button', { name: /toggle pets/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /pet settings/i })).toBeInTheDocument();
  });
});
