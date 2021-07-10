/******/ "use strict";
/******/ var __webpack_modules__ = ({

/***/ "./src/currency.js":
/*!*************************!*\
  !*** ./src/currency.js ***!
  \*************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "currency": () => (/* binding */ currency)
/* harmony export */ });
/* harmony import */ var _number_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./number.js */ "./src/number.js");


/**
 * @param {string|int} value
 * @param {string} [style="currency"]
 * @param {object} [options]
 * @param {string} [locale]
 * @returns {string}
 */
const currency = (
  value,
  style = "currency",
  {...options} = {},
  locale,
) => {
  return (0,_number_js__WEBPACK_IMPORTED_MODULE_0__.number)(parseFloat(value), style, options, locale)
}


/***/ }),

/***/ "./src/date.js":
/*!*********************!*\
  !*** ./src/date.js ***!
  \*********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "maskDate": () => (/* binding */ maskDate),
/* harmony export */   "getDatePattern": () => (/* binding */ getDatePattern),
/* harmony export */   "date": () => (/* binding */ date)
/* harmony export */ });
/* harmony import */ var _mask_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mask.js */ "./src/mask.js");


const maskDateMap = {
  getComputedDate: (value, initialDate = "01/01/1970".replace(/\D/g, "")) => {
    value = value.replace(/\D/g, "")
    return value + initialDate.slice(value.length)
  },
  getMaskedDate: (value, pattern) => (0,_mask_js__WEBPACK_IMPORTED_MODULE_0__.mask)(value, pattern)
}

/**
 * Get Date Masked
 * @param {string} value
 * @param {string} pattern
 * @returns {string}
 */
const maskDate = (value, pattern) => {
  const dateObject = date(
    maskDateMap.getMaskedDate(
      maskDateMap.getComputedDate(value),
      pattern
    )
  )
  return (0,_mask_js__WEBPACK_IMPORTED_MODULE_0__.mask)(isNaN(dateObject.valueOf()) ? value.slice(0, -1) : value, pattern)
}

const datePatternMap = {
  parts: new Intl.DateTimeFormat().formatToParts(),
  mask: "",
  placeholder: ""
}

/**
 * Get Date Pattern
 * @returns {object}
 */
const getDatePattern = () => {
  datePatternMap.parts.forEach(({type, value}) => {
    if (type === "month") (datePatternMap.mask += "dd") && (datePatternMap.placeholder += "__")
    else if (type === "day") (datePatternMap.mask += "dd") && (datePatternMap.placeholder += "__")
    else if (type === "year") (datePatternMap.mask += "dddd") && (datePatternMap.placeholder += "____")
    else if (type === "literal") (datePatternMap.mask += value) && (datePatternMap.placeholder += value)
  })
  const obj = {mask: datePatternMap.mask, placeholder: datePatternMap.placeholder}
  datePatternMap.mask = ""
  datePatternMap.placeholder = ""
  return obj
}

const dateMap = {
  parts: new Intl.DateTimeFormat().formatToParts(),
  valueArray: [],
  dateFormat: (month, day, year) => `${month}/${day}/${year}`
}
/**
 * @param {string} value
 * @param {string} [locale=undefined]
 * @returns {Date}
 */
const date = (value, locale = undefined) => {
  dateMap.valueArray = value.split("/")
  const {month, day, year} = {
      [dateMap.parts[0].type]: dateMap.valueArray[0],
      [dateMap.parts[2].type]: dateMap.valueArray[1],
      [dateMap.parts[4].type]: dateMap.valueArray[2]
    }
  return new Date(dateMap.dateFormat(month, day, year))
}


/***/ }),

/***/ "./src/input.js":
/*!**********************!*\
  !*** ./src/input.js ***!
  \**********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "input": () => (/* binding */ input)
/* harmony export */ });
/* harmony import */ var _mask_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mask.js */ "./src/mask.js");
/* harmony import */ var _unmaskNumber_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./unmaskNumber.js */ "./src/unmaskNumber.js");
/* harmony import */ var _currency_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./currency.js */ "./src/currency.js");
/* harmony import */ var _date_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./date.js */ "./src/date.js");





/**
 * maskInput
 * @param {string|HTMLInputElement} element Element Selector
 * @param {string|string[]} patterns decimal|currency
 */
const input = (element, patterns) => {
  if (!Array.isArray(patterns)) throw ReferenceError("Pattern is not array")
  if (!patterns) throw ReferenceError("Missing second parameter pattern.")

  if (typeof element === "string") element = document.querySelector(element)
  let [pattern, dynamicPattern] = patterns
  let listener

  switch (pattern) {
    case "currency": {
      listener = () => element.value = (0,_currency_js__WEBPACK_IMPORTED_MODULE_2__.currency)((0,_unmaskNumber_js__WEBPACK_IMPORTED_MODULE_1__.unmaskNumber)(element.value, pattern), pattern)
      break
    }
    case "date": {
      const {mask, placeholder} = (0,_date_js__WEBPACK_IMPORTED_MODULE_3__.getDatePattern)()
      element.placeholder = placeholder
      listener = () => element.value = (0,_date_js__WEBPACK_IMPORTED_MODULE_3__.maskDate)(element.value, mask)
      break
    }
    default: {
      patterns.sort((a, b) => a.length - b.length)
      element.minLength = pattern.length
      element.maxLength = dynamicPattern?.length || element.minLength
      element.pattern = `.{${pattern.length},${dynamicPattern?.length || pattern.length}}`

      listener = dynamicPattern
        ? () => element.value = (0,_mask_js__WEBPACK_IMPORTED_MODULE_0__.mask)(
          element.value,
          element.value.length <= element.minLength ? pattern : dynamicPattern
        )
        : () => element.value = (0,_mask_js__WEBPACK_IMPORTED_MODULE_0__.mask)(element.value, pattern)
    }
  }
  element.value && listener()
  element.addEventListener("input", listener)
}


