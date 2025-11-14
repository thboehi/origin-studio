import { getDictionary } from "@/lib/i18n/get-dictionnary";
import HeroPage from "@/components/HeroPage";
import SimpleContactCard from "@/components/SimpleContactCard";
import ContactForm from "@/components/ContactForm";
import SectionTitle from "@/components/SectionTitle";
import SectionSubtitle from "@/components/SectionSubtitle";
import { Button } from "@/components/ui/button";

export default async function Contact({
  params,
}: {
  params: Promise<{ locales: "fr" | "en" | "de" }>;
}) {
  const { locales } = await params;
  const dictionary = await getDictionary(locales);
  const contact = dictionary.contact;

  return (
    <main className="flex flex-col items-center">
      {/* Hero Section */}
      <HeroPage title={contact.title} subtitle={contact.subtitle} intro="" />

      {/* Contact Form + Info Section */}
      <section className="w-full flex flex-col items-center justify-center py-[15vh] px-4">
        <div className="max-w-7xl w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left Column: Form */}
            <div className="order-2 lg:order-1">
              <ContactForm translations={contact.form} />
            </div>

            {/* Right Column: Contact Info */}
            <div className="order-1 lg:order-2 space-y-8">
              <div>
                <h3 className="text-3xl font-bold text-white mb-2">{contact.infoTitle}</h3>
                <p className="text-neutral-400 text-lg">{contact.infoSubtitle}</p>
              </div>

              <div className="space-y-6">
                {/* Contact Card */}
                <SimpleContactCard
                  title={contact.simpleContact.title}
                  description={contact.simpleContact.description}
                  email="info@origin-studio.ch"
                  phone="+41 79 176 39 92"
                  discord="https://discord.gg/6khXbmbJF9"
                  emailLabel={contact.simpleContact.emailLabel}
                  phoneLabel={contact.simpleContact.phoneLabel}
                  discordLabel={contact.simpleContact.discordLabel}
                />

                {/* Address - Disabled for the moment, as we have no location */}
                {/* <div className="group cursor-default">
                  <div className="mb-2">
                    <h4 className="text-xl font-semibold text-white mb-1">
                      {contact.methods.address.title}
                    </h4>
                    <p className="text-sm text-neutral-500">{contact.methods.address.description}</p>
                  </div>
                  <div className="text-neutral-300 space-y-1">
                    <p className="font-medium">Origin Studio SNC</p>
                    <p>Chemin du Bois-Gentil 5</p>
                    <p>1203 Genève</p>
                    <p>Suisse</p>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Google Maps Section - Disabled for the moment, as we have no location */}
      {/* <section className="w-full flex flex-col items-center justify-center py-[15vh] px-4">
        <div className="max-w-7xl w-full">
          <div className="relative w-full h-[500px] rounded-4xl overflow-hidden border border-neutral-800">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2760.8842544!2d6.1472!3d46.2044!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478c7b1f8b6b9999%3A0x1234567890abcdef!2sChemin%20du%20Bois-Gentil%205%2C%201203%20Gen%C3%A8ve!5e0!3m2!1sfr!2sch!4v1234567890123!5m2!1sfr!2sch"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Origin Studio location"
              className="grayscale hover:grayscale-0 transition-all duration-500"
            />
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="w-full flex flex-col items-center justify-center py-[25vh] px-4">
        <div className="max-w-4xl text-center">
          <SectionTitle className="mb-6">{contact.cta.title}</SectionTitle>
          <SectionSubtitle className="mb-8 leading-relaxed">
            {contact.cta.description}
          </SectionSubtitle>
          <Button variant="secondary" size="lg" className="mt-4">
            {contact.cta.button}
          </Button>
        </div>
      </section>
    </main>
  );
}
