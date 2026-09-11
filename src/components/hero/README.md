# Full-screen neuron narrative

The home hero plays the supplied A → B → C footage as a full-viewport scroll sequence and deliberately ends on C. Each neuron activates its own bottom-left narrative chapter. The global header sits transparently above the opening frame, then gains a white sticky surface after the user starts scrolling.

## Tuning

- **Distance:** `NeuronHero.module.css` reserves `900vh` of native sticky travel plus the viewport-height panel. The renderer derives its progress directly from that layout, with no scroll interception or JavaScript pin spacer.
- **Playback rate:** `advanceMotion` in `narrative.ts` moves toward the requested scroll position at a fixed linear rate. Fast wheel and touchpad gestures can change the destination but cannot accelerate the footage, and there is no easing tail after scrolling stops. Native scrolling is never intercepted.
- **Joins:** `getNarrative` overlaps the two clips by 6%. The outgoing frame blends into the moving incoming clip, which continues at the same frame when it becomes current. The unused C → A source remains available, but is intentionally excluded so the closing “Intelligence” chapter stays paired with C.
- **Frame interpolation:** `useNeuronScroll.ts` blends neighboring extracted frames on every display refresh. Its RAF stops once motion settles; loading callbacks can request a new draw.

## Assets

Initially missing directories:

- `/public/hero/frames/a-to-b/`
- `/public/hero/frames/b-to-c/`
- `/public/hero/frames/c-to-a/`

These have been populated with actual frames extracted from the supplied `/public/hero/neuron a to b.mp4`, `/public/hero/neuron b to c.mp4`, and `/public/hero/neuron c to a.mp4`. Each contains 96 WebP files, `frame-0001.webp` through `frame-0096.webp`, at 1280 × 720 and 24 fps. `flight-manifest.json` lists the exact generated paths. No placeholder imagery is used. The original PNGs remain on disk but are no longer rendered.

`scripts/extract-hero-frames.mjs` reproduces the extraction using FFmpeg (`FFMPEG_PATH` can specify its executable). It refuses to overwrite a nonempty frame directory. Run `pnpm hero:frames` only with empty target directories.

The supplied 823 KB ambient WebM is reused unchanged (about 822 kb/s, eight seconds). Playback is muted and inline. The supplied world stills cover loading, playback rejection, and failed flight requests.

## Performance and accessibility

The loader retains compressed blobs only for the current and next flight, prioritizes a seven-frame window around the current scroll position, limits concurrent fetches to six, and retains at most 24 decoded images. That larger hot window prevents visible jumps after fast wheel gestures without decoding whole sequences into memory. Disposal aborts fetches and releases bitmaps. A standard image-decoding fallback covers browsers without `createImageBitmap`. Canvas resolution is capped at 1920 pixels wide and 1.5 DPR. One temporary canvas is used only for clip transitions.

Mobile/coarse-pointer and reduced-motion layouts use the ambient loop with a poster and no pin or frame loading. The ambience can be paused, and playback also pauses offscreen or when the document is hidden. Inactive chapter actions are removed from the tab order and hidden from assistive technology. Hero content stays semantic HTML above the decorative canvas.

## Verification

Run `pnpm test:hero` for motion/clip-boundary tests and Chromium checks of full-screen sizing, chapter progression, header state, reverse scrolling, preload scope, keyboard navigation, mobile/reduced-motion layouts, live preference changes, and failed-frame fallbacks. Screenshots are written to `tmp/hero-*-continuous.png`. Run `pnpm build` and `pnpm lint` for production and lint checks.
