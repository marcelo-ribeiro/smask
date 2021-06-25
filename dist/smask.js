/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ "use strict";
/******/ var __webpack_modules__ = ({

/***/ "./src/currency.js":
/*!*************************!*\
  !*** ./src/currency.js ***!
  \*************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"currency\": () => (/* binding */ currency)\n/* harmony export */ });\n/* harmony import */ var _numberFormat_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./numberFormat.js */ \"./src/numberFormat.js\");\n\n\n/**\n * @param {string|int} value\n * @param {string} [style=\"currency\"]\n * @param {object} [options]\n * @param {string} [locale]\n * @returns {string}\n */\nconst currency = (\n  value,\n  style = \"currency\",\n  {...options} = {},\n  locale,\n) => {\n  return (0,_numberFormat_js__WEBPACK_IMPORTED_MODULE_0__.numberFormat)(parseFloat(value), style, options)\n}\n\n\n//# sourceURL=webpack://smask/./src/currency.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"mask\": () => (/* reexport safe */ _mask_js__WEBPACK_IMPORTED_MODULE_0__.mask),\n/* harmony export */   \"unmask\": () => (/* reexport safe */ _unmask_js__WEBPACK_IMPORTED_MODULE_1__.unmask),\n/* harmony export */   \"maskInput\": () => (/* reexport safe */ _maskInput_js__WEBPACK_IMPORTED_MODULE_2__.maskInput),\n/* harmony export */   \"prepareMaskInputs\": () => (/* reexport safe */ _prepareMaskInputs_js__WEBPACK_IMPORTED_MODULE_3__.prepareMaskInputs),\n/* harmony export */   \"unmaskNumber\": () => (/* reexport safe */ _unmaskNumber_js__WEBPACK_IMPORTED_MODULE_4__.unmaskNumber),\n/* harmony export */   \"numberFormat\": () => (/* reexport safe */ _numberFormat_js__WEBPACK_IMPORTED_MODULE_5__.numberFormat),\n/* harmony export */   \"currency\": () => (/* reexport safe */ _currency_js__WEBPACK_IMPORTED_MODULE_6__.currency)\n/* harmony export */ });\n/* harmony import */ var _mask_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mask.js */ \"./src/mask.js\");\n/* harmony import */ var _unmask_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./unmask.js */ \"./src/unmask.js\");\n/* harmony import */ var _maskInput_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./maskInput.js */ \"./src/maskInput.js\");\n/* harmony import */ var _prepareMaskInputs_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./prepareMaskInputs.js */ \"./src/prepareMaskInputs.js\");\n/* harmony import */ var _unmaskNumber_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./unmaskNumber.js */ \"./src/unmaskNumber.js\");\n/* harmony import */ var _numberFormat_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./numberFormat.js */ \"./src/numberFormat.js\");\n/* harmony import */ var _currency_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./currency.js */ \"./src/currency.js\");\n\n\n\n\n\n\n\n\n\n//# sourceURL=webpack://smask/./src/index.js?");

/***/ }),

/***/ "./src/mask.js":
/*!*********************!*\
  !*** ./src/mask.js ***!
  \*********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"mask\": () => (/* binding */ mask)\n/* harmony export */ });\n/* harmony import */ var _tokens_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tokens.js */ \"./src/tokens.js\");\n/* harmony import */ var _unmask_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./unmask.js */ \"./src/unmask.js\");\n\n\n\n/**\n * @param {string} value\n * @param {string} pattern\n * @returns {string}\n */\nconst mask = (value, pattern) => {\n  if (!value || !pattern) return \"\"\n  const output = [...(0,_unmask_js__WEBPACK_IMPORTED_MODULE_1__.unmask)(value, pattern)], unmasked = [...(0,_unmask_js__WEBPACK_IMPORTED_MODULE_1__.unmask)(pattern)]\n  for (let i = 0, l = pattern.length; i < l && output[i]; i++)\n    !_tokens_js__WEBPACK_IMPORTED_MODULE_0__.tokens[unmasked[i]].test(output[i])\n      ? output.splice(i, 1)\n      : /\\W/.test(pattern[i])\n      ? output.splice(i, 0, pattern[i]) && unmasked.splice(i, 0, pattern[i])\n      : output.splice(i, 1, _tokens_js__WEBPACK_IMPORTED_MODULE_0__.tokens[unmasked[i]].transform(output[i]))\n  return output.join(\"\")\n}\n\n\n//# sourceURL=webpack://smask/./src/mask.js?");

