import {
  mask,
  maskInput,
  unmask,
  prepareMaskInputs,
  currency,
  numberFormat,
  reverseCurrencyFormat,
  reverseNumberFormat
} from "./smask.js"

console.log("CPF: ", mask("12345678909", "ddd.ddd.ddd-dd"))
console.log("Cell phone: ", mask("71987654321", "(dd) ddddd-dddd"))
console.log("Credit card: ", mask("1234567812345678", "dddd dddd dddd dddd"))
console.log("Date: ", mask("12345678", "dd/dd/dddd"))
console.log("Postal Code: ", mask("12345678", "ddddd-ddd"))
console.log("Postal Code (unmasked): ", unmask("12345-678", "ddddd-ddd"))

console.log("Decimal: ", numberFormat(1234.56))
console.log("Decimal (unmasked): ", reverseNumberFormat("1.234,00"))
console.log("Currency: ", currency(1234.56))
console.log("Currency (unmasked): ", reverseCurrencyFormat("R$ 1.234,56", "pt-BR", "BRL"))

maskInput("#cpf", ["ddd.ddd.ddd-dd", "dd.ddd.ddd/dddd-dd"])
maskInput("#price", ["currency"])

// Setting price placeholder
document.getElementById("price").setAttribute("placeholder", currency(0))

prepareMaskInputs()
