"use client";

import { useState, type KeyboardEvent } from "react";
import { IndustryIcon } from "@/components/ui/SiteIcon";
import { industries } from "@/data/industries";

export function IndustriesExplorer() {
  const [activeIndustry, setActiveIndustry] = useState(industries[0].id);
  const selected = industries.find((industry) => industry.id === activeIndustry) ?? industries[0];

  function navigateTabs(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const last = industries.length - 1;
    let next: number;
    switch (event.key) {
      case "ArrowUp": next = index === 0 ? last : index - 1; break;
      case "ArrowDown": next = index === last ? 0 : index + 1; break;
      case "Home": next = 0; break;
      case "End": next = last; break;
      default: return;
    }
    event.preventDefault();
    const id = industries[next].id;
    setActiveIndustry(id);
    document.getElementById(`industry-tab-${id}`)?.focus();
  }

  return (
    <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
      <div className="flex flex-col lg:col-span-4" role="tablist" aria-label="Industries" aria-orientation="vertical">
        {industries.map((industry, index) => {
          const active = selected.id === industry.id;
          return (
            <button key={industry.id} type="button" role="tab" id={`industry-tab-${industry.id}`} aria-controls="industry-panel" aria-selected={active} tabIndex={active ? 0 : -1} onClick={() => setActiveIndustry(industry.id)} onKeyDown={(event) => navigateTabs(event, index)} className="group relative flex w-full cursor-pointer items-center justify-between overflow-hidden border-t border-r border-b border-l-4 border-deep-navy px-4 py-5 text-left first:border-t-2 last:border-b-2 sm:px-6" style={{ borderLeftColor: active ? "#23559C" : "#BFCADA" }}>
              <span className={`absolute inset-y-0 left-0 z-0 bg-signal-blue transition-[width] duration-500 ease-in-out group-hover:w-full ${active ? "w-full" : "w-0"}`} />
              <span className="relative z-10 flex w-full items-center justify-between gap-4">
                <span className={`flex items-center gap-3 ${active ? "text-intelligence-white" : "text-deep-navy group-hover:text-intelligence-white"}`}><IndustryIcon name={industry.icon} className="h-5 w-5 shrink-0" /><span className="text-sm font-bold tracking-wider uppercase sm:text-base">{industry.name}</span></span>
              </span>
            </button>
          );
        })}
      </div>
      <div id="industry-panel" role="tabpanel" aria-labelledby={`industry-tab-${selected.id}`} tabIndex={0} className="relative flex min-h-[420px] flex-col justify-between overflow-hidden border-2 border-deep-navy bg-intelligence-white p-8 lg:col-span-8 md:p-12">
        <span className="technical-grid-large pointer-events-none absolute inset-0 z-0" /><span className="absolute top-0 right-0 z-10 h-px w-24 bg-deep-navy/10" /><span className="absolute top-0 right-0 z-10 h-24 w-px bg-deep-navy/10" /><span className="absolute right-4 bottom-4 font-mono text-[8.5px] font-bold tracking-widest text-steel">CIPHER_MATRIX_DEC_v4</span>
        <div className="relative z-10 mb-8">
          <div className="mb-4 flex items-center gap-2"><span className="h-2.5 w-2.5 animate-pulse border border-command-blue bg-electric-blue" /><span className="font-mono text-[9px] font-bold tracking-widest text-steel uppercase sm:text-[10px]">Sector_Security_Suite // {selected.id}</span></div>
          <h3 className="text-3xl leading-[1.05] font-black tracking-tight uppercase sm:text-4xl md:text-5xl">{selected.title}</h3>
        </div>
        <div className="relative z-10 mt-auto grid grid-cols-1 gap-8 border-t border-mist-blue/50 pt-8 md:grid-cols-2">
          <p className="text-[12px] leading-relaxed font-bold tracking-wider text-deep-navy uppercase sm:text-[13px]">{selected.description[0]}</p>
          <p className="text-[12px] leading-relaxed font-bold tracking-wider text-steel uppercase sm:text-[13px]">{selected.description[1]}</p>
        </div>
      </div>
    </div>
  );
}
