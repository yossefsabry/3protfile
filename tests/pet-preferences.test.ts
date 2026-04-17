import { renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { usePetPreferences } from '../hooks/usePetPreferences';

describe('usePetPreferences', () => {
  beforeEach(() => {
    window.localStorage.removeItem('site-pets');
  });

  it('loads enabled state and selected pet from localStorage', () => {
    localStorage.setItem('site-pets', JSON.stringify({ enabled: false, selectedPet: 'fox' }));

    const { result } = renderHook(() => usePetPreferences('crab', ['crab', 'deno', 'fox']));

    expect(result.current.enabled).toBe(false);
    expect(result.current.selectedPet).toBe('fox');
  });

  it('falls back to the default pet when the stored key is invalid', () => {
    localStorage.setItem('site-pets', JSON.stringify({ enabled: true, selectedPet: 'ghost' }));

    const { result } = renderHook(() => usePetPreferences('crab', ['crab', 'deno', 'fox']));

    expect(result.current.selectedPet).toBe('crab');
  });
});
