# Matrix Background Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the main portfolio's scene-heavy shell with a lightweight matrix background, smoother upward content reveals, and a faster loading path.

**Architecture:** Add one dedicated canvas-based background component and mount it at the app shell level for non-`/cv` pages. Simplify loading so it no longer waits on 3D scene readiness, then retune section styling and reveal motion to fit the black-and-green visual direction.

**Tech Stack:** React 19, TypeScript, Framer Motion, Vite

---

## Chunk 1: Baseline Tests And Matrix Shell

### Task 1: Add test tooling and route-aware shell coverage

**Files:**
- Modify: `package.json`
- Modify: `App.tsx`
- Create: `vitest.config.ts`
- Create: `tests/app-shell.test.tsx`
- Create: `tests/setup.ts`

- [ ] **Step 1: Write the failing test**

```tsx
it('shows the matrix background on the main site but not on /cv', async () => {
  window.history.replaceState({}, '', '/');
  render(<App />);
  expect(screen.getByTestId('matrix-background')).toBeInTheDocument();

  cleanup();
  window.history.replaceState({}, '', '/cv');
  render(<App />);
  expect(screen.queryByTestId('matrix-background')).not.toBeInTheDocument();
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- --runInBand tests/app-shell.test.tsx`
Expected: FAIL because the matrix background and test setup do not exist yet.

- [ ] **Step 3: Write minimal implementation**

Add Vitest + Testing Library setup, then add route-aware shell logic in `App.tsx` so a future matrix background is mounted only outside `/cv`.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- --runInBand tests/app-shell.test.tsx`
Expected: PASS

### Task 2: Implement the matrix background renderer

**Files:**
- Create: `components/effects/MatrixBackground.tsx`
- Modify: `App.tsx`
- Test: `tests/app-shell.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
it('renders an accessible fixed matrix canvas wrapper', async () => {
  window.history.replaceState({}, '', '/');
  render(<App />);
  expect(screen.getByTestId('matrix-background')).toHaveAttribute('aria-hidden', 'true');
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- --runInBand tests/app-shell.test.tsx`
Expected: FAIL because the dedicated matrix component does not exist yet.

- [ ] **Step 3: Write minimal implementation**

Create a canvas-based `MatrixBackground` component with a single animation loop, DPR clamp, sparse green glyphs, and a fixed black wrapper.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- --runInBand tests/app-shell.test.tsx`
Expected: PASS

## Chunk 2: Loading And Motion

### Task 3: Simplify the loading sequence for the non-3D shell

**Files:**
- Modify: `hooks/useLoadingSequence.ts`
- Modify: `components/ui/LoadingScreen.tsx`
- Test: `tests/loading-sequence.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
it('finishes loading without waiting for scene readiness when 3d is disabled', async () => {
  const { result } = renderHook(() => useLoadingSequence(false));
  await waitFor(() => expect(result.current.isLoading).toBe(false));
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- --runInBand tests/loading-sequence.test.ts`
Expected: FAIL if the hook still waits on scene lifecycle behavior.

- [ ] **Step 3: Write minimal implementation**

Short-circuit scene readiness when 3D is not in use and restyle the loading screen to match the black-and-green shell.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- --runInBand tests/loading-sequence.test.ts`
Expected: PASS

### Task 4: Retune section reveal motion and contrast

**Files:**
- Modify: `components/sections/HeroSection.tsx`
- Modify: `components/sections/AboutSection.tsx`
- Modify: `components/sections/ProjectsSection.tsx`
- Modify: `components/sections/ContactSection.tsx`
- Modify: `components/ui/InfoCard.tsx`
- Modify: `index.css`
- Test: `tests/app-shell.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
it('uses the matrix shell class on the app root', async () => {
  window.history.replaceState({}, '', '/');
  render(<App />);
  expect(screen.getByTestId('app-shell')).toHaveClass('matrix-shell');
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- --runInBand tests/app-shell.test.tsx`
Expected: FAIL because the shell class and related styling are not applied yet.

- [ ] **Step 3: Write minimal implementation**

Apply a black shell class, increase content contrast, and standardize upward fade-in motion for hero and sections.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- --runInBand tests/app-shell.test.tsx`
Expected: PASS

## Chunk 3: Cleanup And Verification

### Task 5: Remove the main-site dependency on the old scene path

**Files:**
- Modify: `App.tsx`
- Modify: `components/layout/SceneLayers.tsx`
- Test: `tests/app-shell.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
it('does not render the legacy scene container in the main shell', async () => {
  window.history.replaceState({}, '', '/');
  render(<App />);
  expect(screen.queryByTestId('legacy-scene-layers')).not.toBeInTheDocument();
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- --runInBand tests/app-shell.test.tsx`
Expected: FAIL because the app still mounts the old scene path.

- [ ] **Step 3: Write minimal implementation**

Remove the main app's direct `SceneLayers` usage and leave the old component isolated or dormant without affecting the main route.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- --runInBand tests/app-shell.test.tsx`
Expected: PASS

- [ ] **Step 5: Final verification**

Run: `npm run build`
Expected: PASS with a production bundle that includes the matrix background and updated shell.
