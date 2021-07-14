import { mask } from "./mask.js"
import { unmaskNumber } from "./unmaskNumber.js"
import { currency } from "./currency.js"
import { getDatePattern, maskDate } from "./date.js"

/**
 * maskInput
 * @param {string|HTMLInputElement} element Element Selector
 * @param {string|string[]} patterns decimal|currency
 */
export const input = (element, patterns) => {
  if (!Array.isArray(patterns)) throw ReferenceError("Pattern is not array")
  if (!patterns) throw ReferenceError("Missing second parameter pattern.")

  if (typeof element === "string")
    element = document.querySelector(element)
  let [pattern, dynamicPattern] = patterns
  let listener = () => { }

  // Disable input keyboard arrow and point click
  element.addEventListener("keydown", e => {
    [32, 37, 38, 39, 40].includes(e.keyCode) && e.preventDefault();
  });
  element.addEventListener("focus", () => element.setSelectionRange(-1, -1));
  element.addEventListener("click", () => element.setSelectionRange(-1, -1));

  // Initialize input listener by mask
  switch (pattern) {
    case "currency": {
      listener = () => element.value = currency(unmaskNumber(element.value, pattern), pattern)
      break
    }
    case "date": {
      const pattern = getDatePattern()
      element.minLength = element.maxLength = pattern.length
      element.pattern = `.{${pattern.length},${pattern.length}}`
      listener = () => element.value = maskDate(element.value, pattern)
      break
    }
    default: {
      patterns.sort((a, b) => a.length - b.length)
      element.minLength = pattern.length
      element.maxLength = dynamicPattern?.length || element.minLength
      element.pattern = `.{${pattern.length},${dynamicPattern?.length || pattern.length}}`
      listener = dynamicPattern
        ? () => element.value = mask(
          element.value,
          element.value.length <= element.minLength ? pattern : dynamicPattern
        )
        : () => element.value = mask(element.value, pattern)
    }
  }
  element.value && listener()
  element.addEventListener("input", listener)
}
