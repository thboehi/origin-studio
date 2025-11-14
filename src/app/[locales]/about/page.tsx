import { getDictionary } from "@/lib/i18n/get-dictionnary";
import { Button } from "@/components/ui/button";
import TeamCard from "@/components/TeamCard";
import HeroPage from "@/components/HeroPage";
import FeatureCardsContainer from "@/components/FeatureCardsContainer";
import SectionTitle from "@/components/SectionTitle";
import SectionSubtitle from "@/components/SectionSubtitle";
import { ShieldCheckIcon, StarIcon, HandshakeIcon } from "lucide-react";
import Link from "next/link";

export default async function About({
  params,
}: {
  params: Promise<{ locales: "fr" | "en" | "de" }>;
}) {
  // On attend les paramètres
  const { locales } = await params;

  // Fonction pour récupérer les traductions en fonction de la locale
  const dictionary = await getDictionary(locales);
  const about = dictionary.about;

  const valuesFeatures = [
    {
      title: about.values.local.title,
      description: about.values.local.description,
      icon: <ShieldCheckIcon className="w-6 h-6" />,
      id: "local",
    },
    {
      title: about.values.quality.title,
      description: about.values.quality.description,
      icon: <StarIcon className="w-6 h-6" />,
      id: "quality",
    },
    {
      title: about.values.commitment.title,
      description: about.values.commitment.description,
      icon: <HandshakeIcon className="w-6 h-6" />,
      id: "commitment",
    },
  ];

  return (
    <main className="flex flex-col items-center">
      {/* Hero Section */}
      <HeroPage
        title={about.title}
        subtitle={about.subtitle}
        intro={about.intro}
      />

      {/* Story Section */}
      <section className="w-full flex flex-col items-center justify-start py-[15vh] px-4">
        <div className="max-w-4xl text-center">
          <SectionTitle className="mb-6">
            {about.story.title}
          </SectionTitle>
          <SectionSubtitle className="leading-relaxed whitespace-pre-line">
            {about.story.description}
          </SectionSubtitle>
        </div>
      </section>

      {/* Mission Section */}
      <section className="w-full flex flex-col items-center justify-start py-[15vh] px-4">
        <div className="max-w-4xl text-center">
          <SectionTitle className="mb-6">
            {about.mission.title}
          </SectionTitle>
          <SectionSubtitle className="leading-relaxed">
            {about.mission.description}
          </SectionSubtitle>
        </div>
      </section>

      {/* Team Section */}
      <section className="w-full flex flex-col items-center justify-center py-[25vh] px-4 min-h-[75vh]">
        <SectionTitle className="mb-6">
          {about.team.title}
        </SectionTitle>
        <SectionSubtitle className="mb-12 max-w-2xl">
          {about.team.description}
        </SectionSubtitle>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 max-w-6xl w-full relative">
          <TeamCard
            title={about.team.commercial.title}
            name={about.team.commercial.name}
            description={about.team.commercial.description}
            image="/img/team/blank.webp"
            phone="+41 79 176 39 92"
            mail="chadi@origin-studio.ch"
            protectionMessage={about.team.protectionMessage}
          />
          <TeamCard
            title={about.team.backend.title}
            name={about.team.backend.name}
            description={about.team.backend.description}
            image="/img/team/blank.webp"
            phone="+41 79 941 89 68"
            mail="eric@origin-studio.ch"
            protectionMessage={about.team.protectionMessage}
          />
          <TeamCard
            title={about.team.frontend.title}
            name={about.team.frontend.name}
            description={about.team.frontend.description}
            image="/img/team/thoma.webp"
            phone="+41 79 648 19 98"
            mail="thomas@origin-studio.ch"
            protectionMessage={about.team.protectionMessage}
          />
        </div>
      </section>

      {/* Values Section */}
      <section className="w-full flex flex-col items-center justify-center py-[25vh] px-4">
        <SectionTitle className="mb-6">
          {about.values.title}
        </SectionTitle>
        <SectionSubtitle className="mb-12 max-w-2xl">
          {about.values.description}
        </SectionSubtitle>
        
        <FeatureCardsContainer features={valuesFeatures} />
      </section>

      {/* CTA Section */}
      <section className="w-full flex flex-col items-center justify-center py-[25vh] px-4">
        <div className="max-w-4xl text-center">
          <SectionTitle className="mb-6">
            {about.cta.title}
          </SectionTitle>
          <SectionSubtitle className="mb-8 leading-relaxed">
            {about.cta.description}
          </SectionSubtitle>
          <Link href="/contact">
            <Button variant="secondary" size="lg" className="mt-4">
              {about.cta.button}
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}