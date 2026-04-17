import { useEffect, useState } from 'react';

const PET_STORAGE_KEY = 'site-pets';

type PetPreferenceState = {
  enabled: boolean;
  selectedPet: string;
};

const resolveSelectedPet = (selectedPet: string, defaultPet: string, validPetIds?: string[]) => {
  if (!selectedPet) {
    return defaultPet;
  }

  if (validPetIds && validPetIds.length > 0 && !validPetIds.includes(selectedPet)) {
    return defaultPet;
  }

  return selectedPet;
};

const readStoredPreferences = (defaultPet: string, validPetIds?: string[]): PetPreferenceState => {
  if (typeof window === 'undefined' || typeof window.localStorage?.getItem !== 'function') {
    return { enabled: true, selectedPet: defaultPet };
  }

  const storedValue = window.localStorage.getItem(PET_STORAGE_KEY);
  if (!storedValue) {
    return { enabled: true, selectedPet: defaultPet };
  }

  try {
    const parsed = JSON.parse(storedValue) as Partial<PetPreferenceState>;
    return {
      enabled: typeof parsed.enabled === 'boolean' ? parsed.enabled : true,
      selectedPet: resolveSelectedPet(typeof parsed.selectedPet === 'string' ? parsed.selectedPet : '', defaultPet, validPetIds),
    };
  } catch {
    return { enabled: true, selectedPet: defaultPet };
  }
};

export const usePetPreferences = (defaultPet: string, validPetIds?: string[]) => {
  const [preferences, setPreferences] = useState<PetPreferenceState>(() => readStoredPreferences(defaultPet, validPetIds));

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.localStorage?.setItem !== 'function') {
      return;
    }

    window.localStorage.setItem(PET_STORAGE_KEY, JSON.stringify(preferences));
  }, [preferences]);

  useEffect(() => {
    setPreferences((current) => {
      const selectedPet = resolveSelectedPet(current.selectedPet, defaultPet, validPetIds);
      if (current.selectedPet === selectedPet) {
        return current;
      }
      return { ...current, selectedPet };
    });
  }, [defaultPet, validPetIds]);

  return {
    ...preferences,
    setEnabled: (enabled: boolean) => setPreferences((current) => ({ ...current, enabled })),
    toggleEnabled: () => setPreferences((current) => ({ ...current, enabled: !current.enabled })),
    setSelectedPet: (selectedPet: string) => setPreferences((current) => ({
      ...current,
      selectedPet: resolveSelectedPet(selectedPet, defaultPet, validPetIds),
    })),
  };
};
