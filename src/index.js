import { mask } from "./mask.js";
import { unmask } from "./unmask.js";
import { input } from "./input.js";
import { prepareMaskInputs } from "./prepareMaskInputs.js";
import {
  unmaskNumber,
  reverseNumberFormat,
  reverseCurrencyFormat,
} from "./unmaskNumber.js";
import { date } from "./date.js";
import { number } from "./number.js";
import { currency } from "./currency.js";

export default {
  mask,
  unmask,
  input,
  prepareMaskInputs,
  number,
  currency,
  date,
  unmaskNumber,
  reverseNumberFormat,
  reverseCurrencyFormat,
};

// import.meta.webpackHot.accept();
