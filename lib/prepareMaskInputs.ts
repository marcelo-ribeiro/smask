import { input } from "./input";

/**
 * Mask all inputs what have data-index attribute
 */
export const prepareMaskInputs = (): void => {
  const inputs = document.querySelectorAll("[data-mask]");
  inputs.forEach((el: any) => input(el, datasetToObject(el.dataset.mask)));
};

/**
 * Transform dataset to object
 */
const datasetToObject = (value: string): string[] =>
  JSON.parse(value.replace(/'/g, '"'));
