import { mask } from "./mask.js";
import { unmaskNumber } from "./unmaskNumber.js";
import { currency } from "./currency.js";
import { getDatePattern, maskDate } from "./date.js";

export const elements = new Map();
const setElements = (element, options = {}) =>
  elements.set(element, {
    ...elements.get(element),
    ...options,
  });

/**
 * maskInput
 * @param {string|HTMLInputElement} element Element Selector
 * @param {string|string[]} patterns decimal|currency
 */
export const input = (element, patterns) => {
  if (!Array.isArray(patterns)) throw ReferenceError("Pattern is not an array");
  if (!patterns) throw ReferenceError("Missing second parameter pattern.");

  const el =
    typeof element === "object" ? element : document.querySelector(element);
  if (!el) throw Error("Element not found.");
  elements.set(el, {});
  if (patterns.length > 1) patterns.sort((a, b) => a.length - b.length);
  let [pattern, dynamicPattern] = patterns;
  let listener = () => {};

  // Initialize input listener by mask
  switch (pattern) {
    case "currency": {
      el.placeholder = currency(0);
      listener = () =>
        (el.value = currency(unmaskNumber(el.value, pattern), pattern));
      break;
    }
    case "date": {
      const pattern = getDatePattern();
      el.minLength =
        el.maxLength =
        el.minlength =
        el.maxlength =
          pattern.length;
      el.pattern = `.{${pattern.length},${pattern.length}}`;
      listener = () => {
        el.value = maskDate(el, pattern);
        setElements(el, { oldValue: el.value });
      };
      break;
    }
    default: {
      el.minLength = el.minlength = pattern.length;
      el.maxLength = el.maxlength = dynamicPattern?.length || pattern.length;
      el.pattern = `.{${pattern.length},${
        dynamicPattern?.length || pattern.length
      }}`;
      listener = dynamicPattern
        ? () => {
            el.value = mask(
              el.value,
              el.value.length <= pattern.length ? pattern : dynamicPattern
            );
          }
        : () => (el.value = mask(el.value, pattern));
    }
  }
  el.value && listener();
  el.addEventListener("input", listener);
};
