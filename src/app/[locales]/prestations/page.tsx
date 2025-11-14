import { getDictionary } from "@/lib/i18n/get-dictionnary";
import { ServicesTranslations } from "@/types/translations";
import { Button } from "@/components/ui/button";
import HeroPage from "@/components/HeroPage";
import ServiceCard from "@/components/ServiceCard";
import ProcessStep from "@/components/ProcessStep";
import PricingCard from "@/components/PricingCard";
import FAQItem from "@/components/FAQItem";
import {
  CodeIcon,
  BrainCircuitIcon,
  ShieldCheckIcon,
  PaletteIcon,
  WrenchIcon,
  LightbulbIcon,
  ArrowRightIcon,
} from "lucide-react";

export default async function Services({
  params,
}: {
  params: { locales: "fr" | "en" };
}) {
  const { locales } = await Promise.resolve(params);
  const dictionary = await getDictionary(locales);
  const services = dictionary.services!;

  const serviceIcons: { [key: string]: React.ReactNode } = {
    "web-development": <CodeIcon className="w-8 h-8" />,
    "ai-solutions": <BrainCircuitIcon className="w-8 h-8" />,
    infrastructure: <ShieldCheckIcon className="w-8 h-8" />,
    design: <PaletteIcon className="w-8 h-8" />,
    maintenance: <WrenchIcon className="w-8 h-8" />,
    consulting: <LightbulbIcon className="w-8 h-8" />,
  };

  return (
    <main className="flex flex-col items-center">
      {/* Hero Section */}
      <HeroPage
        title={services.title}
        subtitle={services.subtitle}
        intro={services.intro}
      />

      {/* Services Section */}
      <section className="w-full flex flex-col items-center justify-start py-[15vh] px-4">
        <div className="max-w-7xl w-full">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {services.services.title}
            </h2>
            <p className="text-lg text-neutral-400 max-w-3xl mx-auto">
              {services.services.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.services.items.map((service, index) => (
              <ServiceCard
                key={service.id}
                title={service.title}
                shortDescription={service.shortDescription}
                description={service.description}
                features={service.features}
                icon={serviceIcons[service.id]}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="w-full flex flex-col items-center justify-center py-[15vh] px-4">
        <div className="max-w-5xl w-full">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {services.process.title}
            </h2>
            <p className="text-lg text-neutral-400 max-w-3xl mx-auto">
              {services.process.description}
            </p>
          </div>

          <div className="space-y-16">
            {services.process.steps.map((step, index) => (
              <ProcessStep
                key={step.number}
                number={step.number}
                title={step.title}
                description={step.description}
                duration={step.duration}
                durationLabel={services.process.durationLabel}
                index={index}
                isLast={index === services.process.steps.length - 1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="w-full flex flex-col items-center justify-center py-[15vh] px-4">
        <div className="max-w-6xl w-full">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {services.technologies.title}
            </h2>
            <p className="text-lg text-neutral-400 max-w-3xl mx-auto">
              {services.technologies.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {services.technologies.categories.map((category, index) => (
              <div
                key={category.name}
                className="bg-neutral-950 border border-neutral-800 rounded-4xl p-6 hover:border-neutral-600 transition-colors"
              >
                <h3 className="text-xl font-bold text-white mb-4 text-center">
                  {category.name}
                </h3>
                <ul className="space-y-2">
                  {category.items.map((item) => (
                    <li
                      key={item}
                      className="text-neutral-400 hover:text-white transition-colors text-sm text-center cursor-default"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="w-full flex flex-col items-center justify-center py-[15vh] px-4">
        <div className="max-w-7xl w-full">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {services.packages.title}
            </h2>
            <p className="text-lg text-neutral-400 max-w-3xl mx-auto">
              {services.packages.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            <PricingCard
              name={services.packages.starter.name}
              mountainInfo={services.packages.starter.mountainInfo}
              mountainDescription={services.packages.starter.mountainDescription}
              description={services.packages.starter.description}
              price={services.packages.starter.price}
              features={services.packages.starter.features}
              cta={services.packages.starter.cta}
              index={0}
            />
            <PricingCard
              name={services.packages.business.name}
              mountainInfo={services.packages.business.mountainInfo}
              mountainDescription={services.packages.business.mountainDescription}
              description={services.packages.business.description}
              price={services.packages.business.price}
              features={services.packages.business.features}
              cta={services.packages.business.cta}
              highlighted={true}
              bestOffer={services.packages.bestOffer}
              index={1}
            />
            <PricingCard
              name={services.packages.enterprise.name}
              mountainInfo={services.packages.enterprise.mountainInfo}
              mountainDescription={services.packages.enterprise.mountainDescription}
              description={services.packages.enterprise.description}
              price={services.packages.enterprise.price}
              features={services.packages.enterprise.features}
              cta={services.packages.enterprise.cta}
              index={2}
            />
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="w-full flex flex-col items-center justify-center py-[15vh] px-4">
        <div className="max-w-5xl w-full">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {services.useCases.title}
            </h2>
            <p className="text-lg text-neutral-400 max-w-3xl mx-auto">
              {services.useCases.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.useCases.items.map((useCase, index) => (
              <div
                key={index}
                className="bg-neutral-950 border border-neutral-800 rounded-4xl p-8 hover:border-neutral-600 transition-colors"
              >
                <h3 className="text-lg font-semibold text-white mb-3">
                  {useCase.question}
                </h3>
                <p className="text-neutral-400">{useCase.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full flex flex-col items-center justify-center py-[15vh] px-4">
        <div className="max-w-4xl w-full">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {services.faq.title}
            </h2>
          </div>

          <div className="space-y-4">
            {services.faq.items.map((item, index) => (
              <FAQItem
                key={index}
                question={item.question}
                answer={item.answer}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full flex flex-col items-center justify-center py-[20vh] px-4">
        <div className="max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {services.cta.title}
          </h2>
          <p className="text-lg text-neutral-400 mb-8 leading-relaxed">
            {services.cta.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg">
              {services.cta.primaryButton}
              <ArrowRightIcon className="ml-2 w-5 h-5" />
            </Button>
            <Button variant="outline" size="lg">
              {services.cta.secondaryButton}
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
