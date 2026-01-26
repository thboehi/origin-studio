import { getDictionary } from "@/lib/i18n/get-dictionnary";
import ReviewForm from "@/components/ReviewForm";
import { Star, Mail } from "lucide-react";
import type { Metadata } from "next";

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ locales: 'fr' | 'en' | 'de' }> 
}): Promise<Metadata> {
  const { locales } = await params;
  const dictionary = await getDictionary(locales);
  
  // Vérification de sécurité
  if (!dictionary || !dictionary.review) {
    return {
      title: 'Review - Origin Studio',
      description: 'Origin Studio - Web Development & Design',
    };
  }
  
  const domain = "https://origin-studio.ch";
  
  return {
    openGraph: {
      images: [
        {
          url: `${domain}/api/og?title=${encodeURIComponent(dictionary.review.title)}&description=${encodeURIComponent(dictionary.review.subtitle)}`,
          width: 1200,
          height: 630,
        }
      ],
    },
    twitter: {
      images: [`${domain}/api/og?title=${encodeURIComponent(dictionary.review.title)}&description=${encodeURIComponent(dictionary.review.subtitle)}`],
    },
  };
}

export default async function Review({
  params,
}: {
  params: Promise<{ locales: "fr" | "en" | "de" }>;
}) {
  const { locales } = await params;
  const dictionary = await getDictionary(locales);
  
  // Vérification de sécurité
  if (!dictionary) {
    throw new Error(`Dictionary not found for locale: ${locales}`);
  }
  
  const review = dictionary.review;

  return (
    <main className="flex flex-col items-center">
      {/* Header Section */}
      <section className="w-full flex flex-col items-center justify-center pt-32 pb-12 px-4">
        <div className="max-w-4xl w-full text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            {review.title}
          </h1>
          <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto">
            {review.subtitle}
          </p>
        </div>
      </section>

      {/* Review Form Section */}
      <section className="w-full flex flex-col items-center justify-center pb-[15vh] px-4">
        <div className="max-w-7xl w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left Column: Form */}
            <div className="order-2 lg:order-1">
              <ReviewForm translations={review.form} />
            </div>

            {/* Right Column: Info */}
            <div className="order-1 lg:order-2 space-y-8">
              <div>
                <h3 className="text-3xl font-bold text-white mb-2">{review.infoTitle}</h3>
                <p className="text-neutral-400 text-lg">{review.infoSubtitle}</p>
              </div>

              <div className="space-y-6">
                <div className="group cursor-default">
                  <div className="p-6 bg-neutral-900/50 border border-neutral-800 rounded-lg hover:border-neutral-700 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-yellow-500/10 rounded-lg">
                        <Star className="w-5 h-5 text-yellow-500" />
                      </div>
                      <h4 className="text-xl font-semibold text-white">
                        {review.whyReview.title}
                      </h4>
                    </div>
                    <p className="text-neutral-400 leading-relaxed">
                      {review.whyReview.description}
                    </p>
                  </div>
                </div>

                <div className="group cursor-default">
                  <div className="p-6 bg-neutral-900/50 border border-neutral-800 rounded-lg hover:border-neutral-700 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-blue-500/10 rounded-lg">
                        <Mail className="w-5 h-5 text-blue-500" />
                      </div>
                      <h4 className="text-xl font-semibold text-white">
                        {review.confirmation.title}
                      </h4>
                    </div>
                    <p className="text-neutral-400 leading-relaxed">
                      {review.confirmation.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
