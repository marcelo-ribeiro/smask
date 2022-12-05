import { currencyLocale } from "./currency/currency-map";

/**
 * Remove non-numeric characters from a string
 */
export const unmaskNumber = (value: string): number => {
  const digits = value.replace(/\D/g, "");
  let output = 0;
  output = parseFloat(digits);
  return output;
};

/**
 * Reverse Number Format
 */
export const numberUnformat = (value: string, locale?: string): number => {
  const parts = new Intl.NumberFormat(locale).formatToParts(1111.1);
  return reverseFormat(value, parts);
};

/**
 * Reverse Currency Format
 */
export const currencyUnformat = (
  value: string,
  locale: string = navigator.language,
  currency: Intl.NumberFormatOptions["currency"] = currencyLocale[
    locale.slice(-2)
  ]
): number => {
  const parts = new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).formatToParts(1111.1);
  const currencySymbol = parts.find(({ type }) => type === "currency")?.value;
  const reversedValue = !!currencySymbol
    ? value.replace(currencySymbol, "")
    : value;
  const output = reverseFormat(reversedValue, parts);
  return output;
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
  if (group) value = value.replace(group, "");
  if (decimal) value = value.replace(decimal, ".");
  return Number.isNaN(value) ? NaN : parseFloat(value);
};
