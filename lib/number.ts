/**
 * Get locale number
 */
export const number = (
  value: number,
  style = "decimal",
  options?: Intl.NumberFormatOptions,
  locale = "pt-BR"
): string => {
  const defaultOptions = getOptions(locale)[style];
  options = { ...defaultOptions, ...options };
  return new Intl.NumberFormat(locale, options).format(value);
};

/**
 * Get currency locale
 * TODO: Add support for other locales
 */
const getCurrencyLocale = new Map([
  ["en-US", "USD"],
  ["pt-BR", "BRL"],
  ["fr-CA", "CAD"],
]);

const getOptions = (locale: string): any => ({
  currency: {
    style: "currency",
    currency: getCurrencyLocale.get(locale),
  },
  decimal: {
    style: "decimal",
  },
  percent: {
    style: "percent",
  },
});
