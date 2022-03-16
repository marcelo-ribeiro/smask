/**
 * Remove non-numeric characters from a string
 * and if pattern equals currency, divide by 100
 * @param {string} value
 * @param {string} [pattern=undefined]
 * @returns {string|int}
 */
export const unmaskNumber = (value, pattern) => {
  let output = value.replace(/\D/g, "");
  if (output && "currency" === pattern) output = output / 100;
  return output || 0;
};

/**
 * Reverse Number Format
 * @param {string} value
 * @param {string} locale
 * @returns {number}
 */
export const reverseNumberFormat = (value, locale) => {
  const parts = new Intl.NumberFormat(locale).formatToParts(1111.1);
  return reverseFormat(value, parts);
};

/**
 * Reverse Currency Format
 * @param {string} value
 * @param {string} locale
 * @param {string} currency
 * @returns {number}
 */
export const reverseCurrencyFormat = (value, locale, currency) => {
  const parts = new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).formatToParts(1111.1);
  const symbol = parts.find((part) => part.type === "currency").value;
  const reversedVal = value.replace(symbol, "");
  return reverseFormat(reversedVal, parts);
};

/**
 * @param {string} value
 * @param {array} parts
 * @returns {number|number}
 */
const reverseFormat = (value, parts) => {
  const group = parts.find((part) => part.type === "group").value;
  const decimal = parts.find((part) => part.type === "decimal").value;
  let reversedVal = value.replaceAll(group, "").replace(decimal, ".");
  return Number.isNaN(reversedVal) ? NaN : +reversedVal;
};
