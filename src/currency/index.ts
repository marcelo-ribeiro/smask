import { numberFormat } from "../number";
import { currencyLocale } from "./currency-map";

export const currencyFormat = (
  value: number,
  locale: string = navigator.language,
  currency: Intl.NumberFormatOptions["currency"] = currencyLocale[
    locale.slice(-2)
  ]
): string => {
  return numberFormat(value, locale, "currency", { currency });
};
