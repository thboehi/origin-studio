"use client"

import { ReactNode, useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import FeatureCard from "./FeatureCard";

interface FeatureCardsContainerProps {
  features: Array<{
    title: string;
    description: string;
    icon: ReactNode;
    link?: string;
    id: string;
  }>;
}

export default function FeatureCardsContainer({ features }: FeatureCardsContainerProps) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [backgroundStyle, setBackgroundStyle] = useState({
    opacity: 0,
    left: 0,
    top: 0,
    width: 0,
    height: 0,
  });
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const updateBackgroundPosition = (cardId: string | null) => {
    if (!cardId || !containerRef.current || !cardRefs.current[cardId]) {
      setBackgroundStyle(prev => ({ ...prev, opacity: 0 }));
      return;
    }

    const container = containerRef.current;
    const card = cardRefs.current[cardId];
    
    if (container && card) {
      const containerRect = container.getBoundingClientRect();
      const cardRect = card.getBoundingClientRect();
      
      setBackgroundStyle({
        opacity: 1,
        left: cardRect.left - containerRect.left,
        top: cardRect.top - containerRect.top,
        width: cardRect.width,
        height: cardRect.height,
      });
    }
  };

  useEffect(() => {
    updateBackgroundPosition(hoveredCard);
  }, [hoveredCard]);

  return (
    <div ref={containerRef} className="relative flex flex-wrap items-center justify-center gap-10">
      <motion.div
        className="absolute bg-neutral-900 dark:bg-slate-800/[0.8] rounded-[2.4rem] pointer-events-none"
        animate={backgroundStyle}
        transition={{ duration: 0.5, ease: [0.34, 1.36, 0.44, 1] }}
      />
      
      {features.map((feature) => (
        <div
          key={feature.id}
          ref={(el) => { cardRefs.current[feature.id] = el; }}
        >
          <FeatureCard
            title={feature.title}
            description={feature.description}
            icon={feature.icon}
            link={feature.link}
            cardId={feature.id}
            onMouseEnter={setHoveredCard}
            onMouseLeave={() => setHoveredCard(null)}
          />
        </div>
      ))}
    </div>
  );
}
