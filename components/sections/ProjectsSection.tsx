/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BookOpen } from 'lucide-react';
import { SurfaceCodeDiagram } from '../Diagrams';

export const ProjectsSection = () => (
  <section id="projects" className="py-24 md:py-32 bg-white/60 dark:bg-black/35 transition-colors duration-500">
    <div className="container mx-auto px-6">
      <div className="flex flex-col items-center text-center gap-12 md:gap-16">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-white dark:bg-stone-800 text-nobel-gold text-xs font-black tracking-widest uppercase rounded-2xl mb-6 border border-stone-100 dark:border-stone-700 shadow-sm">
            <BookOpen size={16} /> PROJECTS
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl md:text-4xl mb-6 text-stone-900 dark:text-white">
          These are the projects that pushed me into deeper systems, AI workflows, and performance-focused tooling.
              </h2>
          <p className="text-lg md:text-xl text-stone-600 dark:text-stone-400 mb-8 leading-relaxed font-light">
          </p>
          <ul className="mx-auto max-w-xl space-y-4 text-stone-700 dark:text-stone-300">
            <li className="flex items-start justify-center gap-4 text-center">
              <span className="w-6 h-6 rounded-full bg-nobel-gold/20 flex items-center justify-center text-nobel-gold shrink-0 mt-1">&bull;</span>
              <span><strong>AI + Systems:</strong> Models, tools, and infrastructure that scale.</span>
            </li>
            <li className="flex items-start justify-center gap-4 text-center">
              <span className="w-6 h-6 rounded-full bg-nobel-gold/20 flex items-center justify-center text-nobel-gold shrink-0 mt-1">&bull;</span>
              <span><strong>Graphics + UI:</strong> Clean visuals with fast interaction loops.</span>
            </li>
          </ul>
        </div>
        <div className="relative w-full max-w-[92rem] text-left">
          <div className="absolute -inset-4 bg-nobel-gold/5 blur-3xl rounded-full"></div>
          <SurfaceCodeDiagram />
        </div>
      </div>
    </div>
  </section>
);