/***/ }),

/***/ "./src/mask.js":
/*!*********************!*\
  !*** ./src/mask.js ***!
  \*********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "mask": () => (/* binding */ mask)
/* harmony export */ });
/* harmony import */ var _tokens_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tokens.js */ "./src/tokens.js");
/* harmony import */ var _unmask_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./unmask.js */ "./src/unmask.js");



/**
 * @param {string} value
 * @param {string} pattern
 * @returns {string}
 */
const mask = (value, pattern) => {
  if (!value || !pattern) return ""
  const output = [...(0,_unmask_js__WEBPACK_IMPORTED_MODULE_1__.unmask)(value, pattern)], unmasked = [...(0,_unmask_js__WEBPACK_IMPORTED_MODULE_1__.unmask)(pattern)]
  for (let i = 0, l = pattern.length; i < l && output[i]; i++)
    !_tokens_js__WEBPACK_IMPORTED_MODULE_0__.tokens[unmasked[i]].test(output[i])
      ? output.splice(i, 1)
      : /\W/.test(pattern[i])
      ? output.splice(i, 0, pattern[i]) && unmasked.splice(i, 0, pattern[i])
      : output.splice(i, 1, _tokens_js__WEBPACK_IMPORTED_MODULE_0__.tokens[unmasked[i]].transform(output[i]))
  return output.join("")
}


/***/ }),

/***/ "./src/number.js":
/*!***********************!*\
  !*** ./src/number.js ***!
  \***********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "number": () => (/* binding */ number)
/* harmony export */ });
/**
 * @param {number|string} value
 * @param {string} [style]
 * @param {string} [locale]
 * @param {object} [options]
 * @returns {string}
 */
const number = (
  value,
  style,
  {...options} = {},
  locale
) => {
  options = {...options, ...getOptions(locale || "pt-BR")[style]};
  return new Intl.NumberFormat(locale, options).format(value)
}

/* To be updated based on need - French - Canada and US locale handled  */
const currencyToLocale = new Map([
  ["en-US", "USD"],
  ["pt-BR", "BRL"],
  ["fr-CA", "CAD"]
])

const getOptions = locale => ({
  currency: {
    style: "currency",
    currency: currencyToLocale.get(locale)
  },
  decimal: {},
  percent: {}
})


/***/ }),

/***/ "./src/prepareMaskInputs.js":
/*!**********************************!*\
  !*** ./src/prepareMaskInputs.js ***!
  \**********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "prepareMaskInputs": () => (/* binding */ prepareMaskInputs)
/* harmony export */ });
/* harmony import */ var _input_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./input.js */ "./src/input.js");


/**
 * Mask all inputs what have data-index attribute
 */
const prepareMaskInputs = () => {
  const datasetToObject = value => JSON.parse(value.replace(/'/g, "\""));
  [...document.querySelectorAll("[data-mask]")]
    .forEach(el => (0,_input_js__WEBPACK_IMPORTED_MODULE_0__.input)(el, datasetToObject(el.dataset.mask)))
}


/***/ }),

/***/ "./src/tokens.js":
/*!***********************!*\
  !*** ./src/tokens.js ***!
  \***********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "tokens": () => (/* binding */ tokens)
/* harmony export */ });
const tokens = {
  d: {test: v => /\d/.test(v), transform: v => v},
  a: {test: v => /[a-z]/i.test(v), transform: v => v.toLowerCase()},
  A: {test: v => /[a-z]/i.test(v), transform: v => v.toUpperCase()},
  w: {test: v => /\w/.test(v), transform: v => v.toLowerCase()},
  W: {test: v => /\w/.test(v), transform: v => v.toUpperCase()}
}


/***/ }),

/***/ "./src/unmask.js":
/*!***********************!*\
  !*** ./src/unmask.js ***!
  \***********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "unmask": () => (/* binding */ unmask)
/* harmony export */ });
/**
 * @param {string} value
 * @param {string} [pattern=""]
 * @returns {string}
 */
const unmask = (value, pattern) => {
  if (!value) return value
  value = value.replace(/\W/ig, "")
  return pattern ? value.slice(0, pattern.replace(/\W/ig, "").length) : value
}


/***/ }),

/***/ "./src/unmaskNumber.js":
/*!*****************************!*\
  !*** ./src/unmaskNumber.js ***!
  \*****************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "unmaskNumber": () => (/* binding */ unmaskNumber),
/* harmony export */   "reverseNumberFormat": () => (/* binding */ reverseNumberFormat),
/* harmony export */   "reverseCurrencyFormat": () => (/* binding */ reverseCurrencyFormat)
/* harmony export */ });
/**
 * @param {string} value
 * @param {string} [pattern=undefined]
 * @returns {string|int}
 */
