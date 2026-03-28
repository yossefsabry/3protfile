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
          className="group relative overflow-hidden rounded-none border border-[#907aa9]/20 bg-[#1f1d2e]/86 shadow-[0_30px_70px_-50px_rgba(11,10,17,0.7)] transition-all hover:-translate-y-1 hover:border-[#c4a7e7]/52 hover:shadow-[0_35px_80px_-45px_rgba(11,10,17,0.82)]"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: 'easeOut', delay: index * 0.05 }}
          viewport={{ once: true, amount: 0.1 }}
        >
          <div className="relative">
            {showMobileStrip ? (
              <div className="grid h-56 w-full grid-cols-3 gap-2 bg-[#191724] p-2 sm:h-64 md:hidden">
                {mobileStripItems.map((image, imageIndex) => (
                  <div
                    key={`${project.slug}-strip-${imageIndex}`}
                    className="overflow-hidden bg-[#191724]"
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
              <div className="hidden md:grid h-72 lg:h-80 w-full grid-cols-3 gap-3 bg-[#191724] p-3 sm:p-4">
                {heroRowItems.map((image, imageIndex) => (
                  <div
                    key={`${project.slug}-hero-${imageIndex}`}
                    className="flex items-center justify-center overflow-hidden rounded-none border border-[#907aa9]/18 bg-[#191724]"
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
                className={`h-60 w-full items-center justify-center bg-[#191724] ${showMobileStrip ? 'hidden md:flex' : 'flex'}`}
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
                className={`h-60 w-full bg-gradient-to-br from-[#26233a] via-[#1f1d2e] to-[#191724] ${showMobileStrip ? 'hidden md:block' : ''}`}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#191724]/74" />
            <div className="absolute inset-x-0 bottom-0 p-5 flex items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`rounded-none border px-3 py-1 text-[10px] uppercase tracking-[0.3em] ${statusClass}`}>
                  {project.status}
                </span>
                <span className="rounded-none border border-[#907aa9]/24 bg-[#26233a]/78 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-[#e0def4]/74">
                  {project.year}
                </span>
              </div>
              <div className="text-[10px] uppercase tracking-[0.45em] font-semibold text-[#f6c177]">
                {project.category}
              </div>
            </div>
          </div>
          <div className="p-6 sm:p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-serif text-3xl text-[#f6f2ff] sm:text-4xl">{project.title}</h3>
                <p className="mt-2 text-xs uppercase tracking-[0.35em] text-[#e0def4]/58">{project.role}</p>
              </div>
            </div>
             <p
               className={`mt-4 ${isCompactCopy ? 'text-base sm:text-lg' : 'text-lg sm:text-xl'} leading-relaxed text-[#e0def4]/78`}
             >
               {project.tagline}
             </p>
            {project.typing?.length ? (
              <div className="mt-5 rounded-none border border-[#907aa9]/24 bg-[#26233a]/72 px-4 py-3">
                <div className="mb-2 text-[11px] uppercase tracking-[0.35em] text-[#907aa9]">Telemetry</div>
                <div className="space-y-1 font-mono text-sm text-[#e0def4]/78 sm:text-base">
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
               className={`mt-5 ${isCompactCopy ? 'text-base sm:text-lg' : 'text-lg sm:text-xl'} leading-relaxed text-[#e0def4]/78`}
             >
               {project.description}
             </p>
             <ul
               className={`mt-4 ${isCompactCopy ? 'space-y-2 text-base' : 'space-y-3 text-lg'} text-[#e0def4]/76`}
             >
               {project.highlights.map((highlight) => (
                 <li key={`${project.slug}-${highlight}`} className="flex gap-2">
                  <span className="mt-1 text-[#f6c177]">&bull;</span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
             <div className="mt-4 flex flex-wrap gap-2">
               {project.stack.map((item) => (
                 <span
                   key={`${project.slug}-${item}`}
                   className={`px-3 py-1.5 ${isCompactCopy ? 'text-[10px]' : 'text-[11px]'} rounded-none border border-[#907aa9]/22 bg-[#26233a]/72 uppercase tracking-[0.2em] text-[#e0def4]/74`}
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
                    className={`flex items-center justify-center overflow-hidden rounded-none border border-[#907aa9]/18 bg-[#191724] ${galleryItemHeight}`}
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
                       ? 'w-full px-4 py-2.5 text-center text-[12px] uppercase tracking-[0.35em] rounded-none border border-[#907aa9]/22 bg-[#26233a]/78 text-[#e0def4] transition-colors hover:border-[#f6c177]/60 hover:text-[#f6c177]'
                       : 'px-4 py-2.5 text-[12px] uppercase tracking-[0.35em] rounded-none border border-[#907aa9]/22 bg-[#26233a]/78 text-[#e0def4] transition-colors hover:border-[#f6c177]/60 hover:text-[#f6c177]'
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
