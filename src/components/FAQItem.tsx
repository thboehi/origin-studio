"use client";

import { useEffect, useRef, useState } from "react";

interface FAQItemProps {
  question: string;
  answer: string;
  index: number;
}

export default function FAQItem({ question, answer, index }: FAQItemProps) {
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
      className={`bg-neutral-950 border border-neutral-800 rounded-4xl p-8 hover:border-neutral-600 transition-colors ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
      style={{ animationDelay: isVisible ? `${index * 100}ms` : '0ms' }}
    >
      <h3 className="text-lg font-semibold text-white mb-3">{question}</h3>
      <p className="text-neutral-400 leading-relaxed">{answer}</p>
    </div>
  );
}