const unmaskNumber = (value, pattern) => {
  let output = value.replace(/\D/g, "")
  if (output && "currency" === pattern) output = output / 100
  return output || 0
}

/**
 * Reverse Number Format
 * @param {string} value
 * @param {string} locale
 * @returns {number}
 */
const reverseNumberFormat = (value, locale) => {
  const parts = new Intl.NumberFormat(locale).formatToParts(1111.1)
  return reverseFormat(value, parts)
}

/**
 * Reverse Currency Format
 * @param {string} value
 * @param {string} locale
 * @param {string} currency
 * @returns {number}
 */
const reverseCurrencyFormat = (value, locale, currency) => {
  const parts = new Intl.NumberFormat(locale, {style: "currency", currency}).formatToParts(1111.1)
  const symbol = parts.find(part => part.type === 'currency').value
  const reversedVal = value.replace(symbol, '')
  return reverseFormat(reversedVal, parts)
}

/**
 * @param {string} value
 * @param {array} parts
 * @returns {number|number}
 */
const reverseFormat = (value, parts) => {
  const group = parts.find(part => part.type === 'group').value
  const decimal = parts.find(part => part.type === 'decimal').value
  let reversedVal = value
    .replaceAll(group, '')
    .replace(decimal, '.')
  return Number.isNaN(reversedVal)
    ? NaN
    : +reversedVal
}


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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _mask_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mask.js */ "./src/mask.js");
/* harmony import */ var _unmask_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./unmask.js */ "./src/unmask.js");
/* harmony import */ var _input_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./input.js */ "./src/input.js");
/* harmony import */ var _prepareMaskInputs_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./prepareMaskInputs.js */ "./src/prepareMaskInputs.js");
/* harmony import */ var _unmaskNumber_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./unmaskNumber.js */ "./src/unmaskNumber.js");
/* harmony import */ var _date_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./date.js */ "./src/date.js");
/* harmony import */ var _number_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./number.js */ "./src/number.js");
/* harmony import */ var _currency_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./currency.js */ "./src/currency.js");









/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  mask: _mask_js__WEBPACK_IMPORTED_MODULE_0__.mask, unmask: _unmask_js__WEBPACK_IMPORTED_MODULE_1__.unmask, input: _input_js__WEBPACK_IMPORTED_MODULE_2__.input, prepareMaskInputs: _prepareMaskInputs_js__WEBPACK_IMPORTED_MODULE_3__.prepareMaskInputs, number: _number_js__WEBPACK_IMPORTED_MODULE_6__.number, currency: _currency_js__WEBPACK_IMPORTED_MODULE_7__.currency, date: _date_js__WEBPACK_IMPORTED_MODULE_5__.date,
  unmaskNumber: _unmaskNumber_js__WEBPACK_IMPORTED_MODULE_4__.unmaskNumber, reverseNumberFormat: _unmaskNumber_js__WEBPACK_IMPORTED_MODULE_4__.reverseNumberFormat, reverseCurrencyFormat: _unmaskNumber_js__WEBPACK_IMPORTED_MODULE_4__.reverseCurrencyFormat
});

})();

