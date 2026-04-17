import type { PresetPet } from '../../data/pets';

type PetSettingsPanelProps = {
  isOpen: boolean;
  pets: PresetPet[];
  selectedPetId?: string;
  theme?: 'light' | 'dark';
  onSelectPet?: (petId: string) => void;
};

export const PetSettingsPanel = ({
  isOpen,
  pets,
  selectedPetId,
  theme = 'dark',
  onSelectPet,
}: PetSettingsPanelProps) => {
  if (!isOpen || pets.length === 0) {
    return null;
  }

  return (
    <div
      className={`matrix-panel absolute right-0 top-full z-50 mt-4 w-56 rounded-2xl px-3 py-3 shadow-2xl ${theme === 'light' ? 'text-[#232136]' : 'text-[#f6f2ff]'}`}
      role="dialog"
      aria-label="Pet settings"
    >
      <p className="px-1 pb-2 text-[10px] uppercase tracking-[0.28em] text-[#907aa9]">Site pet</p>
      <div className="flex max-h-48 flex-col gap-2 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-[#907aa9]/20">
        {pets.map((pet) => {
          const isSelected = pet.id === selectedPetId;
          return (
            <button
              key={pet.id}
              type="button"
              onClick={() => onSelectPet?.(pet.id)}
              className={`rounded-xl border px-3 py-2 text-left text-sm transition-colors ${isSelected
                ? 'border-[#f6c177]/40 bg-[#f6c177]/12'
                : 'border-[#907aa9]/18 bg-transparent hover:bg-[#907aa9]/10'}`}
            >
              {pet.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
