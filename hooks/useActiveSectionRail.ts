import { useEffect, useMemo, useState, type RefObject } from 'react';

const ACTIVE_SECTION_SWITCH_THRESHOLD = 80;

type SectionDistance = {
  sectionId: string;
  distance: number;
};

export type SectionRailRefs = Record<string, RefObject<HTMLElement | null>>;

export const pickActiveSectionId = (
  distances: SectionDistance[],
  currentSectionId?: string,
) => {
  if (distances.length === 0) {
    return currentSectionId ?? null;
  }

  const sorted = [...distances].sort((left, right) => left.distance - right.distance);
  const best = sorted[0];

  if (!currentSectionId) {
    return best.sectionId;
  }

  const current = sorted.find((item) => item.sectionId === currentSectionId);
  if (!current) {
    return best.sectionId;
  }

  if (current.distance - best.distance < ACTIVE_SECTION_SWITCH_THRESHOLD) {
    return current.sectionId;
  }

  return best.sectionId;
};

export const useActiveSectionRail = (sectionRefs: SectionRailRefs) => {
  const orderedSectionIds = useMemo(() => Object.keys(sectionRefs), [sectionRefs]);
  const [activeSectionId, setActiveSectionId] = useState<string | null>(orderedSectionIds[0] ?? null);

  useEffect(() => {
    if (orderedSectionIds.length === 0) {
      setActiveSectionId(null);
      return undefined;
    }

    let frameId = 0;

    const updateActiveSection = () => {
      const viewportCenter = window.innerHeight / 2;
      const distances = orderedSectionIds.flatMap((sectionId) => {
        const element = sectionRefs[sectionId]?.current;
        if (!element) {
          return [];
        }

        const rect = element.getBoundingClientRect();
        const sectionCenter = rect.top + rect.height / 2;
        return [{ sectionId, distance: Math.abs(sectionCenter - viewportCenter) }];
      });

      if (distances.length === 0) {
        setActiveSectionId(orderedSectionIds[0] ?? null);
        return;
      }

      setActiveSectionId((current) => pickActiveSectionId(distances, current ?? undefined));
    };

    const measureUntilReady = () => {
      updateActiveSection();

      const missingSection = orderedSectionIds.some((sectionId) => !sectionRefs[sectionId]?.current);
      if (missingSection) {
        frameId = window.requestAnimationFrame(measureUntilReady);
      }
    };

    measureUntilReady();
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('resize', updateActiveSection);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener('scroll', updateActiveSection);
      window.removeEventListener('resize', updateActiveSection);
    };
  }, [orderedSectionIds, sectionRefs]);

  return { activeSectionId };
};