var __webpack_exports__default = __webpack_exports__.default;
export { __webpack_exports__default as default };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zbWFzay8uL3NyYy9jdXJyZW5jeS5qcyIsIndlYnBhY2s6Ly9zbWFzay8uL3NyYy9kYXRlLmpzIiwid2VicGFjazovL3NtYXNrLy4vc3JjL2lucHV0LmpzIiwid2VicGFjazovL3NtYXNrLy4vc3JjL21hc2suanMiLCJ3ZWJwYWNrOi8vc21hc2svLi9zcmMvbnVtYmVyLmpzIiwid2VicGFjazovL3NtYXNrLy4vc3JjL3ByZXBhcmVNYXNrSW5wdXRzLmpzIiwid2VicGFjazovL3NtYXNrLy4vc3JjL3Rva2Vucy5qcyIsIndlYnBhY2s6Ly9zbWFzay8uL3NyYy91bm1hc2suanMiLCJ3ZWJwYWNrOi8vc21hc2svLi9zcmMvdW5tYXNrTnVtYmVyLmpzIiwid2VicGFjazovL3NtYXNrL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3NtYXNrL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9zbWFzay93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3NtYXNrL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vc21hc2svLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBbUM7O0FBRW5DO0FBQ0EsV0FBVyxXQUFXO0FBQ3RCLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCLGFBQWE7QUFDYjtBQUNPO0FBQ1A7QUFDQTtBQUNBLEdBQUcsV0FBVyxLQUFLO0FBQ25CO0FBQ0E7QUFDQSxTQUFTLGtEQUFNO0FBQ2Y7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2hCOEI7O0FBRTlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILHFDQUFxQyw4Q0FBSTtBQUN6Qzs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcs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T0FBTztBQUNsQixXQUFXLE1BQU07QUFDakIsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7U0NsREE7U0FDQTs7U0FFQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTs7U0FFQTtTQUNBOztTQUVBO1NBQ0E7U0FDQTs7Ozs7VUN0QkE7VUFDQTtVQUNBO1VBQ0E7VUFDQSx3Q0FBd0MseUNBQXlDO1VBQ2pGO1VBQ0E7VUFDQSxFOzs7OztVQ1BBLHdGOzs7OztVQ0FBO1VBQ0E7VUFDQTtVQUNBLHNEQUFzRCxrQkFBa0I7VUFDeEU7VUFDQSwrQ0FBK0MsY0FBYztVQUM3RCxFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTjhCO0FBQ0k7QUFDRjtBQUN3QjtBQUNrQztBQUM1RDtBQUNJO0FBQ0k7O0FBRXRDLGlFQUFlO0FBQ2YsTUFBTSxvREFBUSx1REFBTyxpRUFBbUIsOEVBQVEsMERBQVUsMERBQU07QUFDaEUsY0FBYyxpRkFBcUIsMEZBQXVCO0FBQzFELENBQUMiLCJmaWxlIjoic21hc2suanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge251bWJlcn0gZnJvbSBcIi4vbnVtYmVyLmpzXCI7XG5cbi8qKlxuICogQHBhcmFtIHtzdHJpbmd8aW50fSB2YWx1ZVxuICogQHBhcmFtIHtzdHJpbmd9IFtzdHlsZT1cImN1cnJlbmN5XCJdXG4gKiBAcGFyYW0ge29iamVjdH0gW29wdGlvbnNdXG4gKiBAcGFyYW0ge3N0cmluZ30gW2xvY2FsZV1cbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBjb25zdCBjdXJyZW5jeSA9IChcbiAgdmFsdWUsXG4gIHN0eWxlID0gXCJjdXJyZW5jeVwiLFxuICB7Li4ub3B0aW9uc30gPSB7fSxcbiAgbG9jYWxlLFxuKSA9PiB7XG4gIHJldHVybiBudW1iZXIocGFyc2VGbG9hdCh2YWx1ZSksIHN0eWxlLCBvcHRpb25zLCBsb2NhbGUpXG59XG4iLCJpbXBvcnQge21hc2t9IGZyb20gXCIuL21hc2suanNcIlxuXG5jb25zdCBtYXNrRGF0ZU1hcCA9IHtcbiAgZ2V0Q29tcHV0ZWREYXRlOiAodmFsdWUsIGluaXRpYWxEYXRlID0gXCIwMS8wMS8xOTcwXCIucmVwbGFjZSgvXFxEL2csIFwiXCIpKSA9PiB7XG4gICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKC9cXEQvZywgXCJcIilcbiAgICByZXR1cm4gdmFsdWUgKyBpbml0aWFsRGF0ZS5zbGljZSh2YWx1ZS5sZW5ndGgpXG4gIH0sXG4gIGdldE1hc2tlZERhdGU6ICh2YWx1ZSwgcGF0dGVybikgPT4gbWFzayh2YWx1ZSwgcGF0dGVybilcbn1cblxuLyoqXG4gKiBHZXQgRGF0ZSBNYXNrZWRcbiAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZVxuICogQHBhcmFtIHtzdHJpbmd9IHBhdHRlcm5cbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBjb25zdCBtYXNrRGF0ZSA9ICh2YWx1ZSwgcGF0dGVybikgPT4ge1xuICBjb25zdCBkYXRlT2JqZWN0ID0gZGF0ZShcbiAgICBtYXNrRGF0ZU1hcC5nZXRNYXNrZWREYXRlKFxuICAgICAgbWFza0RhdGVNYXAuZ2V0Q29tcHV0ZWREYXRlKHZhbHVlKSxcbiAgICAgIHBhdHRlcm5cbiAgICApXG4gIClcbiAgcmV0dXJuIG1hc2soaXNOYU4oZGF0ZU9iamVjdC52YWx1ZU9mKCkpID8gdmFsdWUuc2xpY2UoMCwgLTEpIDogdmFsdWUsIHBhdHRlcm4pXG59XG5cbmNvbnN0IGRhdGVQYXR0ZXJuTWFwID0ge1xuICBwYXJ0czogbmV3IEludGwuRGF0ZVRpbWVGb3JtYXQoKS5mb3JtYXRUb1BhcnRzKCksXG4gIG1hc2s6IFwiXCIsXG4gIHBsYWNlaG9sZGVyOiBcIlwiXG59XG5cbi8qKlxuICogR2V0IERhdGUgUGF0dGVyblxuICogQHJldHVybnMge29iamVjdH1cbiAqL1xuZXhwb3J0IGNvbnN0IGdldERhdGVQYXR0ZXJuID0gKCkgPT4ge1xuICBkYXRlUGF0dGVybk1hcC5wYXJ0cy5mb3JFYWNoKCh7dHlwZSwgdmFsdWV9KSA9PiB7XG4gICAgaWYgKHR5cGUgPT09IFwibW9udGhcIikgKGRhdGVQYXR0ZXJuTWFwLm1hc2sgKz0gXCJkZFwiKSAmJiAoZGF0ZVBhdHRlcm5NYXAucGxhY2Vob2xkZXIgKz0gXCJfX1wiKVxuICAgIGVsc2UgaWYgKHR5cGUgPT09IFwiZGF5XCIpIChkYXRlUGF0dGVybk1hcC5tYXNrICs9IFwiZGRcIikgJiYgKGRhdGVQYXR0ZXJuTWFwLnBsYWNlaG9sZGVyICs9IFwiX19cIilcbiAgICBlbHNlIGlmICh0eXBlID09PSBcInllYXJcIikgKGRhdGVQYXR0ZXJuTWFwLm1hc2sgKz0gXCJkZGRkXCIpICYmIChkYXRlUGF0dGVybk1hcC5wbGFjZWhvbGRlciArPSBcIl9fX19cIilcbiAgICBlbHNlIGlmICh0eXBlID09PSBcImxpdGVyYWxcIikgKGRhdGVQYXR0ZXJuTWFwLm1hc2sgKz0gdmFsdWUpICYmIChkYXRlUGF0dGVybk1hcC5wbGFjZWhvbGRlciArPSB2YWx1ZSlcbiAgfSlcbiAgY29uc3Qgb2JqID0ge21hc2s6IGRhdGVQYXR0ZXJuTWFwLm1hc2ssIHBsYWNlaG9sZGVyOiBkYXRlUGF0dGVybk1hcC5wbGFjZWhvbGRlcn1cbiAgZGF0ZVBhdHRlcm5NYXAubWFzayA9IFwiXCJcbiAgZGF0ZVBhdHRlcm5NYXAucGxhY2Vob2xkZXIgPSBcIlwiXG4gIHJldHVybiBvYmpcbn1cblxuY29uc3QgZGF0ZU1hcCA9IHtcbiAgcGFydHM6IG5ldyBJbnRsLkRhdGVUaW1lRm9ybWF0KCkuZm9ybWF0VG9QYXJ0cygpLFxuICB2YWx1ZUFycmF5OiBbXSxcbiAgZGF0ZUZvcm1hdDogKG1vbnRoLCBkYXksIHllYXIpID0+IGAke21vbnRofS8ke2RheX0vJHt5ZWFyfWBcbn1cbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlXG4gKiBAcGFyYW0ge3N0cmluZ30gW2xvY2FsZT11bmRlZmluZWRdXG4gKiBAcmV0dXJucyB7RGF0ZX1cbiAqL1xuZXhwb3J0IGNvbnN0IGRhdGUgPSAodmFsdWUsIGxvY2FsZSA9IHVuZGVmaW5lZCkgPT4ge1xuICBkYXRlTWFwLnZhbHVlQXJyYXkgPSB2YWx1ZS5zcGxpdChcIi9cIilcbiAgY29uc3Qge21vbnRoLCBkYXksIHllYXJ9ID0ge1xuICAgICAgW2RhdGVNYXAucGFydHNbMF0udHlwZV06IGRhdGVNYXAudmFsdWVBcnJheVswXSxcbiAgICAgIFtkYXRlTWFwLnBhcnRzWzJdLnR5cGVdOiBkYXRlTWFwLnZhbHVlQXJyYXlbMV0sXG4gICAgICBbZGF0ZU1hcC5wYXJ0c1s0XS50eXBlXTogZGF0ZU1hcC52YWx1ZUFycmF5WzJdXG4gICAgfVxuICByZXR1cm4gbmV3IERhdGUoZGF0ZU1hcC5kYXRlRm9ybWF0KG1vbnRoLCBkYXksIHllYXIpKVxufVxuIiwiaW1wb3J0IHttYXNrfSBmcm9tIFwiLi9tYXNrLmpzXCI7XG5pbXBvcnQge3VubWFza051bWJlcn0gZnJvbSBcIi4vdW5tYXNrTnVtYmVyLmpzXCJcbmltcG9ydCB7Y3VycmVuY3l9IGZyb20gXCIuL2N1cnJlbmN5LmpzXCI7XG5pbXBvcnQge2dldERhdGVQYXR0ZXJuLCBtYXNrRGF0ZX0gZnJvbSBcIi4vZGF0ZS5qc1wiO1xuXG4vKipcbiAqIG1hc2tJbnB1dFxuICogQHBhcmFtIHtzdHJpbmd8SFRNTElucHV0RWxlbWVudH0gZWxlbWVudCBFbGVtZW50IFNlbGVjdG9yXG4gKiBAcGFyYW0ge3N0cmluZ3xzdHJpbmdbXX0gcGF0dGVybnMgZGVjaW1hbHxjdXJyZW5jeVxuICovXG5leHBvcnQgY29uc3QgaW5wdXQgPSAoZWxlbWVudCwgcGF0dGVybnMpID0+IHtcbiAgaWYgKCFBcnJheS5pc0FycmF5KHBhdHRlcm5zKSkgdGhyb3cgUmVmZXJlbmNlRXJyb3IoXCJQYXR0ZXJuIGlzIG5vdCBhcnJheVwiKVxuICBpZiAoIXBhdHRlcm5zKSB0aHJvdyBSZWZlcmVuY2VFcnJvcihcIk1pc3Npbmcgc2Vjb25kIHBhcmFtZXRlciBwYXR0ZXJuLlwiKVxuXG4gIGlmICh0eXBlb2YgZWxlbWVudCA9PT0gXCJzdHJpbmdcIikgZWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZWxlbWVudClcbiAgbGV0IFtwYXR0ZXJuLCBkeW5hbWljUGF0dGVybl0gPSBwYXR0ZXJuc1xuICBsZXQgbGlzdGVuZXJcblxuICBzd2l0Y2ggKHBhdHRlcm4pIHtcbiAgICBjYXNlIFwiY3VycmVuY3lcIjoge1xuICAgICAgbGlzdGVuZXIgPSAoKSA9PiBlbGVtZW50LnZhbHVlID0gY3VycmVuY3kodW5tYXNrTnVtYmVyKGVsZW1lbnQudmFsdWUsIHBhdHRlcm4pLCBwYXR0ZXJuKVxuICAgICAgYnJlYWtcbiAgICB9XG4gICAgY2FzZSBcImRhdGVcIjoge1xuICAgICAgY29uc3Qge21hc2ssIHBsYWNlaG9sZGVyfSA9IGdldERhdGVQYXR0ZXJuKClcbiAgICAgIGVsZW1lbnQucGxhY2Vob2xkZXIgPSBwbGFjZWhvbGRlclxuICAgICAgbGlzdGVuZXIgPSAoKSA9PiBlbGVtZW50LnZhbHVlID0gbWFza0RhdGUoZWxlbWVudC52YWx1ZSwgbWFzaylcbiAgICAgIGJyZWFrXG4gICAgfVxuICAgIGRlZmF1bHQ6IHtcbiAgICAgIHBhdHRlcm5zLnNvcnQoKGEsIGIpID0+IGEubGVuZ3RoIC0gYi5sZW5ndGgpXG4gICAgICBlbGVtZW50Lm1pbkxlbmd0aCA9IHBhdHRlcm4ubGVuZ3RoXG4gICAgICBlbGVtZW50Lm1heExlbmd0aCA9IGR5bmFtaWNQYXR0ZXJuPy5sZW5ndGggfHwgZWxlbWVudC5taW5MZW5ndGhcbiAgICAgIGVsZW1lbnQucGF0dGVybiA9IGAueyR7cGF0dGVybi5sZW5ndGh9LCR7ZHluYW1pY1BhdHRlcm4/Lmxlbmd0aCB8fCBwYXR0ZXJuLmxlbmd0aH19YFxuXG4gICAgICBsaXN0ZW5lciA9IGR5bmFtaWNQYXR0ZXJuXG4gICAgICAgID8gKCkgPT4gZWxlbWVudC52YWx1ZSA9IG1hc2soXG4gICAgICAgICAgZWxlbWVudC52YWx1ZSxcbiAgICAgICAgICBlbGVtZW50LnZhbHVlLmxlbmd0aCA8PSBlbGVtZW50Lm1pbkxlbmd0aCA/IHBhdHRlcm4gOiBkeW5hbWljUGF0dGVyblxuICAgICAgICApXG4gICAgICAgIDogKCkgPT4gZWxlbWVudC52YWx1ZSA9IG1hc2soZWxlbWVudC52YWx1ZSwgcGF0dGVybilcbiAgICB9XG4gIH1cbiAgZWxlbWVudC52YWx1ZSAmJiBsaXN0ZW5lcigpXG4gIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsIGxpc3RlbmVyKVxufVxuIiwiaW1wb3J0IHt0b2tlbnN9IGZyb20gXCIuL3Rva2Vucy5qc1wiXG5pbXBvcnQge3VubWFza30gZnJvbSBcIi4vdW5tYXNrLmpzXCI7XG5cbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlXG4gKiBAcGFyYW0ge3N0cmluZ30gcGF0dGVyblxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuZXhwb3J0IGNvbnN0IG1hc2sgPSAodmFsdWUsIHBhdHRlcm4pID0+IHtcbiAgaWYgKCF2YWx1ZSB8fCAhcGF0dGVybikgcmV0dXJuIFwiXCJcbiAgY29uc3Qgb3V0cHV0ID0gWy4uLnVubWFzayh2YWx1ZSwgcGF0dGVybildLCB1bm1hc2tlZCA9IFsuLi51bm1hc2socGF0dGVybildXG4gIGZvciAobGV0IGkgPSAwLCBsID0gcGF0dGVybi5sZW5ndGg7IGkgPCBsICYmIG91dHB1dFtpXTsgaSsrKVxuICAgICF0b2tlbnNbdW5tYXNrZWRbaV1dLnRlc3Qob3V0cHV0W2ldKVxuICAgICAgPyBvdXRwdXQuc3BsaWNlKGksIDEpXG4gICAgICA6IC9cXFcvLnRlc3QocGF0dGVybltpXSlcbiAgICAgID8gb3V0cHV0LnNwbGljZShpLCAwLCBwYXR0ZXJuW2ldKSAmJiB1bm1hc2tlZC5zcGxpY2UoaSwgMCwgcGF0dGVybltpXSlcbiAgICAgIDogb3V0cHV0LnNwbGljZShpLCAxLCB0b2tlbnNbdW5tYXNrZWRbaV1dLnRyYW5zZm9ybShvdXRwdXRbaV0pKVxuICByZXR1cm4gb3V0cHV0LmpvaW4oXCJcIilcbn1cbiIsIi8qKlxuICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfSB2YWx1ZVxuICogQHBhcmFtIHtzdHJpbmd9IFtzdHlsZV1cbiAqIEBwYXJhbSB7c3RyaW5nfSBbbG9jYWxlXVxuICogQHBhcmFtIHtvYmplY3R9IFtvcHRpb25zXVxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuZXhwb3J0IGNvbnN0IG51bWJlciA9IChcbiAgdmFsdWUsXG4gIHN0eWxlLFxuICB7Li4ub3B0aW9uc30gPSB7fSxcbiAgbG9jYWxlXG4pID0+IHtcbiAgb3B0aW9ucyA9IHsuLi5vcHRpb25zLCAuLi5nZXRPcHRpb25zKGxvY2FsZSB8fCBcInB0LUJSXCIpW3N0eWxlXX07XG4gIHJldHVybiBuZXcgSW50bC5OdW1iZXJGb3JtYXQobG9jYWxlLCBvcHRpb25zKS5mb3JtYXQodmFsdWUpXG59XG5cbi8qIFRvIGJlIHVwZGF0ZWQgYmFzZWQgb24gbmVlZCAtIEZyZW5jaCAtIENhbmFkYSBhbmQgVVMgbG9jYWxlIGhhbmRsZWQgICovXG5jb25zdCBjdXJyZW5jeVRvTG9jYWxlID0gbmV3IE1hcChbXG4gIFtcImVuLVVTXCIsIFwiVVNEXCJdLFxuICBbXCJwdC1CUlwiLCBcIkJSTFwiXSxcbiAgW1wiZnItQ0FcIiwgXCJDQURcIl1cbl0pXG5cbmNvbnN0IGdldE9wdGlvbnMgPSBsb2NhbGUgPT4gKHtcbiAgY3VycmVuY3k6IHtcbiAgICBzdHlsZTogXCJjdXJyZW5jeVwiLFxuICAgIGN1cnJlbmN5OiBjdXJyZW5jeVRvTG9jYWxlLmdldChsb2NhbGUpXG4gIH0sXG4gIGRlY2ltYWw6IHt9LFxuICBwZXJjZW50OiB7fVxufSlcbiIsImltcG9ydCB7aW5wdXR9IGZyb20gXCIuL2lucHV0LmpzXCI7XG5cbi8qKlxuICogTWFzayBhbGwgaW5wdXRzIHdoYXQgaGF2ZSBkYXRhLWluZGV4IGF0dHJpYnV0ZVxuICovXG5leHBvcnQgY29uc3QgcHJlcGFyZU1hc2tJbnB1dHMgPSAoKSA9PiB7XG4gIGNvbnN0IGRhdGFzZXRUb09iamVjdCA9IHZhbHVlID0+IEpTT04ucGFyc2UodmFsdWUucmVwbGFjZSgvJy9nLCBcIlxcXCJcIikpO1xuICBbLi4uZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIltkYXRhLW1hc2tdXCIpXVxuICAgIC5mb3JFYWNoKGVsID0+IGlucHV0KGVsLCBkYXRhc2V0VG9PYmplY3QoZWwuZGF0YXNldC5tYXNrKSkpXG59XG4iLCJleHBvcnQgY29uc3QgdG9rZW5zID0ge1xuICBkOiB7dGVzdDogdiA9PiAvXFxkLy50ZXN0KHYpLCB0cmFuc2Zvcm06IHYgPT4gdn0sXG4gIGE6IHt0ZXN0OiB2ID0+IC9bYS16XS9pLnRlc3QodiksIHRyYW5zZm9ybTogdiA9PiB2LnRvTG93ZXJDYXNlKCl9LFxuICBBOiB7dGVzdDogdiA9PiAvW2Etel0vaS50ZXN0KHYpLCB0cmFuc2Zvcm06IHYgPT4gdi50b1VwcGVyQ2FzZSgpfSxcbiAgdzoge3Rlc3Q6IHYgPT4gL1xcdy8udGVzdCh2KSwgdHJhbnNmb3JtOiB2ID0+IHYudG9Mb3dlckNhc2UoKX0sXG4gIFc6IHt0ZXN0OiB2ID0+IC9cXHcvLnRlc3QodiksIHRyYW5zZm9ybTogdiA9PiB2LnRvVXBwZXJDYXNlKCl9XG59XG4iLCIvKipcbiAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZVxuICogQHBhcmFtIHtzdHJpbmd9IFtwYXR0ZXJuPVwiXCJdXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5leHBvcnQgY29uc3QgdW5tYXNrID0gKHZhbHVlLCBwYXR0ZXJuKSA9PiB7XG4gIGlmICghdmFsdWUpIHJldHVybiB2YWx1ZVxuICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoL1xcVy9pZywgXCJcIilcbiAgcmV0dXJuIHBhdHRlcm4gPyB2YWx1ZS5zbGljZSgwLCBwYXR0ZXJuLnJlcGxhY2UoL1xcVy9pZywgXCJcIikubGVuZ3RoKSA6IHZhbHVlXG59XG4iLCIvKipcbiAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZVxuICogQHBhcmFtIHtzdHJpbmd9IFtwYXR0ZXJuPXVuZGVmaW5lZF1cbiAqIEByZXR1cm5zIHtzdHJpbmd8aW50fVxuICovXG5leHBvcnQgY29uc3QgdW5tYXNrTnVtYmVyID0gKHZhbHVlLCBwYXR0ZXJuKSA9PiB7XG4gIGxldCBvdXRwdXQgPSB2YWx1ZS5yZXBsYWNlKC9cXEQvZywgXCJcIilcbiAgaWYgKG91dHB1dCAmJiBcImN1cnJlbmN5XCIgPT09IHBhdHRlcm4pIG91dHB1dCA9IG91dHB1dCAvIDEwMFxuICByZXR1cm4gb3V0cHV0IHx8IDBcbn1cblxuLyoqXG4gKiBSZXZlcnNlIE51bWJlciBGb3JtYXRcbiAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZVxuICogQHBhcmFtIHtzdHJpbmd9IGxvY2FsZVxuICogQHJldHVybnMge251bWJlcn1cbiAqL1xuZXhwb3J0IGNvbnN0IHJldmVyc2VOdW1iZXJGb3JtYXQgPSAodmFsdWUsIGxvY2FsZSkgPT4ge1xuICBjb25zdCBwYXJ0cyA9IG5ldyBJbnRsLk51bWJlckZvcm1hdChsb2NhbGUpLmZvcm1hdFRvUGFydHMoMTExMS4xKVxuICByZXR1cm4gcmV2ZXJzZUZvcm1hdCh2YWx1ZSwgcGFydHMpXG59XG5cbi8qKlxuICogUmV2ZXJzZSBDdXJyZW5jeSBGb3JtYXRcbiAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZVxuICogQHBhcmFtIHtzdHJpbmd9IGxvY2FsZVxuICogQHBhcmFtIHtzdHJpbmd9IGN1cnJlbmN5XG4gKiBAcmV0dXJucyB7bnVtYmVyfVxuICovXG5leHBvcnQgY29uc3QgcmV2ZXJzZUN1cnJlbmN5Rm9ybWF0ID0gKHZhbHVlLCBsb2NhbGUsIGN1cnJlbmN5KSA9PiB7XG4gIGNvbnN0IHBhcnRzID0gbmV3IEludGwuTnVtYmVyRm9ybWF0KGxvY2FsZSwge3N0eWxlOiBcImN1cnJlbmN5XCIsIGN1cnJlbmN5fSkuZm9ybWF0VG9QYXJ0cygxMTExLjEpXG4gIGNvbnN0IHN5bWJvbCA9IHBhcnRzLmZpbmQocGFydCA9PiBwYXJ0LnR5cGUgPT09ICdjdXJyZW5jeScpLnZhbHVlXG4gIGNvbnN0IHJldmVyc2VkVmFsID0gdmFsdWUucmVwbGFjZShzeW1ib2wsICcnKVxuICByZXR1cm4gcmV2ZXJzZUZvcm1hdChyZXZlcnNlZFZhbCwgcGFydHMpXG59XG5cbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlXG4gKiBAcGFyYW0ge2FycmF5fSBwYXJ0c1xuICogQHJldHVybnMge251bWJlcnxudW1iZXJ9XG4gKi9cbmNvbnN0IHJldmVyc2VGb3JtYXQgPSAodmFsdWUsIHBhcnRzKSA9PiB7XG4gIGNvbnN0IGdyb3VwID0gcGFydHMuZmluZChwYXJ0ID0+IHBhcnQudHlwZSA9PT0gJ2dyb3VwJykudmFsdWVcbiAgY29uc3QgZGVjaW1hbCA9IHBhcnRzLmZpbmQocGFydCA9PiBwYXJ0LnR5cGUgPT09ICdkZWNpbWFsJykudmFsdWVcbiAgbGV0IHJldmVyc2VkVmFsID0gdmFsdWVcbiAgICAucmVwbGFjZUFsbChncm91cCwgJycpXG4gICAgLnJlcGxhY2UoZGVjaW1hbCwgJy4nKVxuICByZXR1cm4gTnVtYmVyLmlzTmFOKHJldmVyc2VkVmFsKVxuICAgID8gTmFOXG4gICAgOiArcmV2ZXJzZWRWYWxcbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHttYXNrfSBmcm9tIFwiLi9tYXNrLmpzXCJcbmltcG9ydCB7dW5tYXNrfSBmcm9tIFwiLi91bm1hc2suanNcIlxuaW1wb3J0IHtpbnB1dH0gZnJvbSBcIi4vaW5wdXQuanNcIlxuaW1wb3J0IHtwcmVwYXJlTWFza0lucHV0c30gZnJvbSBcIi4vcHJlcGFyZU1hc2tJbnB1dHMuanNcIlxuaW1wb3J0IHt1bm1hc2tOdW1iZXIsIHJldmVyc2VOdW1iZXJGb3JtYXQsIHJldmVyc2VDdXJyZW5jeUZvcm1hdH0gZnJvbSBcIi4vdW5tYXNrTnVtYmVyLmpzXCJcbmltcG9ydCB7ZGF0ZX0gZnJvbSBcIi4vZGF0ZS5qc1wiXG5pbXBvcnQge251bWJlcn0gZnJvbSBcIi4vbnVtYmVyLmpzXCJcbmltcG9ydCB7Y3VycmVuY3l9IGZyb20gXCIuL2N1cnJlbmN5LmpzXCJcblxuZXhwb3J0IGRlZmF1bHQge1xuICBtYXNrLCB1bm1hc2ssIGlucHV0LCBwcmVwYXJlTWFza0lucHV0cywgbnVtYmVyLCBjdXJyZW5jeSwgZGF0ZSxcbiAgdW5tYXNrTnVtYmVyLCByZXZlcnNlTnVtYmVyRm9ybWF0LCByZXZlcnNlQ3VycmVuY3lGb3JtYXRcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=