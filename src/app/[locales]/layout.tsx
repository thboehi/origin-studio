// Layout principal de l'application avec support multilingue
import type { Metadata } from "next";
import "../globals.css";
import { Navbar } from "@/components/Navbar";
import { getDictionary } from "@/lib/i18n/get-dictionnary";
import Footer from "@/components/Footer";
import { FooterTranslations } from "@/types/translations";
import DarkVeilWrapper from "@/components/bg-ui/DarkVeilWrapper";
import { i18n } from "@/lib/i18n/config";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locales: locale }));
}

// Fonction pour générer les métadonnées dynamiques selon la locale
export async function generateMetadata({  
  params 
}: { 
  params: Promise<{ locales: 'fr' | 'en' | 'de' }> 
}): Promise<Metadata> {
  const { locales } = await params;
  
  const domain = process.env.NEXT_PUBLIC_SITE_URL ?? "";
  
  let title, description, keywords, locale;
  
  switch (locales) {
    case 'en':
      title = "Origin Studio - Custom Web Development & Automation Solutions";
      description = "Swiss web agency specializing in custom web development, web applications and automation solutions. Automate your business tasks with n8n and AI. Three experts, one vision: transforming your ideas into remarkable digital solutions.";
      keywords = "web development, custom web applications, automation solutions, n8n, business automation, web agency Switzerland, Swiss hosting, digital transformation, AI solutions, workflow automation";
      locale = 'en_US';
      break;
    case 'de':
      title = "Origin Studio - Maßgeschneiderte Webentwicklung & Automatisierungslösungen";
      description = "Schweizer Webagentur spezialisiert auf maßgeschneiderte Webentwicklung, Webanwendungen und Automatisierungslösungen. Automatisieren Sie Ihre Unternehmensaufgaben mit n8n und KI. Drei Experten, eine Vision: Ihre Ideen in bemerkenswerte digitale Lösungen verwandeln.";
      keywords = "Webentwicklung, maßgeschneiderte Webanwendungen, Automatisierungslösungen, n8n, Unternehmensautomatisierung, Webagentur Schweiz, Schweizer Hosting, digitale Transformation, KI Lösungen, Workflow-Automatisierung";
      locale = 'de_CH';
      break;
    default: // 'fr'
      title = "Origin Studio - Développement Web sur Mesure & Solutions d'Automatisation";
      description = "Agence web suisse spécialisée dans le développement web sur mesure, les applications web et les solutions d'automatisation. Automatisez vos tâches d'entreprise avec n8n et l'IA. Trois experts, une vision : transformer vos idées en solutions digitales remarquables.";
      keywords = "développement web, applications web sur mesure, solutions d'automatisation, n8n, automatisation entreprise, agence web Suisse, hébergement suisse, transformation digitale, solutions IA, workflow automation";
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
  const currentYear = new Date().getFullYear();

  // JSON-LD Schema pour le SEO structuré
  const domain = process.env.NEXT_PUBLIC_SITE_URL ?? "";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Origin Studio",
    "url": domain,
    "logo": `${domain}/img/logo_origin_full.svg`,
    "description": locales === 'en' 
      ? "Swiss web agency specializing in custom web development, web applications and automation solutions. Automate your business tasks with n8n and AI."
      : "Agence web suisse spécialisée dans le développement web sur mesure, les applications web et les solutions d'automatisation. Automatisez vos tâches d'entreprise avec n8n et l'IA.",
    "foundingLocation": {
      "@type": "Country",
      "name": "Switzerland"
    },
    "areaServed": "Switzerland",
    "serviceType": [
      "Web Development",
      "Custom Web Applications", 
      "Business Automation Solutions",
      "Workflow Automation",
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
      domain
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
      <Footer dictionary={footer} locale={locales} year={currentYear} />
    </>
  );
}
