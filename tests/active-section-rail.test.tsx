import { createRef } from 'react';
import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { pickActiveSectionId, useActiveSectionRail } from '../hooks/useActiveSectionRail';

describe('useActiveSectionRail', () => {
  it('marks the first section as active when layout info is unavailable', () => {
    const refs = {
      hero: createRef<HTMLElement>(),
      about: createRef<HTMLElement>(),
      projects: createRef<HTMLElement>(),
      contact: createRef<HTMLElement>(),
    };

    const { result } = renderHook(() => useActiveSectionRail(refs));

    expect(result.current.activeSectionId).toBe('hero');
  });

  it('keeps the current section active when another section is not yet 80px closer', () => {
    const next = pickActiveSectionId([
      { sectionId: 'hero', distance: 120 },
      { sectionId: 'about', distance: 60 },
      { sectionId: 'projects', distance: 300 },
    ], 'hero');

    expect(next).toBe('hero');
  });

  it('re-measures when section refs become available after the first render', async () => {
    const refs = {
      hero: createRef<HTMLElement>(),
      about: createRef<HTMLElement>(),
      projects: createRef<HTMLElement>(),
      contact: createRef<HTMLElement>(),
    };

    const { result } = renderHook(() => useActiveSectionRail(refs));
    expect(result.current.activeSectionId).toBe('hero');

    const hero = document.createElement('section');
    hero.getBoundingClientRect = () => ({ top: -500, height: 200, bottom: -300, left: 0, right: 0, width: 0, x: 0, y: -500, toJSON: () => ({}) });
    const about = document.createElement('section');
    about.getBoundingClientRect = () => ({ top: 200, height: 400, bottom: 600, left: 0, right: 0, width: 0, x: 0, y: 200, toJSON: () => ({}) });

    await act(async () => {
      refs.hero.current = hero;
      refs.about.current = about;
      await new Promise((resolve) => window.requestAnimationFrame(() => resolve(undefined)));
    });

    expect(result.current.activeSectionId).toBe('about');
  });

  it('keeps measuring until lazy-mounted sections become available', async () => {
    const refs = {
      hero: createRef<HTMLElement>(),
      about: createRef<HTMLElement>(),
      projects: createRef<HTMLElement>(),
      contact: createRef<HTMLElement>(),
    };

    const { result } = renderHook(() => useActiveSectionRail(refs));
    expect(result.current.activeSectionId).toBe('hero');

    const hero = document.createElement('section');
    hero.getBoundingClientRect = () => ({ top: -500, height: 200, bottom: -300, left: 0, right: 0, width: 0, x: 0, y: -500, toJSON: () => ({}) });
    const contact = document.createElement('section');
    contact.getBoundingClientRect = () => ({ top: 100, height: 300, bottom: 400, left: 0, right: 0, width: 0, x: 0, y: 100, toJSON: () => ({}) });

    for (let step = 0; step < 16; step += 1) {
      await act(async () => {
        await new Promise((resolve) => window.requestAnimationFrame(() => resolve(undefined)));
      });
    }

    await act(async () => {
      refs.hero.current = hero;
      refs.contact.current = contact;
      await new Promise((resolve) => window.requestAnimationFrame(() => resolve(undefined)));
    });

    expect(result.current.activeSectionId).toBe('contact');
  });
});
