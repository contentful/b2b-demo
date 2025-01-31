import { Language } from '@/models/commerce-types';

const english = {
  isocode: 'en',
  name: 'English',
  nativeName: 'English',
  active: true,
};

const german = {
  isocode: 'de',
  name: 'German',
  nativeName: 'Deutch',
  active: true,
};

const languages: Array<Language> = [german, english];

const getLanguage = (isocode: string): Language | null => {
  if (!isocode) return null;
  return languages.find((lang) => lang.isocode === isocode);
};

const getLanguages = (): Array<Language> | null => {
  return languages;
};

export { english, german, getLanguage, getLanguages, languages };
