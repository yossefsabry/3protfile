import type { PresetPet } from '../../data/pets';
import { usePetAnimation } from '../../hooks/usePetAnimation';
import { HollowKnightPet } from './HollowKnightPet';

type PetOverlayProps = {
  compact?: boolean;
  enabled: boolean;
  pet: PresetPet;
  reducedMotion: boolean;
  theme: 'light' | 'dark';
};

export const PetOverlay = ({ compact = false, enabled, pet, reducedMotion: _reducedMotion, theme }: PetOverlayProps) => {
  const animation = usePetAnimation(pet, theme, _reducedMotion);
  const petScale = compact ? pet.scale * 0.85 : pet.scale;
  const isSvgPet = pet.type === 'svg';

  if (!enabled) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      data-motion-mode={animation.motionMode}
      data-pet-action={animation.action}
      data-pet-id={pet.id}
      data-testid="site-pet-overlay"
      className={`pointer-events-none fixed inset-x-0 bottom-0 z-[35] ${compact ? 'h-24' : 'h-32'}`}
    >
      <button
        type="button"
        data-testid="site-pet-hitbox"
        className={`pointer-events-auto absolute bottom-2 cursor-pointer bg-transparent ${compact ? 'h-16 w-16' : 'h-20 w-20'}`}
        onClick={animation.triggerReaction}
        style={{
          left: `${animation.positionX}px`,
          transform: `translateX(-50%) scaleX(${animation.facing})`,
          transformOrigin: 'bottom center',
        }}
      >
        {isSvgPet ? (
          <HollowKnightPet action={animation.action} scale={petScale} />
        ) : (
          <img
            src={animation.spriteSrc}
            alt=""
            className="pixelated h-full w-full object-contain drop-shadow-[0_8px_24px_rgba(0,0,0,0.45)]"
            draggable={false}
            style={{
              transform: `scale(${petScale})`,
              transformOrigin: 'bottom center',
            }}
          />
        )}
      </button>
    </div>
  );
};
