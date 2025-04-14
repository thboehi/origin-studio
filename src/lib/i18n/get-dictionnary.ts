import 'server-only';

const dictionaries = {
  fr: () => import('@/locales/fr/common.json').then((module) => module.default),
  en: () => import('@/locales/en/common.json').then((module) => module.default),
};

export const getDictionary = async (locale: 'fr' | 'en') => {
  return dictionaries[locale]();
};
