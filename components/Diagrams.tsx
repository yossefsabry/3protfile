/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { memo } from 'react';
import { motion } from 'framer-motion';

type ProjectLink = {
  label: string;
  href: string;
};

type ProjectJson = {
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

type ProjectCardData = ProjectJson & {
  imageUrls: string[];
};

type ImageEntry = {
  path: string;
  url: string;
};

const projectModules = import.meta.glob<ProjectJson>('../projects/*.json', { eager: true });
const imageModules = import.meta.glob('../projects/**/*.{png,jpg,jpeg,webp,svg}', {
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
      .map((name) => sorted.find((entry) => entry.path.endsWith(`/${name}`))?.url)
      .filter((url): url is string => Boolean(url));
  }

  return sorted.map((entry) => entry.url);
};

const PROJECTS: ProjectCardData[] = Object.values(projectModules)
  .map((module) => (module as { default?: ProjectJson }).default ?? (module as ProjectJson))
  .map((project) => ({
    ...project,
    imageUrls: resolveProjectImages(project),
  }))
  .sort((a, b) => (a.order ?? 999) - (b.order ?? 999));

const STATUS_STYLES: Record<string, string> = {
  'open source': 'border-emerald-500/30 bg-emerald-500/15 text-emerald-600 dark:text-emerald-300',
  'closed source': 'border-amber-500/30 bg-amber-500/15 text-amber-600 dark:text-amber-300',
  prototype: 'border-sky-500/30 bg-sky-500/15 text-sky-600 dark:text-sky-300',
  default: 'border-stone-400/30 bg-stone-400/10 text-stone-600 dark:text-stone-300',
};

const FOCUS_AREAS = [
  {
    title: 'Performance-first UI',
    description: 'Precise layouts, fast interactions, and zero fluff UX.',
    detail: 'Micro-optimizations, rendering control, and clean motion.',
  },
  {
    title: 'AI + Systems',
    description: 'Experimentation with ML tooling and system-level builds.',
    detail: 'Pipelines, model workflows, and data-driven prototypes.',
  },
  {
    title: 'Graphics + Creative Tools',
    description: 'Visual systems, tooling, and playful app mechanics.',
    detail: 'From drawing apps to simulation-oriented experiments.',
  },
];

const STACK = [
  {
    title: 'Fullstack',
    items: ['TypeScript', 'React', 'Node.js', 'Express', 'PostgreSQL'],
  },
  {
    title: 'AI + Data',
    items: ['Python', 'PyTorch', 'Sklearn', 'Jupyter', 'Pandas'],
  },
  {
    title: 'Systems',
    items: ['C', 'Linux', 'CLI Tools', 'Parsing', 'Performance'],
  },
  {
    title: 'Apps',
    items: ['Kotlin', 'Android', 'Jetpack', 'Material'],
  },
];

export const SurfaceCodeDiagram = memo(() => (
  <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-8 2xl:gap-6">
    {PROJECTS.map((project, index) => {
      const [cover, ...gallery] = project.imageUrls;
      const statusClass = STATUS_STYLES[project.status.toLowerCase()] ?? STATUS_STYLES.default;
      const galleryColumns = gallery.length > 1 ? 'grid-cols-2' : 'grid-cols-1';

      return (
        <motion.article
          key={project.slug}
          className="group relative overflow-hidden rounded-none border border-stone-200/70 dark:border-stone-800/80 bg-white/80 dark:bg-stone-950/80 shadow-[0_30px_70px_-50px_rgba(15,17,21,0.6)] transition-all hover:-translate-y-1 hover:border-nobel-gold/60 hover:shadow-[0_35px_80px_-45px_rgba(15,17,21,0.7)]"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: 'easeOut', delay: index * 0.05 }}
          viewport={{ once: true, amount: 0.25 }}
        >
          <div className="relative">
            {cover ? (
              <img
                src={cover}
                alt={`${project.title} cover`}
                className="h-56 w-full object-cover"
                loading="lazy"
              />
            ) : (
              <div className="h-56 w-full bg-gradient-to-br from-stone-200 via-stone-100 to-stone-50 dark:from-stone-900 dark:via-stone-800 dark:to-stone-950" />
            )}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-stone-950/70" />
            <div className="absolute inset-x-0 bottom-0 p-5 flex items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`rounded-none border px-3 py-1 text-[10px] uppercase tracking-[0.3em] ${statusClass}`}>
                  {project.status}
                </span>
                <span className="rounded-none border border-stone-200/70 bg-white/70 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-stone-600 dark:border-stone-700/70 dark:bg-stone-900/70 dark:text-stone-300">
                  {project.year}
                </span>
              </div>
              <div className="text-[10px] uppercase tracking-[0.45em] text-nobel-gold font-semibold">
                {project.category}
              </div>
            </div>
          </div>
          <div className="p-6 sm:p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-serif text-3xl sm:text-4xl text-stone-900 dark:text-stone-100">{project.title}</h3>
                <p className="mt-2 text-xs uppercase tracking-[0.35em] text-stone-500 dark:text-stone-400">{project.role}</p>
              </div>
            </div>
            <p className="mt-4 text-lg sm:text-xl text-stone-600 dark:text-stone-300 leading-relaxed">
              {project.tagline}
            </p>
            {project.typing?.length ? (
              <div className="mt-5 rounded-none border border-stone-200/80 dark:border-stone-800/80 bg-white/70 dark:bg-stone-900/60 px-4 py-3">
                <div className="text-[11px] uppercase tracking-[0.35em] text-stone-500 dark:text-stone-400 mb-2">Telemetry</div>
                <div className="space-y-1 font-mono text-sm sm:text-base text-stone-600 dark:text-stone-300">
                  {project.typing.map((line, lineIndex) => (
                    <div
                      key={`${project.slug}-typing-${lineIndex}`}
                      className="typing-line"
                      style={{ '--delay': `${0.2 + lineIndex * 0.35}s` } as React.CSSProperties}
                    >
                      {line}
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
            <p className="mt-5 text-lg sm:text-xl text-stone-600 dark:text-stone-300 leading-relaxed">
              {project.description}
            </p>
            <ul className="mt-4 space-y-3 text-lg text-stone-600 dark:text-stone-300">
              {project.highlights.map((highlight) => (
                <li key={`${project.slug}-${highlight}`} className="flex gap-2">
                  <span className="mt-1 text-nobel-gold">•</span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.stack.map((item) => (
                <span
                  key={`${project.slug}-${item}`}
                  className="px-3 py-1.5 text-[11px] uppercase tracking-[0.2em] rounded-none bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-300"
                >
                  {item}
                </span>
              ))}
            </div>
            {gallery.length ? (
              <div className={`mt-5 grid gap-3 ${galleryColumns}`}>
                {gallery.slice(0, 2).map((image, imageIndex) => (
                  <div
                    key={`${project.slug}-gallery-${imageIndex}`}
                    className="overflow-hidden rounded-none border border-stone-200 dark:border-stone-800 bg-stone-100 dark:bg-stone-900"
                  >
                    <img
                      src={image}
                      alt={`${project.title} detail ${imageIndex + 1}`}
                      className="h-28 w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            ) : null}
            <div className="mt-6 flex flex-wrap gap-3">
              {project.links.map((link) => (
                <a
                  key={`${project.slug}-${link.href}`}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 text-[12px] uppercase tracking-[0.35em] rounded-none border border-stone-200 dark:border-stone-800 bg-white/80 dark:bg-stone-900/80 text-stone-700 dark:text-stone-200 hover:border-nobel-gold/60 hover:text-nobel-gold transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </motion.article>
      );
    })}
  </div>
));

export const TransformerDecoderDiagram = memo(() => (
  <div className="p-6 sm:p-8 lg:p-10 bg-stone-950/80 border border-stone-800 rounded-2xl shadow-2xl">
    <div className="flex items-center justify-between mb-8">
      <div>
        <h3 className="font-serif text-xl sm:text-2xl text-white">Focus Areas</h3>
        <p className="text-sm text-stone-400">Where I push for depth and polish.</p>
      </div>
      <div className="px-3 py-1 text-[10px] uppercase tracking-[0.4em] text-nobel-gold border border-stone-700 rounded-full">
        TECH GEEK
      </div>
    </div>
    <div className="grid gap-6">
      {FOCUS_AREAS.map((focus, index) => (
        <motion.div
          key={focus.title}
          className="rounded-xl border border-stone-800 bg-stone-900/60 p-5 sm:p-6"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.05 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="text-lg font-serif text-nobel-gold mb-2">{focus.title}</div>
          <div className="text-stone-300 text-sm mb-2">{focus.description}</div>
          <div className="text-stone-500 text-xs uppercase tracking-[0.2em]">{focus.detail}</div>
        </motion.div>
      ))}
    </div>
  </div>
));

export const PerformanceMetricDiagram = memo(() => (
  <div className="flex flex-col gap-6 sm:gap-8 items-center p-6 sm:p-8 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 rounded-xl my-6 sm:my-8 border border-stone-200 dark:border-stone-800 shadow-lg transition-colors">
    <div className="text-center">
      <h3 className="font-serif text-xl sm:text-2xl mb-2 text-stone-900 dark:text-stone-100">Stack & Tools</h3>
      <p className="text-stone-500 dark:text-stone-400 text-sm">Built for speed, clarity, and flexibility.</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 w-full">
      {STACK.map((group, index) => (
        <motion.div
          key={group.title}
          className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950/40 p-5 sm:p-6"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.05 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="text-sm uppercase tracking-[0.3em] text-stone-500 dark:text-stone-400 mb-3">
            {group.title}
          </div>
          <div className="flex flex-wrap gap-2">
            {group.items.map((item) => (
              <span
                key={`${group.title}-${item}`}
                className="px-3 py-1 text-[11px] rounded-full bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-300"
              >
                {item}
              </span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  </div>
));
