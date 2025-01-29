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

const getCurrencies = (): Array<Currency> | undefined => {
  return currencies;
};

const getCurrency = (code: string): Currency | undefined => {
  return currencies.find((currency) => currency.code === code);
};

export { currencies, euro, getCurrencies, getCurrency, usdollar };
