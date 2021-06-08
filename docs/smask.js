const DIGIT = "d", ALPHA = "a", ALPHA_NUM = "w"

/**
 * @param {string} value
 * @param {string} pattern
 * @returns {string}
 */
export const mask = (value, pattern) => {
  if (!value) return ""
  if (!pattern) throw new ReferenceError("")
  const alphaNumChars = [...unmask(pattern)],
    output = [...unmask(value, pattern)]
  for (let i = 0; i < pattern.length && output[i]; i++)
    if (
      (alphaNumChars[i] === DIGIT && /\D/.test(output[i])) ||
      (alphaNumChars[i] === ALPHA && !/[a-z]/i.test(output[i])) ||
      (alphaNumChars[i] === ALPHA_NUM && /\W/i.test(output[i]))
    ) output.splice(i, 1)
    else if (/\W/g.test(pattern[i]))
      output.splice(i, 0, pattern[i]) && alphaNumChars.splice(i, 0, pattern[i])
  return output.join("")
}

/**
 * @param {string} value
 * @param {string} [pattern=""]
 * @returns {string}
 */
export const unmask = (value, pattern) => {
  if (!value) return ""
  value = value.replace(/\W/ig, "")
  return pattern ? value.slice(0, pattern.replace(/\W/ig, "").length) : value
}

/**
 * @param {string} value
 * @param {string} [pattern="decimal"]
 * @param {string} [locale="pt-br"]
 * @param {object} [defaults]
 * @param {string} defaults.style="decimal" decimal|currency|percent|unit
 * @returns {string}
 */
export const decimal = (value, pattern = "decimal", locale = "pt-br", {style = "decimal", ...options} = {}) => {
  if (typeof value === "undefined" || value === "") return ""
  return new Intl.NumberFormat(locale, {style, ...options}).format(unmaskNumber(value, pattern))
}

/**
 * @param {string|int} value
 * @param {string} pattern
 * @param {string} [locale]
 * @param {object} [defaults]
 * @param {string} defaults.style="currency"
 * @param {string} defaults.currency="BRL"
 * @returns {string}
 */
export const currency = (value, pattern, locale, defaults = {
  style: "currency",
  currency: "BRL"
}) => {
  return decimal(value, "currency", locale, defaults)
}

/**
 * @param {string} value
 * @param {string} pattern
 * @returns {string|int}
 */
export const unmaskNumber = (value, pattern) => {
  if (!value || !pattern) return value
  let output = value.replace(/\D/g, "")
  if (pattern === "currency" && output > 0) {
    output = [...output]
    output.length === 1 && output.unshift("0")
    output.splice(-2, 0, ".")
    output = output.join("")
  }
  return parseFloat(output)
}

// const setInputValue = callback => {
//
// }

/**
 * @param {HTMLInputElement} element
 * @param {string} pattern decimal|currency
 */
export const maskInput = (element, pattern) => {
  switch (pattern) {
    case "decimal": {
      const setValue = (element, pattern) => element.value = decimal(element.value, pattern)
      element.value && setValue(element, pattern)
      element.addEventListener("input", () => setValue(element, pattern))
      break
    }
    case "currency": {
      const setValue = (element, pattern) => element.value = currency(element.value, pattern)
      element.value && setValue(element, pattern)
      element.addEventListener("input", (e) => setValue(element, pattern))
      break
    }
    default: {
      pattern = pattern || element.dataset.mask
      if (!pattern) throw ReferenceError("Missing second parameter pattern.")
      element.minLength = element.maxLength = pattern.length
      element.pattern = `.{${pattern.length},${pattern.length}}`
      const setValue = (element, pattern) => element.value = mask(element.value, pattern)
      element.value && setValue(element, pattern)
      element.addEventListener("input", () => setValue(element, pattern))
    }
  }
}

/**
 * Mask all inputs what have data-mask attribute
 */
export const loadInputs = () => {
  document.querySelectorAll("[data-mask]")
    .forEach(element => maskInput(element, element.dataset.mask))
}
loadInputs()
