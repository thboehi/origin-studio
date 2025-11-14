"use client";

import { useState } from "react";

interface SimpleContactCardProps {
  title: string;
  description: string;
  type: "email" | "phone";
  value: string;
  label: string;
}

export default function SimpleContactCard({ 
  title, 
  description, 
  type, 
  value, 
  label 
}: SimpleContactCardProps) {
  const [revealed, setRevealed] = useState(false);

  const maskEmail = (email: string) => {
    const [local, domain] = email.split('@');
    return `${local.substring(0, 2)}...@${domain}`;
  };

  const maskPhone = (phone: string) => {
    return `${phone.substring(0, 7)}...`;
  };

  const handleReveal = () => {
    setRevealed(true);
  };

  const displayValue = revealed 
    ? value 
    : type === "email" 
      ? maskEmail(value)
      : maskPhone(value);

  const href = revealed 
    ? type === "email" 
      ? `mailto:${value}` 
      : `tel:${value}`
    : undefined;

  return (
    <div className="flex flex-col gap-3 p-6 bg-neutral-900/30 border border-neutral-800 rounded-4xl hover:border-neutral-700 transition-colors duration-300">
      <h3 className="text-lg font-bold text-white">{title}</h3>
      <p className="text-neutral-400 text-sm leading-relaxed mb-2">
        {description}
      </p>
      <div className="flex items-center gap-2 text-sm">
        <span className="text-neutral-500">{label}:</span>
        {revealed ? (
          <a 
            href={href}
            className="text-[var(--color-accent-violet)] hover:text-white transition-colors"
          >
            {displayValue}
          </a>
        ) : (
          <button
            onClick={handleReveal}
            className="text-neutral-300 hover:text-white transition-colors cursor-pointer underline decoration-dotted underline-offset-2"
            title="Cliquer pour révéler"
          >
            {displayValue}
          </button>
        )}
      </div>
    </div>
  );
}
