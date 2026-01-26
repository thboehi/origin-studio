import { getDictionary } from "@/lib/i18n/get-dictionnary";
import ReactMarkdown from "react-markdown";

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locales: "fr" | "en" | "de" }>;
}) {
  const { locales } = await params;
  const dictionary = await getDictionary(locales);
  
  // Vérification de sécurité
  if (!dictionary || !dictionary.legal) {
    throw new Error(`Dictionary not found for locale: ${locales}`);
  }
  
  const legal = dictionary.legal;
  const privacy = legal.privacy;

  return (
    <main className="flex flex-col items-center min-h-screen py-24 px-4 bg-black">
      <article className="max-w-4xl w-full prose prose-invert prose-neutral">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 mt-20">{privacy.title}</h1>
        <p className="text-neutral-400 mb-12">
          {privacy.lastUpdated}
        </p>

        {Object.entries(privacy.sections).map(([key, section]) => (
          <section key={key} className="mb-12">
            <h2 className="text-2xl font-semibold text-white mb-4">{section.title}</h2>
            <div className="text-neutral-300 leading-relaxed prose prose-invert">
              <ReactMarkdown>{section.content}</ReactMarkdown>
            </div>
          </section>
        ))}
      </article>
    </main>
  );
}
