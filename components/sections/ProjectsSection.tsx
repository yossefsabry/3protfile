/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'framer-motion';
import { SurfaceCodeDiagram } from '../Diagrams';

type ProjectsSectionProps = {
  reducedMotion?: boolean;
  sectionRef?: React.Ref<HTMLElement>;
};

export const ProjectsSection = ({
  reducedMotion = false,
  sectionRef,
}: ProjectsSectionProps) => (
  <section ref={sectionRef} id="projects" className="relative py-24 md:py-32">
    {/* Section divider */}
    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

    <div className="container mx-auto max-w-7xl px-6">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-16 max-w-2xl"
      >
        <p className="mb-4 text-sm font-medium text-[#c4a7e7]">Projects</p>
        <h2 className="font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
          Selected Work
        </h2>
        <p className="mt-4 text-lg text-white/50">
          Projects spanning AI systems, performance-critical tooling, and full-stack applications.
        </p>
      </motion.div>

      {/* Project cards */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <SurfaceCodeDiagram />
      </motion.div>
    </div>
  </section>
);
