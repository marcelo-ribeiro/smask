const number = (value, locale = navigator.language, style = "decimal", options) => {
  options = { style, ...options };
  return new Intl.NumberFormat(locale, options).format(value);
};
const currencyLocale = {
  AD: "EUR",
  AE: "AED",
  AF: "AFN",
  AG: "XCD",
  AI: "XCD",
  AL: "ALL",
  AM: "AMD",
  AO: "AOA",
  AR: "ARS",
  AS: "USD",
  AT: "EUR",
  AU: "AUD",
  AW: "AWG",
  AX: "EUR",
  AZ: "AZN",
  BA: "BAM",
  BB: "BBD",
  BD: "BDT",
  BE: "EUR",
  BF: "XOF",
  BG: "BGN",
  BH: "BHD",
  BI: "BIF",
  BJ: "XOF",
  BL: "EUR",
  BM: "BMD",
  BN: "BND",
  BO: "BOB",
  BQ: "USD",
  BR: "BRL",
  BS: "BSD",
  BT: "BTN",
  BV: "NOK",
  BW: "BWP",
  BY: "BYN",
  BZ: "BZD",
  CA: "CAD",
  CC: "AUD",
  CD: "CDF",
  CF: "XAF",
  CG: "XAF",
  CH: "CHF",
  CI: "XOF",
  CK: "NZD",
  CL: "CLP",
  CM: "XAF",
  CN: "CNY",
  CO: "COP",
  CR: "CRC",
  CU: "CUP",
  CV: "CVE",
  CW: "ANG",
  CX: "AUD",
  CY: "EUR",
  CZ: "CZK",
  DE: "EUR",
  DJ: "DJF",
  DK: "DKK",
  DM: "XCD",
  DO: "DOP",
  DZ: "DZD",
  EC: "USD",
  EE: "EUR",
  EG: "EGP",
  EH: "MAD",
  ER: "ERN",
  ES: "EUR",
  ET: "ETB",
  FI: "EUR",
  FJ: "FJD",
  FK: "FKP",
  FM: "USD",
  FO: "DKK",
  FR: "EUR",
  GA: "XAF",
  GB: "GBP",
  GD: "XCD",
  GE: "GEL",
  GF: "EUR",
  GG: "GBP",
  GH: "GHS",
  GI: "GIP",
  GL: "DKK",
  GM: "GMD",
  GN: "GNF",
  GP: "EUR",
  GQ: "XAF",
  GR: "EUR",
  GS: "GBP",
  GT: "GTQ",
  GU: "USD",
  GW: "XOF",
  GY: "GYD",
  HK: "HKD",
  HM: "AUD",
  HN: "HNL",
  HR: "HRK",
  HT: "HTG",
  HU: "HUF",
  ID: "IDR",
  IE: "EUR",
  IL: "ILS",
  IM: "GBP",
  IN: "INR",
  IO: "USD",
  IQ: "IQD",
  IR: "IRR",
  IS: "ISK",
  IT: "EUR",
  JE: "GBP",
  JM: "JMD",
  JO: "JOD",
  JP: "JPY",
  KE: "KES",
  KG: "KGS",
  KH: "KHR",
  KI: "AUD",
  KM: "KMF",
  KN: "XCD",
  KP: "KPW",
  KR: "KRW",
  KW: "KWD",
  KY: "KYD",
  KZ: "KZT",
  LA: "LAK",
  LB: "LBP",
  LC: "XCD",
  LI: "CHF",
  LK: "LKR",
  LR: "LRD",
  LS: "LSL",
  LT: "EUR",
  LU: "EUR",
  LV: "EUR",
  LY: "LYD",
  MA: "MAD",
  MC: "EUR",
  MD: "MDL",
  ME: "EUR",
  MF: "EUR",
  MG: "MGA",
  MH: "USD",
  MK: "MKD",
  ML: "XOF",
  MM: "MMK",
  MN: "MNT",
  MO: "MOP",
  MP: "USD",
  MQ: "EUR",
  MR: "MRO",
  MS: "XCD",
  MT: "EUR",
  MU: "MUR",
  MV: "MVR",
  MW: "MWK",
  MX: "MXN",
  MY: "MYR",
  MZ: "MZN",
  NA: "NAD",
  NC: "XPF",
  NE: "XOF",
  NF: "AUD",
  NG: "NGN",
  NI: "NIO",
  NL: "EUR",
  NO: "NOK",
  NP: "NPR",
  NR: "AUD",
  NU: "NZD",
  NZ: "NZD",
  OM: "OMR",
  PA: "PAB",
  PE: "PEN",
  PF: "XPF",
  PG: "PGK",
  PH: "PHP",
  PK: "PKR",
  PL: "PLN",
  PM: "EUR",
  PN: "NZD",
  PR: "USD",
  PS: "ILS",
  PT: "EUR",
  PW: "USD",
  PY: "PYG",
  QA: "QAR",
  RE: "EUR",
  RO: "RON",
  RS: "RSD",
  RU: "RUB",
  RW: "RWF",
  SA: "SAR",
  SB: "SBD",
  SC: "SCR",
  SD: "SDG",
  SE: "SEK",
  SG: "SGD",
  SH: "SHP",
  SI: "EUR",
  SJ: "NOK",
  SK: "EUR",
  SL: "SLL",
  SM: "EUR",
  SN: "XOF",
  SO: "SOS",
  SR: "SRD",
  ST: "STD",
  SV: "SVC",
  SX: "ANG",
  SY: "SYP",
  SZ: "SZL",
  TC: "USD",
  TD: "XAF",
  TF: "EUR",
  TG: "XOF",
  TH: "THB",
  TJ: "TJS",
  TK: "NZD",
  TL: "USD",
  TM: "TMT",
  TN: "TND",
  TO: "TOP",
  TR: "TRY",
  TT: "TTD",
  TV: "AUD",
  TW: "TWD",
  TZ: "TZS",
  UA: "UAH",
  UG: "UGX",
  UM: "USD",
  US: "USD",
  UY: "UYU",
  UZ: "UZS",
  VA: "EUR",
  VC: "XCD",
  VE: "VEF",
  VG: "USD",
  VI: "USD",
  VN: "VND",
  VU: "VUV",
  WF: "XPF",
  WS: "WST",
  YE: "YER",
  YT: "EUR",
  ZA: "ZAR",
  ZM: "ZMW",
  ZW: "ZWL"
};
const currency = (value, locale = navigator.language, currency2 = currencyLocale[locale.slice(-2)]) => {
  return number(value, locale, "currency", { currency: currency2 });
};
const tokens = {
  d: { test: (v) => /\d/.test(v), transform: (v) => v },
  a: {
    test: (v) => /[a-z]/i.test(v),
    transform: (v) => v.toLowerCase()
  },
  A: {
    test: (v) => /[a-z]/i.test(v),
    transform: (v) => v.toUpperCase()
  },
  w: {
    test: (v) => /\w/.test(v),
    transform: (v) => v.toLowerCase()
  },
  W: {
    test: (v) => /\w/.test(v),
    transform: (v) => v.toUpperCase()
  }
};
const unmask = (value, pattern) => {
  if (!value)
    return value;
  value = value.replace(/\W/gi, "");
  return !!pattern ? value.slice(0, pattern.replace(/\W/gi, "").length) : value;
};
const mask = (value, patterns) => {
  if (!value)
    return "";
  if (!patterns)
    throw ReferenceError("Value or pattern not found.");
  if (!Array.isArray(patterns))
    throw ReferenceError("Pattern should be an array");
  const [pattern, dynamicPattern] = patterns.sort((a, b) => a.length - b.length);
  const computedPattern = unmask(value).length <= unmask(pattern).length ? pattern : dynamicPattern;
  let output = "";
  for (let unmaskedValue = unmask(value, computedPattern), unmaskedPattern = unmask(computedPattern), patternLength = computedPattern.length, i = 0, ii = 0; i < patternLength && unmaskedValue[ii]; i++) {
    const token = tokens[unmaskedPattern[ii]], patternChar = computedPattern[i], inputChar = unmaskedValue[ii];
    if (!token.test(inputChar))
      break;
    else if (/\W/.test(patternChar))
      output += patternChar;
    else
      output += token.transform(inputChar), ii++;
  }
  return output;
};
const unmaskNumber = (value) => {
  const digits = value.replace(/\D/g, "");
  let output = 0;
  output = parseFloat(digits) / 100;
  return output;
};
const numberUnformat = (value, locale) => {
  const parts = new Intl.NumberFormat(locale).formatToParts(1111.1);
  return reverseFormat(value, parts);
};
const currencyUnformat = (value, locale = navigator.language, currency2 = currencyLocale[locale.slice(-2)]) => {
  var _a;
  const parts = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency2
  }).formatToParts(1111.1);
  const currencySymbol = (_a = parts.find((part) => part.type === "currency")) == null ? void 0 : _a.value;
  const reversedValue = !!currencySymbol ? value.replace(currencySymbol, "") : value;
  const output = reverseFormat(reversedValue, parts);
  return output;
};
const reverseFormat = (value, parts) => {
  var _a, _b;
  const group = (_a = parts.find((part) => part.type === "group")) == null ? void 0 : _a.value;
  const decimal = (_b = parts.find((part) => part.type === "decimal")) == null ? void 0 : _b.value;
  if (group)
    value = value.replaceAll(group, "");
  if (decimal)
    value = value.replace(decimal, ".");
  return Number.isNaN(value) ? NaN : parseFloat(value);
};
const elements = /* @__PURE__ */ new Map();
const setElements = (element, options = {}) => elements.set(element, {
  ...elements.get(element),
  ...options
});
const input = (element, patterns) => {
  if (!element || typeof element !== "object")
    throw Error("Element not found.");
  if (!patterns)
    throw ReferenceError("Pattern should be an array");
  if (!Array.isArray(patterns))
    throw ReferenceError("Pattern should be an array");
  const [pattern, dynamicPattern] = patterns.sort((a, b) => a.length - b.length);
  elements.set(element, {});
  let listener;
  switch (pattern) {
    case "currency": {
      element.placeholder = currency(0);
      listener = () => {
        const unmaskedNumber = unmaskNumber(element.value);
        element.value = unmaskedNumber === 0 || isNaN(unmaskedNumber) ? "" : currency(unmaskedNumber);
      };
      break;
    }
    case "date": {
      const pattern2 = getDatePattern();
      element.minLength = element.maxLength = pattern2.length;
      element.pattern = `.{${pattern2.length},${pattern2.length}}`;
      setElements(element, { oldValue: element.value });
      listener = () => {
        element.value = maskDate(element, pattern2);
        setElements(element, { oldValue: element.value });
      };
      break;
    }
    default: {
      element.minLength = pattern.length;
      element.maxLength = (dynamicPattern == null ? void 0 : dynamicPattern.length) || pattern.length;
      element.pattern = `.{${pattern.length},${(dynamicPattern == null ? void 0 : dynamicPattern.length) || pattern.length}}`;
      listener = () => {
        element.value = mask(element.value, patterns);
      };
    }
  }
  element.value && listener();
  element.addEventListener("input", listener);
  return () => {
    element.removeEventListener("input", listener);
  };
};
const referenceDateDigits = "01/01/1970".replace(/\D/g, "");
const getDateParts = (locales) => {
  return new Intl.DateTimeFormat(locales).formatToParts();
};
const getComputedDate = (value) => {
  const valueDigits = value.replace(/\D/g, "");
  const computedDate = valueDigits + referenceDateDigits.slice(valueDigits.length);
  return computedDate;
};
const isValidDate = (date) => {
  return date instanceof Date && !isNaN(date.valueOf());
};
const maskDate = (element, pattern, locale = navigator.language) => {
  const computedDate = getComputedDate(element.value);
  const maskedDate = mask(computedDate, [pattern]);
  const dateObject = toDate(maskedDate, locale);
  const dateValue = isValidDate(dateObject) ? element.value : elements.get(element).oldValue;
  return mask(dateValue, [pattern]);
};
const getDatePattern = (locale) => {
  let pattern = "";
  const dateParts = getDateParts(locale);
  dateParts.forEach(({ type, value }) => {
    if (type === "month" || type === "day")
      pattern += "dd";
    else if (type === "year")
      pattern += "dddd";
    else if (type === "literal")
      pattern += value;
  });
  return pattern;
};
const toDate = (date, locale) => {
  const dateArray = date.split("/");
  const dateParts = getDateParts(locale);
  const { month, day, year } = {
    [dateParts[0].type]: dateArray[0],
    [dateParts[2].type]: dateArray[1],
    [dateParts[4].type]: dateArray[2]
  };
  const dateFormat = `${month}/${day}/${year}`;
  return new Date(dateFormat);
};
const prepareMaskInputs = () => {
  const inputs = document.querySelectorAll("[data-mask]");
  inputs.forEach((el) => input(el, datasetToObject(el.dataset.mask)));
};
const datasetToObject = (value) => JSON.parse(value.replace(/'/g, '"'));
var index = {
  mask,
  input,
  number,
  currency,
  getDatePattern,
  maskDate,
  toDate,
  prepareMaskInputs,
  unmask,
  currencyUnformat,
  numberUnformat,
  unmaskNumber
};
export { index as default };
