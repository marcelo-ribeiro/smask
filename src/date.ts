const referenceDateDigits = "01/01/1970".replace(/\D/g, "");

export const getComputedDate = (value: string): string => {
  const valueDigits = value.replace(/\D/g, "");
  const computedDate =
    valueDigits + referenceDateDigits.slice(valueDigits.length);
  return computedDate;
};

const getDateParts = (
  locales?: string | string[] | undefined
): Intl.DateTimeFormatPart[] => {
  return new Intl.DateTimeFormat(locales).formatToParts();
};

export const isValidDate = (date: Date): boolean => {
  return date instanceof Date && !isNaN(date.valueOf());
};

/**
 * Get locale date pattern
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
 * Convert locale date string to Date object
 */
export const date = (date: string, locale?: string): Date => {
  const dateParts = getDateParts(locale);
  const splitChar: string = dateParts.find(({ type }) => type === "literal")
    ?.value!;
  const dateArray = date.split(splitChar);
  const { month, day, year }: { [x: string]: string } = {
    [dateParts[0].type]: dateArray[0],
    [dateParts[2].type]: dateArray[1],
    [dateParts[4].type]: dateArray[2],
  };
  const dateFormat = `${month}/${day}/${year}`;
  return new Date(dateFormat);
};

/**
 * Convert Date object to locale string
 */
export const dateTimeFormat = (
  value: Date,
  locale = navigator.language,
  options?: Intl.DateTimeFormatOptions
): string => {
  return new Intl.DateTimeFormat(locale, options).format(value);
};

/**
 * Convert Datetime string to locale dateTime string
 */
export const localeDateTime = (
  value: string,
  locale: string = navigator.language,
  options?: Intl.DateTimeFormatOptions
): string => {
  if (!value) return value;
  const date = new Date(value);
  if (!isValidDate(date)) return value;
  const localeDateString = dateTimeFormat(date, locale, {
    dateStyle: "short",
    timeStyle: "short",
    ...options,
  });
  return localeDateString;
};

/**
 * Convert Datetime string to locale date string
 */
export const localeDate = (
  value: string,
  locale: string = navigator.language,
  options?: Intl.DateTimeFormatOptions
): string => {
  if (!value) return value;
  const date = new Date(value);
  if (!isValidDate(date)) return value;
  const localeDateString = dateTimeFormat(date, locale, {
    dateStyle: "short",
    ...options,
  });
  return localeDateString;
};

/**
 * Convert Datetime string to locale dateTime string
 */
export const localeTime = (
  value: string,
  locale: string = navigator.language,
  options?: Intl.DateTimeFormatOptions
): string => {
  if (!value) return value;
  const date = new Date(value);
  if (!isValidDate(date)) return value;
  const localeDateString = dateTimeFormat(date, locale, {
    timeStyle: "short",
    ...options,
  });
  return localeDateString;
};

/**
 * Unmask locale Datetime string to Datetime ISO string
 */
export const unmaskDate = (
  value: string,
  locale: string = navigator.language
): string => {
  const dateObject = date(value, locale);
  if (!isValidDate(dateObject)) return "";
  return dateObject.toISOString();
};
