import { ActionLink } from "@/components/about/AboutPrimitives";

const globeVideo = "https://res.cloudinary.com/dbzx2pddp/video/upload/v1781262794/Add_revolution_to_earth_globe_202606121642_z2gkcs.mp4";

export function RevolutionSection() {
  return (
    <section className="relative z-20 flex w-full flex-col items-center overflow-hidden border-t border-mist-blue/50 bg-intelligence-white pt-16 pb-0 text-obsidian select-none dark:border-mist-blue/10 dark:bg-obsidian dark:text-intelligence-white">
      <div className="noise-layer pointer-events-none absolute inset-0 z-0 opacity-[0.05]" />
      <span className="absolute top-0 left-0 z-10 h-1 w-32 border-b border-command-blue bg-electric-blue" /><span className="absolute top-0 right-0 z-10 h-1 w-32 border-b border-command-blue bg-electric-blue" />
      <div className="relative z-10 mx-auto mb-8 max-w-4xl px-6 text-center">
        <h2 className="text-[8vw] leading-[1.12] font-black tracking-tight uppercase sm:text-[5vw] md:text-[3.2vw]">Turn digital evidence<br />into <span className="underline decoration-electric-blue decoration-4 underline-offset-4">meaningful intelligence</span></h2>
      </div>
      <div className="relative z-10 mb-10 flex flex-wrap items-center justify-center gap-4">
        <ActionLink href="/services#cyber-it-security">Explore cybersecurity</ActionLink>
        <ActionLink href="/contact" variant="outline">Contact Cyber-I</ActionLink>
      </div>
      <div className="relative z-0 flex w-full flex-col items-center overflow-hidden border-t border-mist-blue/50 bg-intelligence-white pt-8 dark:border-mist-blue/10 dark:bg-obsidian">
        <div className="technical-grid-large pointer-events-none absolute inset-0 opacity-40" /><div className="pointer-events-none absolute bottom-[-180px] h-[300px] w-[800px] rounded-full bg-electric-blue/20 blur-[100px]" />
        <div className="pointer-events-none relative flex h-[300px] w-full max-w-[1100px] items-end justify-center overflow-hidden sm:h-[450px] md:h-[550px]" style={{ marginBottom: "-6%" }}>
          <video autoPlay loop muted playsInline aria-hidden="true" className="intelligence-globe absolute bottom-[-15%] w-[140%] object-cover opacity-100 mix-blend-multiply dark:mix-blend-screen motion-reduce:hidden sm:bottom-[-20%] sm:w-[120%] md:w-[110%]">
            <source src={globeVideo} type="video/mp4" media="(prefers-reduced-motion: no-preference)" />
          </video>
        </div>
      </div>
    </section>
  );
}
