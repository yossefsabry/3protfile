/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';

export const useDeviceProfile = (prefersReducedMotion: boolean) => {
  const [isPhone, setIsPhone] = useState(() => {
    if (typeof window === 'undefined') return false;
    // Improved detection: small screen AND touch support
    return window.innerWidth < 768 && window.matchMedia('(pointer: coarse)').matches;
  });
  const [isLowPower, setIsLowPower] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    type NavigatorWithMemory = Navigator & { deviceMemory?: number };
    const computeProfile = () => {
      const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
      const reducedMotion = prefersReducedMotion || window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const deviceMemory = (navigator as NavigatorWithMemory).deviceMemory;
      const hardwareConcurrency = navigator.hardwareConcurrency;
      const phone = window.innerWidth < 768 && coarsePointer;
      const lowPower = Boolean(
        reducedMotion ||
        (window.innerWidth < 1024 && coarsePointer) ||
        (typeof deviceMemory === 'number' && deviceMemory <= 4) ||
        (typeof hardwareConcurrency === 'number' && hardwareConcurrency <= 4)
      );

      setIsPhone(phone);
      setIsLowPower(lowPower);
      document.documentElement.classList.toggle('low-power', lowPower);
    };

    window.addEventListener('resize', computeProfile);
    computeProfile();

    return () => {
      window.removeEventListener('resize', computeProfile);
      document.documentElement.classList.remove('low-power');
    };
  }, [prefersReducedMotion]);

  return { isPhone, isLowPower };
};
