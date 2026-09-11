"use client";

import { useEffect, type RefObject } from "react";
import { FrameSequenceLoader, type FlightSequence } from "./FrameSequenceLoader";
import { advanceMotion, getNarrative, NEURONS, type MotionState } from "./narrative";

const DESKTOP_MOTION = "(min-width: 1024px) and (pointer: fine) and (prefers-reduced-motion: no-preference)";
const clamp = (value: number) => Math.max(0, Math.min(1, value));
const HERO_STATE_EVENT = "cyberi-hero-state";

export function useNeuronScroll(trackRef: RefObject<HTMLDivElement | null>, sequences: FlightSequence[]) {
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const panel = track.querySelector<HTMLElement>("[data-hero-panel]")!;
    const canvas = track.querySelector<HTMLCanvasElement>("canvas")!;
    const chapters = Array.from(track.querySelectorAll<HTMLElement>("[data-chapter]"));
    const stories = Array.from(track.querySelectorAll<HTMLElement>("[data-story]"));
    const media = window.matchMedia(DESKTOP_MOTION);
    let cancelSetup = () => {};

    const setActiveStory = (activeIndex: number) => {
      chapters.forEach((chapter, index) => {
        chapter.dataset.active = String(index === activeIndex);
      });
      stories.forEach((story, index) => {
        const active = index === activeIndex;
        story.dataset.active = String(active);
        story.setAttribute("aria-hidden", String(!active));
        story.querySelectorAll<HTMLElement>("a, button").forEach((control) => {
          control.tabIndex = active ? 0 : -1;
        });
      });
    };

    const setup = () => {
      cancelSetup();
      let cancelled = false;
      let teardown = () => {};
      cancelSetup = () => {
        cancelled = true;
        teardown();
      };

      if (!media.matches) {
        setActiveStory(0);
        return;
      }

      const drawingContext = canvas.getContext("2d", { alpha: false });
      const transitionCanvas = document.createElement("canvas");
      const transitionContext = transitionCanvas.getContext("2d", { alpha: false });
      if (!drawingContext || !transitionContext) return;

      const context = drawingContext;
      const blendContext = transitionContext;
      let raf = 0;
      let target = 0;
      let motion: MotionState = { position: 0, velocity: 0 };
      let lastTime = 0;
      let width = 0;
      let height = 0;
      let activeStory = -1;
      let heroComplete = false;

      const setHeroComplete = (complete: boolean) => {
        if (heroComplete === complete) return;
        heroComplete = complete;
        track.dataset.heroComplete = String(complete);
        window.dispatchEvent(new Event(HERO_STATE_EVENT));
      };

      const worlds = NEURONS.map((id) => {
        const image = new window.Image();
        image.decoding = "async";
        image.src = `/hero/world-${id}.webp`;
        image.onload = () => requestRender();
        return image;
      });

      const drawCover = (
        destination: CanvasRenderingContext2D,
        image: ImageBitmap | HTMLImageElement,
        opacity = 1,
      ) => {
        const imageWidth = image instanceof HTMLImageElement ? image.naturalWidth : image.width;
        const imageHeight = image instanceof HTMLImageElement ? image.naturalHeight : image.height;
        if (!imageWidth || !imageHeight) return;
        const scale = Math.max(width / imageWidth, height / imageHeight);
        destination.globalAlpha = opacity;
        destination.drawImage(
          image,
          (width - imageWidth * scale) * 0.62,
          (height - imageHeight * scale) * 0.5,
          imageWidth * scale,
          imageHeight * scale,
        );
        destination.globalAlpha = 1;
      };

      const drawSequence = (
        destination: CanvasRenderingContext2D,
        sequence: number,
        progress: number,
      ) => {
        const lastIndex = sequences[sequence].frames.length - 1;
        const framePosition = progress * lastIndex;
        const lower = Math.floor(framePosition);
        const upper = Math.ceil(framePosition);
        const first = loader.frame(sequence, lower / lastIndex);
        const second = upper === lower ? first : loader.frame(sequence, upper / lastIndex);

        destination.fillStyle = "#dce9f5";
        destination.fillRect(0, 0, width, height);
        if (first || second) {
          drawCover(destination, (first || second)!);
          // Blend source frames into a new rendered frame on every display refresh.
          if (first && second && first !== second) {
            drawCover(destination, second, framePosition - lower);
          }
        } else {
          drawCover(destination, worlds[sequence]);
          drawCover(destination, worlds[(sequence + 1) % worlds.length], progress);
        }
      };

      function render(time: number) {
        raf = 0;
        if (cancelled) return;

        const delta = lastTime ? (time - lastTime) / 1000 : 1 / 60;
        lastTime = time;
        motion = advanceMotion(motion, target, delta);
        const moving = motion.position !== target;
        setHeroComplete(motion.position >= 1);

        const state = getNarrative(motion.position);
        loader.retain(state.sequence);
        loader.beginFrame();
        panel.style.setProperty("--hero-progress", String(motion.position));

        if (activeStory !== state.story) {
          activeStory = state.story;
          setActiveStory(activeStory);
        }

        drawSequence(context, state.sequence, state.flightProgress);
        if (state.blend > 0 && state.sequence < sequences.length - 1) {
          drawSequence(blendContext, state.sequence + 1, state.nextProgress);
          context.globalAlpha = state.blend;
          context.drawImage(transitionCanvas, 0, 0);
          context.globalAlpha = 1;
        }

        canvas.style.visibility = "visible";
        canvas.style.opacity = "1";
        if (moving) requestRender();
        else lastTime = 0;
      }

      function requestRender() {
        if (!cancelled && !raf) raf = window.requestAnimationFrame(render);
      }

      const loader = new FrameSequenceLoader(sequences, requestRender);

      const syncScroll = () => {
        const scrollTop = window.scrollY;
        const trackTop = track.getBoundingClientRect().top + scrollTop;
        const distance = Math.max(1, track.offsetHeight - panel.offsetHeight);
        target = clamp((scrollTop - trackTop) / distance);
        requestRender();
      };

      const resize = () => {
        const rect = panel.getBoundingClientRect();
        const dpr = Math.min(window.devicePixelRatio || 1, 1.5, 1920 / Math.max(rect.width, 1));
        const nextWidth = Math.round(rect.width * dpr);
        const nextHeight = Math.round(rect.height * dpr);
        if (canvas.width !== nextWidth || canvas.height !== nextHeight) {
          width = nextWidth;
          height = nextHeight;
          canvas.width = transitionCanvas.width = width;
          canvas.height = transitionCanvas.height = height;
        }
        syncScroll();
      };

      const observer = new ResizeObserver(resize);
      observer.observe(panel);
      window.addEventListener("scroll", syncScroll, { passive: true });
      panel.dataset.enhanced = "true";
      track.dataset.heroComplete = "false";
      resize();
      motion = { position: target, velocity: 0 };
      requestRender();

      teardown = () => {
        observer.disconnect();
        window.removeEventListener("scroll", syncScroll);
        window.cancelAnimationFrame(raf);
        loader.dispose();
        worlds.forEach((image) => { image.onload = null; });
        canvas.style.opacity = "0";
        canvas.style.visibility = "hidden";
        canvas.width = canvas.height = transitionCanvas.width = transitionCanvas.height = 0;
        panel.style.removeProperty("--hero-progress");
        delete panel.dataset.enhanced;
        delete track.dataset.heroComplete;
        window.dispatchEvent(new Event(HERO_STATE_EVENT));
        setActiveStory(0);
      };
    };

    setup();
    media.addEventListener("change", setup);
    return () => {
      cancelSetup();
      media.removeEventListener("change", setup);
    };
  }, [trackRef, sequences]);
}
