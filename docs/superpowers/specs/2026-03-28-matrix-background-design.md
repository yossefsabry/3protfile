# Matrix Background Design

**Date:** 2026-03-28

## Goal

Replace the main site's heavy scene-driven background with a lightweight, smooth `cmatrix`-style experience: black site background, green animated glyph rain, smoother upward content reveals, and faster initial loading. The `/cv` route must remain untouched.

## Scope

- Apply the matrix background to the main portfolio app only.
- Exclude `/cv` from the matrix treatment.
- Keep portfolio content structure intact.
- Improve perceived performance by bypassing the current 3D scene path on the main site.

## Design

### Background System

Use a fixed full-screen canvas layer rendered behind the site content. The canvas draws sparse green glyph columns over a black base, with capped density and speed so the effect stays readable and inexpensive. Mobile gets fewer columns and larger spacing. Reduced-motion users get a softer, near-static version.

### Visual Language

The page shell becomes black-first. Matrix glyphs use green with low opacity and slight variation to keep the effect atmospheric instead of noisy. Existing content remains above the background with stronger contrast and modest panel overlays where needed.

### Motion

Scrolling remains native and smooth. Hero and section content reveal upward with a gentle fade-in, replacing harsher lateral motion where appropriate. The effect should feel responsive without JS scroll hijacking.

### Loading and Performance

The main app should no longer block on the 3D scene lifecycle. The loading screen becomes shorter and simpler, with no dependency on scene readiness. The matrix renderer uses a single `requestAnimationFrame` loop, device-pixel-ratio clamping, and reduced density on constrained devices.

## File Boundaries

- `App.tsx`: remove main-site dependence on 3D scene layers and mount the matrix background conditionally.
- `components/layout/SceneLayers.tsx`: either retire from the main path or leave unused for future fallback.
- `components/ui/LoadingScreen.tsx`: simplify visuals to fit the new black/green shell.
- `components/effects/MatrixBackground.tsx`: own the lightweight canvas renderer.
- `hooks/useLoadingSequence.ts`: stop waiting for scene readiness when the main site no longer uses it.
- Section components and shared styles: retune backgrounds and upward reveal motion.

## Risks

- Too much glyph density will reduce readability and hurt paint performance.
- Pure black plus neon green can become visually harsh without opacity control.
- If section overlays stay too transparent, content contrast will drop against moving glyphs.

## Validation

- Verify the matrix background appears on the main app and not on `/cv`.
- Verify startup no longer waits on scene readiness.
- Verify section copy reveals upward smoothly during scroll.
- Verify the build succeeds and the app remains readable on desktop and mobile.
