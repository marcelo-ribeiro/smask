/**
 * Remove non-numeric characters from a string
 * and if pattern equals currency, divide by 100
 */
export const unmaskNumber = (value: string, pattern: string): number => {
  const digits = value.replace(/\D/g, "");
  let output = 0;
  if (digits && pattern === "currency") output = parseFloat(digits) / 100;
  return output;
};

/**
 * Reverse Number Format
 */
export const reverseNumberFormat = (
  value: string,
  locales: string | string[] | undefined = undefined
): number => {
  const parts = new Intl.NumberFormat(locales).formatToParts(1111.1);
  return reverseFormat(value, parts);
};

/**
 * Reverse Currency Format
 */
export const reverseCurrencyFormat = (
  value: string,
  locales?: string | string[] | undefined,
  currency?: string
): number => {
  const parts = new Intl.NumberFormat(locales, {
    style: "currency",
    currency,
  }).formatToParts(1111.1);
  const currencySymbol = parts.find((part) => part.type === "currency")?.value;
  const reversedValue = currencySymbol
    ? value.replace(currencySymbol, "")
    : value;
  return reverseFormat(reversedValue, parts);
};

/**
 * Number reverse format
 */
const reverseFormat = (
  value: string,
  parts: Intl.NumberFormatPart[]
): number => {
  const group = parts.find((part) => part.type === "group")?.value;
  const decimal = parts.find((part) => part.type === "decimal")?.value;
  if (group) value = value.replaceAll(group, "");
  if (decimal) value = value.replace(decimal, ".");
  return Number.isNaN(value) ? NaN : parseFloat(value);
};
