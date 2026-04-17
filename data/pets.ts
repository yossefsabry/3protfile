export type PetSkin = {
  idle: string;
  walk: string;
  walkFast: string;
  run: string;
  swipe: string;
  clickReaction: string;
};

export type PresetPet = {
  id: string;
  label: string;
  speed: number;
  scale: number;
  /** 'sprite' = GIF-based (default), 'svg' = rendered via React SVG component */
  type?: 'sprite' | 'svg';
  skins: {
    light: PetSkin;
    dark: PetSkin;
  };
};

const createSkin = (folder: string, color: string): PetSkin => ({
  idle: `/pets/${folder}/${color}_idle_8fps.gif`,
  walk: `/pets/${folder}/${color}_walk_8fps.gif`,
  walkFast: `/pets/${folder}/${color}_walk_fast_8fps.gif`,
  run: `/pets/${folder}/${color}_run_8fps.gif`,
  swipe: `/pets/${folder}/${color}_swipe_8fps.gif`,
  clickReaction: `/pets/${folder}/${color}_swipe_8fps.gif`,
});

const emptySkin: PetSkin = {
  idle: '',
  walk: '',
  walkFast: '',
  run: '',
  swipe: '',
  clickReaction: '',
};

export const DEFAULT_PET_ID = 'hollow-knight';

export const PRESET_PETS: PresetPet[] = [
  {
    id: 'hollow-knight',
    label: 'The Knight',
    speed: 2.0,
    scale: 1,
    type: 'svg',
    skins: {
      light: emptySkin,
      dark: emptySkin,
    },
  },
  {
    id: 'crab',
    label: 'Red Crab',
    speed: 1.8,
    scale: 1,
    skins: {
      light: createSkin('crab', 'red'),
      dark: createSkin('crab', 'red'),
    },
  },
  {
    id: 'deno',
    label: 'Deno Buddy',
    speed: 2,
    scale: 1,
    skins: {
      light: createSkin('deno', 'green'),
      dark: createSkin('deno', 'green'),
    },
  },
  {
    id: 'fox',
    label: 'Fox',
    speed: 2.2,
    scale: 1,
    skins: {
      light: createSkin('fox', 'white'),
      dark: createSkin('fox', 'red'),
    },
  },
  {
    id: 'vampire',
    label: 'Vampire',
    speed: 2.1,
    scale: 1,
    skins: {
      light: createSkin('vampire', 'girl'),
      dark: createSkin('vampire', 'girl'),
    },
  },
  {
    id: 'dog',
    label: 'Dog',
    speed: 2.3,
    scale: 1,
    skins: {
      light: createSkin('dog', 'brown'),
      dark: createSkin('dog', 'brown'),
    },
  },
  {
    id: 'panda',
    label: 'Panda',
    speed: 1.6,
    scale: 1,
    skins: {
      light: createSkin('panda', 'black'),
      dark: createSkin('panda', 'black'),
    },
  },
];

export const PRESET_PETS_BY_ID = Object.fromEntries(
  PRESET_PETS.map((pet) => [pet.id, pet]),
) as Record<string, PresetPet>;
