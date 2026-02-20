/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { MutableRefObject } from 'react';

export type ThemeMode = 'light' | 'dark';
export type ScrollState = { progress: number; velocity: number; direction: number; fade: number };
export type ScrollStateRef = MutableRefObject<ScrollState>;
