import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { PetOverlay } from '../components/pets/PetOverlay';
import { PRESET_PETS } from '../data/pets';

describe('PetOverlay', () => {
  it('uses a calm mode when reduced motion is enabled', () => {
    render(<PetOverlay theme="dark" enabled pet={PRESET_PETS[0]} reducedMotion />);
    expect(screen.getByTestId('site-pet-overlay')).toHaveAttribute('data-motion-mode', 'calm');
  });

  it('switches into a short click reaction when the pet is clicked', () => {
    render(<PetOverlay theme="dark" enabled pet={PRESET_PETS[0]} reducedMotion={false} />);
    fireEvent.click(screen.getByTestId('site-pet-hitbox'));
    expect(screen.getByTestId('site-pet-overlay')).toHaveAttribute('data-pet-action', 'swipe');
  });

  it('switches to a hover reaction when the cursor approaches the pet', () => {
    render(<PetOverlay theme="dark" enabled pet={PRESET_PETS[0]} reducedMotion={false} />);
    fireEvent.mouseMove(document, { clientX: 80, clientY: window.innerHeight - 20 });
    expect(screen.getByTestId('site-pet-overlay')).toHaveAttribute('data-pet-action', 'swipe');
  });

  it('uses the light theme skin when the theme changes', () => {
    const fox = PRESET_PETS.find((pet) => pet.id === 'fox');
    if (!fox) throw new Error('Expected fox preset');

    const { rerender } = render(<PetOverlay theme="dark" enabled pet={fox} reducedMotion={false} />);
    expect(screen.getByTestId('site-pet-hitbox').querySelector('img')).toHaveAttribute('src', '/pets/fox/red_idle_8fps.gif');

    rerender(<PetOverlay theme="light" enabled pet={fox} reducedMotion={false} />);
    expect(screen.getByTestId('site-pet-hitbox').querySelector('img')).toHaveAttribute('src', '/pets/fox/white_idle_8fps.gif');
  });
});
