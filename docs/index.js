import * as smask from "./smask.js";

// Custom mask
console.log("CPF: ", smask.mask("12345678909", "ddd.ddd.ddd-dd"));
console.log("Cell phone: ", smask.mask("71987654321", "(dd) ddddd-dddd"));
console.log(
  "Credit card: ",
  smask.mask("1234567812345678", "dddd dddd dddd dddd")
);
console.log("Postal Code: ", smask.mask("12345678", "ddddd-ddd"));
console.log("Postal Code (unmasked): ", smask.unmask("12345-678", "ddddd-ddd"));

// Number and Currency
console.log("Decimal: ", smask.number(1234.56));
console.log("Decimal (unmasked): ", smask.reverseNumberFormat("1.234,56"));
console.log("Currency: ", smask.currency(6543.21));
console.log(
  "Currency (unmasked): ",
  smask.reverseCurrencyFormat("R$ 6.543,21", "pt-BR", "BRL")
);

// Load input mask via js
smask.input("#cpf", ["ddd.ddd.ddd-dd"]);
smask.input(document.getElementById("price"), ["currency"]);

// Initialize mask on inputs that have data-mask attribute
smask.prepareMaskInputs();
