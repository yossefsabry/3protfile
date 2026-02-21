/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { CSSProperties, memo } from 'react';
import { motion } from 'framer-motion';
import { PROJECTS, STATUS_STYLES } from './projectData';

export const SurfaceCodeDiagram = memo(() => (
  <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-8 2xl:gap-6">
    {PROJECTS.map((project, index) => {
      const [cover, ...gallery] = project.imageUrls;
      const statusClass = STATUS_STYLES[project.status.toLowerCase()] ?? STATUS_STYLES.default;
      const galleryItems = gallery.slice(0, 3);
      const galleryColumns = galleryItems.length >= 3
        ? 'grid-cols-3'
        : galleryItems.length === 2
          ? 'grid-cols-2'
          : 'grid-cols-1';
      const galleryGap = galleryItems.length >= 3 ? 'gap-2' : 'gap-3';
      const galleryItemHeight = galleryItems.length >= 3 ? 'h-24' : 'h-32';

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
              <div className="h-60 w-full bg-stone-100 dark:bg-stone-950 flex items-center justify-center">
                <img
                  src={cover}
                  alt={`${project.title} cover`}
                  className="block max-h-full max-w-full object-contain"
                  loading="lazy"
                />
              </div>
            ) : (
              <div className="h-60 w-full bg-gradient-to-br from-stone-200 via-stone-100 to-stone-50 dark:from-stone-900 dark:via-stone-800 dark:to-stone-950" />
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
                      style={{ '--delay': `${0.2 + lineIndex * 0.35}s` } as CSSProperties}
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
                  <span className="mt-1 text-nobel-gold">&bull;</span>
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
            {galleryItems.length ? (
              <div className={`mt-5 grid ${galleryGap} ${galleryColumns}`}>
                {galleryItems.map((image, imageIndex) => (
                  <div
                    key={`${project.slug}-gallery-${imageIndex}`}
                    className={`overflow-hidden rounded-none border border-stone-200 dark:border-stone-800 bg-stone-100 dark:bg-stone-900 ${galleryItemHeight} flex items-center justify-center`}
                  >
                    <img
                      src={image}
                      alt={`${project.title} detail ${imageIndex + 1}`}
                      className="block max-h-full max-w-full object-contain"
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
