/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { memo } from 'react';
import { motion } from 'framer-motion';

const PROJECTS = [
  {
    name: 'building_health_suggestion',
    description: 'AI-driven building health suggestions and structural insights.',
    href: 'https://github.com/yossefsabry/building_health_suggestion',
    tags: ['Python', 'AI', 'Data'],
  },
  {
    name: 'cdraw',
    description: 'Linux drawing app integrated with AI-assisted tooling.',
    href: 'https://github.com/yossefsabry/cdraw',
    tags: ['C', 'Graphics', 'AI'],
  },
  {
    name: 'chatbot_torch',
    description: 'Full chatbot assistant built with PyTorch workflows.',
    href: 'https://github.com/yossefsabry/chatbot_torch',
    tags: ['PyTorch', 'NLP', 'ML'],
  },
  {
    name: 'face_expression_recognition',
    description: 'SVM-based facial expression recognition pipeline.',
    href: 'https://github.com/yossefsabry/face_expression_recognition',
    tags: ['Sklearn', 'Computer Vision', 'ML'],
  },
  {
    name: 'feedback-server',
    description: 'High-throughput Go backend for product feedback systems.',
    href: 'https://github.com/yossefsabry/feedback-server',
    tags: ['Go', 'Backend', 'APIs'],
  },
  {
    name: 'c_interpreter',
    description: 'C language interpreter experiment and parsing core.',
    href: 'https://github.com/yossefsabry/c_interpreter',
    tags: ['C', 'Compilers', 'Systems'],
  },
];

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
  <div className="flex flex-col p-8 bg-white dark:bg-stone-900 rounded-xl shadow-sm border border-stone-200 dark:border-stone-800 transition-colors my-8">
    <div className="flex items-center justify-between mb-6">
      <div>
        <h3 className="font-serif text-2xl text-stone-900 dark:text-stone-100">Selected Projects</h3>
        <p className="text-sm text-stone-500 dark:text-stone-400">Hard builds across AI, systems, and graphics.</p>
      </div>
      <div className="text-[10px] uppercase tracking-[0.4em] text-nobel-gold font-bold">YON3</div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {PROJECTS.map((project, index) => (
        <motion.a
          key={project.name}
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950/40 p-4 transition-all hover:-translate-y-1 hover:border-nobel-gold/60 hover:shadow-lg"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.04 }}
          viewport={{ once: true, amount: 0.25 }}
        >
          <div className="absolute top-4 right-4 text-[9px] uppercase tracking-[0.4em] text-stone-400">GitHub</div>
          <div className="font-serif text-lg text-stone-900 dark:text-stone-100 pr-16 break-words">
            {project.name}
          </div>
          <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed mb-4">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={`${project.name}-${tag}`}
                className="px-2 py-1 text-[10px] uppercase tracking-[0.2em] rounded-full bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-500 dark:text-stone-400"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.a>
      ))}
    </div>
  </div>
));

export const TransformerDecoderDiagram = memo(() => (
  <div className="p-10 bg-stone-950/80 border border-stone-800 rounded-2xl shadow-2xl">
    <div className="flex items-center justify-between mb-8">
      <div>
        <h3 className="font-serif text-2xl text-white">Focus Areas</h3>
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
          className="rounded-xl border border-stone-800 bg-stone-900/60 p-6"
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
  <div className="flex flex-col gap-8 items-center p-8 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 rounded-xl my-8 border border-stone-200 dark:border-stone-800 shadow-lg transition-colors">
    <div className="text-center">
      <h3 className="font-serif text-2xl mb-2 text-stone-900 dark:text-stone-100">Stack & Tools</h3>
      <p className="text-stone-500 dark:text-stone-400 text-sm">Built for speed, clarity, and flexibility.</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
      {STACK.map((group, index) => (
        <motion.div
          key={group.title}
          className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950/40 p-6"
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
