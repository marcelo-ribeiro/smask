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
