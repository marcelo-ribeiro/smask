import { tokens } from "./tokens.js";
import { unmask } from "./unmask.js";

/**
 * @param {string} value
 * @param {string} pattern
 * @returns {string}
 */
export const mask = (value, pattern) => {
  if (!value || !pattern) return "";
  const output = [...unmask(value, pattern)],
    unmasked = [...unmask(pattern)];
  for (let i = 0, l = pattern.length; i < l && output[i]; i++)
    !tokens[unmasked[i]].test(output[i])
      ? output.splice(i, 1)
      : /\W/.test(pattern[i])
      ? output.splice(i, 0, pattern[i]) && unmasked.splice(i, 0, pattern[i])
      : output.splice(i, 1, tokens[unmasked[i]].transform(output[i]));
  return output.join("");
};
