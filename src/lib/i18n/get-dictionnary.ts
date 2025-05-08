import fr from '@/locales/fr/common.json';
import en from '@/locales/en/common.json';
import { Dictionary } from '@/types/dictionary';

const dictionaries: Record<'fr' | 'en', Dictionary> = {
  fr,
  en,
};

// Fonction qui retourne le dictionnaire correspondant à la locale demandée
export const getDictionary = async (locale: 'fr' | 'en'): Promise<Dictionary> => {
  return dictionaries[locale];
};
