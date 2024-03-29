const numberFormat = (value, locale = navigator.language, style = "decimal", options) => {
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
const currencyFormat = (value, locale = navigator.language, currency = currencyLocale[locale.slice(-2).toLocaleUpperCase()]) => {
  return numberFormat(value, locale, "currency", { currency });
};
const referenceDateDigits = "01/01/1970".replace(/\D/g, "");
const getComputedDate = (value) => {
  const valueDigits = value.replace(/\D/g, "");
  const computedDate = valueDigits + referenceDateDigits.slice(valueDigits.length);
  return computedDate;
};
const getDateParts = (locales) => {
  return new Intl.DateTimeFormat(locales).formatToParts();
};
const isValidDate = (date2) => {
  return date2 instanceof Date && !isNaN(date2.valueOf());
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
const date = (date2, locale) => {
  var _a;
  const dateParts = getDateParts(locale);
  const splitChar = (_a = dateParts.find(({ type }) => type === "literal")) == null ? void 0 : _a.value;
  const dateArray = date2.split(splitChar);
  const { month, day, year } = {
    [dateParts[0].type]: dateArray[0],
    [dateParts[2].type]: dateArray[1],
    [dateParts[4].type]: dateArray[2]
  };
  const dateFormat = `${month}/${day}/${year}`;
  return new Date(dateFormat);
};
const dateTimeFormat = (value, locale = navigator.language, options) => {
  return new Intl.DateTimeFormat(locale, options).format(value);
};
const localeDateTime = (value, locale = navigator.language, options) => {
  if (!value)
    return value;
  const date2 = new Date(value);
  if (!isValidDate(date2))
    return value;
  const localeDateString = dateTimeFormat(date2, locale, {
    dateStyle: "short",
    timeStyle: "short",
    ...options
  });
  return localeDateString;
};
const localeDate = (value, locale = navigator.language, options) => {
  if (!value)
    return value;
  const date2 = new Date(value);
  if (!isValidDate(date2))
    return value;
  const localeDateString = dateTimeFormat(date2, locale, {
    dateStyle: "short",
    ...options
  });
  return localeDateString;
};
const localeTime = (value, locale = navigator.language, options) => {
  if (!value)
    return value;
  const date2 = new Date(value);
  if (!isValidDate(date2))
    return value;
  const localeDateString = dateTimeFormat(date2, locale, {
    timeStyle: "short",
    ...options
  });
  return localeDateString;
};
const unmaskDate = (value, locale = navigator.language) => {
  const dateObject = date(value, locale);
  if (!isValidDate(dateObject))
    return "";
  return dateObject.toISOString();
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
  output = parseFloat(digits);
  return output;
};
const numberUnformat = (value, locale) => {
  const parts = new Intl.NumberFormat(locale).formatToParts(1111.1);
  return reverseFormat(value, parts);
};
const currencyUnformat = (value, locale = navigator.language, currency = currencyLocale[locale.slice(-2)]) => {
  var _a;
  const parts = new Intl.NumberFormat(locale, {
    style: "currency",
    currency
  }).formatToParts(1111.1);
  const currencySymbol = (_a = parts.find(({ type }) => type === "currency")) == null ? void 0 : _a.value;
  const reversedValue = !!currencySymbol ? value.replace(currencySymbol, "") : value;
  const output = reverseFormat(reversedValue, parts);
  return output;
};
const reverseFormat = (value, parts) => {
  var _a, _b;
  const group = (_a = parts.find((part) => part.type === "group")) == null ? void 0 : _a.value;
  const decimal = (_b = parts.find((part) => part.type === "decimal")) == null ? void 0 : _b.value;
  if (group)
    value = value.replace(group, "");
  if (decimal)
    value = value.replace(decimal, ".");
  return Number.isNaN(value) ? NaN : parseFloat(value);
};
const inputNumber = (value) => {
  const unmaskedNumber = unmaskNumber(value);
  return isNaN(unmaskedNumber) ? "" : numberFormat(unmaskedNumber);
};
const inputCurrency = (value) => {
  const unmaskedNumber = unmaskNumber(value) / 100;
  return isNaN(unmaskedNumber) ? "" : currencyFormat(unmaskedNumber);
};
const inputDate = (value, locale = navigator.language) => {
  if (!value)
    return value;
  const pattern = getDatePattern();
  const computedDate = getComputedDate(value);
  const maskedDate = mask(computedDate, [pattern]);
  const dateObject = date(maskedDate, locale);
  if (!isValidDate(dateObject))
    throw new Error("Invalid date");
  return mask(value, [pattern]);
};
const input = (element, patterns) => {
  var _a, _b;
  if (!element || typeof element !== "object") {
    throw Error("Element not found.");
  }
  if (!patterns) {
    throw ReferenceError("Pattern should be an array");
  }
  if (!Array.isArray(patterns)) {
    throw ReferenceError("Pattern should be an array");
  }
  const [pattern] = patterns.sort((a, b) => a.length - b.length);
  let listener;
  switch (pattern) {
    case "currency": {
      element.placeholder = currencyFormat(0);
      listener = () => {
        element.value = inputCurrency(element.value);
      };
      break;
    }
    case "number": {
      listener = () => {
        element.value = inputNumber(element.value);
      };
      break;
    }
    case "date": {
      const pattern2 = getDatePattern();
      element.minLength = element.maxLength = pattern2.length;
      element.pattern = `.{${pattern2.length},${pattern2.length}}`;
      listener = () => {
        try {
          const maskedDate = inputDate(element.value);
          element.value = maskedDate;
          element.defaultValue = maskedDate;
        } catch {
          element.value = element.defaultValue;
        }
      };
      break;
    }
    default: {
      element.minLength = pattern.length;
      element.maxLength = ((_a = patterns.at(-1)) == null ? void 0 : _a.length) || pattern.length;
      element.pattern = `.{${pattern.length},${((_b = patterns.at(-1)) == null ? void 0 : _b.length) || pattern.length}}`;
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
const prepareMaskInputs = () => {
  const inputs = document.querySelectorAll("[data-mask]");
  inputs.forEach((el) => input(el, datasetToObject(el.dataset.mask)));
};
const datasetToObject = (value) => JSON.parse(value.replace(/'/g, '"'));
export { currencyFormat, currencyUnformat, date, dateTimeFormat, getComputedDate, getDatePattern, input, inputCurrency, inputDate, inputNumber, isValidDate, localeDate, localeDateTime, localeTime, mask, numberFormat, numberUnformat, prepareMaskInputs, unmask, unmaskDate, unmaskNumber };
//# sourceMappingURL=index.es.js.map
