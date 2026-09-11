import Image from "next/image";
import { ModalTrigger } from "@/components/interactive/ModalTrigger";

const globeVideo = "https://res.cloudinary.com/dbzx2pddp/video/upload/v1781262794/Add_revolution_to_earth_globe_202606121642_z2gkcs.mp4";
const avatars = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150",
];

export function RevolutionSection() {
  return (
    <section className="relative z-20 flex w-full flex-col items-center overflow-hidden border-t border-mist-blue/50 bg-intelligence-white pt-16 pb-0 text-obsidian select-none dark:border-mist-blue/10 dark:bg-obsidian dark:text-intelligence-white">
      <div className="noise-layer pointer-events-none absolute inset-0 z-0 opacity-[0.05]" />
      <span className="absolute top-0 left-0 z-10 h-1 w-32 border-b border-command-blue bg-electric-blue" /><span className="absolute top-0 right-0 z-10 h-1 w-32 border-b border-command-blue bg-electric-blue" />
      <div className="relative z-10 mb-6 flex flex-col items-center gap-3">
        <div className="flex -space-x-2.5">
          {avatars.map((avatar, index) => <span key={avatar} className="relative h-10 w-10 overflow-hidden rounded-full bg-signal-blue ring-2 ring-obsidian"><Image src={avatar} alt={`Cyber-I client ${index + 1}`} fill sizes="40px" className="object-cover grayscale contrast-125 brightness-105 mix-blend-multiply" /></span>)}
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-signal-blue font-mono text-[10px] font-black tracking-tighter text-intelligence-white ring-2 ring-obsidian">5K+</span>
        </div>
        <p className="text-center font-mono text-[10px] font-bold tracking-[0.2em] uppercase sm:text-xs">Join <span className="border border-command-blue bg-signal-blue px-1 py-0.5 font-black text-intelligence-white">5,000+</span> businesses trusting Cyber-I.</p>
      </div>
      <div className="relative z-10 mx-auto mb-8 max-w-4xl px-6 text-center">
        <h2 className="text-[8vw] leading-[1.12] font-black tracking-tight uppercase sm:text-[5vw] md:text-[3.2vw]">Join the <span className="inline-block -rotate-1 border-2 border-command-blue bg-signal-blue px-2 py-0.5 text-intelligence-white shadow-[2px_2px_0_#0B121C]">cybersecurity</span><br />revolution and <span className="underline decoration-electric-blue decoration-4 underline-offset-4">safeguard</span><br />your business today</h2>
      </div>
      <div className="relative z-10 mb-10 flex flex-wrap items-center justify-center gap-4">
        <ModalTrigger modal="boost" className="shadow-[2px_2px_0_#0B121C]">Boost Security</ModalTrigger>
        <ModalTrigger modal="about" variant="outline" className="shadow-[2px_2px_0_#21375A] dark:shadow-[2px_2px_0_#BFCADA]">What Others Say</ModalTrigger>
      </div>
      <div className="relative z-0 flex w-full flex-col items-center overflow-hidden border-t border-mist-blue/50 bg-intelligence-white pt-8 dark:border-mist-blue/10 dark:bg-obsidian">
        <div className="technical-grid-large pointer-events-none absolute inset-0 opacity-40" /><div className="pointer-events-none absolute bottom-[-180px] h-[300px] w-[800px] rounded-full bg-electric-blue/20 blur-[100px]" />
        <div className="pointer-events-none relative flex h-[300px] w-full max-w-[1100px] items-end justify-center overflow-hidden sm:h-[450px] md:h-[550px]" style={{ marginBottom: "-6%" }}>
          <video src={globeVideo} autoPlay loop muted playsInline className="intelligence-globe absolute bottom-[-15%] w-[140%] object-cover opacity-100 mix-blend-multiply dark:mix-blend-screen sm:bottom-[-20%] sm:w-[120%] md:w-[110%]" />
        </div>
      </div>
    </section>
  );
}
