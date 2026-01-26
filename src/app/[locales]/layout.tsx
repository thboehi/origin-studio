// Layout principal de l'application avec support multilingue
import type { Metadata } from "next";
import "../globals.css";
import { Navbar } from "@/components/Navbar";
import { getDictionary } from "@/lib/i18n/get-dictionnary";
import Footer from "@/components/Footer";
import { FooterTranslations } from "@/types/translations";
import DarkVeilWrapper from "@/components/bg-ui/DarkVeilWrapper";

// Fonction pour générer les métadonnées dynamiques selon la locale
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ locales: 'fr' | 'en' | 'de' }> 
}): Promise<Metadata> {
  const { locales } = await params;
  
  const domain = "https://origin-studio.ch";
  
  let title, description, keywords, locale;
  
  switch (locales) {
    case 'en':
      title = "Origin Studio - Custom Web Development & AI Solutions";
      description = "Swiss web agency specializing in custom web applications, private LLMs, and secure digital solutions. Three experts, one vision: transforming your ideas into remarkable digital solutions.";
      keywords = "web development, custom applications, private LLM, AI solutions, Swiss hosting, web agency Switzerland, frontend, backend, digital transformation";
      locale = 'en_US';
      break;
    case 'de':
      title = "Origin Studio - Maßgeschneiderte Webentwicklung & KI-Lösungen";
      description = "Schweizer Webagentur spezialisiert auf maßgeschneiderte Webanwendungen, private LLMs und sichere digitale Lösungen. Drei Experten, eine Vision: Ihre Ideen in bemerkenswerte digitale Lösungen verwandeln.";
      keywords = "Webentwicklung, maßgeschneiderte Anwendungen, privates LLM, KI-Lösungen, Schweizer Hosting, Webagentur Schweiz, Frontend, Backend, digitale Transformation";
      locale = 'de_CH';
      break;
    default: // 'fr'
      title = "Origin Studio - Développement Web sur Mesure & Solutions IA";
      description = "Agence web suisse spécialisée dans les applications web sur mesure, les modèles de langage privés et les solutions numériques sécurisées. Trois experts, une vision : transformer vos idées en solutions digitales remarquables.";
      keywords = "développement web, applications sur mesure, LLM privé, solutions IA, hébergement suisse, agence web Suisse, frontend, backend, transformation digitale";
      locale = 'fr_CH';
      break;
  }

  return {
    title,
    description,
    keywords,
    authors: [{ name: "Origin Studio" }],
    creator: "Origin Studio",
    publisher: "Origin Studio",
    
    // OpenGraph
    openGraph: {
      type: 'website',
      locale: locale,
      alternateLocale: locales === 'fr' ? ['en_US', 'de_CH'] : locales === 'en' ? ['fr_CH', 'de_CH'] : ['fr_CH', 'en_US'],
      url: `${domain}/${locales}`,
      title,
      description,
      siteName: 'Origin Studio',
      images: [
        {
          url: `${domain}/api/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`,
          width: 1200,
          height: 630,
          alt: title,
        }
      ],
    },

    // Twitter Card
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${domain}/api/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`],
      creator: '@OriginStudio',
    },

    // Robots
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },

    // Verification et autres
    verification: {
      google: undefined, // À ajouter plus tard si nécessaire
    },

    // Canonical et alternates
    alternates: {
      canonical: `${domain}/${locales}`,
      languages: {
        'fr-CH': `${domain}/fr`,
        'en-US': `${domain}/en`,
        'de-CH': `${domain}/de`,
      },
    },

    // Autres métadonnées importantes
    category: 'technology',
    classification: 'Business',
    
    // Métadonnées additionnelles
    other: {
      'apple-mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-status-bar-style': 'black-translucent',
      'format-detection': 'telephone=no',
      'msapplication-TileColor': '#5F10DC',
      'theme-color': '#5F10DC',
    }
  };
}

// Layout principal qui gère le support multilingue
// Accepte les paramètres de locale (fr/en/de) 
export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locales: 'fr' | 'en' | 'de' }>;
}>) {
  const { locales } = await params;
  const dictionary = await getDictionary(locales);
  
  // Vérification de sécurité
  if (!dictionary) {
    throw new Error(`Dictionary not found for locale: ${locales}`);
  }
  
  const footer = dictionary.footer as FooterTranslations;
  
  // JSON-LD Schema pour le SEO structuré
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Origin Studio",
    "url": "https://origin-studio.ch",
    "logo": "https://origin-studio.ch/logo_origin_full.svg",
    "description": locales === 'en' 
      ? "Swiss web agency specializing in custom web applications, private LLMs, and secure digital solutions."
      : "Agence web suisse spécialisée dans les applications web sur mesure, les modèles de langage privés et les solutions numériques sécurisées.",
    "foundingLocation": {
      "@type": "Country",
      "name": "Switzerland"
    },
    "areaServed": "Switzerland",
    "serviceType": [
      "Web Development",
      "Custom Web Applications", 
      "Private LLM Integration",
      "AI Solutions",
      "Digital Transformation"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "areaServed": "CH",
      "availableLanguage": ["French", "English"]
    },
    "sameAs": [
      "https://origin-studio.ch"
    ]
  };

  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Fixed background animation with scroll effects */}
      <DarkVeilWrapper />
      <Navbar params={{ locales }} />
      {children}
      <Footer dictionary={footer} />
    </>
  );
}
