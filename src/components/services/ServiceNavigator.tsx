"use client";

import { useEffect, useRef, useState } from "react";
import { serviceNavigation } from "@/components/services/service-content";

export function ServiceNavigator() {
  const [activeId, setActiveId] = useState(serviceNavigation[0].href.slice(1));
  const list = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: [0.05, 0.25, 0.5] },
    );

    serviceNavigation.forEach(({ href }) => {
      const section = document.getElementById(href.slice(1));
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const container = list.current;
    const current = container?.querySelector('[aria-current="location"]');
    if (!container || !current || container.scrollWidth <= container.clientWidth) return;
    const item = current.getBoundingClientRect();
    const bounds = container.getBoundingClientRect();
    container.scrollBy({ left: item.left - bounds.left - (bounds.width - item.width) / 2 });
  }, [activeId]);

  return (
    <nav aria-label="Service navigator" className="sticky top-20 z-30 border-x border-b border-deep-navy bg-intelligence-white/95 backdrop-blur-md dark:bg-obsidian/95" id="capabilities">
      <ol ref={list} className="custom-scrollbar flex overflow-x-auto lg:grid lg:grid-cols-5">
        {serviceNavigation.map((item) => {
          const active = activeId === item.href.slice(1);
          return (
            <li key={item.href} className="min-w-[235px] border-r border-deep-navy last:border-r-0 lg:min-w-0">
              <a href={item.href} aria-current={active ? "location" : undefined} className={`capability-index-link flex min-h-20 items-center gap-4 px-5 py-4 text-[10px] font-bold tracking-[0.1em] uppercase transition-colors ${active ? "bg-command-blue text-white" : "text-deep-navy hover:bg-ice-gray dark:text-mist-blue dark:hover:bg-midnight"}`}>
                <span className={active ? "text-electric-blue" : "text-command-blue dark:text-electric-blue"}>{item.number}</span>
                <span>{item.label}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
