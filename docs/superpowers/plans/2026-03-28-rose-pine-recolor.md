# Rose Pine Recolor Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Recolor the matrix-shell portfolio from emerald accents to a full Rose Pine palette.

**Architecture:** Keep the current matrix-shell structure, but centralize the palette in shared shell styles and retune the matrix renderer plus UI components to consume the new Rose Pine accents. Use one shell-level test to verify the recolor path is mounted.

**Tech Stack:** React 19, TypeScript, Framer Motion, Vite, Vitest

---

## Chunk 1: Shell Test And Palette Core

### Task 1: Add a failing Rose Pine shell test

**Files:**
- Modify: `tests/app-shell.test.tsx`

- [ ] **Step 1: Write the failing test**
- [ ] **Step 2: Run test to verify it fails**
- [ ] **Step 3: Write minimal implementation**
- [ ] **Step 4: Run test to verify it passes**

### Task 2: Recolor the shell and matrix background

**Files:**
- Modify: `App.tsx`
- Modify: `index.css`
- Modify: `components/effects/MatrixBackground.tsx`

- [ ] **Step 1: Write the failing test**
- [ ] **Step 2: Run test to verify it fails**
- [ ] **Step 3: Write minimal implementation**
- [ ] **Step 4: Run test to verify it passes**

## Chunk 2: UI Surface Recolor

### Task 3: Recolor visible UI surfaces

**Files:**
- Modify: `components/ui/LoadingScreen.tsx`
- Modify: `components/layout/Navigation.tsx`
- Modify: `components/layout/MobileMenu.tsx`
- Modify: `components/ui/AudioMenuButton.tsx`
- Modify: `components/sections/HeroSection.tsx`
- Modify: `components/sections/AboutSection.tsx`
- Modify: `components/sections/ProjectsSection.tsx`
- Modify: `components/sections/ContactSection.tsx`
- Modify: `components/ui/InfoCard.tsx`

- [ ] **Step 1: Write the failing test**
- [ ] **Step 2: Run test to verify it fails**
- [ ] **Step 3: Write minimal implementation**
- [ ] **Step 4: Run test to verify it passes**

### Task 4: Verify production output

**Files:**
- Modify: `package-lock.json`

- [ ] **Step 1: Run targeted tests**
- [ ] **Step 2: Run production build**