/***/ }),

/***/ "./src/maskInput.js":
/*!**************************!*\
  !*** ./src/maskInput.js ***!
  \**************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"maskInput\": () => (/* binding */ maskInput)\n/* harmony export */ });\n/* harmony import */ var _mask_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mask.js */ \"./src/mask.js\");\n/* harmony import */ var _numberFormat_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./numberFormat.js */ \"./src/numberFormat.js\");\n/* harmony import */ var _unmaskNumber_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./unmaskNumber.js */ \"./src/unmaskNumber.js\");\n\n\n\n\n/**\n * maskInput\n * @param {string|HTMLInputElement} element Element Selector\n * @param {string|string[]} patterns decimal|currency\n */\nconst maskInput = (element, patterns) => {\n  if (!Array.isArray(patterns)) throw ReferenceError(\"Pattern is not array\")\n  if (!patterns) throw ReferenceError(\"Missing second parameter pattern.\")\n\n  typeof element === \"string\" && (element = document.querySelector(element))\n  const [pattern, dynamicPattern] = patterns\n  let listener\n\n  switch (pattern) {\n    case \"decimal\":\n    case \"currency\":\n    case \"percent\":\n      listener = () => element.value = (0,_numberFormat_js__WEBPACK_IMPORTED_MODULE_1__.numberFormat)((0,_unmaskNumber_js__WEBPACK_IMPORTED_MODULE_2__.unmaskNumber)(element.value, pattern), pattern)\n      break\n    default:\n      patterns.sort((a, b) => a.length - b.length)\n      element.minLength = pattern.length\n      element.maxLength = dynamicPattern?.length || element.minLength\n      element.pattern = `.{${pattern.length},${dynamicPattern?.length || pattern.length}}`\n      const setInputValue = (element, pattern) => element.value = (0,_mask_js__WEBPACK_IMPORTED_MODULE_0__.mask)(element.value, pattern)\n      listener = dynamicPattern\n        ? () => setInputValue(element, element.value.length <= element.minLength ? pattern : dynamicPattern)\n        : () => setInputValue(element, pattern)\n  }\n  element.value && listener()\n  element.addEventListener(\"input\", listener)\n}\n\n\n//# sourceURL=webpack://smask/./src/maskInput.js?");

/***/ }),

/***/ "./src/numberFormat.js":
/*!*****************************!*\
  !*** ./src/numberFormat.js ***!
  \*****************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"numberFormat\": () => (/* binding */ numberFormat)\n/* harmony export */ });\n/**\n * @param {number|string} value\n * @param {string} [style]\n * @param {string} [locale]\n * @param {object} [options]\n * @returns {string}\n */\nconst numberFormat = (\n  value,\n  style,\n  {...options} = {},\n  locale\n) => {\n  options = {...options, ...getOptions(locale || \"pt-BR\")[style]};\n  return new Intl.NumberFormat(locale, options).format(value)\n}\n\n/* To be updated based on need - French - Canada and US locale handled  */\nconst currencyToLocale = new Map([\n  [\"en-US\", \"USD\"],\n  [\"pt-BR\", \"BRL\"],\n  [\"fr-CA\", \"CAD\"]\n])\n\nconst getOptions = locale => ({\n  currency: {\n    style: \"currency\",\n    currency: currencyToLocale.get(locale)\n  },\n  decimal: {},\n  percent: {}\n})\n\n\n//# sourceURL=webpack://smask/./src/numberFormat.js?");

/***/ }),

/***/ "./src/prepareMaskInputs.js":
/*!**********************************!*\
  !*** ./src/prepareMaskInputs.js ***!
  \**********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"prepareMaskInputs\": () => (/* binding */ prepareMaskInputs)\n/* harmony export */ });\n/* harmony import */ var _maskInput_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./maskInput.js */ \"./src/maskInput.js\");\n\n\n/**\n * Mask all inputs what have data-index attribute\n */\nconst prepareMaskInputs = () => {\n  const datasetToObject = value => JSON.parse(value.replace(/'/g, \"\\\"\"));\n  [...document.querySelectorAll(\"[data-mask]\")]\n    .forEach(el => (0,_maskInput_js__WEBPACK_IMPORTED_MODULE_0__.maskInput)(el, datasetToObject(el.dataset.mask)))\n}\n\n\n//# sourceURL=webpack://smask/./src/prepareMaskInputs.js?");

