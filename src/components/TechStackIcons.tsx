"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";

interface TechItem {
  name: string;
  icon: string;
}

interface TechStackIconsProps {
  title: string;
  subtitle: string;
}

export default function TechStackIcons({ title, subtitle }: TechStackIconsProps) {
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const [backgroundStyle, setBackgroundStyle] = useState({
    opacity: 0,
    left: 0,
    top: 0,
    width: 0,
    height: 0,
  });
  const containerRef = useRef<HTMLDivElement>(null);
  const techRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const technologies: TechItem[] = [
    { name: "Infomaniak", icon: "/img/tech/infomaniak.svg" },
    { name: "React", icon: "/img/tech/react.svg" },
    { name: "Next.js", icon: "/img/tech/nextjs.svg" },
    { name: "Tailwind CSS", icon: "/img/tech/tailwindcss.svg" },
    { name: "Node.js", icon: "/img/tech/nodejs.svg" },
    { name: "PostgreSQL", icon: "/img/tech/postgresql.svg" },
    { name: "MongoDB", icon: "/img/tech/mongodb.svg" },
    { name: "GitHub", icon: "/img/tech/github.svg" },
  ];

  const updateBackgroundPosition = (techName: string | null) => {
    if (!techName || !containerRef.current || !techRefs.current[techName]) {
      setBackgroundStyle(prev => ({ ...prev, opacity: 0 }));
      return;
    }

    const container = containerRef.current;
    const tech = techRefs.current[techName];
    
    if (container && tech) {
      const containerRect = container.getBoundingClientRect();
      const techRect = tech.getBoundingClientRect();
      
      setBackgroundStyle({
        opacity: 1,
        left: techRect.left - containerRect.left,
        top: techRect.top - containerRect.top,
        width: techRect.width,
        height: techRect.height,
      });
    }
  };

  useEffect(() => {
    updateBackgroundPosition(hoveredTech);
  }, [hoveredTech]);

  return (
    <section className="w-full flex flex-col items-center justify-center py-16 md:py-20 px-4">
      <div className="max-w-7xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.6,
            ease: "easeOut"
          }}
          viewport={{ once: true, margin: "-50px" }}
          className="text-center mb-12 md:mb-14"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-5">
            {title}
          </h2>
          <p className="text-lg text-neutral-400 max-w-3xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        <div ref={containerRef} className="relative grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8">
          <motion.div
            className="absolute bg-neutral-900/50 border border-white/20 rounded-3xl pointer-events-none"
            animate={backgroundStyle}
            transition={{ duration: 0.5, ease: [0.34, 1.36, 0.44, 1] }}
          />
          
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              ref={(el) => { techRefs.current[tech.name] = el; }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.08,
                ease: "easeOut"
              }}
              viewport={{ once: true, margin: "-50px" }}
              className="relative flex flex-col items-center gap-3 p-5 rounded-lg transition-colors duration-300 cursor-default"
              onMouseEnter={() => setHoveredTech(tech.name)}
              onMouseLeave={() => setHoveredTech(null)}
            >
              <div className="w-12 h-12 relative opacity-70 transition-opacity duration-300 [filter:brightness(0)_invert(1)]">
                <Image
                  src={tech.icon}
                  alt={tech.name}
                  fill
                  className="object-contain"
                />
              </div>
              <p className="text-sm text-neutral-400 text-center">{tech.name}</p>
            </motion.div>
          ))}
        </div>
        
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center text-sm text-neutral-500 mt-8 italic"
        >
          et pleins d&apos;autres...
        </motion.p>
      </div>
    </section>
  );
}
