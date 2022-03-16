/**
 * @param {number|string} value
 * @param {string} [style=decimal]
 * @param {string} [locale=pt-BR]
 * @param {object} [options]
 * @returns {string}
 */
export const number = (
  value,
  style = "decimal",
  { ...options } = {},
  locale = "pt-BR"
) => {
  const defaultOptions = getOptions(locale)[style];
  options = { ...options, ...defaultOptions };
  return new Intl.NumberFormat(locale, options).format(value);
};

/* To be updated based on need - French - Canada and US locale handled  */
const currencyToLocale = new Map([
  ["en-US", "USD"],
  ["pt-BR", "BRL"],
  ["fr-CA", "CAD"],
]);

const getOptions = (locale) => ({
  currency: {
    style: "currency",
    currency: currencyToLocale.get(locale),
  },
  decimal: {},
  percent: {},
});