/***/ }),

/***/ "./src/tokens.js":
/*!***********************!*\
  !*** ./src/tokens.js ***!
  \***********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"tokens\": () => (/* binding */ tokens)\n/* harmony export */ });\nconst tokens = {\n  d: {test: v => /\\d/.test(v), transform: v => v},\n  a: {test: v => /[a-z]/i.test(v), transform: v => v.toLowerCase()},\n  A: {test: v => /[a-z]/i.test(v), transform: v => v.toUpperCase()},\n  w: {test: v => /\\w/.test(v), transform: v => v.toLowerCase()},\n  W: {test: v => /\\w/.test(v), transform: v => v.toUpperCase()}\n}\n\n\n//# sourceURL=webpack://smask/./src/tokens.js?");

/***/ }),

/***/ "./src/unmask.js":
/*!***********************!*\
  !*** ./src/unmask.js ***!
  \***********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"unmask\": () => (/* binding */ unmask)\n/* harmony export */ });\n/**\n * @param {string} value\n * @param {string} [pattern=\"\"]\n * @returns {string}\n */\nconst unmask = (value, pattern) => {\n  if (!value) return value\n  value = value.replace(/\\W/ig, \"\")\n  return pattern ? value.slice(0, pattern.replace(/\\W/ig, \"\").length) : value\n}\n\n\n//# sourceURL=webpack://smask/./src/unmask.js?");

/***/ }),

/***/ "./src/unmaskNumber.js":
/*!*****************************!*\
  !*** ./src/unmaskNumber.js ***!
  \*****************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"unmaskNumber\": () => (/* binding */ unmaskNumber)\n/* harmony export */ });\n/**\n * @param {string} value\n * @param {string} pattern\n * @returns {string|int}\n */\nconst unmaskNumber = (value, pattern) => {\n  if (!value || !pattern) return 0\n  let output = parseInt(value.replace(/\\D/g, \"\"))\n  if (output && \"currency\" === pattern) output = output / 100\n  return output || 0\n}\n\n\n//# sourceURL=webpack://smask/./src/unmaskNumber.js?");

/***/ })

/******/ });
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {};
/******/ 
/******/ // The require function
/******/ function __webpack_require__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	var cachedModule = __webpack_module_cache__[moduleId];
/******/ 	if (cachedModule !== undefined) {
/******/ 		return cachedModule.exports;
/******/ 	}
/******/ 	// Create a new module (and put it into the cache)
/******/ 	var module = __webpack_module_cache__[moduleId] = {
/******/ 		// no module.id needed
/******/ 		// no module.loaded needed
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/define property getters */
/******/ (() => {
/******/ 	// define getter functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ (() => {
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ })();
/******/ 
/******/ /* webpack/runtime/make namespace object */
/******/ (() => {
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ })();
/******/ 
/************************************************************************/
/******/ 
/******/ // startup
/******/ // Load entry module and return exports
/******/ // This entry module can't be inlined because the eval devtool is used.
/******/ var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ var __webpack_exports__currency = __webpack_exports__.currency;
/******/ var __webpack_exports__mask = __webpack_exports__.mask;
/******/ var __webpack_exports__maskInput = __webpack_exports__.maskInput;
/******/ var __webpack_exports__numberFormat = __webpack_exports__.numberFormat;
/******/ var __webpack_exports__prepareMaskInputs = __webpack_exports__.prepareMaskInputs;
/******/ var __webpack_exports__unmask = __webpack_exports__.unmask;
/******/ var __webpack_exports__unmaskNumber = __webpack_exports__.unmaskNumber;
/******/ export { __webpack_exports__currency as currency, __webpack_exports__mask as mask, __webpack_exports__maskInput as maskInput, __webpack_exports__numberFormat as numberFormat, __webpack_exports__prepareMaskInputs as prepareMaskInputs, __webpack_exports__unmask as unmask, __webpack_exports__unmaskNumber as unmaskNumber };
/******/ 
