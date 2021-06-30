/**
 * @param {string} value
 * @param {string} [pattern=undefined]
 * @returns {string|int}
 */
export const unmaskNumber = (value, pattern) => {
  let output = value.replace(/\D/g, "")
  if (output && "currency" === pattern) output = output / 100
  return output || 0
}

export const reverseNumberFormat = (value, locale) => {
  const parts = new Intl.NumberFormat(locale).formatToParts(1111.1);
  const group = parts.find(part => part.type === 'group').value;
  const decimal = parts.find(part => part.type === 'decimal').value;
  let reversedVal = value
    .replace(new RegExp('\\' + group, 'g'), '')
    .replace(new RegExp('\\' + decimal, 'g'), '.');
  return Number.isNaN(reversedVal) ? 0 : +reversedVal;
}

export const reverseCurrencyFormat = (value, locale, currency) => {
  const parts = new Intl.NumberFormat(locale, {style: "currency", currency}).formatToParts(0);
  const currencySymbol = parts.find(part => part.type === 'currency').value
  let reversedVal = value.replace(currencySymbol, '')
  return Number.isNaN(reversedVal) ? 0 : reverseNumberFormat(reversedVal, locale);
}
