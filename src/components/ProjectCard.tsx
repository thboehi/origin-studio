"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Pin } from "lucide-react";
import { ProjectsTranslations } from "@/types/translations";
import Image from "next/image";

interface ProjectCardProps {
  title: string;
  language: string;
  description: string;
  image: string;
  link?: string;
  year: number;
  pinned?: boolean;
  translations: ProjectsTranslations;
}

export default function ProjectCard({ title, language, description, image, link, year, pinned, translations }: ProjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      {/* Card normale */}
      <motion.div
        onClick={toggleExpanded}
        className="bg-neutral-900/50 border border-neutral-800 rounded-4xl overflow-hidden cursor-pointer hover:border-neutral-600 hover:bg-neutral-900/70 hover:scale-105 transition-bounce duration-200 group"
        whileTap={{ scale: 0.98 }}
      >
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <Image 
            src={image} 
            alt={title}
            fill
            className="object-cover scale-110 group-hover:scale-100 transition-transform duration-200"
          />
          <div className="absolute top-3 right-3 flex gap-2">
            <span className="text-xs bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded-full">
              {language}
            </span>
            <span className="text-xs bg-neutral-800/80 backdrop-blur-sm text-neutral-300 px-2 py-1 rounded-full">
              {year}
            </span>
          </div>
          {pinned && (
            <div className="absolute top-3 left-3">
              <Pin className="w-4 h-4 text-amber-400 fill-amber-400" />
            </div>
          )}
        </div>

        {/* Contenu */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-white mb-3">
            {title}
          </h3>
          <p className="text-neutral-400 line-clamp-3 mb-4">
            {description}
          </p>
          <div className="text-sm text-neutral-500">
            {translations.actions.clickToSeeMore}
          </div>
        </div>
      </motion.div>

      {/* Modal étendue */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={toggleExpanded}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-neutral-900 border border-neutral-700 rounded-4xl overflow-hidden max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image en grand */}
              <div className="relative h-64 md:h-80 overflow-hidden">
                <Image 
                  src={image} 
                  alt={title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 right-4 flex gap-2">
                  <span className="text-sm bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full">
                    {language}
                  </span>
                  <span className="text-sm bg-neutral-800/80 backdrop-blur-sm text-neutral-300 px-3 py-1 rounded-full">
                    {year}
                  </span>
                </div>
                {pinned && (
                  <div className="absolute top-4 right-4 translate-x-16">
                    <Pin className="w-5 h-5 text-amber-400 fill-amber-400" />
                  </div>
                )}
                <button
                  onClick={toggleExpanded}
                  className="absolute top-4 left-4 p-2 bg-black/70 backdrop-blur-sm hover:bg-black/80 rounded-full transition-colors cursor-pointer"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>

              {/* Contenu */}
              <div className="p-8">
                {/* Header */}
                <div className="mb-6">
                  <h2 className="text-3xl font-bold text-white mb-4">
                    {title}
                  </h2>
                </div>

                {/* Description */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-white mb-3">{translations.modal.descriptionTitle}</h3>
                  <p className="text-neutral-300 leading-relaxed whitespace-pre-line">
                    {description}
                  </p>
                </div>

                {/* Lien externe */}
                {link && (
                  <div className="flex justify-center">
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[var(--color-accent-violet)] hover:bg-[var(--color-accent-violet)]/80 text-white px-6 py-3 rounded-full flex items-center gap-2 transition-colors"
                    >
                      {translations.actions.visitProject}
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}