type PetToggleButtonProps = {
  enabled: boolean;
  onToggle: () => void;
};

export const PetToggleButton = ({ enabled, onToggle }: PetToggleButtonProps) => (
  <button
    type="button"
    onClick={onToggle}
    aria-label="Toggle Pets"
    aria-pressed={enabled}
    className={`rounded-xl border px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] transition-all ${enabled
      ? 'border-[#f6c177]/40 bg-[#f6c177]/12 text-[#f6e7ca]'
      : 'border-[#907aa9]/24 bg-[#26233a]/72 text-[#e0def4]/70'}`}
  >
    Pets {enabled ? 'On' : 'Off'}
  </button>
);
