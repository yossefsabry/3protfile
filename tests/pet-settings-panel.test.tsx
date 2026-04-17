import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { PetSettingsPanel } from '../components/pets/PetSettingsPanel';
import { PRESET_PETS } from '../data/pets';

describe('PetSettingsPanel', () => {
  it('renders the new vampire, dog, and panda options', () => {
    render(
      <PetSettingsPanel
        isOpen
        pets={PRESET_PETS}
        selectedPetId="crab"
        theme="dark"
      />,
    );

    expect(screen.getByRole('button', { name: 'Vampire' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Dog' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Panda' })).toBeInTheDocument();
  });
});
