"use client";

import { useState } from "react";
import Image from "next/image";
import { galleryItems } from "@/data/editorial-content";

const filters = ["All", "Training", "Forensics", "Events"] as const;

export function GalleryGrid() {
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>("All");
  const visibleItems = activeFilter === "All" ? galleryItems : galleryItems.filter((item) => item.category === activeFilter);

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-px border border-deep-navy bg-deep-navy" aria-label="Filter gallery">
        {filters.map((filter) => (
          <button key={filter} type="button" aria-pressed={activeFilter === filter} onClick={() => setActiveFilter(filter)} className={`min-h-11 flex-1 cursor-pointer bg-intelligence-white px-4 py-3 text-[10px] font-bold tracking-[0.16em] uppercase transition-colors dark:bg-obsidian ${activeFilter === filter ? "!bg-signal-blue text-intelligence-white" : "text-deep-navy hover:bg-ice-gray dark:text-mist-blue dark:hover:bg-midnight"}`}>
            {filter}
          </button>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-12">
        {visibleItems.map((item, index) => (
          <figure key={`${item.title}-${index}`} className={`${index % 4 === 0 ? "xl:col-span-7" : index % 4 === 1 ? "xl:col-span-5" : "xl:col-span-6"} group border border-deep-navy bg-intelligence-white dark:bg-obsidian`}>
            <div className={`${index % 3 === 1 ? "aspect-[4/3]" : "aspect-[16/10]"} relative overflow-hidden bg-deep-navy`}>
              <Image src={item.image} alt={item.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover grayscale transition duration-700 group-hover:scale-[1.025] group-hover:grayscale-0" />
              <span className="absolute top-3 left-3 border border-intelligence-white/50 bg-obsidian/75 px-2 py-1 text-[9px] font-bold tracking-widest text-intelligence-white uppercase">Demo media</span>
            </div>
            <figcaption className="grid gap-2 border-t border-deep-navy p-4 sm:grid-cols-[1fr_auto] sm:items-end">
              <div><p className="text-[9px] font-bold tracking-widest text-command-blue uppercase dark:text-electric-blue">{item.category}</p><h3 className="mt-1 text-base font-bold tracking-tight uppercase">{item.title}</h3></div>
              <p className="max-w-xs text-[10px] leading-5 text-steel dark:text-mist-blue">{item.caption}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
