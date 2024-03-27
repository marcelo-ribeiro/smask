import { currencyFormat } from "./currency";
import { date, getComputedDate, getDatePattern, isValidDate } from "./date";
import { mask } from "./mask";
import { numberFormat } from "./number";
import { unmaskNumber } from "./unmaskNumber";

/**
 * Set locale number mask on input
 */
export const inputNumber = (value: string) => {
  const unmaskedNumber = unmaskNumber(value);
  return isNaN(unmaskedNumber) ? "" : numberFormat(unmaskedNumber);
};

/**
 * Set locale currency mask on input
 */
export const inputCurrency = (value: string) => {
  const unmaskedNumber = unmaskNumber(value) / 100;
  return isNaN(unmaskedNumber) ? "" : currencyFormat(unmaskedNumber);
};

/**
 * Set locale date mask on input
 */
export const inputDate = (
  value: string,
  locale: string = navigator.language
): string => {
  if (!value) return value;
  const pattern = getDatePattern();
  const computedDate = getComputedDate(value);
  const maskedDate = mask(computedDate, [pattern]);
  const dateObject = date(maskedDate, locale);
  if (!isValidDate(dateObject)) throw new Error("Invalid date");
  return mask(value, [pattern]);
};

export const input = (
  element: HTMLInputElement,
  patterns: string[]
): (() => void) => {
  if (!element || typeof element !== "object") {
    throw Error("Element not found.");
  }
  if (!patterns) {
    throw ReferenceError("Pattern should be an array");
  }
  if (!Array.isArray(patterns)) {
    throw ReferenceError("Pattern should be an array");
  }

  const [pattern] = patterns.sort((a, b) => a.length - b.length);

  let listener: () => void;

  switch (pattern) {
    case "currency": {
      element.placeholder = currencyFormat(0);
      listener = () => {
        element.value = inputCurrency(element.value);
      };
      break;
    }
    case "number": {
      listener = () => {
        element.value = inputNumber(element.value);
      };
      break;
    }
    case "date": {
      const pattern = getDatePattern();
      element.minLength = element.maxLength = pattern.length;
      element.pattern = `.{${pattern.length},${pattern.length}}`;
      listener = () => {
        try {
          const maskedDate = inputDate(element.value);
          element.value = maskedDate;
          element.defaultValue = maskedDate;
        } catch {
          element.value = element.defaultValue;
        }
      };
      break;
    }
    default: {
      element.minLength = pattern.length;
      element.maxLength = patterns.at(-1)?.length || pattern.length;
      element.pattern = `.{${pattern.length},${
        patterns.at(-1)?.length || pattern.length
      }}`;
      listener = () => {
        element.value = mask(element.value, patterns);
      };
    }
  }

  element.value && listener();
  element.addEventListener("input", listener);

  return () => {
    element.removeEventListener("input", listener);
  };
};
