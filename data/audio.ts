/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type MusicTrack = {
  id: string;
  name: string;
  url: string;
};

const musicTrackEntries = import.meta.glob('../music/*.mp3', { eager: true, as: 'url' }) as Record<string, string>;

export const musicTracks: MusicTrack[] = Object.entries(musicTrackEntries)
  .map(([path, url]) => {
    const fileName = path.split('/').pop() || '';
    const name = fileName.replace(/\.mp3$/i, '');
    return {
      id: fileName,
      name,
      url,
    };
  })
  .sort((a, b) => a.name.localeCompare(b.name));

export const themeSwitchTrack = new URL('../music/gay.mp3', import.meta.url).href;
