"use client"

import { ReactNode, useState } from "react";
import { ArrowRightIcon } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams } from "next/navigation";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  link?: string;
  className?: string;
}

export default function FeatureCard({ title, description, icon, link = "/", className }: FeatureCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const params = useParams();
  const locale = params.locales as string;

  return (
    <div 
      className={cn("relative group block p-2 h-full cursor-pointer", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/${locale}${link}`}>
        <AnimatePresence>
          {isHovered && (
            <motion.span
              className="absolute inset-0 h-full w-full bg-neutral-900 dark:bg-slate-800/[0.8] block rounded-2xl"
              layoutId="hoverBackground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.15 } }}
              exit={{ opacity: 0, transition: { duration: 0.15, delay: 0.2 } }}
            />
          )}
        </AnimatePresence>
        <div className="relative z-20 max-w-md min-h-64 flex flex-col items-start gap-4 bg-neutral-950 rounded-lg border border-neutral-800 p-6 group-hover:border-slate-700">
          <div className="flex items-center rounded bg-gradient-to-r from-blue-500 to-purple-500 p-2 text-white">
            {icon}
          </div>
          <div className="flex w-full min-w-0 flex-col items-start justify-center gap-2 text-base">
            <h3 className="mb-2 py-2 text-lg font-semibold leading-6 text-neutral-200">
              {title}
            </h3>
            <p className="text-neutral-400 max-w-prose">
              {description}
            </p>
              <div className="text-blue-500 font-medium flex items-center gap-2 mt-2 group-hover:text-blue-400">
                {locale === 'en' ? 'Learn more' : 'En savoir plus'} <ArrowRightIcon className="w-4 h-4" />
              </div>
          </div>
        </div>
      </Link>
    </div>
  );
}