import { number } from "./number.js";

/**
 * @param {string|int} value
 * @param {string} [style="currency"]
 * @param {object} [options]
 * @param {string} [locale]
 * @returns {string}
 */
export const currency = (
  value,
  style = "currency",
  { ...options } = {},
  locale
) => {
  return number(parseFloat(value), style, options, locale);
};
