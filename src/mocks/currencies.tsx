import { Currency } from '@/models/commerce-types';

const euro = {
  code: 'EUR',
  name: 'Euro',
  symbol: '€',
};

const usdollar = {
  code: 'USD',
  name: 'US Dollar',
  symbol: '$',
};

const currencies: Array<Currency> = [euro, usdollar];

const getCurrencies = (): Array<Currency> | null => {
  return currencies;
};

const getCurrency = (code: string): Currency | null => {
  if (!code) return null;
  return currencies.find((currency) => currency.code === code) || null;
};

export { currencies, euro, getCurrencies, getCurrency, usdollar };
