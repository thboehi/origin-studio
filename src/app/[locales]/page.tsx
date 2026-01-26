import { getDictionary } from "@/lib/i18n/get-dictionnary";
import { HeroSlider } from "@/components/HeroSlider";
import FeatureCardsContainer from "@/components/FeatureCardsContainer";
import { Code2Icon, PaletteIcon, BrainCircuitIcon, ShieldCheckIcon, CheckCircleIcon, UsersIcon, MapPinIcon } from "lucide-react";
import ProcessTimeline from "@/components/ProcessTimeline";
import IdentitySection from "@/components/IdentitySection";
import StrengthCard from "@/components/StrengthCard";
import TeamMemberMini from "@/components/TeamMemberMini";
import CTA from "@/components/CTA";
import TestimonialsSlider from "@/components/TestimonialsSlider";
import TechStackIcons from "@/components/TechStackIcons";
import SectionTitle from "@/components/SectionTitle";
import SectionSubtitle from "@/components/SectionSubtitle";
import type { Metadata } from "next";
import type { Testimonial } from "@/types/testimonial";
import {
  FeaturesTranslations,
  ProcessTranslations,
  IdentityTranslations,
  StrengthsTranslations,
  TeamMiniTranslations,
  TestimonialsTranslations,
  TechStackTranslations
} from "@/types/translations";
import { promises as fs } from 'fs';
import path from 'path';

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ locales: 'fr' | 'en' | 'de' }> 
}): Promise<Metadata> {
  const { locales } = await params;
  const dictionary = await getDictionary(locales);
  
  // Vérification de sécurité
  if (!dictionary || !dictionary.hero) {
    return {
      title: 'Origin Studio',
      description: 'Origin Studio - Web Development & Design',
    };
  }
  
  const domain = "https://origin-studio.ch";
  
  return {
    openGraph: {
      images: [
        {
          url: `${domain}/api/og?title=${encodeURIComponent(dictionary.hero.title)}&description=${encodeURIComponent(dictionary.hero.description)}`,
          width: 1200,
          height: 630,
        }
      ],
    },
    twitter: {
      images: [`${domain}/api/og?title=${encodeURIComponent(dictionary.hero.title)}&description=${encodeURIComponent(dictionary.hero.description)}`],
    },
  };
}

