"use client";

import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { AmbientVideo } from "./AmbientVideo";
import { useNeuronScroll } from "./useNeuronScroll";
import sequences from "./flight-manifest.json";
import styles from "./NeuronHero.module.css";

const heroSequences = sequences.slice(0, 2);

const chapters = [
  {
    eyebrow: "Signal / 01",
    label: "Information",
    title: <>See what others<br />overlook.</>,
    description: "We structure fragmented signals and reveal the patterns hidden inside complex information.",
  },
  {
    eyebrow: "Evidence / 02",
    label: "Investigation",
    title: <>Follow the facts<br />to the truth.</>,
    description: "We trace digital evidence with forensic precision, preserving context from first lead to final finding.",
  },
  {
    eyebrow: "Action / 03",
    label: "Intelligence",
    title: <>Move forward<br />with certainty.</>,
    description: "We turn verified findings into decision-ready intelligence that protects people, systems, and institutions.",
  },
];

export function NeuronHero() {
  const trackRef = useRef<HTMLDivElement>(null);
  useNeuronScroll(trackRef, heroSequences);
  return (
    <div ref={trackRef} className={styles.track} data-hero-track>
      <section className={styles.panel} aria-labelledby="hero-title" data-hero-panel>
        <AmbientVideo />
        <div className={styles.visuals} aria-hidden="true">
          <canvas className={styles.canvas} />
          <div className={styles.readability} />
        </div>
        <div className={styles.stories}>
          {chapters.map((chapter, index) => (
            <Story key={chapter.label} chapter={chapter} index={index} />
          ))}
        </div>
        <div className={styles.bottomline} aria-hidden="true">
          <span className={styles.scrollCue}><ArrowDown size={14} /><span className={styles.desktopCue}>Scroll to follow the signal</span><span className={styles.mobileCue}>Connected intelligence</span></span>
          <ol className={styles.chapters}>
            {chapters.map((chapter, index) => <li key={chapter.label} data-chapter data-active={index === 0}><span>0{index + 1}</span>{chapter.label}</li>)}
          </ol>
        </div>
        <div className={styles.progress} aria-hidden="true" />
      </section>
    </div>
  );
}

function Story({ chapter, index }: { chapter: (typeof chapters)[number]; index: number }) {
  const Heading = index === 0 ? "h1" : "h2";
  return (
    <article
      data-story
      data-active={index === 0}
      aria-hidden={index !== 0}
      className={styles.story}
    >
      <p className={styles.eyebrow}>{chapter.eyebrow}</p>
      <Heading id={index === 0 ? "hero-title" : undefined}>{chapter.title}</Heading>
      <p className={styles.description}>{chapter.description}</p>
      <Link href="/services" className={styles.cta} tabIndex={index === 0 ? undefined : -1}>
        Explore our expertise <ArrowUpRight size={15} aria-hidden="true" />
      </Link>
    </article>
  );
}
