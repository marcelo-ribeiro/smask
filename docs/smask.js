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
 * @param {number|string} value
 * @param {string} [style]
 * @param {string} [locale]
 * @param {object} [options]
 * @returns {string}
 */
export const numberFormat = (
  value,
  style,
  {...options} = {style},
  locale,
) => {
  if ("currency" === style) options = {currency: "BRL", ...options}
  return new Intl.NumberFormat(locale, options).format(value)
}

/**
 * @param {string|int} value
 * @param {string} [style="currency"]
 * @param {object} [options]
 * @param {string} options.style="currency"
 * @param {string} options.currency="BRL"
 * @param {string} [locale]
 * @returns {string}
 */
export const currency = (
  value,
  style = "currency",
  {...options} = {style, currency: "BRL"},
  locale
) => {
  return numberFormat(value, style, options)
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
      listener = () => setInputValue(element, pattern)
      if (dynamicPattern) listener = () => {
        const pattern = element.value.length <= pattern.length ? pattern : dynamicPattern
        setInputValue(element, pattern)
      }
  }
  element.value && listener()
  element.addEventListener("input", listener)
}

/**
 * Mask all inputs what have data-mask attribute
 */
export const prepareMaskInputs = () => {
  const datasetToObject = value => JSON.parse(value.replace(/'/g, "\""))
  document.querySelectorAll("[data-mask]")
    .forEach(el => maskInput(el, datasetToObject(el.dataset.mask)))
}
prepareMaskInputs()
