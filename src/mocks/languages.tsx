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

const MockLanguages: Array<Language> = [german, english];

const getLanguage = (isocode: string): Language | null => {
  if (!isocode) return null;
  return MockLanguages.find((lang) => lang.isocode === isocode) || null;
};

const getLanguages = (): Array<Language> | null => {
  return MockLanguages;
};

export { english, german, getLanguage, getLanguages, MockLanguages };
