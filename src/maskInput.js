import {mask} from "./mask.js";
import {numberFormat} from "./numberFormat.js";
import {unmaskNumber} from "./unmaskNumber.js"

/**
 * maskInput
 * @param {string|HTMLInputElement} element Element Selector
 * @param {string|string[]} patterns decimal|currency
 */
export const maskInput = (element, patterns) => {
  if (!Array.isArray(patterns)) throw ReferenceError("Pattern is not array")
  if (!patterns) throw ReferenceError("Missing second parameter pattern.")

  typeof element === "string" && (element = document.querySelector(element))
  const [pattern, dynamicPattern] = patterns
  let listener

  switch (pattern) {
    case "decimal":
    case "currency":
    case "percent":
      listener = () => element.value = numberFormat(unmaskNumber(element.value, pattern), pattern)
      break
    default:
      patterns.sort((a, b) => a.length - b.length)
      element.minLength = pattern.length
      element.maxLength = dynamicPattern?.length || element.minLength
      element.pattern = `.{${pattern.length},${dynamicPattern?.length || pattern.length}}`
      const setInputValue = (element, pattern) => element.value = mask(element.value, pattern)
      listener = dynamicPattern
        ? () => setInputValue(element, element.value.length <= element.minLength ? pattern : dynamicPattern)
        : () => setInputValue(element, pattern)
  }
  element.value && listener()
  element.addEventListener("input", listener)
}
