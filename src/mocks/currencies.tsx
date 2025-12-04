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

const MockCurrencies: Array<Currency> = [euro, usdollar];

const getCurrencies = (): Array<Currency> | null => {
  return MockCurrencies;
};

const getCurrency = (code: string): Currency | null => {
  if (!code) return null;
  return MockCurrencies.find((currency) => currency.code === code) || null;
};

export { MockCurrencies, euro, getCurrencies, getCurrency, usdollar };
