import { currency } from "./currency";
import { getDatePattern, maskDate } from "./date";
import { mask } from "./mask";
import { unmaskNumber } from "./unmaskNumber";

export const elements = new Map();

const setElements = (element: HTMLInputElement, options = {}) =>
  elements.set(element, {
    ...elements.get(element),
    ...options,
  });

export const input = (
  element: HTMLInputElement,
  patterns: string[]
): (() => void) => {
  if (!element || typeof element !== "object")
    throw Error("Element not found.");
  if (!patterns) throw ReferenceError("Pattern should be an array");
  if (!Array.isArray(patterns))
    throw ReferenceError("Pattern should be an array");

  const [pattern, dynamicPattern] = patterns.sort(
    (a, b) => a.length - b.length
  );

  elements.set(element, {});

  let listener: () => void;

  switch (pattern) {
    case "currency": {
      element.placeholder = currency(0);
      listener = () => {
        const unmaskedNumber = unmaskNumber(element.value, pattern);
        element.value = currency(unmaskedNumber, pattern);
      };
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
      element.minLength = pattern.length;
      element.maxLength = dynamicPattern?.length || pattern.length;
      element.pattern = `.{${pattern.length},${
        dynamicPattern?.length || pattern.length
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
