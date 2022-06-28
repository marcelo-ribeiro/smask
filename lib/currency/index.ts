import { number } from "../number";
import { currencyLocale } from "./currency-map";

export const currency = (
  value: number,
  locale: string = navigator.language,
  currency: Intl.NumberFormatOptions["currency"] = currencyLocale[
    locale.slice(-2)
  ]
): string => {
  return number(value, locale, "currency", { currency });
};
