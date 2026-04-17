import { describe, expect, it } from 'vitest';
import { resolveSectionPetRail, SECTION_PET_RAILS } from '../data/sectionPetRails';

describe('section pet rail data', () => {
  it('maps each major section to a specific pet rail', () => {
    expect(SECTION_PET_RAILS.map((item) => item.sectionId)).toEqual(['hero', 'about', 'projects', 'contact']);
    expect(SECTION_PET_RAILS.find((item) => item.sectionId === 'hero')?.petId).toBe('fox');
    expect(SECTION_PET_RAILS.find((item) => item.sectionId === 'about')?.petId).toBe('vampire');
    expect(SECTION_PET_RAILS.find((item) => item.sectionId === 'projects')?.petId).toBe('dog');
    expect(SECTION_PET_RAILS.find((item) => item.sectionId === 'contact')?.petId).toBe('panda');
  });

  it('fails closed when a mapping cannot resolve a pet', () => {
    expect(resolveSectionPetRail('unknown-section')).toBeNull();
  });
});
