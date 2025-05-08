'use client';

import React, { useState } from "react";
import { CustomLink } from "./CustomLink";
import { Dictionary } from "@/types/dictionary";

type NavTranslations = {
  home: string;
  prestations: string;
  about: string;
  projects: string;
  contact: string;
};

export function MobileNavbar({ dictionary }: { dictionary: Dictionary }) {
  const nav = dictionary.nav as NavTranslations;
  const [isToggleOpen, setIsToggleOpen] = useState(false);

  return (
    <div className="xl:hidden">
      <button
        className={`relative block h-10 w-10 self-center
          ${
            isToggleOpen
              ? "visible opacity-100 [&_span:nth-child(1)]:w-6 [&_span:nth-child(1)]:translate-y-0 [&_span:nth-child(1)]:rotate-45 [&_span:nth-child(2)]:-rotate-45 [&_span:nth-child(3)]:w-0"
              : ""
          }
        `}
        onClick={() => setIsToggleOpen(!isToggleOpen)}
        aria-expanded={isToggleOpen ? "true" : "false"}
        aria-label="Toggle navigation"
      >
        <div className="absolute left-1/2 top-1/2 w-6 -translate-x-1/2 -translate-y-1/2 transform">
          <span
            aria-hidden="true"
            className="absolute block h-0.5 w-9/12 -translate-y-2 transform rounded-full bg-white transition-all duration-300"
          ></span>
          <span
            aria-hidden="true"
            className="absolute block h-0.5 w-6 transform rounded-full bg-white transition duration-300"
          ></span>
          <span
            aria-hidden="true"
            className="absolute block h-0.5 w-1/2 origin-top-left translate-y-2 transform rounded-full bg-white transition-all duration-300"
          ></span>
        </div>
      </button>

      <div
        className={`fixed left-0 top-[80px] z-50 h-[calc(100vh-80px)] w-full overflow-hidden overflow-y-auto bg-zinc-950 px-8 pb-12 pt-8 font-medium transition-[opacity,visibility] duration-300 ${
          isToggleOpen
            ? "visible opacity-100"
            : "invisible opacity-0"
        }`}
      >
        <nav className="flex flex-col items-center gap-8 text-lg">
          <CustomLink href="/" label={nav.home} />
          <CustomLink href='/prestations' label={nav.prestations} />
          <CustomLink href="/about" label={nav.about} />
          <CustomLink href="/projects" label={nav.projects} />
          <CustomLink href="/contact" label={nav.contact} />
        </nav>
      </div>
    </div>
  );
}