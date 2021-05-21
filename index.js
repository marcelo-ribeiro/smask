/**
 * @param {string} value=""
 * @param {string} pattern=""
 */
export const mask = (value = "", pattern = "") => {
  [...pattern].forEach((char, i) => {
    if (value[i] && char !== "9")
      value = value.substring(0, i) + char + value.substring(i, value.length);
  });
  return value.substring(0, pattern.length);
};

/**
 * @param {string} value=""
 * @param {string} pattern=""
 */
export const unmask = (value = "", pattern = "") => {
  [...pattern].forEach(char => {
    if (!/^[a-z0-9]+$/i.test(char))
      value = value.replace(char, "");
  });
  return value.substring(0, pattern.length);
};

/**
 * @param {string} value
 * @param {object} defaults
 */
export const number = (value, defaults = {
  style: "decimal", // decimal | currency | percent | unit
}) => {
  if (typeof value === "undefined") return "";
  return new Intl.NumberFormat("pt-br", defaults).format(parseFloat(value));
};

/**
 * @param {string} value
 * @param {object} defaults
 */
export const money = (value, defaults = {
  style: "currency", // decimal | currency | percent | unit
  currency: "BRL",
  currencyDisplay: "symbol", // symbol | narrowSymbol | code | name
}) => {
  return number(value, defaults);
};

/**
 * @param {HTMLInputElement} element
 * @param {string} [pattern]
 */
const setInputValue = (element, pattern) => {
  element.value = mask(unmask(element.value, pattern), pattern)
};

/**
 * @param {HTMLInputElement} element
 * @param {string} [pattern]
 */
export const maskInput = (element, pattern) => {
  pattern = pattern || element.dataset.mask;
  if (!pattern) throw ReferenceError("Missing second parameter pattern.");

  element.minLength = pattern.length;
  element.maxLength = pattern.length;
  element.value && setInputValue(element, pattern);
  element.addEventListener("keyup", () => {
    setInputValue(element, pattern);
  });
};

export const loadInputs = () => {
  document.querySelectorAll("[data-mask]")
    .forEach(element => maskInput(element, element.dataset.mask));
};

(() => {
  loadInputs();
})();

const cpf = mask("12345678909", "999.999.999-99");
console.log("CPF: ", cpf);
const phone = mask("71987654321", "(99) 99999-9999");
console.log("Telefone: ", phone);
const card = mask("1234567812345678", "9999 9999 9999 9999");
console.log("Cartão de crédito: ", card);
const postalCode = mask("12345678", "99999-999");
console.log("CEP: ", postalCode);
const date = mask("12345678", "99/99/9999");
console.log("Date: ", date);
const postalCodeUnmasked = unmask("12345-678", "99999-999");
console.log("CEP unmasked: ", postalCodeUnmasked);
const numberFormat = number("12345678");
console.log("Number: ", numberFormat);
const moneyFormat = money("12345678");
console.log("Money: ", moneyFormat);

maskInput(document.getElementById("cpf"), "999.999.999-99");
