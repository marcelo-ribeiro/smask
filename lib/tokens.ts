export const tokens: {
  [key: string]: {
    test: (input: string) => boolean;
    transform: (input: string) => string;
  };
} = {
  d: { test: (v) => /\d/.test(v), transform: (v) => v },
  a: {
    test: (v) => /[a-z]/i.test(v),
    transform: (v) => v.toLowerCase(),
  },
  A: {
    test: (v) => /[a-z]/i.test(v),
    transform: (v) => v.toUpperCase(),
  },
  w: {
    test: (v) => /\w/.test(v),
    transform: (v) => v.toLowerCase(),
  },
  W: {
    test: (v) => /\w/.test(v),
    transform: (v) => v.toUpperCase(),
  },
};
