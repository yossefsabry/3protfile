import { PRESET_PETS_BY_ID } from '../../data/pets';
import { resolveSectionPetRail } from '../../data/sectionPetRails';
import { useSectionPetRailAnimation } from '../../hooks/useSectionPetRailAnimation';

type SectionPetRailProps = {
  sectionId: string;
  theme: 'light' | 'dark';
  isActive: boolean;
  reducedMotion: boolean;
};

export const SectionPetRail = ({ sectionId, theme, isActive, reducedMotion }: SectionPetRailProps) => {
  const rail = resolveSectionPetRail(sectionId);
  const pet = rail ? PRESET_PETS_BY_ID[rail.petId] : null;

  const animation = useSectionPetRailAnimation(pet, rail, theme, isActive, reducedMotion);

  if (!rail || !pet) {
    return null;
  }

  const iconSize = animation.compact ? rail.mobileIconSize : rail.iconSize;
  const railHeight = Math.max(iconSize + 10, 48);

  return (
    <div
      aria-hidden="true"
      data-testid="section-pet-rail"
      data-compact={animation.compact}
      data-icon-size={iconSize}
      data-motion-mode={animation.motionMode}
      data-section-id={sectionId}
      data-pet-id={pet.id}
      className={`relative ${rail.railWidthClass} py-3`}
    >
      <div className="pointer-events-none absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-[#907aa9]/35 to-transparent" />
      <div className="relative" style={{ height: `${railHeight}px` }}>
        <img
          src={animation.spriteSrc}
          alt=""
          draggable={false}
          className="pixelated absolute left-0 top-1/2 -translate-y-1/2 object-contain drop-shadow-[0_4px_14px_rgba(17,12,28,0.55)]"
          style={{
            transform: `translate(${animation.offsetX}px, -50%) scaleX(${animation.facing})`,
            transformOrigin: 'center center',
            height: `${iconSize}px`,
            width: `${iconSize}px`,
          }}
        />
      </div>
    </div>
  );
};
