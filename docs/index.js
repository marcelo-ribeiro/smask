import {currency, decimal, mask, maskInput, unmask} from "./smask.js";

const cpf = mask("12345678909", "ddd.ddd.ddd-dd");
console.log("CPF: ", cpf);
const phone = mask("71987654321", "(dd) ddddd-dddd");
console.log("Cell phone: ", phone);
const card = mask("1234567812345678", "dddd dddd dddd dddd");
console.log("Credit card: ", card);
const date = mask("12345678", "dd/dd/dddd");
console.log("Date: ", date);
const postalCode = mask("12345678", "ddddd-ddd");
console.log("Postal Code: ", postalCode);
const postalCodeUnmasked = unmask("12345-678", "ddddd-ddd");
console.log("Postal Code (unmasked): ", postalCodeUnmasked);
const numberFormat = decimal("123456");
console.log("Number: ", numberFormat);
const currencyFormat = currency("1234.56");
console.log("Currency: ", currencyFormat);

maskInput(document.getElementById("cpf"), "ddd.ddd.ddd-dd");
maskInput(document.getElementById("price"), "currency");

// Setting price placeholder
document.getElementById("price").setAttribute("placeholder", currency("0", "pt-BR"));
