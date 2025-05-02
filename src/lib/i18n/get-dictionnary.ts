import fr from '@/locales/fr/common.json';
import en from '@/locales/en/common.json';

const dictionaries = {
  fr,
  en,
};

// Fonction qui retourne le dictionnaire correspondant à la locale demandée
export const getDictionary = async (locale: 'fr' | 'en') => {
  return dictionaries[locale];
};
