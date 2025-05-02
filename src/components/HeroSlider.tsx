"use client";
import { motion } from "framer-motion";
import React from "react";
import { ImagesSlider } from "./ui/images-slider";
import { Button } from "./ui/button";

export function HeroSlider() {
  const images = [
    "/img/BigData.jpeg",
    "/img/LLM.png",
    "/img/Security.png",
  ];
  return (
    <ImagesSlider className="h-[40rem]" images={images}>
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
        className="z-50 flex flex-col justify-center items-center"
      >
        <motion.p className="font-bold text-xl md:text-6xl text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 py-4">
          <span className="text-blue-500">Développement</span> web et applicatifs <br /> sur mesure
        </motion.p>
        <motion.p className="text-center max-w-2xl text-white/80">
          Nous concevons des applications web sur mesure et des modèles de langage privés pour les entreprises exigeantes qui recherchent des solutions innovantes.
        </motion.p>
        <div className="flex gap-4">
          <Button variant="secondary" className="mt-4">Explorez nos services</Button>
          <Button variant="outline" className="mt-4">Découvrez nos projets</Button>
        </div>
      </motion.div>
    </ImagesSlider>
  );
}
