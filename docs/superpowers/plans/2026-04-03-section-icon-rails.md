# Section Icon Rails Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add thin, section-specific moving icon rails to Hero, About, Projects, and Contact so each section shows its own pet family on a clean surface and only the active section animates.

**Architecture:** Build a small section-rail layer beside the existing roaming pet system. Keep section mapping data-driven, compute one shared active section from viewport position with sticky selection, and render one local rail per section so the motion stays visually attached to the section layout.

**Tech Stack:** React 19, TypeScript, Framer Motion, Vite, Vitest, Testing Library

---

## Chunk 1: Rail Data And Active Section State

### Task 1: Define the section-to-pet rail mapping

**Files:**
- Create: `data/sectionPetRails.ts`
- Create: `tests/section-pet-rail-data.test.ts`
- Reuse: `data/pets.ts`

- [ ] **Step 1: Write the failing test**

```ts
it('maps each major section to a specific pet rail', () => {
  expect(SECTION_PET_RAILS.map((item) => item.sectionId)).toEqual(['hero', 'about', 'projects', 'contact']);
  expect(SECTION_PET_RAILS.find((item) => item.sectionId === 'hero')?.petId).toBe('fox');
  expect(SECTION_PET_RAILS.find((item) => item.sectionId === 'about')?.petId).toBe('vampire');
  expect(SECTION_PET_RAILS.find((item) => item.sectionId === 'projects')?.petId).toBe('dog');
  expect(SECTION_PET_RAILS.find((item) => item.sectionId === 'contact')?.petId).toBe('panda');
});

it('fails closed when a mapping cannot resolve a pet', () => {
  expect(resolveSectionPetRail('unknown-section')).toBeNull();
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- run tests/section-pet-rail-data.test.ts`
Expected: FAIL because the section rail data module does not exist.

- [ ] **Step 3: Write minimal implementation**

Create a compact mapping with:

- `sectionId`
- `petId`
- `railWidthClass` or equivalent layout hint
- icon size / travel tuning for desktop and mobile
- fail-closed behavior when a mapping or pet ID cannot be resolved

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- run tests/section-pet-rail-data.test.ts`
Expected: PASS

### Task 2: Detect the currently active rail section

**Files:**
- Create: `hooks/useActiveSectionRail.ts`
- Create: `tests/active-section-rail.test.tsx`
- Reuse: section refs owned in `App.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
it('marks the section nearest the viewport center as active', () => {
  const sections = ['hero', 'about', 'projects', 'contact'];
  const { result } = renderHook(() => useActiveSectionRail(sections));
  expect(result.current.activeSectionId).toBe('hero');
});

