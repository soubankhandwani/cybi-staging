"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import styles from "./NeuronHero.module.css";

export function AmbientVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    let visible = false;
    const sync = () => {
      if (paused || !visible || document.hidden) video.pause();
      else void video.play().catch(() => { /* Autoplay denial leaves the real poster visible. */ });
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
    observer.observe(video);
    document.addEventListener("visibilitychange", sync);
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", sync); video.pause(); };
  }, [paused]);
  return (
    <>
      <div className={styles.ambient} aria-hidden="true">
        <Image src="/hero/world-a.webp" alt="" fill sizes="100vw" priority className={styles.poster} />
        <video ref={ref} className={styles.video} src="/hero/ambient-neural-loop.webm"
          poster="/hero/world-a.webp" autoPlay loop muted playsInline preload="metadata"
          disablePictureInPicture tabIndex={-1}
          onPlaying={(event) => { event.currentTarget.dataset.ready = "true"; }}
          onError={(event) => { event.currentTarget.dataset.ready = "false"; }} />
      </div>
      <button type="button" className={styles.ambienceControl} aria-pressed={paused}
        aria-label={paused ? "Play ambient animation" : "Pause ambient animation"}
        onClick={() => setPaused((value) => !value)}>
        {paused ? <Play size={12} aria-hidden="true" /> : <Pause size={12} aria-hidden="true" />}
        <span>Ambience</span>
      </button>
    </>
  );
}