export default async function Home({
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
  
  const features = dictionary.features as FeaturesTranslations;
  const processTranslations = dictionary.process as ProcessTranslations;
  const identity = dictionary.identity as IdentityTranslations;
  const strengths = dictionary.strengths as StrengthsTranslations;
  const teamMini = dictionary.teamMini as TeamMiniTranslations;
  const testimonials = dictionary.testimonials as TestimonialsTranslations;
  const techStack = dictionary.techStack as TechStackTranslations;
  const cta = dictionary.cta;

  // Charger les testimonials depuis le fichier JSON
  const testimonialsFile = path.join(process.cwd(), 'public', 'testimonials.json');
  const testimonialsFileContent = JSON.parse(await fs.readFile(testimonialsFile, 'utf8'));
  const testimonialsData: Testimonial[] = testimonialsFileContent.testimonials || testimonialsFileContent;
  
  // Services cards avec 4 catégories
  const featureCards = [
    {
      id: "web-dev",
      title: features.customWebApplications,
      description: features.customWebApplicationsDesc,
      icon: <Code2Icon />,
    },
    {
      id: "design",
      title: features.design,
      description: features.designDesc,
      icon: <PaletteIcon />,
    },
    {
      id: "ai",
      title: features.ai,
      description: features.aiDesc,
      icon: <BrainCircuitIcon />,
    },
    {
      id: "security",
      title: features.secureSolutions,
      description: features.secureSolutionsDesc,
      icon: <ShieldCheckIcon />,
    },
  ];

  // Process steps pour la timeline
  const processSteps = [
    { label: processTranslations.discovery },
    { label: processTranslations.quote },
    { label: processTranslations.design },
    { label: processTranslations.development },
    { label: processTranslations.testing },
    { label: processTranslations.deployment },
  ];

  return (
    <main className="flex flex-col items-center">
      {/* Hero Slider */}
      <HeroSlider dictionary={dictionary} />

      {/* Identity Section - Espacement modéré après hero */}
      <div className="py-8 md:py-12" />
      <IdentitySection text={identity.text} />

      {/* Strengths Section - Respiration légère avant */}
      <div className="py-10 md:py-16" />
      <section className="w-full flex flex-col items-center justify-center py-16 md:py-20 px-4 ">
        <div className="max-w-7xl w-full">
          <SectionTitle className="mb-12 md:mb-14">
            {strengths.title}
          </SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StrengthCard
              title={strengths.quality.title}
              description={strengths.quality.description}
              icon={<CheckCircleIcon className="w-full h-full" />}
              index={0}
            />
            <StrengthCard
              title={strengths.proximity.title}
              description={strengths.proximity.description}
              icon={<UsersIcon className="w-full h-full" />}
              index={1}
            />
            <StrengthCard
              title={strengths.local.title}
              description={strengths.local.description}
              icon={<MapPinIcon className="w-full h-full" />}
              index={2}
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section - Espacement modéré */}
      <div className="py-10 md:py-16" />
      <section className="w-full flex flex-col items-center justify-center py-16 md:py-20">
        <div className="max-w-7xl w-full px-4">
          <SectionTitle className="mb-12 md:mb-14">
            {testimonials.title}
          </SectionTitle>
        </div>
        <div className="w-full">
          <TestimonialsSlider
            testimonials={testimonialsData}
            showMoreText={testimonials.showMore}
            showLessText={testimonials.showLess}
            size="default"
          />
        </div>
      </section>

      {/* Tech Stack Section - Respiration légère */}
      <div className="py-8 md:py-12" />
      <TechStackIcons 
        title={techStack.title}
        subtitle={techStack.subtitle}
      />

      {/* Team Mini Section - Espacement modéré */}
      <div className="py-10 md:py-16" />
      <section className="w-full flex flex-col items-center justify-center py-16 md:py-20 px-4">
        <div className="max-w-5xl w-full">
          <SectionTitle className="mb-12 md:mb-14">
            {teamMini.title}
          </SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <TeamMemberMini
              name={teamMini.thomas.name}
              role={teamMini.thomas.role}
              description={teamMini.thomas.description}
              index={0}
            />
            <TeamMemberMini
              name={teamMini.eric.name}
              role={teamMini.eric.role}
              description={teamMini.eric.description}
              index={1}
            />
            <TeamMemberMini
              name={teamMini.shadi.name}
              role={teamMini.shadi.role}
              description={teamMini.shadi.description}
              index={2}
            />
          </div>
        </div>
      </section>

      {/* Services Section - Respiration avant section sombre */}
      <div className="py-10 md:py-16" />
      <section className="w-full flex flex-col items-center justify-center py-16 md:py-20 px-4 ">
        <div className="max-w-7xl w-full">
          <SectionTitle className="mb-5">
            {features.featuresTitle}
          </SectionTitle>
          <SectionSubtitle className="mb-12 md:mb-14">
            {features.description}
          </SectionSubtitle>
          <FeatureCardsContainer features={featureCards} />
        </div>
      </section>

      {/* Process Timeline Section - Espacement modéré */}
      <div className="py-10 md:py-16" />
      <section className="w-full flex flex-col items-center justify-center py-16 md:py-20 px-4">
        <div className="max-w-7xl w-full">
          <SectionTitle className="mb-5">
            {processTranslations.title}
          </SectionTitle>
          <SectionSubtitle className="mb-14 md:mb-16">
            {processTranslations.description}
          </SectionSubtitle>
          <ProcessTimeline steps={processSteps} />
        </div>
      </section>

      {/* Final CTA - Respiration légère avant le CTA final */}
      <div className="py-8 md:py-12" />
      <CTA
        title={cta.home.title}
        description={cta.home.description}
        primaryButton={{ text: cta.home.primaryButton, href: "https://discord.gg/6khXbmbJF9" }}
        secondaryButton={{ text: cta.home.secondaryButton, href: `/${locales}/contact` }}
      />
    </main>
  );
}