it('keeps the current section active when another section is not yet 80px closer', () => {
  const sections = ['hero', 'about', 'projects', 'contact'];
  const { result } = renderHook(() => useActiveSectionRail(sections));
  expect(result.current.activeSectionId).toBe('hero');
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- run tests/active-section-rail.test.tsx`
Expected: FAIL because the hook does not exist.

- [ ] **Step 3: Write minimal implementation**

Create a hook that:

- accepts ordered section IDs
- accepts refs for the four tracked section elements from `App.tsx`
- listens to scroll / resize
- checks section positions against viewport center
- uses stable DOM anchors or section refs to measure each section
- applies sticky tie-breaking so active state does not flicker at boundaries
- keeps the current winner until another section is at least `80px` closer to viewport center
- returns `activeSectionId`
- falls back to the first section when layout info is unavailable

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- run tests/active-section-rail.test.tsx`
Expected: PASS

## Chunk 2: Rail Rendering And Motion

### Task 3: Build the section rail component shell

**Files:**
- Create: `components/pets/SectionPetRail.tsx`
- Create: `tests/section-pet-rail.test.tsx`
- Reuse: `data/sectionPetRails.ts`, `data/pets.ts`

- [ ] **Step 1: Write the failing test**

```tsx
it('renders a thin rail with the mapped pet icon', () => {
  render(<SectionPetRail sectionId="about" theme="dark" isActive={false} reducedMotion={false} />);
  expect(screen.getByTestId('section-pet-rail')).toBeInTheDocument();
  expect(screen.getByTestId('section-pet-rail')).toHaveAttribute('data-section-id', 'about');
  expect(screen.getByTestId('section-pet-rail')).toHaveAttribute('data-pet-id', 'vampire');
});

it('renders nothing when the section mapping is missing', () => {
  render(<SectionPetRail sectionId="unknown" theme="dark" isActive={false} reducedMotion={false} />);
  expect(screen.queryByTestId('section-pet-rail')).not.toBeInTheDocument();
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- run tests/section-pet-rail.test.tsx`
Expected: FAIL because the component does not exist.

- [ ] **Step 3: Write minimal implementation**

Render:

- a thin rail line
- one mapped pet icon
- testable data markers for section ID and pet ID
- null output when section mapping is missing or the mapped pet cannot be resolved
- no motion yet beyond basic placement

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- run tests/section-pet-rail.test.tsx`
Expected: PASS

### Task 4: Add active-only horizontal glide behavior

**Files:**
- Create: `hooks/useSectionPetRailAnimation.ts`
- Modify: `components/pets/SectionPetRail.tsx`
- Modify: `tests/section-pet-rail.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
it('animates only when the rail is active', () => {
  render(<SectionPetRail sectionId="projects" theme="dark" isActive reducedMotion={false} />);
  expect(screen.getByTestId('section-pet-rail')).toHaveAttribute('data-motion-mode', 'active');
});

it('stays calm when the rail is inactive', () => {
  render(<SectionPetRail sectionId="projects" theme="dark" isActive={false} reducedMotion={false} />);
  expect(screen.getByTestId('section-pet-rail')).toHaveAttribute('data-motion-mode', 'idle');
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- run tests/section-pet-rail.test.tsx`
Expected: FAIL because the rail does not expose active/inactive motion state yet.

- [ ] **Step 3: Write minimal implementation**

Add a rail animation hook that:

- moves horizontally within a small bounded range
- runs only when `isActive` is true
- pauses cleanly when inactive
- disables travel entirely for reduced motion

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- run tests/section-pet-rail.test.tsx`
Expected: PASS

## Chunk 3: Section Integration

### Task 5: Place rails into the four section components

**Files:**
- Modify: `App.tsx`
- Modify: `components/sections/HeroSection.tsx`
- Modify: `components/sections/AboutSection.tsx`
- Modify: `components/sections/ProjectsSection.tsx`
- Modify: `components/sections/ContactSection.tsx`
- Create: `tests/section-rails-layout.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
it('renders one section rail in each major section', () => {
  render(<><HeroSection onScrollTo={() => () => undefined} /><AboutSection /><ProjectsSection /><ContactSection /></>);
  expect(screen.getAllByTestId('section-pet-rail')).toHaveLength(4);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- run tests/section-rails-layout.test.tsx`
Expected: FAIL because the section components do not render rails yet.

- [ ] **Step 3: Write minimal implementation**

Insert one `SectionPetRail` into each section in the approved placement and pass down a shared `activeSectionId` from a single owner above the sections:

- Hero: below content and above the scroll cue
- About: below the main grid
- Projects: between intro panel and showcase block
- Contact: above the info cards

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- run tests/section-rails-layout.test.tsx`
Expected: PASS

### Task 6: Drive section activity from viewport state

**Files:**
- Modify: `App.tsx`
- Modify: `components/sections/HeroSection.tsx`
- Modify: `components/sections/AboutSection.tsx`
- Modify: `components/sections/ProjectsSection.tsx`
- Modify: `components/sections/ContactSection.tsx`
- Modify: `tests/section-rails-layout.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
it('marks only one section rail as active at a time', () => {
  render(<><HeroSection onScrollTo={() => () => undefined} /><AboutSection /><ProjectsSection /><ContactSection /></>);
  expect(screen.getAllByTestId('section-pet-rail').filter((node) => node.getAttribute('data-motion-mode') === 'active')).toHaveLength(1);
});

it('switches the active rail when viewport position moves to another section', () => {
  render(<App />);
  expect(screen.getAllByTestId('section-pet-rail').some((node) => node.getAttribute('data-motion-mode') === 'active')).toBe(true);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- run tests/section-rails-layout.test.tsx`
Expected: FAIL because activity is not coordinated yet.

- [ ] **Step 3: Write minimal implementation**

Use `useActiveSectionRail` once from the shared owner so exactly one rail animates, the active rail can switch with scroll, and boundary tie-breaking stays stable.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- run tests/section-rails-layout.test.tsx`
Expected: PASS

## Chunk 4: Polish And Verification

### Task 7: Add responsive polish and reduced-motion safeguards

**Files:**
- Modify: `components/pets/SectionPetRail.tsx`
- Modify: `hooks/useSectionPetRailAnimation.ts`
- Modify: `tests/section-pet-rail.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
it('uses calm mode when reduced motion is enabled', () => {
  render(<SectionPetRail sectionId="contact" theme="dark" isActive reducedMotion />);
  expect(screen.getByTestId('section-pet-rail')).toHaveAttribute('data-motion-mode', 'calm');
});

it('uses compact travel bounds on narrow screens', () => {
  window.innerWidth = 390;
  render(<SectionPetRail sectionId="contact" theme="dark" isActive reducedMotion={false} />);
  expect(screen.getByTestId('section-pet-rail')).toHaveAttribute('data-compact', 'true');
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- run tests/section-pet-rail.test.tsx`
Expected: FAIL because reduced-motion calm mode is not yet explicit.

- [ ] **Step 3: Write minimal implementation**

Add:

- explicit calm mode marker
- mobile size / travel clamping
- subtle line and icon glow styling only as needed for the clean surface look
- inactive paused rails that keep the idle asset visible without travel
- active rails that use the `walk` GIF and flip by travel direction

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- run tests/section-pet-rail.test.tsx`
Expected: PASS

### Task 8: Final verification

**Files:**
- Verify: `components/pets/SectionPetRail.tsx`
- Verify: `hooks/useSectionPetRailAnimation.ts`
- Verify: `hooks/useActiveSectionRail.ts`
- Verify: `data/sectionPetRails.ts`
- Verify: `components/sections/HeroSection.tsx`
- Verify: `components/sections/AboutSection.tsx`
- Verify: `components/sections/ProjectsSection.tsx`
- Verify: `components/sections/ContactSection.tsx`
- Verify: `tests/section-pet-rail-data.test.ts`
- Verify: `tests/active-section-rail.test.tsx`
- Verify: `tests/section-pet-rail.test.tsx`
- Verify: `tests/section-rails-layout.test.tsx`

- [ ] **Step 1: Run focused tests**

Run: `npm test -- run tests/section-pet-rail-data.test.ts tests/active-section-rail.test.tsx tests/section-pet-rail.test.tsx tests/section-rails-layout.test.tsx tests/app-shell.test.tsx tests/pet-overlay.test.tsx`
Expected: PASS

- [ ] **Step 2: Run production build**

Run: `npm run build`
Expected: PASS

- [ ] **Step 3: Manual verification**

Check these behaviors in the browser:

- each of the four sections shows its own thin rail
- only one section rail animates at a time
- the active rail switches as the viewport moves between sections
- icons look like they glide on a surface rather than floating randomly
- mobile layout remains clean
- reduced-motion mode disables rail travel
