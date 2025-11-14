'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    // Essayer de détecter la locale depuis plusieurs sources
    let detectedLocale: 'fr' | 'en' | 'de' = 'fr';
    
    // 1. Depuis l'URL actuelle (document.referrer)
    if (document.referrer) {
      const refererMatch = document.referrer.match(/\/(fr|en|de)(?=\/|$)/);
      if (refererMatch && refererMatch[1]) {
        detectedLocale = refererMatch[1] as 'fr' | 'en' | 'de';
      }
    }
    
    // 2. Depuis le pathname actuel (au cas où)
    if (!detectedLocale || detectedLocale === 'fr') {
      const pathMatch = window.location.pathname.match(/^\/(fr|en|de)(?=\/|$)/);
      if (pathMatch && pathMatch[1]) {
        detectedLocale = pathMatch[1] as 'fr' | 'en' | 'de';
      }
    }
    
    // 3. Depuis le localStorage (si l'utilisateur a déjà visité le site)
    if (!detectedLocale || detectedLocale === 'fr') {
      const savedLocale = localStorage.getItem('preferredLocale') as 'fr' | 'en' | 'de' | null;
      if (savedLocale && ['fr', 'en', 'de'].includes(savedLocale)) {
        detectedLocale = savedLocale;
      }
    }
    
    // 4. Depuis la langue du navigateur
    if (!detectedLocale || detectedLocale === 'fr') {
      const browserLang = navigator.language.toLowerCase();
      if (browserLang.startsWith('en')) {
        detectedLocale = 'en';
      } else if (browserLang.startsWith('de')) {
        detectedLocale = 'de';
      }
    }
    
    // Redirection immédiate
    router.push(`/${detectedLocale}`);
  }, [router]);

  return null; // Redirection silencieuse
}