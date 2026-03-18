/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Centralized color system for the application.
 * Using the Rosé Pine palette for a professional, warm, and atmospheric feel.
 */
export const COLORS = {
  // Brand Colors (Accents from Rosé Pine)
  rose: '#ebbcba',
  gold: '#f6c177',
  iris: '#c4a7e7',
  pine: '#31748f',
  love: '#eb6f92',
  foam: '#9ccfd8',
  
  // Nobel Gold compatibility (aliased to Rosé Pine Gold/Rose)
  nobelGold: '#f6c177', 
  nobelGoldMuted: '#ebbcba',
  nobelGoldLight: '#f2e9e1',
  copper: '#d7827e',
  
  // Neutral Palette - Light Mode (Rosé Pine Dawn)
  light: {
    background: '#faf4ed',     // base
    backgroundMuted: '#fffaf3', // surface
    text: '#575279',           // text
    textMuted: '#797593',      // subtle
    border: 'rgba(152, 147, 165, 0.15)', // muted
    card: '#fffaf3',           // surface
    cursor: '#575279',
    cursorRing: 'rgba(152, 147, 165, 0.55)',
    cursorTrail: 'rgba(152, 147, 165, 0.35)',
  },
  
  // Neutral Palette - Dark Mode (Rosé Pine)
  dark: {
    background: '#191724',     // base
    backgroundMuted: '#1f1d2e', // surface
    text: '#e0def4',           // text
    textMuted: '#908caa',      // subtle
    border: 'rgba(110, 106, 134, 0.15)', // muted
    card: '#1f1d2e',           // surface
    cursor: '#e0def4',
    cursorRing: 'rgba(110, 106, 134, 0.85)',
    cursorTrail: 'rgba(110, 106, 134, 0.55)',
  },
  
  // Functional Colors
  overlay: 'rgba(31, 29, 46, 0.75)',
  error: '#eb6f92', // love
  success: '#9ccfd8', // foam
};

/**
 * Helper to get theme-specific colors easily
 */
export const getThemeColors = (isDark: boolean) => isDark ? COLORS.dark : COLORS.light;
