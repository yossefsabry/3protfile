import { describe, expect, it } from 'vitest';
import { PRESET_PETS } from '../data/pets';

describe('preset pet data', () => {
  it('defines at least two selectable pets with theme skin mappings', () => {
    expect(PRESET_PETS.map((pet) => pet.id)).toEqual(['crab', 'deno', 'fox', 'vampire', 'dog', 'panda']);
    expect(PRESET_PETS.find((pet) => pet.id === 'fox')?.skins.light.idle).toMatch(/^\/pets\//);
    expect(PRESET_PETS.find((pet) => pet.id === 'crab')?.skins.dark.idle).toMatch(/^\/pets\//);
    expect(PRESET_PETS.find((pet) => pet.id === 'vampire')?.skins.dark.idle).toBe('/pets/vampire/girl_idle_8fps.gif');
    expect(PRESET_PETS.find((pet) => pet.id === 'dog')?.skins.dark.idle).toBe('/pets/dog/brown_idle_8fps.gif');
    expect(PRESET_PETS.find((pet) => pet.id === 'panda')?.skins.dark.idle).toBe('/pets/panda/black_idle_8fps.gif');
  });
});
