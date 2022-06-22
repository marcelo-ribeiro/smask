import { number } from "./number";

export const currency = (
  value: number,
  style = "currency",
  { ...options }: Intl.NumberFormatOptions | undefined = {},
  locale?: string
): string => {
  return number(value, style, options, locale);
};
