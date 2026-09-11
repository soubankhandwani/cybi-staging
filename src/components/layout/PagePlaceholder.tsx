interface PagePlaceholderProps {
  eyebrow?: string;
  title: string;
}

export function PagePlaceholder({ eyebrow = "Page", title }: PagePlaceholderProps) {
  return (
    <main className="relative z-20 flex min-h-[70vh] items-center py-16 select-none">
      <div>
        <p className="mb-4 text-xs font-bold tracking-[0.2em] text-steel uppercase"><span className="text-command-blue">/</span> {eyebrow}</p>
        <h1 className="text-4xl font-black tracking-tight text-obsidian uppercase dark:text-intelligence-white sm:text-6xl">{title}</h1>
      </div>
    </main>
  );
}
