# Site Pets Design

**Date:** 2026-04-03

## Goal

Add a site-wide pet feature to the portfolio, using `webpets/` as the behavior reference, while fitting the existing Vite + React app structure. The pet layer should be enabled by default, visible across the main site, interactive on click, theme-aware, and controllable from the header. The initial preset set should match the pets you selected from the reference assets.

## Scope

- Show one active pet across the whole portfolio shell.
- Add a header toggle to turn pets on and off.
- Add a small settings panel for switching between a few preset pets.
- Use these initial pets from `webpets/`: `crab/red`, `deno/green`, `fox/red`, `vampire/girl`, `dog/brown`, and `panda/black`.
- Save pet enabled state and selected pet in `localStorage`.
- Make pet skins respond to the active site theme.
- Trigger a short reaction animation when the user clicks the pet.
- Respect reduced-motion preferences and mobile constraints.
- Keep the catalog extensible so more pets can be added later without changing the overlay engine.

## Reference Findings From `webpets/`

- `webpets/components/web-pet.tsx` contains the core GIF-based overlay implementation.
- The reference behavior is driven by a `requestAnimationFrame` loop that switches between roaming, idle, and hover-reaction states.
- Pets are rendered as fixed-position bottom overlays, but the reference implementation sets `pointer-events: none`, so click reactions will need a portfolio-specific interaction layer.
- The reference already handles `prefers-reduced-motion`, which should be preserved.
- The surrounding Next.js dashboard, theme provider, and docs pages are not directly reusable in the portfolio app.

## Design

### Overall Architecture

Mount the pet system once at the app-shell level in `App.tsx`. The feature should be split into a small preference layer, a dedicated overlay renderer, and lightweight controls in navigation. This keeps animation logic isolated from header UI and avoids coupling the pet behavior to any one page section.

### Component Split

- `components/pets/PetOverlay.tsx`: renders the active pet across the site.
- `components/pets/PetSettingsPanel.tsx`: compact settings surface for selecting from a few preset pets.
- `components/ui/PetToggleButton.tsx`: header control for enabling and disabling pets.
- `hooks/usePetPreferences.ts`: manages enabled state, selected pet, persistence, and validation.
- `hooks/usePetAnimation.ts`: portfolio adaptation of the `webpets` movement loop.
- `data/pets.ts`: preset pet metadata, theme skin mapping, speeds, scale, and actions.

### Initial Pet Catalog

The first release should ship with these curated pets from the reference assets:

- `crab/red`
- `deno/green`
- `fox/red`
- `vampire/girl`
- `dog/brown`
- `panda/black`

The catalog shape should stay data-driven so more pets can be added later by extending `data/pets.ts` and copying assets into `public/pets/`, without changing the animation engine or navigation controls.

### Theme Integration

The pet should not be themed independently from the rest of the site. Instead, the active site theme determines which skin or color variant each preset pet uses. Because the selected starter pets do not all have full light/dark sprite pairs in `webpets/`, the theme model must be explicit:

- use alternate sprite variants when they exist, for example `fox/red` for dark and `fox/white` for light
- for single-skin pets such as `crab/red`, `deno/green`, `vampire/girl`, `dog/brown`, and `panda/black`, keep the same sprite and switch only the surrounding presentation, such as glow, accent, or settings-panel styling

The current codebase already has theme helpers, but the main app shell is not fully wiring an active theme controller into `App.tsx`; this work must be included so pet state follows the real site theme rather than a separate pet-only theme.

### Interaction Model

The default state is pets enabled. The user can:

- toggle pets on and off from the header
- open a small settings panel from the header
- choose from a few curated preset pets
- click the pet to trigger a short reaction animation

Roaming behavior should mirror the feel of `webpets`, but the first version should stay small: one active pet at a time, no full dashboard, and no drag/drop placement editing. The click reaction is a portfolio-specific extension on top of the reference behavior: the overlay should temporarily switch to an explicit reaction action such as `swipe` or `with_ball` for a short timeout before returning to roaming or idle.

### Motion And Performance

The pet uses one `requestAnimationFrame` loop with bounded horizontal movement. Reduced-motion users should get a calm mode with roaming disabled or heavily minimized. Mobile should use smaller scale values and stricter movement bounds so the pet does not compete with header controls or obscure content.

### Asset Strategy

Do not depend on `webpets/public/` at runtime. Instead, copy only the selected pet assets needed for the portfolio into the portfolio app's root `public/` directory, likely under `public/pets/`. This keeps the Vite app self-contained and avoids cross-project asset assumptions.

### Error Handling

- If `localStorage` is unavailable, fall back to in-memory defaults.
- If the stored pet key is invalid, reset to the default preset pet.
- If a theme-specific asset is missing, fall back to that pet's default skin.
- If reduced motion is enabled, skip roaming updates and keep only calm idle/reaction behavior.
- If the viewport is narrow, clamp the pet to a safe movement range.

## File Boundaries

- `App.tsx`: mount the pet system and connect theme and preferences into the shell.
- `components/layout/Navigation.tsx`: add pet toggle and settings trigger to desktop navigation.
- `components/layout/MobileMenu.tsx`: expose pet controls in the mobile path without overcrowding the header.
- `hooks/useThemeTransition.ts`: either wire into `App.tsx` or extend its usage so pet skins can track the active theme.
- `tests/app-shell.test.tsx`: cover shell-level pet mounting and saved enabled state.
- `tests/navigation.test.tsx` and `tests/mobile-menu.test.tsx`: cover the real navigation controls instead of relying on the current `app-shell` mocks.
- New pet files under `components/pets/`, `components/ui/`, `hooks/`, and `data/`: keep pet responsibilities focused.

## Risks

- Copying too much from `webpets` would drag in Next.js-specific assumptions.
- GIF-based pets can feel noisy against the current matrix shell if scale and speed are not tuned.
- Mobile header space is limited, so controls must stay compact.
- Missing or inconsistent theme assets could make the feature feel broken if fallback behavior is not implemented.
- Click support requires changing the pet layer from the reference's passive overlay model to an interactive element without hurting pointer behavior for the rest of the page.

## Validation

- Verify pets render by default on the main site.
- Verify the header toggle disables and re-enables the pet layer.
- Verify the selected preset pet is restored from `localStorage`.
- Verify the pet skin changes when the active theme changes.
- Verify clicking the pet triggers a temporary reaction animation.
- Verify reduced-motion mode disables roaming.
- Verify desktop and mobile layouts remain usable with the pet enabled.
