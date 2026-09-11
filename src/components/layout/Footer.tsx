export function Footer() {
  return (
    <footer className="relative z-10 mt-auto flex w-full flex-col items-center justify-between gap-4 border-t border-deep-navy bg-midnight p-4 text-[10px] font-bold tracking-widest text-mist-blue uppercase sm:flex-row sm:text-xs">
      <div>© 2026 Cyber-I Consultancy. All secure.</div>
      <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
        {/* <Link href="/privacy-policy" className="transition-colors hover:text-electric-blue">Privacy Policy</Link>
        <Link href="/terms-and-conditions" className="transition-colors hover:text-electric-blue">Terms &amp; Conditions</Link>
        <span>Status: Defend_Mode // Active</span>
        <span>Encr: Cousine_V4</span> */}
      </div>
    </footer>
  );
}
