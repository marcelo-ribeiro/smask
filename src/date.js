import { mask } from "./mask.js";
import { elements } from "./input.js";

const dateParts = (locale) => new Intl.DateTimeFormat(locale).formatToParts();
const initialDate = "01/01/1970".replace(/\D/g, "");
const getMaskedDate = (value, pattern) => mask(value, pattern);
const getComputedDate = (value) => {
  value = value.replace(/\D/g, "");
  return value + initialDate.slice(value.length);
};

/**
 * Get Date Masked
 * @param {HTMLInputElement} element
 * @param {string} pattern
 * @param {string} [locale=undefined]
 * @returns {string}
 */
export const maskDate = (element, pattern, locale = undefined) => {
  const dateObject = date(
    getMaskedDate(getComputedDate(element.value), pattern),
    locale
  );
  return mask(
    isNaN(dateObject.valueOf())
      ? elements.get(element).oldValue
      : element.value,
    pattern
  );
};

/**
 * Get Date Pattern
 * @param {string} [locale=undefined]
 * @returns {object}
 */
export const getDatePattern = (locale = undefined) => {
  let pattern = "";
  dateParts(locale).forEach(({ type, value }) => {
    if (type === "month" || type === "day") pattern += "dd";
    else if (type === "year") pattern += "dddd";
    else if (type === "literal") pattern += value;
  });
  return pattern;
};

/**
 * @param {string} value
 * @param {string} [locale=undefined]
 * @returns {Date}
 */
export const date = (value, locale = undefined) => {
  const valueArray = value.split("/");
  const { month, day, year } = {
    [dateParts(locale)[0].type]: valueArray[0],
    [dateParts(locale)[2].type]: valueArray[1],
    [dateParts(locale)[4].type]: valueArray[2],
  };
  const dateFormat = `${month}/${day}/${year}`;
  return new Date(dateFormat);
};
