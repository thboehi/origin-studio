import frCommon from '@/locales/fr/common.json';
import enCommon from '@/locales/en/common.json';
import deCommon from '@/locales/de/common.json';
import frServices from '@/locales/fr/services.json';
import enServices from '@/locales/en/services.json';
import deServices from '@/locales/de/services.json';
import frLegal from '@/locales/fr/legal.json';
import enLegal from '@/locales/en/legal.json';
import deLegal from '@/locales/de/legal.json';
import { Dictionary } from '@/types/dictionary';

const dictionaries: Record<'fr' | 'en' | 'de', Dictionary> = {
  fr: { ...frCommon, services: frServices, legal: frLegal },
  en: { ...enCommon, services: enServices, legal: enLegal },
  de: { ...deCommon, services: deServices, legal: deLegal },
};

// Fonction qui retourne le dictionnaire correspondant à la locale demandée
export const getDictionary = async (locale: 'fr' | 'en' | 'de'): Promise<Dictionary> => {
  // Vérifier que la locale est valide, sinon utiliser 'fr' par défaut
  const validLocale = locale && dictionaries[locale] ? locale : 'fr';
  return dictionaries[validLocale];
};
