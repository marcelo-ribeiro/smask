import {maskInput} from "./maskInput.js";

/**
 * Mask all inputs what have data-index attribute
 */
export const prepareMaskInputs = () => {
  const datasetToObject = value => JSON.parse(value.replace(/'/g, "\""));
  [...document.querySelectorAll("[data-mask]")]
    .forEach(el => maskInput(el, datasetToObject(el.dataset.mask)))
}
