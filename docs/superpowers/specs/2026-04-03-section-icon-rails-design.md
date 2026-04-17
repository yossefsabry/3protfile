# Section Icon Rails Design

**Date:** 2026-04-03

## Goal

Add clean, section-specific moving icon rails to the portfolio so each major section has its own thin animated surface and assigned icon family. In the first version, each section shows one active moving icon from that assigned family. Only the section closest to the viewport center should animate, so scrolling naturally shifts motion focus from one section to the next.

## Scope

- Add one thin horizontal rail to each major section: `Hero`, `About`, `Projects`, and `Contact`.
- Assign one icon family to each section.
- Render one moving icon per section in the first release.
- Keep motion horizontal, smooth, and visually attached to a subtle surface.
- Only animate the active section near the viewport center.
- Keep inactive rails visible but calm.
- Reuse the existing GIF-based pet assets and animation approach where possible.
- Respect reduced-motion preferences and smaller mobile layouts.

## Approved Mapping

- `Hero`: `fox`
- `About`: `vampire`
- `Projects`: `dog`
- `Contact`: `panda`

## Design

### Overall Architecture

Keep the current free-roaming site pet feature intact and add a second, section-scoped motion layer specifically for rails. Each section renders its own rail component locally, but one shared active-section source owned in `App.tsx` above the sections determines which rail is active so only one rail animates at a time. `App.tsx` should own stable refs for the four major sections and pass those refs into the active-section hook rather than relying on DOM queries by ID.

### Component Split

- `components/pets/SectionPetRail.tsx`: renders a thin rail plus one moving section icon.
- `hooks/useActiveSectionRail.ts`: tracks which section is active from viewport position with stickiness to avoid flicker.
- `hooks/useSectionPetRailAnimation.ts`: runs the lightweight horizontal gliding loop for a rail icon.
- `data/sectionPetRails.ts`: maps section IDs to pet IDs and lane tuning.

### Placement

- `HeroSection.tsx`: rail below the hero content and above the scroll cue.
- `AboutSection.tsx`: rail below the two-column content block.
- `ProjectsSection.tsx`: rail between the intro panel and the large showcase block.
- `ContactSection.tsx`: rail above the contact cards.

Each rail should stay inside the section container width so it feels attached to the section instead of floating over the full page background.

### Motion Model

- The active section rail animates.
- Inactive rails render in a paused state using the pet's `idle` GIF with no horizontal travel.
- Motion stays horizontal with no large bouncing.
- Icons should appear to glide over a polished line or surface, not wander freely.
- Reduced-motion users should see the same `idle` asset with no horizontal travel.
- Active rails should use the pet's `walk` GIF while gliding, and flip horizontally from movement direction instead of switching to unrelated actions.
- The first version uses one icon instance per section, not a mixed pack of multiple icons on the same rail.
- Active state should be sticky: keep the current active section until another section is at least `80px` closer to the viewport center, so rails do not flicker at boundaries.

### Visual Style

- The rail should be a thin line with a subtle glow and faint edge highlight.
- The icon should sit visually on the rail with a light shadow or glow to imply contact with a surface.
- Styling should follow the existing matrix shell and avoid brighter UI than the section cards.

### Data Flow

Each section passes its own section ID into `SectionPetRail`. One shared active-section hook computes which section is active from viewport position and exposes a single `activeSectionId` to all rails. The rail component reads its pet config from section-rail data, derives the correct skin from the current theme, and animates only when its section is active.

### Error Handling

- If a section mapping is missing, render no rail for that section.
- If a mapped pet ID is invalid, render no rail instead of rendering the wrong asset.
- If reduced motion is enabled, disable horizontal movement.
- On narrow screens, shrink icon size and clamp rail travel distance.
- If two sections are nearly tied near the viewport center, keep the current active section until the next winner is at least `80px` closer.

## File Boundaries

- `data/sectionPetRails.ts`: section-to-pet mapping and per-section tuning.
- `components/pets/SectionPetRail.tsx`: presentational rail and icon rendering.
- `hooks/useSectionPetRailAnimation.ts`: rail-specific animation loop.
- `hooks/useActiveSectionRail.ts`: shared active section detection with stickiness.
- `components/sections/*.tsx`: local rail placement.
- `tests/section-pet-rails*.test.tsx`: mapping, active-state, and rendering coverage.

## Risks

- Over-bright rails could compete with existing content cards.
- Full-page animation would feel noisy if multiple sections moved simultaneously.
- Section placement could break on mobile if the lane is too tall or too close to content.
- Tying rails to viewport activity needs to be stable enough to avoid flickering active state while scrolling.

## Validation

- Verify each of the four sections renders its assigned rail.
- Verify only the active section animates while others stay calm.
- Verify section rails switch as the viewport moves down the page.
- Verify active state does not flicker at section boundaries.
- Verify invalid or missing mappings fail closed by rendering no rail.
- Verify the rails remain visually clean on desktop and mobile.
- Verify reduced-motion mode disables rail travel.
