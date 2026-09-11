import { SiteExperience } from "@/components/interactive/SiteExperience";
import { SecurityModal } from "@/components/interactive/SecurityModal";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

export function SiteFrame({ children }: { children: React.ReactNode }) {
  return (
    <SiteExperience>
      <div className="relative min-h-screen overflow-x-clip bg-intelligence-white text-obsidian transition-colors duration-300 dark:bg-obsidian dark:text-intelligence-white">
        <div className="noise-layer pointer-events-none absolute inset-0 z-10 opacity-[0.28] dark:opacity-[0.18]" />
        <div className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(rgba(33,55,90,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(33,55,90,0.06)_1px,transparent_1px)] bg-[size:40px_40px] dark:bg-[linear-gradient(rgba(191,202,218,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(191,202,218,0.05)_1px,transparent_1px)]" />
        <div className="relative z-20 flex min-h-screen w-full flex-col justify-between p-4 sm:p-6 md:p-8">
          <Header />
          {children}
          <Footer />
        </div>
        <SecurityModal />
      </div>
    </SiteExperience>
  );
}
