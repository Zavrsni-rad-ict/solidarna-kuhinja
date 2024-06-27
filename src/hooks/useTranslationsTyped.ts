import translateJSON from '../locales/en/translations.json';

import { useTranslation } from 'react-i18next';

// export type TranslationKeys = typeof translateJSON;

// export const useTranslationsTyped = <T extends keyof TranslationKeys>(
//   baseKey: T,
// ) => {
//   const { t } = useTranslation<T>(baseKey);

//   type DeepKeys<T> = T extends object
//     ? { [K in keyof T]: `${K}.${DeepKeys<T[K]>}` }[keyof T]
//     : '';

//   // Generički tip za funkciju translate koja prihvata ključeve
//   type TranslateFunction<T> = (key: DeepKeys<T>) => string;

//   // Implementacija funkcije translate
//   const translate: TranslateFunction<T> = (key) => t(`${baseKey}.${key}`);

//   return { t: translate };
// };

type TranslationKeys = keyof typeof translateJSON;
export const useTranslationsTyped = (translations: TranslationKeys) =>
  useTranslation<TranslationKeys>(translations);
