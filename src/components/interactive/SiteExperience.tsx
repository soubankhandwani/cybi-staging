"use client";

import { createContext, useContext, useMemo, useState, useSyncExternalStore } from "react";
import type { ModalName } from "@/types";

interface SiteExperienceValue {
  activeModal: ModalName | null;
  closeModal: () => void;
  isDarkMode: boolean;
  openModal: (modal: ModalName) => void;
  toggleTheme: () => void;
}

const SiteExperienceContext = createContext<SiteExperienceValue | null>(null);
const themeEvent = "cyberi-theme-change";

function subscribeToTheme(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(themeEvent, onStoreChange);
  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(themeEvent, onStoreChange);
  };
}

function getThemeSnapshot() {
  return window.localStorage.getItem("cyberi-theme") === "dark";
}

export function SiteExperience({ children }: { children: React.ReactNode }) {
  const isDarkMode = useSyncExternalStore(subscribeToTheme, getThemeSnapshot, () => false);
  const [activeModal, setActiveModal] = useState<ModalName | null>(null);

  const value = useMemo<SiteExperienceValue>(() => ({
    activeModal,
    closeModal: () => setActiveModal(null),
    isDarkMode,
    openModal: setActiveModal,
    toggleTheme: () => {
      window.localStorage.setItem("cyberi-theme", isDarkMode ? "light" : "dark");
      window.dispatchEvent(new Event(themeEvent));
    },
  }), [activeModal, isDarkMode]);

  return (
    <SiteExperienceContext.Provider value={value}>
      <div className={isDarkMode ? "dark" : undefined}>{children}</div>
    </SiteExperienceContext.Provider>
  );
}

export function useSiteExperience() {
  const context = useContext(SiteExperienceContext);
  if (!context) throw new Error("useSiteExperience must be used within SiteExperience");
  return context;
}
