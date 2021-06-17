const tokens = {
  d: {test: v => /\d/.test(v), transform: v => v},
  a: {test: v => /[a-z]/i.test(v), transform: v => v.toLowerCase()},
  A: {test: v => /[a-z]/i.test(v), transform: v => v.toUpperCase()},
  w: {test: v => /\w/.test(v), transform: v => v.toLowerCase()},
  W: {test: v => /\w/.test(v), transform: v => v.toUpperCase()}
}

const map = new WeakMap();

/**
 * @param {string|string[]} value
 * @param {string} pattern
 * @returns {string}
 */
export const mask = (value, pattern) => {
  if (!value || !pattern) return ""
  const output = [...unmask(value, pattern)], unmasked = [...unmask(pattern)]
  for (let i = 0, l = pattern.length; i < l && output[i]; i++)
    !tokens[unmasked[i]].test(output[i])
      ? output.splice(i, 1)
      : /\W/.test(pattern[i])
      ? output.splice(i, 0, pattern[i]) && unmasked.splice(i, 0, pattern[i])
      : output.splice(i, 1, tokens[unmasked[i]].transform(output[i]))
  return output.join("")
}

/**
 * @param {string} value
 * @param {string} [pattern=""]
 * @returns {string}
 */
export const unmask = (value, pattern) => {
  if (!value) return value
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
  if (!value) return value
  return new Intl.NumberFormat(locale, {style, ...options}).format(unmaskNumber(value, pattern))
}

/**
 * @param {string|int} value
 * @param {string} [locale]
 * @param {object} [defaults]
 * @param {string} defaults.style="currency"
 * @param {string} defaults.currency="BRL"
 * @returns {string}
 */
export const currency = (value, locale, defaults = {
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

/**
 * @param {string} funcName
 * @param {HTMLInputElement} element
 * @param {string} pattern
 */
const setInputValue = (funcName, element, pattern) =>
  element.value = eval(funcName)(element.value, pattern)

/**
 * @param {HTMLInputElement} element
 * @param {string[]} patterns decimal|currency
 */
export const maskInput = (element, patterns) => {
  if (!Array.isArray(patterns)) throw ReferenceError("Pattern is not array")
  if (!patterns) throw ReferenceError("Missing second parameter pattern.")

  const [firstPattern, secondPattern] = patterns
  let type = firstPattern,
    listener = () => setInputValue(type, element, firstPattern)

  if (!["decimal", "currency"].includes(firstPattern)) {
    element.minLength = firstPattern.length
    element.maxLength = secondPattern?.length || element.minLength
    element.pattern = `.{${firstPattern.length},${secondPattern?.length || firstPattern.length}}`
    type = "mask"
    if (secondPattern) {
      patterns.sort((a, b) => a.length - b.length)
      listener = () => {
        const pattern = element.value.length <= firstPattern.length ? firstPattern : secondPattern
        setInputValue(type, element, pattern)
      }
    }
  }
  element.value && listener()
  element.addEventListener("input", listener)
}

/**
 * Mask all inputs what have data-mask attribute
 */
export const loadInputs = () => {
  document.querySelectorAll("[data-mask]")
    .forEach(element => maskInput(element, eval(element.dataset.mask)))
}
loadInputs()
