/**
 * Get a locale number
 */
export const numberFormat = (
  value: number,
  locale: string = navigator.language,
  style = "decimal",
  options?: Intl.NumberFormatOptions
): string => {
  options = { style, ...options };
  return new Intl.NumberFormat(locale, options).format(value);
};
