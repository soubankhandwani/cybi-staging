"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Pause, Play } from "lucide-react";
import styles from "./NeuronHero.module.css";

// Match the phone layout in NeuronHero.module.css.
const PHONE_LAYOUT = "(max-width: 639px), (max-height: 500px) and (pointer: coarse)";
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function subscribeToViewport(onChange: () => void) {
  const media = window.matchMedia(PHONE_LAYOUT);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

function canPlayAmbience() {
  return !window.matchMedia(PHONE_LAYOUT).matches;
}

function subscribeToMotion(onChange: () => void) {
  const media = window.matchMedia(REDUCED_MOTION);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

export function AmbientVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [playOverride, setPlayOverride] = useState<boolean | null>(null);
  const reduceMotion = useSyncExternalStore(subscribeToMotion, () => window.matchMedia(REDUCED_MOTION).matches, () => true);
  const showVideo = useSyncExternalStore(subscribeToViewport, canPlayAmbience, () => false);
  const playing = playOverride ?? !reduceMotion;
  const loadVideo = showVideo && (!reduceMotion || playOverride !== null);
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    let visible = false;
    const sync = () => {
      if (!playing || !visible || document.hidden) video.pause();
      else void video.play().catch(() => { /* Autoplay denial leaves the real poster visible. */ });
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
    observer.observe(video);
    document.addEventListener("visibilitychange", sync);
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", sync); video.pause(); };
  }, [playing, loadVideo]);
  return (
    <>
      <div className={styles.ambient} aria-hidden="true" data-hero-media>
        <Image
          src="/hero/world-a.webp"
          alt=""
          fill
          sizes="(min-width: 640px) and (max-height: 500px) and (pointer: coarse) 50vw, 100vw"
          preload
          className={styles.poster}
        />
        {loadVideo && <video ref={ref} className={styles.video} src="/hero/ambient-neural-loop.webm"
          poster="/hero/world-a.webp" loop muted playsInline preload="metadata"
          disablePictureInPicture tabIndex={-1}
          onPlaying={(event) => { event.currentTarget.dataset.ready = "true"; }}
          onError={(event) => { event.currentTarget.dataset.ready = "false"; }} />}
      </div>
      {showVideo && <button type="button" className={styles.ambienceControl}
        aria-label={playing ? "Pause ambient animation" : "Play ambient animation"}
        onClick={() => setPlayOverride(!playing)}>
        {playing ? <Pause size={12} aria-hidden="true" /> : <Play size={12} aria-hidden="true" />}
        <span>Ambience</span>
      </button>}
    </>
  );
}
