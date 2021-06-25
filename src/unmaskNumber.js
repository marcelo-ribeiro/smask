/**
 * @param {string} value
 * @param {string} pattern
 * @returns {string|int}
 */
export const unmaskNumber = (value, pattern) => {
  if (!value || !pattern) return 0
  let output = parseInt(value.replace(/\D/g, ""))
  if (output && "currency" === pattern) output = output / 100
  return output || 0
}
