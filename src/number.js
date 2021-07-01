/**
 * @param {number|string} value
 * @param {string} [style]
 * @param {string} [locale]
 * @param {object} [options]
 * @returns {string}
 */
export const number = (
  value,
  style,
  {...options} = {},
  locale
) => {
  options = {...options, ...getOptions(locale || "pt-BR")[style]};
  return new Intl.NumberFormat(locale, options).format(value)
}

/* To be updated based on need - French - Canada and US locale handled  */
const currencyToLocale = new Map([
  ["en-US", "USD"],
  ["pt-BR", "BRL"],
  ["fr-CA", "CAD"]
])

const getOptions = locale => ({
  currency: {
    style: "currency",
    currency: currencyToLocale.get(locale)
  },
  decimal: {},
  percent: {}
})
