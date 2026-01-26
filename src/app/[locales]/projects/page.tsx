import HeroPage from "@/components/HeroPage";
import ProjectCard from "@/components/ProjectCard";
import PinnedProjectsSlider from "@/components/PinnedProjectsSlider";
import CTA from "@/components/CTA";
import { getDictionary } from "@/lib/i18n/get-dictionnary";
import { ProjectsData } from "@/types/project";
import type { Metadata } from "next";

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ locales: 'fr' | 'en' | 'de' }> 
}): Promise<Metadata> {
  const { locales } = await params;
  const dictionary = await getDictionary(locales);
  
  // Vérification de sécurité
  if (!dictionary || !dictionary.projects) {
    return {
      title: 'Projects - Origin Studio',
      description: 'Origin Studio - Web Development & Design',
    };
  }
  
  const domain = "https://origin-studio.ch";
  
  return {
    openGraph: {
      images: [
        {
          url: `${domain}/api/og?title=${encodeURIComponent(dictionary.projects.title)}&description=${encodeURIComponent(dictionary.projects.description)}`,
          width: 1200,
          height: 630,
        }
      ],
    },
    twitter: {
      images: [`${domain}/api/og?title=${encodeURIComponent(dictionary.projects.title)}&description=${encodeURIComponent(dictionary.projects.description)}`],
    },
  };
}

async function getProjects(): Promise<ProjectsData> {
  try {
    const fs = await import('fs');
    const path = await import('path');

    const filePath = path.join(process.cwd(), 'public', 'projects.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error('Error loading projects:', error);
    // Retourner des données par défaut en cas d'erreur
    return { projects: [] };
  }
}

export default async function Projects({
  params,
}: {
  params: Promise<{ locales: "fr" | "en" | "de" }>;
}) {
  // On attend les paramètres
  const { locales } = await params;

  // Fonction pour récupérer les traductions en fonction de la locale
  const dictionary = await getDictionary(locales);
  
  // Vérification de sécurité
  if (!dictionary) {
    throw new Error(`Dictionary not found for locale: ${locales}`);
  }
  
  const translations = dictionary.projects;
  const cta = dictionary.cta;

  // Récupération des projets depuis le fichier JSON
  const projectsData = await getProjects();

  // Séparer les projets épinglés des autres
  const pinnedProjects = projectsData.projects.filter(project => project.pinned);
  const regularProjects = projectsData.projects;

  // Tri des projets réguliers par année décroissante
  const sortedRegularProjects = regularProjects.sort((a, b) => b.year - a.year);

  return (
    <main className="flex flex-col items-center">
      <HeroPage
        title={translations.title}
        subtitle={translations.description}
      />
      
      {/* Bannière des projets épinglés */}
      {pinnedProjects.length > 0 && (
        <PinnedProjectsSlider projects={pinnedProjects} translations={translations} />
      )}
      
      {/* Section des autres projets */}
      <section className="w-full flex flex-col items-center justify-center py-16 px-4">
        <div className="max-w-7xl w-full">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            {translations.allProjects.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedRegularProjects.map((project) => (
              <ProjectCard
                key={project.id}
                title={project.title}
                language={project.language}
                description={project.description}
                image={project.image}
                link={project.link}
                year={project.year}
                pinned={project.pinned}
                translations={translations}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTA
        title={cta.projects.title}
        description={cta.projects.description}
        primaryButton={{ text: cta.projects.primaryButton, href: "https://discord.gg/6khXbmbJF9" }}
        secondaryButton={{ text: cta.projects.secondaryButton, href: `/${locales}/contact` }}
      />
    </main>
  );
}
