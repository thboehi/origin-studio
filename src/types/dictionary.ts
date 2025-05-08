export type TranslationValue = string | { [key: string]: TranslationValue };

export type Dictionary = {
  [key: string]: TranslationValue;
}; 