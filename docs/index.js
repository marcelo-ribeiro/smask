import {currency, numberFormat, mask, maskInput, unmask} from "./smask.js"

const cpf = mask("12345678909", "ddd.ddd.ddd-dd")
console.log("CPF: ", cpf)
const phone = mask("71987654321", "(dd) ddddd-dddd")
console.log("Cell phone: ", phone)
const card = mask("1234567812345678", "dddd dddd dddd dddd")
console.log("Credit card: ", card)
const date = mask("12345678", "dd/dd/dddd")
console.log("Date: ", date)
const postalCode = mask("12345678", "ddddd-ddd")
console.log("Postal Code: ", postalCode)
const postalCodeUnmasked = unmask("12345-678", "ddddd-ddd")
console.log("Postal Code (unmasked): ", postalCodeUnmasked)
const decimal = numberFormat(123456)
console.log("Number: ", decimal)
const currencyFormat = currency(1234.56)
console.log("Currency: ", currencyFormat)

maskInput("#cpf", ["ddd.ddd.ddd-dd", "dd.ddd.ddd/dddd-dd"])
maskInput("#price", ["currency"])

// Setting price placeholder
document.getElementById("price").setAttribute("placeholder", currency("0"))
