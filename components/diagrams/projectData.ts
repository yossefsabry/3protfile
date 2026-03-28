/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ProjectLink = {
  label: string;
  href: string;
};

export type ProjectJson = {
  slug: string;
  title: string;
  status: string;
  year: string;
  category: string;
  role: string;
  tagline: string;
  description: string;
  highlights: string[];
  stack: string[];
  typing?: string[];
  links: ProjectLink[];
  imageFolder: string;
  images?: string[];
  order?: number;
};

export type ProjectCardData = ProjectJson & {
  imageUrls: string[];
};

type ImageEntry = {
  path: string;
  url: string;
};

const projectModules = import.meta.glob<ProjectJson>('../../projects/*.json', { eager: true });
const imageModules = import.meta.glob('../../projects/**/*.{png,jpg,jpeg,webp,svg}', {
  eager: true,
  query: '?url',
  import: 'default',
});

const imageBuckets = Object.entries(imageModules).reduce<Record<string, ImageEntry[]>>((acc, [path, url]) => {
  const parts = path.split('/');
  const folder = parts[parts.length - 2];
  if (!folder) return acc;
  const list = acc[folder] ?? [];
  list.push({ path, url: url as string });
  acc[folder] = list;
  return acc;
}, {});

const resolveProjectImages = (project: ProjectJson) => {
  const folderImages = imageBuckets[project.imageFolder] ?? [];
  const sorted = [...folderImages].sort((a, b) => a.path.localeCompare(b.path));

  if (project.images?.length) {
    return project.images
      .map((name) => {
        if (/^https?:\/\//.test(name)) {
          return name;
        }
        return sorted.find((entry) => entry.path.endsWith(`/${name}`))?.url;
      })
      .filter((url): url is string => Boolean(url));
  }

  return sorted.map((entry) => entry.url);
};

export const PROJECTS: ProjectCardData[] = Object.values(projectModules)
  .map((module) => (module as { default?: ProjectJson }).default ?? (module as ProjectJson))
  .map((project) => ({
    ...project,
    imageUrls: resolveProjectImages(project),
  }))
  .sort((a, b) => (a.order ?? 999) - (b.order ?? 999));

export const STATUS_STYLES: Record<string, string> = {
  'open source': 'border-[#56949f]/35 bg-[#56949f]/14 text-[#9ccfd8]',
  'closed source': 'border-[#f6c177]/35 bg-[#f6c177]/14 text-[#f6c177]',
  prototype: 'border-[#b4637a]/35 bg-[#b4637a]/14 text-[#ebbcba]',
  default: 'border-[#907aa9]/28 bg-[#907aa9]/10 text-[#e0def4]/76',
};
