const DIGIT = "9",
  ALPHA = "Z";

/**
 * @param {string} value=""
 * @param {string} pattern=""
 */
export const mask = (value = "", pattern = "") => {
  for (let i = 0; i < pattern.length; i++) {
    if (!value[i]) break;
    else if (value[i] === pattern[i]) continue;
    if (![DIGIT, ALPHA].includes(pattern[i]))
      value = value.substr(0, i) + pattern[i] + value.substr(i, value.length);
    else if (
      (pattern[i] === DIGIT && /\D/.test(value[i])) ||
      (pattern[i] === ALPHA && !/[a-z]/i.test(value[i]))
    ) {
      value = value.substr(0, i);
      break;
    }
  }
  return value.substr(0, pattern.length);
};

/**
 * @param {string} value=""
 * @param {string} pattern=""
 */
export const unmask = (value = "", pattern = "") => {
  return value.replace(/\W/ig, "").substr(0, pattern.replace(/\W/ig, "").length);
};

/**
 * @param {string} value
 * @param {string} [locale="pt-br"]
 * @param {object} [defaults]
 * @param {string} defaults.style="decimal"
 */
export const decimal = (value, locale = "pt-br", defaults = {
  style: "decimal", // decimal | currency | percent | unit
}) => {
  if (typeof value === "undefined" || value === "") return "";
  return new Intl.NumberFormat(locale, defaults).format(parseFloat(value));
};

/**
 * @param {string} value
 * @param {string} pattern
 */
export const unmaskNumber = (value, pattern) => {
  if (!value || !pattern) return value;
  value = value.replace(/\D/g, "");
  if (pattern === "decimal") return value;
  else if (pattern === "currency") {
    if (value === "00") return "";
    else if (value === "0000") return 0;
    const aux = [...value];
    if (value > 0 && value < 10) aux.unshift("0");
    if (value > 0) aux.splice(aux.length - 2, 0, ".");
    value = aux.join("");
    return value;
  }
}

/**
 * @param {string} value
 * @param {string} [locale]
 * @param {object} [defaults]
 * @param {string} defaults.style="currency"
 * @param {string} defaults.currency="BRL"
 */
export const currency = (value, locale, defaults = {
  style: "currency",
  currency: "BRL"
}) => {
  return decimal(value, locale, defaults);
};

/**
 * @param {HTMLInputElement} element
 * @param {string} pattern
 */
const setInputValue = (element, pattern) => {
  switch (pattern) {
    case "decimal":
      element.value = decimal(unmaskNumber(element.value, pattern));
      break;
    case "currency":
      element.value = currency(unmaskNumber(element.value, pattern));
      break;
    default:
      const unmasked = unmask(element.value, pattern);
      element.value = mask(element.value, pattern);
  }
};

/**
 * @param {HTMLInputElement} element
 * @param {string} pattern decimal|currency
 */
export const maskInput = (element, pattern) => {
  if (!["decimal", "currency"].includes(pattern)) {
    pattern = pattern || element.dataset.mask;
    if (!pattern) throw ReferenceError("Missing second parameter pattern.");
    element.minLength = pattern.length;
    element.maxLength = pattern.length;
    element.pattern = `.{${pattern.length},${pattern.length}}`
  }
  element.value && setInputValue(element, pattern);
  element.addEventListener("input", () => setInputValue(element, pattern));
};

/**
 * Inicializa automaticamente todos inputs que contém o atributo data-mask
 */
export const loadInputs = () => {
  document.querySelectorAll("[data-mask]")
    .forEach(element => maskInput(element, element.dataset.mask));
};
loadInputs();

// End-Lib

const cpf = mask("12345678909", "999.999.999-99");
console.log("CPF: ", cpf);
const phone = mask("71987654321", "(99) 99999-9999");
console.log("Cell phone: ", phone);
const card = mask("1234567812345678", "9999 9999 9999 9999");
console.log("Credit card: ", card);
const date = mask("12345678", "99/99/9999");
console.log("Date: ", date);
const postalCode = mask("12345678", "99999-999");
console.log("Postal Code: ", postalCode);
const postalCodeUnmasked = unmask("12345-678", "99999-999");
console.log("Postal Code (unmasked): ", postalCodeUnmasked);
const numberFormat = decimal("123456");
console.log("Number: ", numberFormat);
const currencyFormat = currency("1234.56");
console.log("Currency: ", currencyFormat);

maskInput(document.getElementById("cpf"), "999.999.999-99");
maskInput(document.getElementById("price"), "currency");
