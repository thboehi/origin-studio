import { getDictionary } from "@/lib/i18n/get-dictionnary";
import { Button } from "@/components/ui/button";
import HeroPage from "@/components/HeroPage";
import ServiceCard from "@/components/ServiceCard";
import ProcessStep from "@/components/ProcessStep";
import PricingCard from "@/components/PricingCard";
import FAQItem from "@/components/FAQItem";
import Link from "next/link";
import {
  CodeIcon,
  BrainCircuitIcon,
  ShieldCheckIcon,
  PaletteIcon,
  WrenchIcon,
  LightbulbIcon,
} from "lucide-react";

export default async function Services({
  params,
}: {
  params: Promise<{ locales: "fr" | "en" }>;
}) {
  const { locales } = await params;
  const dictionary = await getDictionary(locales);
  
  // Vérification de sécurité
  if (!dictionary || !dictionary.services) {
    throw new Error(`Dictionary not found for locale: ${locales}`);
  }
  
  const services = dictionary.services;

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
            {services.technologies.categories.map((category) => (
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

          {/* Categories */}
          <div className="space-y-24">
            {services.packages.categories.map((category, categoryIndex) => (
              <div key={category.id} className="w-full">
                {/* Category Header */}
                <div className="text-center mb-12">
                  {category.badge && (
                    <div className="inline-block bg-[var(--color-accent-violet)] text-white px-4 py-1 rounded-full text-sm font-semibold mb-4">
                      {category.badge}
                    </div>
                  )}
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    {category.title}
                  </h3>
                  <p className="text-neutral-400 max-w-2xl mx-auto">
                    {category.description}
                  </p>
                </div>

                {/* Packages Grid */}
                <div className={`grid gap-8 ${
                  category.packages.length === 1 
                    ? 'grid-cols-1 max-w-2xl mx-auto' 
                    : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                }`}>
                  {category.packages.map((pkg, pkgIndex) => (
                    <PricingCard
                      key={pkgIndex}
                      name={pkg.name}
                      description={pkg.description}
                      price={pkg.price}
                      originalPrice={pkg.originalPrice}
                      paymentOptions={pkg.paymentOptions}
                      details={pkg.details}
                      advantages={pkg.advantages}
                      conditions={pkg.conditions}
                      cta={pkg.cta}
                      highlighted={pkg.highlighted}
                      bestOffer={pkg.highlighted ? services.packages.bestOffer : undefined}
                      serviceId={`${category.id}-${pkg.name.toLowerCase()}`}
                      index={categoryIndex * 3 + pkgIndex}
                      locale={locales}
                    />
                  ))}
                </div>
              </div>
            ))}
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
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="https://discord.gg/6khXbmbJF9" target="_blank" rel="noopener noreferrer">
              <Button variant="secondary" size="lg" className="bg-[#5865F2] hover:bg-[#4752C4] flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 71 55" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0)">
                    <path d="M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3935 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978ZM23.7259 37.3253C20.2276 37.3253 17.3451 34.1136 17.3451 30.1693C17.3451 26.225 20.1717 23.0133 23.7259 23.0133C27.308 23.0133 30.1626 26.2532 30.1066 30.1693C30.1066 34.1136 27.28 37.3253 23.7259 37.3253ZM47.3178 37.3253C43.8196 37.3253 40.9371 34.1136 40.9371 30.1693C40.9371 26.225 43.7636 23.0133 47.3178 23.0133C50.9 23.0133 53.7545 26.2532 53.6986 30.1693C53.6986 34.1136 50.9 37.3253 47.3178 37.3253Z" fill="currentColor" />
                  </g>
                  <defs>
                    <clipPath id="clip0">
                      <rect width="71" height="55" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                {services.cta.primaryButton}
              </Button>
            </Link>
            <Link href={`/${locales}/contact`}>
              <Button variant="outline" size="lg">
                {services.cta.secondaryButton}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
