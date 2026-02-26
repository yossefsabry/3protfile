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
       const categoryLabel = project.category.toLowerCase();
       const roleLabel = project.role.toLowerCase();
       const isCompactCopy = project.slug === 'fun-small-projects';
       const isTwoColumnLinks = project.slug === 'fun-small-projects';
      const isApplicationProject = categoryLabel.includes('android')
        || categoryLabel.includes('application')
        || roleLabel.includes('app');
      const hasHeroRow = isApplicationProject && project.imageUrls.length >= 3;
      const heroRowItems = project.imageUrls.slice(0, 3);
      const mobileStripItems = project.imageUrls.slice(0, 3);
      const showMobileStrip = mobileStripItems.length === 3;
      const bodyGalleryItems = hasHeroRow ? [] : gallery.slice(0, 3);
      const bodyGalleryVisibility = showMobileStrip ? 'hidden md:grid' : 'grid';
      const galleryColumns = bodyGalleryItems.length >= 3
        ? 'grid-cols-3'
        : bodyGalleryItems.length === 2
          ? 'grid-cols-2'
          : 'grid-cols-1';
      const galleryGap = bodyGalleryItems.length >= 3 ? 'gap-2' : 'gap-3';
      const galleryItemHeight = bodyGalleryItems.length >= 3
        ? 'h-24'
        : bodyGalleryItems.length === 1
          ? 'h-40 sm:h-44'
          : 'h-32';
      const galleryImageClass = bodyGalleryItems.length === 1
        ? 'block h-full w-full object-cover'
        : 'block max-h-full max-w-full object-contain';

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
            {showMobileStrip ? (
              <div className="h-56 sm:h-64 w-full bg-stone-100 dark:bg-stone-950 grid grid-cols-3 gap-2 p-2 md:hidden">
                {mobileStripItems.map((image, imageIndex) => (
                  <div
                    key={`${project.slug}-strip-${imageIndex}`}
                    className="overflow-hidden bg-stone-100 dark:bg-stone-900"
                  >
                    <img
                      src={image}
                      alt={`${project.title} preview ${imageIndex + 1}`}
                      className="block h-full w-full object-cover object-top"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            ) : null}
            {hasHeroRow ? (
              <div className="hidden md:grid h-72 lg:h-80 w-full grid-cols-3 gap-3 bg-stone-100 dark:bg-stone-950 p-3 sm:p-4">
                {heroRowItems.map((image, imageIndex) => (
                  <div
                    key={`${project.slug}-hero-${imageIndex}`}
                    className="overflow-hidden rounded-none border border-stone-200/70 dark:border-stone-800/80 bg-stone-100 dark:bg-stone-900 flex items-center justify-center"
                  >
                    <img
                      src={image}
                      alt={`${project.title} preview ${imageIndex + 1}`}
                      className="block h-full w-full object-cover object-top"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            ) : cover ? (
              <div
                className={`h-60 w-full bg-stone-100 dark:bg-stone-950 items-center justify-center ${showMobileStrip ? 'hidden md:flex' : 'flex'}`}
              >
                <img
                  src={cover}
                  alt={`${project.title} cover`}
                  className="block max-h-full max-w-full object-contain"
                  loading="lazy"
                />
              </div>
            ) : (
              <div
                className={`h-60 w-full bg-gradient-to-br from-stone-200 via-stone-100 to-stone-50 dark:from-stone-900 dark:via-stone-800 dark:to-stone-950 ${showMobileStrip ? 'hidden md:block' : ''}`}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-stone-950/55" />
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
             <p
               className={`mt-4 ${isCompactCopy ? 'text-base sm:text-lg' : 'text-lg sm:text-xl'} text-stone-600 dark:text-stone-300 leading-relaxed`}
             >
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
             <p
               className={`mt-5 ${isCompactCopy ? 'text-base sm:text-lg' : 'text-lg sm:text-xl'} text-stone-600 dark:text-stone-300 leading-relaxed`}
             >
               {project.description}
             </p>
             <ul
               className={`mt-4 ${isCompactCopy ? 'space-y-2 text-base' : 'space-y-3 text-lg'} text-stone-600 dark:text-stone-300`}
             >
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
                   className={`px-3 py-1.5 ${isCompactCopy ? 'text-[10px]' : 'text-[11px]'} uppercase tracking-[0.2em] rounded-none bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-300`}
                 >
                   {item}
                 </span>
               ))}
             </div>
            {bodyGalleryItems.length ? (
              <div className={`mt-5 ${bodyGalleryVisibility} ${galleryGap} ${galleryColumns}`}>
                {bodyGalleryItems.map((image, imageIndex) => (
                  <div
                    key={`${project.slug}-gallery-${imageIndex}`}
                    className={`overflow-hidden rounded-none border border-stone-200 dark:border-stone-800 bg-stone-100 dark:bg-stone-900 ${galleryItemHeight} flex items-center justify-center`}
                  >
                    <img
                      src={image}
                      alt={`${project.title} detail ${imageIndex + 1}`}
                      className={galleryImageClass}
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            ) : null}
             <div className={isTwoColumnLinks ? 'mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2' : 'mt-6 flex flex-wrap gap-3'}>
               {project.links.map((link) => (
                 <a
                   key={`${project.slug}-${link.href}`}
                   href={link.href}
                   target="_blank"
                   rel="noopener noreferrer"
                   className={
                     isTwoColumnLinks
                       ? 'w-full px-4 py-2.5 text-center text-[12px] uppercase tracking-[0.35em] rounded-none border border-stone-200 dark:border-stone-800 bg-white/80 dark:bg-stone-900/80 text-stone-700 dark:text-stone-200 hover:border-nobel-gold/60 hover:text-nobel-gold transition-colors'
                       : 'px-4 py-2.5 text-[12px] uppercase tracking-[0.35em] rounded-none border border-stone-200 dark:border-stone-800 bg-white/80 dark:bg-stone-900/80 text-stone-700 dark:text-stone-200 hover:border-nobel-gold/60 hover:text-nobel-gold transition-colors'
                   }
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
