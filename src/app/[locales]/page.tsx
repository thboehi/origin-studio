import { getDictionary } from "@/lib/i18n/get-dictionnary";
import { HeroSlider } from "@/components/HeroSlider";
import FeatureCard from "@/components/FeatureCard";
import { BrainCircuitIcon, Code2Icon, ShieldCheckIcon } from "lucide-react";
import ProcessCard from "@/components/ProcessCard";
import { Separator } from "@/components/ui/separator";
import { FeaturesTranslations, ProcessTranslations } from "@/types/translations";
import Footer from "@/components/Footer";
export default async function Home({ params }: { params: { locales: 'fr' | 'en' } }) {
  // On attend les paramètres
  const { locales } = await Promise.resolve(params);
  
  // Fonction pour récupérer les traductions en fonction de la locale
  const dictionary = await getDictionary(locales);
  const features = dictionary.features as FeaturesTranslations;
  const process = dictionary.process as ProcessTranslations;
  return (
    <main className="flex flex-col items-center">
      {/* Hero Slider */}
      <HeroSlider dictionary={dictionary} />

      {/* Feature Section */}
      <section className="flex flex-col items-center justify-center gap-8 min-h-[45rem] py-16 md:py-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-white">{features.featuresTitle}</h2>
        <p className="text-center text-lg text-neutral-400">{features.description}</p>
        <div className="flex flex-wrap items-center justify-center gap-10">
          <FeatureCard 
          title={features.customWebApplications} 
          description={features.customWebApplicationsDesc} 
          icon={<Code2Icon />} 
          />
          <FeatureCard 
          title={features.privateLLMs} 
          description={features.privateLLMsDesc} 
          icon={<BrainCircuitIcon />}
          />
          <FeatureCard 
          title={features.secureSolutions} 
          description={features.secureSolutionsDesc} 
          icon={<ShieldCheckIcon />}
          />
        </div>
      </section>

      {/* Process Section */}
      <section className="w-full flex flex-col items-center justify-center py-16 lg:px-10 gap-10 min-h-[50rem] bg-gradient-to-b from-neutral-950 to-slate-900">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-white">{process.title}</h2>
        <p className="text-center text-lg text-neutral-400">
          {process.description}
        </p>
        <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-8 lg:h-[400px]">
          <div className="flex flex-col items-center justify-center gap-8 max-w-xl w-full">
            <ProcessCard 
              title={process.initialConsultation} 
              description={process.initialConsultationDesc}
              number={1} 
            />
            <Separator
              orientation="horizontal"
              className="block lg:hidden w-1/2 bg-gradient-to-b from-blue-500 to-purple-500 mx-10 border-0 h-full"
            />
            <div className="block lg:hidden w-full">
              <ProcessCard 
                title={process.architecturalDesign} 
                description={process.architecturalDesignDesc}
                number={2} 
              />
            </div>
            <Separator
              orientation="horizontal"
              className="block lg:hidden w-1/2 bg-gradient-to-b from-blue-500 to-purple-500 mx-10 border-0 h-full"
            />
            <ProcessCard 
              title={process.developmentAgile} 
              description={process.developmentAgileDesc}
              number={3} 
            />
            <Separator
              orientation="horizontal"
              className="block lg:hidden w-1/2 bg-gradient-to-b from-blue-500 to-purple-500 mx-10 border-0 h-full"
            />
            <div className="block lg:hidden w-full">
              <ProcessCard 
                title={process.deploymentMaintenance} 
                description={process.deploymentMaintenanceDesc}
                number={4} 
              />
            </div>
          </div>
          <Separator
            orientation="vertical"
            className="hidden lg:block w-2 bg-gradient-to-b from-blue-500 to-purple-500 mx-10 border-0 h-full"
          />
          <div className="hidden lg:flex flex-col items-center justify-center gap-8 max-w-xl w-full">
            <ProcessCard 
              title={process.architecturalDesign} 
              description={process.architecturalDesignDesc}
              number={2} 
            />
            <ProcessCard 
              title={process.deploymentMaintenance} 
              description={process.deploymentMaintenanceDesc}
              number={4} 
            />
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
 