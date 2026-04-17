import { PRESET_PETS_BY_ID } from './pets';

export type SectionPetRail = {
  sectionId: 'hero' | 'about' | 'projects' | 'contact';
  petId: string;
  railWidthClass: string;
  desktopTravel: number;
  mobileTravel: number;
  iconSize: number;
  mobileIconSize: number;
};

export const SECTION_PET_RAILS: SectionPetRail[] = [
  {
    sectionId: 'hero',
    petId: 'fox',
    railWidthClass: 'w-full',
    desktopTravel: 320,
    mobileTravel: 160,
    iconSize: 56,
    mobileIconSize: 40,
  },
  {
    sectionId: 'about',
    petId: 'vampire',
    railWidthClass: 'w-full',
    desktopTravel: 360,
    mobileTravel: 180,
    iconSize: 56,
    mobileIconSize: 40,
  },
  {
    sectionId: 'projects',
    petId: 'dog',
    railWidthClass: 'w-full',
    desktopTravel: 420,
    mobileTravel: 200,
    iconSize: 58,
    mobileIconSize: 42,
  },
  {
    sectionId: 'contact',
    petId: 'panda',
    railWidthClass: 'w-full',
    desktopTravel: 320,
    mobileTravel: 160,
    iconSize: 52,
    mobileIconSize: 38,
  },
];

export const resolveSectionPetRail = (sectionId: string) => {
  const rail = SECTION_PET_RAILS.find((item) => item.sectionId === sectionId);
  if (!rail) {
    return null;
  }

  if (!PRESET_PETS_BY_ID[rail.petId]) {
    return null;
  }

  return rail;
};
