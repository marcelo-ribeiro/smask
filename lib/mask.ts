import { tokens } from "./tokens";
import { unmask } from "./unmask";

export const mask = (value: string, patterns: string[]): string => {
  if (!value || !patterns) {
    throw ReferenceError("Value or pattern not found.");
  }
  if (!Array.isArray(patterns)) {
    throw ReferenceError("Pattern should be an array");
  }

  const [pattern, dynamicPattern] = patterns.sort(
    (a, b) => a.length - b.length
  );
  const computedPattern =
    unmask(value).length <= unmask(pattern).length ? pattern : dynamicPattern;

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

    if (!token.test(inputChar)) break;
    else if (/\W/.test(patternChar)) output += patternChar;
    else (output += token.transform(inputChar)), ii++;
  }

  return output;
};
