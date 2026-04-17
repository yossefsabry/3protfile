import { useEffect, useState } from 'react';
import type { PresetPet } from '../data/pets';
import type { SectionPetRail } from '../data/sectionPetRails';

type RailTheme = 'light' | 'dark';

type RailAnimationState = {
  compact: boolean;
  facing: 1 | -1;
  motionMode: 'active' | 'idle' | 'calm';
  offsetX: number;
  spriteSrc: string;
};

export const useSectionPetRailAnimation = (
  pet: PresetPet | null,
  rail: SectionPetRail | null,
  theme: RailTheme,
  isActive: boolean,
  reducedMotion: boolean,
) => {
  const [compact, setCompact] = useState(() => window.innerWidth < 640);
  const travel = rail ? (compact ? rail.mobileTravel : rail.desktopTravel) : 0;

  useEffect(() => {
    const handleResize = () => {
      setCompact(window.innerWidth < 640);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const [state, setState] = useState<RailAnimationState>({
    compact,
    facing: 1,
    motionMode: reducedMotion ? 'calm' : isActive ? 'active' : 'idle',
    offsetX: 0,
    spriteSrc: pet ? pet.skins[theme][reducedMotion || !isActive ? 'idle' : 'walk'] : '',
  });

  useEffect(() => {
    if (!pet || !rail) {
      setState({
        compact,
        facing: 1,
        motionMode: reducedMotion ? 'calm' : 'idle',
        offsetX: 0,
        spriteSrc: '',
      });
      return undefined;
    }

    if (reducedMotion || !isActive) {
      setState({
        compact,
        facing: 1,
        motionMode: reducedMotion ? 'calm' : 'idle',
        offsetX: 0,
        spriteSrc: pet.skins[theme].idle,
      });
      return undefined;
    }

    setState((current) => ({
      ...current,
      compact,
      motionMode: 'active',
      spriteSrc: pet.skins[theme].walk,
    }));

    let frameId = 0;
    const animate = (timestamp: number) => {
      const progress = (timestamp / 18) % (travel * 2 || 1);
      const distance = progress <= travel ? progress : travel * 2 - progress;
      const nextFacing: 1 | -1 = progress <= travel ? 1 : -1;

      setState({
        compact,
        facing: nextFacing,
        motionMode: 'active',
        offsetX: distance,
        spriteSrc: pet.skins[theme].walk,
      });

      frameId = window.requestAnimationFrame(animate);
    };

    frameId = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [compact, isActive, pet, rail, reducedMotion, theme, travel]);

  return state;
};
