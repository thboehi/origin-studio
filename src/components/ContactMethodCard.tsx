"use client";

import RevealLink from "./RevealLink";

interface ContactMethodCardProps {
  title: string;
  description: string;
  kind: "email" | "tel";
  parts: string[];
  buttonText: string;
}

export default function ContactMethodCard({
  title,
  description,
  kind,
  parts,
  buttonText,
}: ContactMethodCardProps) {
  return (
    <div className="flex flex-col items-center text-center gap-4 p-8 bg-neutral-900/30 border border-neutral-800 rounded-xl hover:border-[var(--color-accent-violet)]/50 transition-colors duration-300">
      <h3 className="text-xl font-bold text-white">{title}</h3>
      <p className="text-neutral-400 leading-relaxed mb-2">{description}</p>
      <RevealLink kind={kind} parts={parts} description="Cliquer pour révéler">
        {buttonText}
      </RevealLink>
    </div>
  );
}
