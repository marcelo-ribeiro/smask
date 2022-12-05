import * as smask from "./index.es.js";

// Custom mask
console.log("CPF: ", smask.mask("12345678909", ["ddd.ddd.ddd-dd"]));
console.log("Cell phone: ", smask.mask("71987654321", ["(dd) ddddd-dddd"]));
console.log(
  "Credit card: ",
  smask.mask("1234567812345678", ["dddd dddd dddd dddd"])
);
console.log("Postal Code: ", smask.mask("12345678", ["ddddd-ddd"]));
console.log("Postal Code (unmasked): ", smask.unmask("12345-678", "ddddd-ddd"));

// Number and Currency
console.log("Number: ", smask.numberFormat(1234.56));
console.log(
  "Number (unformatted): ",
  smask.numberUnformat("1.234,56", "pt-BR")
);
console.log("Currency: ", smask.currencyFormat(6543.21));
console.log(
  "Currency (unformatted): ",
  smask.currencyUnformat("R$ 6.543,21", "pt-BR", "BRL")
);

// Date
console.log("Date: ", smask.date("31/12/2022", "pt-BR"));
console.log("Date unmasked: ", smask.unmaskDate("31/12/2022", "pt-BR"));

// Load input mask via js
smask.input(document.getElementById("cpf"), ["ddd.ddd.ddd-dd"]);
smask.input(document.getElementById("date"), ["date"]);
smask.input(document.getElementById("cpfcnpj"), [
  "ddd.ddd.ddd-dd",
  "dd.ddd.ddd/dddd-dd",
]);
smask.input(document.getElementById("card-expiry"), ["dd/dddd"]);
smask.input(document.getElementById("car-plate"), ["AAAdAdd"]);
smask.input(document.getElementById("alphanumeric"), ["wWw"]);
smask.input(document.getElementById("currency"), ["currency"]);
smask.input(document.getElementById("number"), ["number"]);

// Initialize mask on inputs that have data-mask attribute
smask.prepareMaskInputs();
