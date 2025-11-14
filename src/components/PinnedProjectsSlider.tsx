"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink, Pin } from "lucide-react";
import { Project } from "@/types/project";
import { ProjectsTranslations } from "@/types/translations";
import Image from "next/image";

interface PinnedProjectsSliderProps {
  projects: Project[];
  translations: ProjectsTranslations;
}

export default function PinnedProjectsSlider({ projects, translations }: PinnedProjectsSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const openModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  if (projects.length === 0) return null;

  const currentProject = projects[currentIndex];

  return (
    <>
      <section className="w-full py-16 px-4 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-40">
          <div className="w-full h-full" style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
          }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Pin className="w-6 h-6 text-amber-400 fill-amber-400" />
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                {translations.pinnedProjects.title}
              </h2>
            </div>
            <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
              {translations.pinnedProjects.subtitle}
            </p>
          </div>

          {/* Slider */}
          <div className="relative">
            <motion.div 
              className="bg-neutral-900/50 border border-neutral-700 rounded-4xl overflow-hidden backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="grid md:grid-cols-2 gap-0">
                {/* Image */}
                <div className="relative h-80 md:h-96 overflow-hidden">
                  <motion.img
                    key={currentProject.id}
                    src={currentProject.image}
                    alt={currentProject.title}
                    className="w-full h-full object-cover"
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-transparent"></div>
                  
                  {/* Badges */}
                  <div className="absolute top-6 right-6 flex gap-2">
                    <span className="bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                      {currentProject.language}
                    </span>
                    <span className="bg-neutral-800/80 backdrop-blur-sm text-neutral-300 px-3 py-1 rounded-full text-sm">
                      {currentProject.year}
                    </span>
                  </div>
                  
                  {/* Pin */}
                  <div className="absolute top-6 left-6">
                    <Pin className="w-5 h-5 text-amber-400 fill-amber-400" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <motion.div
                    key={currentProject.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                      {currentProject.title}
                    </h3>
                    <p className="text-neutral-300 leading-relaxed mb-6 line-clamp-4">
                      {currentProject.description.split('\n')[0]}
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4">
                      <button
                        onClick={() => openModal(currentProject)}
                        className="bg-[var(--color-accent-violet)] hover:bg-[var(--color-accent-violet)]/80 text-white px-6 py-3 rounded-full font-medium transition-colors cursor-pointer"
                      >
                        {translations.actions.seeMore}
                      </button>
                      {currentProject.link && (
                        <a
                          href={currentProject.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="border border-neutral-600 hover:border-neutral-500 text-white px-6 py-3 rounded-full font-medium transition-colors flex items-center gap-2 justify-center cursor-pointer"
                        >
                          {translations.actions.visitProject}
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Navigation */}
            {projects.length > 1 && (
              <>
                <button
                  onClick={prevProject}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 backdrop-blur-sm text-white p-3 rounded-full transition-colors z-10 cursor-pointer"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextProject}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 backdrop-blur-sm text-white p-3 rounded-full transition-colors z-10 cursor-pointer"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Dots indicator */}
            {projects.length > 1 && (
              <div className="flex justify-center mt-6 gap-2">
                {projects.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-colors cursor-pointer ${
                      index === currentIndex ? 'bg-white' : 'bg-neutral-600'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeModal}
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
                  src={selectedProject.image} 
                  alt={selectedProject.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 right-4 flex gap-2">
                  <span className="text-sm bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full">
                    {selectedProject.language}
                  </span>
                  <span className="text-sm bg-neutral-800/80 backdrop-blur-sm text-neutral-300 px-3 py-1 rounded-full">
                    {selectedProject.year}
                  </span>
                </div>
                <div className="absolute top-4 left-4">
                  <Pin className="w-5 h-5 text-amber-400 fill-amber-400" />
                </div>
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 translate-x-20 p-2 bg-black/70 backdrop-blur-sm hover:bg-black/80 rounded-full transition-colors cursor-pointer"
                >
                  <span className="text-white text-xl">×</span>
                </button>
              </div>

              {/* Contenu */}
              <div className="p-8">
                <div className="mb-6">
                  <h2 className="text-3xl font-bold text-white mb-4">
                    {selectedProject.title}
                  </h2>
                </div>

                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-white mb-3">{translations.modal.descriptionTitle}</h3>
                  <p className="text-neutral-300 leading-relaxed whitespace-pre-line">
                    {selectedProject.description}
                  </p>
                </div>

                {selectedProject.link && (
                  <div className="flex justify-center">
                    <a
                      href={selectedProject.link}
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