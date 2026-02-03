"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Lazy load du composant WebGL lourd uniquement côté client
const DarkVeil = dynamic(() => import("./DarkVeil"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-gradient-to-b from-zinc-900 via-black to-black" />,
});

export default function DarkVeilWrapper() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const scrollTop = window.scrollY;
      // Progress de 0 à 1, atteint 1 quand on a scrollé une hauteur d'écran
      const progress = Math.min(scrollTop / windowHeight, 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Opacity du voile: de 0 à 0.9
  const veilOpacity = scrollProgress * 0.5;
  // Blur: de 0px à 4px
  // const blurAmount = scrollProgress * 10;

  // Ne rendre le composant WebGL que côté client
  if (!isClient) {
    return (
      <div className="fixed inset-0 w-full h-full -z-10 pointer-events-none">
        <div className="w-full h-full bg-gradient-to-b from-zinc-900 via-black to-black" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 w-full h-full -z-10 pointer-events-none">
      <div className="w-full h-full relative">
        <DarkVeil 
          noiseIntensity={0.15}
          speed={2}
        />
      </div>
      {/* Voile assombrissant */}
      <div
        className="absolute inset-0 bg-black"
        style={{
          opacity: veilOpacity,
          transition: "opacity 0.3s ease-out",
        }}
      />
    </div>
  );
}
