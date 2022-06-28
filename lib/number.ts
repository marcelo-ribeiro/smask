/**
 * Get a locale number
 */
export const number = (
  value: number,
  locale: string = navigator.language,
  style = "decimal",
  options?: Intl.NumberFormatOptions
): string => {
  options = { style, ...options };
  return new Intl.NumberFormat(locale, options).format(value);
};
