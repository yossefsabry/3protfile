/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Centralized color system for the application.
 * Use these constants to ensure visual consistency across components and scenes.
 */
export const COLORS = {
  // Brand Colors
  nobelGold: '#C5A059',
  nobelGoldMuted: '#8a6d3b',
  nobelGoldLight: '#F5E7C1',
  copper: '#B87333',
  
  // Neutral Palette - Light Mode
  light: {
    background: '#F9F8F4',
    backgroundMuted: '#F5F4EF',
    text: '#0F1115',
    textMuted: '#6B7280',
    border: 'rgba(15, 17, 21, 0.1)',
    card: '#ffffff',
    cursor: '#0f1115',
    cursorRing: 'rgba(15, 17, 21, 0.55)',
    cursorTrail: 'rgba(15, 17, 21, 0.35)',
  },
  
  // Neutral Palette - Dark Mode
  dark: {
    background: '#0F1115',
    backgroundMuted: '#090a0c',
    text: '#ffffff',
    textMuted: '#A1A1AA',
    border: 'rgba(255, 255, 255, 0.1)',
    card: 'rgba(255, 255, 255, 0.02)',
    cursor: '#ffffff',
    cursorRing: 'rgba(255, 255, 255, 0.85)',
    cursorTrail: 'rgba(255, 255, 255, 0.55)',
  },
  
  // Functional Colors
  overlay: 'rgba(15, 17, 21, 0.6)',
  error: '#ef4444',
  success: '#22c55e',
};

/**
 * Helper to get theme-specific colors easily
 */
export const getThemeColors = (isDark: boolean) => isDark ? COLORS.dark : COLORS.light;
