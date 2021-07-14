import { mask } from "./mask.js";
import { unmaskNumber } from "./unmaskNumber.js";
import { currency } from "./currency.js";
import { getDatePattern, maskDate } from "./date.js";

export const elements = new Map();
const setElements = (element, obj = {}) =>
  elements.set(element, {
    ...elements.get(element),
    ...obj,
  });

/**
 * maskInput
 * @param {string|HTMLInputElement} element Element Selector
 * @param {string|string[]} patterns decimal|currency
 */
export const input = (element, patterns) => {
  if (!Array.isArray(patterns)) throw ReferenceError("Pattern is not array");
  if (!patterns) throw ReferenceError("Missing second parameter pattern.");

  if (typeof element === "string") element = document.querySelector(element);
  elements.set(element, {});
  let [pattern, dynamicPattern] = patterns;
  let listener = () => {};

  // Initialize input listener by mask
  switch (pattern) {
    case "currency": {
      listener = () =>
        (element.value = currency(
          unmaskNumber(element.value, pattern),
          pattern
        ));
      break;
    }
    case "date": {
      const pattern = getDatePattern();
      element.minLength = element.maxLength = pattern.length;
      element.pattern = `.{${pattern.length},${pattern.length}}`;
      listener = () => {
        element.value = maskDate(element, pattern);
        setElements(element, { oldValue: element.value });
      };
      break;
    }
    default: {
      patterns.sort((a, b) => a.length - b.length);
      element.minLength = pattern.length;
      element.maxLength = dynamicPattern?.length || element.minLength;
      element.pattern = `.{${pattern.length},${
        dynamicPattern?.length || pattern.length
      }}`;
      listener = dynamicPattern
        ? () =>
            (element.value = mask(
              element.value,
              element.value.length <= element.minLength
                ? pattern
                : dynamicPattern
            ))
        : () => (element.value = mask(element.value, pattern));
    }
  }
  element.value && listener();
  element.addEventListener("input", listener);
};
