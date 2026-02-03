"use client";

import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import MouseScrollIndicator from "./MouseScrollIndicator";
import { Dictionary } from "@/types/dictionary";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

type HeroTranslations = {
  title: string;
  description: string;
  servicesButton: string;
  projectsButton: string;
};

export function HeroSlider({ dictionary }: { dictionary: Dictionary }) {
  const hero = dictionary.hero as HeroTranslations;
  const pathname = usePathname();
  const currentLocale = pathname.match(/^\/(fr|en|de)(?=\/|$)/)?.[1] || 'fr';
  const [showLogo, setShowLogo] = useState(false);
  
  useEffect(() => {
    // Première transition après 3 secondes (afficher le titre d'abord)
    const firstTimeout = setTimeout(() => {
      setShowLogo(true);
    }, 3000);

    // Ensuite, alternance toutes les 5 secondes
    const interval = setInterval(() => {
      setShowLogo((prev) => !prev);
    }, 5000);

    return () => {
      clearTimeout(firstTimeout);
      clearInterval(interval);
    };
  }, []);
  
  return (
    <div className="min-h-screen overflow-hidden h-full w-full relative flex items-center justify-center">
      <motion.div
        initial={{
          opacity: 0,
          y: -80,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
        }}
        className="z-30 flex flex-col justify-center items-center gap-10"
      >
        <div className="relative w-full min-h-[200px] md:min-h-[250px] lg:min-h-[300px] flex items-center justify-center" style={{ perspective: "1000px" }}>
          <AnimatePresence mode="wait">
            {showLogo ? (
              <motion.div
                key="logo"
                initial={{ rotateX: -90, opacity: 0 }}
                animate={{ rotateX: 0, opacity: 1 }}
                exit={{ rotateX: 90, opacity: 0 }}
                transition={{ 
                  duration: 0.8,
                  ease: "easeInOut"
                }}
                className="absolute"
              >
                <Image
                  src="/img/logo_origin_full.svg"
                  alt="Origin Studio Logo"
                  width={384}
                  height={128}
                  sizes="(max-width: 768px) 256px, (max-width: 1024px) 320px, 384px"
                  className="w-64 md:w-80 lg:w-96 h-auto"
                />
              </motion.div>
            ) : (
              <motion.p
                key="title"
                initial={{ rotateX: -90, opacity: 0 }}
                animate={{ rotateX: 0, opacity: 1 }}
                exit={{ rotateX: 90, opacity: 0 }}
                transition={{ 
                  duration: 0.8,
                  ease: "easeInOut"
                }}
                className="absolute font-bold text-3xl max-w-4xl px-4 md:text-5xl lg:text-7xl text-center bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-300 py-2"
              >
                {hero.title}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
        <motion.p className="text-center max-w-2xl text-xl font-medium text-neutral-200 text-shadow-lg">
          {hero.description}
          {/* <TextType text={hero.description} /> */}
        </motion.p>
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          <Link href={`/${currentLocale}/prestations`}>
            <Button variant="secondary" size="lg" className="mt-4">
              {hero.servicesButton}
            </Button>
          </Link>
          <Link href={`/${currentLocale}/contact`}>
            <Button variant="outline" size="lg" className="mt-4 py-6">
              {hero.projectsButton}
            </Button>
          </Link>
        </div>
      </motion.div>
      <MouseScrollIndicator />
    </div>
    
  );
}
