/**
 * @param {string} value
 * @param {string} [pattern=""]
 * @returns {string}
 */
export const unmask = (value, pattern) => {
  if (!value) return value;
  value = value.replace(/\W/gi, "");
  return pattern ? value.slice(0, pattern.replace(/\W/gi, "").length) : value;
};
