/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useLayoutEffect, useRef, useState } from 'react';

type UseThemeTransitionOptions = {
  isBlocked?: boolean;
  onBeforeChange?: (nextTheme: 'light' | 'dark') => void;
  onAfterChange?: (nextTheme: 'light' | 'dark') => void;
  transitionMs?: number;
};

export const useThemeTransition = ({
  isBlocked = false,
  onBeforeChange,
  onAfterChange,
  transitionMs = 900,
}: UseThemeTransitionOptions) => {
  const [isThemeTransitioning, setIsThemeTransitioning] = useState(false);
  const [transitionTheme, setTransitionTheme] = useState<'light' | 'dark' | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved as 'light' | 'dark';
      return 'dark';
    }
    return 'dark';
  });

  useLayoutEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    document.documentElement.style.colorScheme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    if (isThemeTransitioning || isBlocked) return;
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setIsThemeTransitioning(true);
    setTransitionTheme(nextTheme);
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    onBeforeChange?.(nextTheme);
    setTheme(nextTheme);
    onAfterChange?.(nextTheme);
    timeoutRef.current = window.setTimeout(() => {
      setIsThemeTransitioning(false);
      setTransitionTheme(null);
    }, transitionMs);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  return { theme, isThemeTransitioning, transitionTheme, toggleTheme };
};
