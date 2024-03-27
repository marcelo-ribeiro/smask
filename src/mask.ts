import { tokens } from "./tokens";
import { unmask } from "./unmask";

export const mask = (value: string, patterns: string[]): string => {
  if (!value) return "";
  if (!patterns) throw ReferenceError("Value or pattern not found.");
  if (!Array.isArray(patterns))
    throw ReferenceError("Pattern should be an array");

  patterns.sort((a, b) => a.length - b.length);

  let computedPattern = "";
  const valueLength = unmask(value).length;

  for (let i = 0; i < patterns.length; i++) {
    const pattern = patterns[i];
    if (valueLength <= unmask(pattern).length) {
      computedPattern = pattern;
      break;
    }
  }

  let output = "";

  for (
    let unmaskedValue = unmask(value, computedPattern),
      unmaskedPattern = unmask(computedPattern),
      patternLength = computedPattern.length,
      i = 0,
      ii = 0;
    i < patternLength && unmaskedValue[ii];
    i++
  ) {
    const token = tokens[unmaskedPattern[ii]],
      patternChar = computedPattern[i],
      inputChar = unmaskedValue[ii];

    if (!token?.test(inputChar)) break;
    else if (/\W/.test(patternChar)) output += patternChar;
    else (output += token.transform(inputChar)), ii++;
  }

  return output;
};
