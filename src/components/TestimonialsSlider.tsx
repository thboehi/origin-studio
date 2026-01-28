"use client";

import { motion, useMotionValue, useAnimationFrame } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import TestimonialCard from "./TestimonialCard";
import type { Testimonial } from "@/types/testimonial";

interface TestimonialsSliderProps {
  testimonials: Testimonial[];
  showMoreText: string;
  showLessText: string;
  size?: 'small' | 'default';
}

export default function TestimonialsSlider({ 
  testimonials, 
  showMoreText, 
  showLessText,
  size = 'default'
}: TestimonialsSliderProps) {
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isSliderVisible, setIsSliderVisible] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const velocity = useRef(0);
  const lastX = useRef(0);
  const lastTime = useRef(Date.now());
  const targetSpeed = useRef(50);
  const currentSpeed = useRef(0); // Commencer à 0 pour transition smooth
  const isInitialized = useRef(false);
  const resumeTimeout = useRef<NodeJS.Timeout | null>(null);
  
  // Répéter 2 fois pour l'effet de boucle infinie
  const duplicatedTestimonials = [
    ...testimonials, 
    ...testimonials
  ];
  
  // Largeur des cards selon la taille - responsive
  const cardWidth = size === 'small' ? 280 : 340; // Mobile: plus petites largeurs
  const gapWidth = 16; // Gap réduit pour mobile
  const totalWidth = testimonials.length * (cardWidth + gapWidth);

  // Initialiser la position pour l'effet de boucle
  useEffect(() => {
    if (!isInitialized.current) {
      x.set(0);
      isInitialized.current = true;
      setIsMounted(true);
    }
  }, [x, totalWidth]);

  // IntersectionObserver pour détecter quand le slider est visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsSliderVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sliderRef.current) {
      observer.observe(sliderRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useAnimationFrame((time, delta) => {
    // Transition smooth vers la vitesse cible
    targetSpeed.current = (isPaused || isDragging) ? 0 : 50;
    const speedDiff = targetSpeed.current - currentSpeed.current;
    currentSpeed.current += speedDiff * 0.02; // Transition douce et lente (plus petit = plus visible)
    
    const movement = (currentSpeed.current * delta) / 1000;
    
    // Appliquer la vélocité du drag qui diminue progressivement
    let currentX = x.get();
    
    if (velocity.current !== 0) {
      // Appliquer la vélocité avec friction
      currentX += velocity.current * (delta / 1000);
      velocity.current *= 0.95;
      
      if (Math.abs(velocity.current) < 0.5) {
        velocity.current = 0;
      }
    } else {
      // Auto-scroll normal
      currentX -= movement;
    }
    
    // Loop infini avec 2 répétitions: reset quand on atteint la fin d'un set
    if (currentX <= -totalWidth) {
      currentX = 0;
    } else if (currentX > 0) {
      currentX = -totalWidth;
    }
    
    x.set(currentX);
    lastTime.current = time;
  });

  const handleDragStart = () => {
    setIsDragging(true);
    velocity.current = 0;
    lastX.current = x.get();
    lastTime.current = Date.now();
  };

  const handleDrag = () => {
    const currentTime = Date.now();
    const currentX = x.get();
    const timeDelta = currentTime - lastTime.current;
    
    if (timeDelta > 0) {
      // Calculer la vélocité en pixels par seconde
      velocity.current = ((currentX - lastX.current) / timeDelta) * 1000;
    }
    
    lastX.current = currentX;
    lastTime.current = currentTime;
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    // La vélocité continuera dans useAnimationFrame
  };

  const handleMouseEnter = () => {
    // Annuler le timer de reprise si on re-hover
    if (resumeTimeout.current) {
      clearTimeout(resumeTimeout.current);
      resumeTimeout.current = null;
    }
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    // Attendre 2 secondes avant de reprendre le scroll
    resumeTimeout.current = setTimeout(() => {
      setIsPaused(false);
      resumeTimeout.current = null;
    }, 2000);
  };

  return (
    <div ref={sliderRef} className="relative w-full cursor-grab active:cursor-grabbing">
      <div 
        className="w-full overflow-hidden"
        style={{
          maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)'
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
      <motion.div
        className="flex gap-4 sm:gap-6"
        style={{ x }}
        drag="x"
        dragConstraints={{ left: -totalWidth - 200, right: 200 }}
        dragElastic={0.05}
        dragTransition={{ power: 0.2, timeConstant: 200 }}
        onDragStart={handleDragStart}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
      >
        {duplicatedTestimonials.map((testimonial, index) => (
          <div
            key={`${testimonial.id}-${index}`}
            className={`flex-shrink-0 transition-opacity duration-700 w-[280px] sm:w-[340px] md:w-[400px] lg:w-[${size === 'small' ? '400' : '624'}px] ${isMounted ? 'opacity-100' : 'opacity-0'}`}
          >
            <TestimonialCard
              text={testimonial.text}
              author={testimonial.name}
              company={testimonial.company}
              rating={testimonial.rating}
              image={testimonial.image}
              index={index}
              showMoreText={showMoreText}
              showLessText={showLessText}
              isSliderVisible={isSliderVisible}
              size={size}
            />
          </div>
        ))}
      </motion.div>
      </div>
    </div>
  );
}
