"use client";

import { motion } from "framer-motion";
import React from "react";
import { ImagesSlider } from "./ui/images-slider";
import { Button } from "./ui/button";
import MouseScrollIndicator from "./MouseScrollIndicator";
import { Dictionary } from "@/types/dictionary";

type HeroTranslations = {
  title: string;
  description: string;
  servicesButton: string;
  projectsButton: string;
};

export function HeroSlider({ dictionary }: { dictionary: Dictionary }) {
  const hero = dictionary.hero as HeroTranslations;
  const images = [
    "/img/BigData.webp",
    "/img/LLM.webp",
    "/img/Security.webp",
  ];
  return (
    <ImagesSlider className="min-h-screen" images={images}>
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
        className="z-50 flex flex-col justify-center items-center gap-10"
      >
        <motion.p className="font-bold text-3xl max-w-4xl px-4 md:text-5xl lg:text-7xl text-center bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-300 py-4">
          {hero.title}
        </motion.p>
        <motion.p className="text-center max-w-2xl text-xl font-medium text-neutral-200 text-shadow-lg">
          {hero.description}
        </motion.p>
        <div className="flex gap-4">
          <Button variant="secondary" size="lg" className="mt-4">{hero.servicesButton}</Button>
          <Button variant="outline" size="lg" className="mt-4">{hero.projectsButton}</Button>
        </div>
      </motion.div>
      <MouseScrollIndicator />
    </ImagesSlider>
  );
}
