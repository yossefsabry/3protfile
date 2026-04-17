/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { CSSProperties, memo } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { PROJECTS, STATUS_STYLES } from './projectData';

export const SurfaceCodeDiagram = memo(() => (
  <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 2xl:grid-cols-3">
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
          className="group relative overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.02] transition-all hover:border-white/10 hover:bg-white/[0.04]"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.04 }}
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* Cover image area */}
          <div className="relative">
            {showMobileStrip ? (
              <div className="grid h-52 w-full grid-cols-3 gap-1 bg-black/40 p-1 sm:h-60 md:hidden">
                {mobileStripItems.map((image, imageIndex) => (
                  <div
                    key={`${project.slug}-strip-${imageIndex}`}
                    className="overflow-hidden rounded-md bg-black/20"
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
              <div className="hidden md:grid h-64 lg:h-72 w-full grid-cols-3 gap-1.5 bg-black/20 p-2">
                {heroRowItems.map((image, imageIndex) => (
                  <div
                    key={`${project.slug}-hero-${imageIndex}`}
                    className="flex items-center justify-center overflow-hidden rounded-md border border-white/[0.04] bg-black/30"
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
                className={`h-52 w-full items-center justify-center bg-black/20 ${showMobileStrip ? 'hidden md:flex' : 'flex'}`}
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
                className={`h-52 w-full bg-gradient-to-br from-white/[0.03] to-transparent ${showMobileStrip ? 'hidden md:block' : ''}`}
              />
            )}

            {/* Overlay badges */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#09090b]/80 to-transparent p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`rounded-md px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider ${statusClass}`}>
                    {project.status}
                  </span>
                  <span className="rounded-md border border-white/[0.08] bg-white/[0.04] px-2.5 py-1 text-[10px] uppercase tracking-wider text-white/40">
                    {project.year}
                  </span>
                </div>
                <span className="text-[10px] font-medium uppercase tracking-wider text-[#c4a7e7]/60">
                  {project.category}
                </span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-display text-xl font-bold text-white sm:text-2xl">
                  {project.title}
                </h3>
                <p className="mt-1 text-xs uppercase tracking-wider text-white/30">{project.role}</p>
              </div>
            </div>

            <p
              className={`mt-4 ${isCompactCopy ? 'text-sm' : 'text-base'} leading-relaxed text-white/50`}
            >
              {project.tagline}
            </p>

            {project.typing?.length ? (
              <div className="mt-4 rounded-lg border border-white/[0.06] bg-white/[0.02] px-4 py-3">
                <p className="mb-2 text-[10px] font-medium uppercase tracking-wider text-white/25">
                  Telemetry
                </p>
                <div className="space-y-1 font-mono text-sm text-white/50">
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
              className={`mt-4 ${isCompactCopy ? 'text-sm' : 'text-base'} leading-relaxed text-white/50`}
            >
              {project.description}
            </p>

            <ul
              className={`mt-4 ${isCompactCopy ? 'space-y-1.5 text-sm' : 'space-y-2 text-base'} text-white/45`}
            >
              {project.highlights.map((highlight) => (
                <li key={`${project.slug}-${highlight}`} className="flex gap-2">
                  <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-[#c4a7e7]/40" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>

            {/* Tech stack tags */}
            <div className="mt-4 flex flex-wrap gap-1.5">
              {project.stack.map((item) => (
                <span
                  key={`${project.slug}-${item}`}
                  className={`rounded-md border border-white/[0.06] bg-white/[0.02] px-2.5 py-1 ${isCompactCopy ? 'text-[10px]' : 'text-[11px]'} text-white/40`}
                >
                  {item}
                </span>
              ))}
            </div>

            {/* Gallery */}
            {bodyGalleryItems.length ? (
              <div className={`mt-4 ${bodyGalleryVisibility} ${galleryGap} ${galleryColumns}`}>
                {bodyGalleryItems.map((image, imageIndex) => (
                  <div
                    key={`${project.slug}-gallery-${imageIndex}`}
                    className={`flex items-center justify-center overflow-hidden rounded-lg border border-white/[0.04] bg-black/20 ${galleryItemHeight}`}
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

            {/* Links */}
            <div className={isTwoColumnLinks ? 'mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2' : 'mt-5 flex flex-wrap gap-2'}>
              {project.links.map((link) => (
                <a
                  key={`${project.slug}-${link.href}`}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group/link inline-flex items-center gap-1.5 rounded-md border border-white/[0.08] bg-white/[0.03] px-3.5 py-2 text-xs text-white/50 transition-all hover:border-white/15 hover:text-white/80 ${
                    isTwoColumnLinks ? 'w-full justify-center' : ''
                  }`}
                >
                  {link.label}
                  <ArrowUpRight size={12} className="opacity-0 transition-opacity group-hover/link:opacity-100" />
                </a>
              ))}
            </div>
          </div>
        </motion.article>
      );
    })}
  </div>
));
