export const getCurrencyIso = (locale: string): string | null => {
  if (!locale) return null;
  switch (locale) {
    case 'de-DE':
      return 'EUR';
    case 'en-US':
      return 'USD';
    default:
      throw new Error(`No curencyIso was found for the locale ${locale}`);
  }
};

export const localizeCurrency = (
  locale: string,
  value: number
): string | null => {
  if (!(locale && value)) return null;
  const currency = getCurrencyIso(locale) || undefined;
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(
    value
  );
};

export const localizeDate = (
  locale: string,
  date: string,
  includeTime?: boolean
): string | null => {
  if (!(locale && date)) return null;

  const datetime = new Date(date);
  if (!datetime) return null;

  let formatter = new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });

  if (includeTime) {
    formatter = new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }
  return formatter.format(datetime);
};
