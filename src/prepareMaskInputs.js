import {input} from "./input.js";

/**
 * Mask all inputs what have data-index attribute
 */
export const prepareMaskInputs = () => {
  const datasetToObject = value => JSON.parse(value.replace(/'/g, "\""));
  [...document.querySelectorAll("[data-mask]")]
    .forEach(el => input(el, datasetToObject(el.dataset.mask)))
}
