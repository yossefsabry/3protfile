# Rose Pine Recolor Design

**Date:** 2026-03-28

## Goal

Replace the current emerald matrix shell with a full Rose Pine palette across the main portfolio site, including the matrix rain, panels, accents, navigation, and loading screen.

## Scope

- Apply Rose Pine colors across the main app shell.
- Keep the matrix background effect, but recolor its glyphs and ambient glow.
- Preserve the `/cv` route exclusion.

## Design

### Palette

Use the requested Rose Pine colors as the core accent set:

- `#c4a7e7`
- `#907aa9`
- `#f6c177`
- `#b4637a`
- `#56949f`

The shell stays dark, but shifts from green-black to a Rose Pine night tone with mauve, gold, rose, and foam accents.

### Application

- Background and matrix rain: move from green glyphs and glow to Rose Pine mauve-dominant rain with subtle gold/rose/foam variation.
- Panels and overlays: use muted plum glass and soft mauve borders.
- Text and accents: light text stays readable, with Rose Pine accent colors replacing the emerald highlights.
- Loader and nav: use the same Rose Pine tokens so the shell stays cohesive from first paint onward.

## Validation

- Verify the main shell no longer uses the green accent treatment.
- Verify the matrix background, cards, nav, and loader all use Rose Pine colors consistently.
- Verify tests and production build still pass.
