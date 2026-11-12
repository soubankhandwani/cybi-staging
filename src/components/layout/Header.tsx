"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { CyberILogo } from "@/components/ui/CyberILogo";
import { navigation } from "@/data/site-content";

const HERO_STATE_EVENT = "cyberi-hero-state";

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hasClearedHero, setHasClearedHero] = useState(false);
  const hasSurface = !isHome || hasClearedHero || mobileMenuOpen;

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const heroTrack = document.querySelector<HTMLElement>("[data-hero-track]");
      if (!isHome || !heroTrack) {
        setHasClearedHero(!isHome);
        return;
      }
      const trackTop = heroTrack.getBoundingClientRect().top + window.scrollY;
      const animationEnd = trackTop + heroTrack.offsetHeight - window.innerHeight;
      const enhanced = heroTrack.querySelector("[data-hero-panel][data-enhanced]") !== null;
      const animationComplete = heroTrack.dataset.heroComplete === "true";
      setHasClearedHero(window.scrollY >= animationEnd - 1 && (!enhanced || animationComplete));
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    window.addEventListener(HERO_STATE_EVENT, onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener(HERO_STATE_EVENT, onScroll);
      window.cancelAnimationFrame(frame);
    };
  }, [isHome]);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const previousOverflow = document.body.style.overflow;
    const desktop = window.matchMedia("(min-width: 64rem)");
    const closeOnDesktop = () => { if (desktop.matches) setMobileMenuOpen(false); };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setMobileMenuOpen(false);
      document.getElementById("mobile-navigation-toggle")?.focus();
    };
    document.body.style.overflow = "hidden";
    desktop.addEventListener("change", closeOnDesktop);
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      desktop.removeEventListener("change", closeOnDesktop);
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        data-site-header
        data-scrolled={hasSurface}
        className={`fixed inset-x-0 top-0 z-50 h-20 text-midnight transition-[background-color,box-shadow,border-color] duration-300 ${
          hasSurface
            ? "border-b border-mist-blue/70 bg-intelligence-white/95 shadow-[0_8px_30px_rgba(11,18,28,0.08)] backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-full w-full items-center justify-between px-5 sm:px-8 lg:px-12">
          <CyberILogo
            className="h-12 py-0.5 sm:h-13"
          />

          <nav aria-label="Primary navigation" className="hidden items-center gap-7 lg:flex xl:gap-9">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
                className="relative py-2 text-[10px] font-bold tracking-[0.14em] uppercase after:absolute after:right-0 after:bottom-0 after:left-0 after:h-px after:origin-right after:scale-x-0 after:bg-command-blue after:transition-transform after:duration-300 hover:text-command-blue hover:after:origin-left hover:after:scale-x-100 xl:text-[11px]"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <button
            id="mobile-navigation-toggle"
            type="button"
            aria-label={mobileMenuOpen ? "Close navigation" : "Open navigation"}
            aria-controls="mobile-navigation"
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="relative flex h-11 w-11 cursor-pointer items-center justify-center lg:hidden"
          >
            <span className="sr-only">Menu</span>
            <span className="relative block h-4 w-6">
              <i className={`absolute top-0 left-0 h-px w-full bg-current transition-transform duration-300 ${mobileMenuOpen ? "translate-y-[7px] rotate-45" : ""}`} />
              <i className={`absolute top-[7px] left-0 h-px w-full bg-current transition-opacity duration-200 ${mobileMenuOpen ? "opacity-0" : ""}`} />
              <i className={`absolute bottom-0 left-0 h-px w-full bg-current transition-transform duration-300 ${mobileMenuOpen ? "-translate-y-[8px] -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </header>

      {!isHome && <div className="h-20" aria-hidden="true" />}

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav
            id="mobile-navigation"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 top-20 z-40 flex h-[calc(100dvh-5rem)] flex-col overflow-y-auto overscroll-contain bg-intelligence-white px-6 py-8 text-midnight shadow-2xl sm:px-9 lg:hidden"
          >
            <div className="mb-7 flex items-center gap-3 text-[9px] font-bold tracking-[0.18em] text-steel uppercase">
              <span className="h-px w-8 bg-command-blue" /> Navigation
            </div>
            {navigation.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between border-b border-mist-blue/60 py-5 text-lg font-bold tracking-[-0.03em] uppercase transition-colors hover:text-command-blue"
              >
                <span>{item.label}</span>
                <span className="text-[9px] tracking-widest text-steel">0{index + 1}</span>
              </Link>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
