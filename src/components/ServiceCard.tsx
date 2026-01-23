"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { CheckIcon } from "lucide-react";

interface ServiceCardProps {
  title: string;
  shortDescription: string;
  description: string;
  features: string[];
  icon: ReactNode;
  index: number;
}

export default function ServiceCard({
  title,
  shortDescription,
  description,
  features,
  icon,
  index,
}: ServiceCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`group relative bg-neutral-950 rounded-4xl border border-neutral-800 p-8 hover:border-neutral-600 transition-all duration-500 hover:drop-shadow-[0_8px_60px_rgba(95,16,220,0.3)] overflow-hidden ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
      style={{ animationDelay: isVisible ? `${index * 100}ms` : '0ms' }}
    >
      {/* Icône en arrière-plan */}
      <div className="absolute right-0 top-0 h-full w-full flex items-center justify-end opacity-5 pointer-events-none box-border">
        <div className="text-white h-full flex items-center -mr-[0%] group-hover:-mr-[33.33%] transition-bounce [&>svg]:!w-full [&>svg]:!h-full">
          {icon}
        </div>
      </div>

      {/* Contenu au premier plan */}
      <div className="relative z-10">
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
          <p className="text-neutral-400">{shortDescription}</p>
        </div>

          <p className="text-neutral-300 mb-6 leading-relaxed">{description}</p>

        <div className="space-y-3">
          {features.map((feature, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <CheckIcon className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span className="text-neutral-400 hover:text-white transition-colors text-sm">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
