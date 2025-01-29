import { Country } from '@/models/commerce-types';
import { english, german } from './languages';

const germany: Country = {
  name: 'Germany',
  capital: 'Berlin',
  code: 'DE',
  currencies: [
    {
      code: 'EUR',
      name: 'Euro',
      symbol: '€',
    },
  ],
  languages: [german],
  coordinates: [51, 9],
  area: 357114,
  maps: {
    googleMaps: 'https://goo.gl/maps/mD9FBMq1nvXUBrkv6',
    openStreetMaps: 'https://www.openstreetmap.org/relation/51477',
  },
  population: 83240525,
  postalCode: {
    format: '#####',
    regex: '^(\\d{5})$',
  },
  flags: {
    png: 'https://flagcdn.com/w320/de.png',
    svg: 'https://flagcdn.com/de.svg',
  },
  emoji: '🇩🇪',
  countryCallingCode: '+49',
};

const us: Country = {
  name: 'United States',
  capital: 'Washington, D.C.',
  code: 'US',
  currencies: [
    {
      code: 'USD',
      name: 'United States dollar',
      symbol: '$',
    },
  ],
  languages: [english],
  coordinates: [38, -97],
  area: 9372610,
  maps: {
    googleMaps: 'https://goo.gl/maps/e8M246zY4BSjkjAv6',
    openStreetMaps:
      'https://www.openstreetmap.org/relation/148838#map=2/20.6/-85.8',
  },
  population: 329484123,
  postalCode: {
    format: '#####-####',
    regex: '^\\d{5}(-\\d{4})?$',
  },
  flags: {
    png: 'https://flagcdn.com/w320/us.png',
    svg: 'https://flagcdn.com/us.svg',
  },
  emoji: '🇺🇸',
  countryCallingCode: '+1',
};

const countries: Array<Country> = [germany, us];

const getCountries = (): Array<Country> | undefined => {
  return countries;
};

const getCountry = (code: string): Country | undefined => {
  return countries.find((country) => country.code === code);
};

export { countries, germany, getCountries, getCountry, us };
