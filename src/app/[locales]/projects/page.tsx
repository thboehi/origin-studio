import HeroPage from "@/components/HeroPage";
import ProjectCard from "@/components/ProjectCard";
import PinnedProjectsSlider from "@/components/PinnedProjectsSlider";
import { getDictionary } from "@/lib/i18n/get-dictionnary";
import { ProjectsData } from "@/types/project";

async function getProjects(): Promise<ProjectsData> {
  try {
    // En développement, on utilise le système de fichiers
    if (process.env.NODE_ENV === 'development') {
      const fs = await import('fs');
      const path = await import('path');
      
            const filePath = path.join(process.cwd(), 'public/projects.json');
      const fileContents = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(fileContents);
    } else {
      // En production, on utilise fetch avec l'URL complète
      const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || ''}projects.json`, {
        cache: 'no-store'
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }
      
      return response.json();
    }
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
  const translations = dictionary.projects;

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
    </main>
  );
}
