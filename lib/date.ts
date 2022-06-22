import { elements } from "./input";
import { mask } from "./mask";

const referenceDateDigits = "01/01/1970".replace(/\D/g, "");

const getDateParts = (
  locales?: string | string[] | undefined
): Intl.DateTimeFormatPart[] => {
  return new Intl.DateTimeFormat(locales).formatToParts();
};

const getComputedDate = (value: string): string => {
  const valueDigits = value.replace(/\D/g, "");
  const computedDate =
    valueDigits + referenceDateDigits.slice(valueDigits.length);
  return computedDate;
};

const isValidDate = (date: Date): boolean => {
  return date instanceof Date && !isNaN(date.valueOf());
};

/**
 * Get Date Masked
 */
export const maskDate = (
  element: HTMLInputElement,
  pattern: string,
  locale?: string
): string => {
  const computedDate = getComputedDate(element.value);
  const maskedDate = mask(computedDate, [pattern]);
  const dateObject = toDate(maskedDate, locale);
  const dateValue = isValidDate(dateObject)
    ? element.value
    : elements.get(element).oldValue;
  return mask(dateValue, [pattern]);
};

/**
 * Get Date Pattern
 */
export const getDatePattern = (locale?: string): string => {
  let pattern = "";
  const dateParts = getDateParts(locale);
  dateParts.forEach(({ type, value }) => {
    if (type === "month" || type === "day") pattern += "dd";
    else if (type === "year") pattern += "dddd";
    else if (type === "literal") pattern += value;
  });
  return pattern;
};

/**
 * Convert string to locale date
 */
export const toDate = (date: string, locale?: string): Date => {
  const dateArray = date.split("/");
  const dateParts = getDateParts(locale);
  const { month, day, year }: { [x: string]: string } = {
    [dateParts[0].type]: dateArray[0],
    [dateParts[2].type]: dateArray[1],
    [dateParts[4].type]: dateArray[2],
  };
  const dateFormat = `${month}/${day}/${year}`;
  return new Date(dateFormat);
};
