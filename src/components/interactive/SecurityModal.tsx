"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CheckCircle, Cpu, Eye, Globe, Lock, Shield, Terminal, X } from "lucide-react";
import { useSiteExperience } from "@/components/interactive/SiteExperience";
import { modalIndustryMetrics, modalSolutions } from "@/data/site-content";

export function SecurityModal() {
  const { activeModal, closeModal } = useSiteExperience();

  useEffect(() => {
    if (!activeModal) return;
    const onKeyDown = (event: KeyboardEvent) => event.key === "Escape" && closeModal();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeModal, closeModal]);

  return (
    <AnimatePresence>
      {activeModal && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-obsidian/90 p-4 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(event) => event.target === event.currentTarget && closeModal()}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${activeModal} information`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-2xl overflow-hidden border-2 border-electric-blue bg-obsidian shadow-[0_0_50px_rgba(98,181,255,0.18)]"
          >
            <div className="flex items-center justify-between bg-command-blue px-5 py-3 text-intelligence-white sm:px-6">
              <div className="flex items-center gap-2.5">
                <span className="h-3.5 w-3.5 bg-electric-blue" />
                <span className="text-xs font-bold tracking-widest uppercase sm:text-sm">Secure Core // {activeModal}</span>
              </div>
              <button aria-label="Close dialog" autoFocus onClick={closeModal} className="cursor-pointer p-1 transition-opacity hover:opacity-70"><X size={18} /></button>
            </div>
            <div className="custom-scrollbar max-h-[80vh] overflow-y-auto p-6 sm:p-8">
              {activeModal === "about" && <AboutModal />}
              {activeModal === "solutions" && <SolutionsModal />}
              {activeModal === "industries" && <IndustriesModal />}
              {activeModal === "boost" && <DiagnosticTerminal />}
              <div className="mt-8 flex justify-end border-t border-electric-blue/20 pt-4">
                <button onClick={closeModal} className="cursor-pointer border border-electric-blue px-5 py-2 text-xs font-bold tracking-widest text-electric-blue uppercase transition-colors hover:bg-electric-blue hover:text-obsidian">Acknowledge / Close</button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ModalTitle({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return <div className="flex items-center gap-3 text-electric-blue">{icon}<h3 className="text-lg font-bold tracking-wider uppercase">{children}</h3></div>;
}

function AboutModal() {
  return (
    <div className="space-y-6">
      <ModalTitle icon={<Shield className="h-6 w-6 animate-pulse" />}>Secure Digital Infrastructure</ModalTitle>
      <p className="text-sm leading-relaxed tracking-wide text-mist-blue uppercase">Cyber-I is a secured cryptographic protocol cohesion and cybersecurity shield initiated to eliminate external penetrations and system breaches worldwide.</p>
      <p className="text-sm leading-relaxed tracking-wide text-mist-blue uppercase">We believe defense is not in passivity, but in making bold, intentional moves. Our software design pairs unbreakable compliance architecture with seamless, lightning-fast control mechanisms.</p>
      <div className="grid gap-4 border-t border-electric-blue/20 pt-4 sm:grid-cols-2">
        <ModalFeature icon={<Lock className="h-5 w-5" />} title="AES-GCM 256">Cryptographically guaranteed session isolation layer.</ModalFeature>
        <ModalFeature icon={<Eye className="h-5 w-5" />} title="Zero-Trust Engine">Every token, packet, and access point continuously audited.</ModalFeature>
      </div>
    </div>
  );
}

function ModalFeature({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return <div className="flex items-start gap-3 border border-electric-blue/20 bg-deep-navy/40 p-4 text-electric-blue"><span className="mt-0.5 shrink-0">{icon}</span><div><h4 className="mb-1 text-xs font-bold tracking-wider uppercase">{title}</h4><p className="text-[11px] text-mist-blue">{children}</p></div></div>;
}

function SolutionsModal() {
  return (
    <div className="space-y-6">
      <ModalTitle icon={<Terminal className="h-6 w-6" />}>Mitigation Solutions</ModalTitle>
      <p className="text-sm leading-relaxed tracking-wide text-mist-blue uppercase">Explore Cyber-I industrial-grade threat shield solutions deployable to cloud or distributed on-prem infrastructures.</p>
      <div className="space-y-3.5 pt-2">
        {modalSolutions.map((solution, index) => (
          <div key={solution.title} className="flex items-start gap-3 border border-electric-blue/30 p-4 transition-colors hover:bg-deep-navy/50">
            <span className="border border-electric-blue/30 bg-signal-blue/20 px-2 py-0.5 text-xs font-bold text-electric-blue">0{index + 1}</span>
            <div><h4 className="mb-1 text-xs font-bold tracking-wider text-electric-blue uppercase">{solution.title}</h4><p className="text-[11px] text-mist-blue">{solution.description}</p></div>
          </div>
        ))}
      </div>
    </div>
  );
}

function IndustriesModal() {
  return (
    <div className="space-y-6">
      <ModalTitle icon={<Globe className="h-6 w-6" />}>Defense Along All Sectors</ModalTitle>
      <p className="text-sm leading-relaxed tracking-wide text-mist-blue uppercase">Cyber-I provides seamless security integration across sensitive systems, keeping operations robust.</p>
      <div className="grid gap-4 pt-2 sm:grid-cols-2">
        {modalIndustryMetrics.map(([label, metric]) => <div key={label} className="flex flex-col justify-between border border-electric-blue/20 bg-midnight p-4"><span className="text-[11px] font-bold tracking-wider text-electric-blue uppercase">{label}</span><span className="mt-2 text-[9px] text-mist-blue uppercase">{metric}</span></div>)}
      </div>
    </div>
  );
}

function DiagnosticTerminal() {
  const hasStarted = useRef(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [progress, setProgress] = useState(0);

  const addLog = useCallback((message: string, delay: number) => new Promise<void>((resolve) => {
    window.setTimeout(() => {
      setLogs((current) => [...current, `[${new Date().toLocaleTimeString()}] ${message}`]);
      resolve();
    }, delay);
  }), []);

  const startDiagnostics = useCallback(async () => {
    if (isScanning) return;
    setIsScanning(true);
    setProgress(0);
    setLogs([]);
    await addLog("INITIATING CYPHER PORT SCAN...", 200);
    await addLog("ESTABLISHING SECURE PROTOCOLS...", 400);
    await addLog("SCANNING ALL ACTIVE IP ENDPOINTS...", 300);
    for (let value = 0; value <= 100; value += 20) {
      await new Promise((resolve) => window.setTimeout(resolve, 250));
      setProgress(value);
      if (value === 20) await addLog("✓ FIREWALL RULES IDENTIFIED [OK]", 100);
      if (value === 60) await addLog("⚠ DETECTED EXPOSED PORT: 8080 (WEB SERVER)", 100);
      if (value === 80) await addLog("✓ ENCRYPTION ENGINES CURRENTLY: AES-256", 100);
    }
    await addLog("PARSING SYSTEM COMPLIANCE RATINGS...", 300);
    await addLog("✓ GENERATING COMPREHENSIVE CYBERSECURITY INDEX...", 200);
    setIsScanning(false);
  }, [addLog, isScanning]);

  useEffect(() => {
    if (hasStarted.current) return;
    hasStarted.current = true;
    void startDiagnostics();
    // Initial scan only; the user can explicitly re-run subsequent diagnostics.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitCommand = (event: React.FormEvent) => {
    event.preventDefault();
    const command = input.trim().toLowerCase();
    if (!command) return;
    setLogs((current) => [...current, `> ${input}`]);
    setInput("");
    window.setTimeout(() => {
      const responses: Record<string, string[]> = {
        help: ["AVAILABLE SECURE COMMANDS:", "  help   - Show diagnostics parameters", "  scan   - Initiate full workspace audit", "  clear  - Clear terminal", "  status - Analyze threat mitigation status", "  bypass - Request encryption verification keys"],
        status: ["SYSTEM CYBER STATUS EVALUATION:", "  [THREAT LEVEL]: MINIMAL", "  [INTEGRITY]: VALIDATED", "  [LAST BREACH ATTEMPT]: PREVENTED 2 HOURS AGO"],
        bypass: ["🔑 REQUEST DENIED. SECURITY BYPASS IS FORBIDDEN BY DATA INTEGRITY POLICY."],
      };
      if (command === "scan") void startDiagnostics();
      else if (command === "clear") setLogs([]);
      else setLogs((current) => [...current, ...(responses[command] ?? [`ERROR: Command '${command}' not recognized. Enter 'help'.`])]);
    }, 150);
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-electric-blue/20 pb-4 text-electric-blue">
        <div className="flex items-center gap-2"><Cpu className="h-5 w-5" /><h3 className="text-sm font-bold tracking-widest uppercase">Cyber-I Live Terminal Utility</h3></div>
        <div className="flex items-center gap-2"><span className={`h-2 w-2 rounded-full ${isScanning ? "animate-ping bg-electric-blue" : "bg-signal-blue"}`} /><span className="text-[10px] font-bold tracking-widest">{isScanning ? "RUNNING SCAN" : "SYSTEM READY"}</span></div>
      </div>
      <div className="custom-scrollbar relative h-64 space-y-1.5 overflow-y-auto border border-electric-blue/30 bg-midnight/80 p-4 font-mono text-xs text-electric-blue">
        {logs.map((log, index) => <div key={`${log}-${index}`} className="whitespace-pre-wrap leading-relaxed tracking-wide">{log}</div>)}
        {isScanning && <div className="pt-2"><div className="mb-1 flex justify-between text-[10px] tracking-wider uppercase"><span>Scanning in progress...</span><span>{progress}%</span></div><div className="h-1.5 overflow-hidden border border-electric-blue/30 bg-deep-navy"><motion.div className="h-full bg-electric-blue" animate={{ width: `${progress}%` }} /></div></div>}
      </div>
      <form onSubmit={submitCommand} className="flex gap-2.5">
        <label className="relative flex flex-grow items-center"><span className="absolute left-3 text-xs font-bold text-electric-blue">&gt;</span><span className="sr-only">Terminal command</span><input disabled={isScanning} value={input} onChange={(event) => setInput(event.target.value)} placeholder="Enter CLI secure command... (type 'help')" className="w-full border border-electric-blue/30 bg-midnight py-2.5 pr-3 pl-7 text-xs font-bold text-electric-blue placeholder:text-steel focus:border-electric-blue focus:outline-none" /></label>
        <button disabled={isScanning} className="cursor-pointer bg-signal-blue px-4 py-2.5 text-xs font-bold tracking-widest text-intelligence-white uppercase disabled:opacity-50">Send</button>
      </form>
      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 font-mono text-[10px] text-mist-blue"><span>Suggested: {['status', 'scan', 'help'].map((command, index) => <span key={command}>{index > 0 && " | "}<button onClick={() => setInput(command)} className="cursor-pointer font-bold underline hover:text-electric-blue">{command}</button></span>)}</span><button onClick={() => void startDiagnostics()} disabled={isScanning} className="flex cursor-pointer items-center gap-1 font-bold text-electric-blue uppercase underline disabled:opacity-50"><CheckCircle size={10} /> Re-run Diagnostics</button></div>
    </div>
  );
}
