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


const dateParts = locale => new Intl.DateTimeFormat(locale).formatToParts()
console.log(dateParts());
const initialDate = "01/01/1970".replace(/\D/g, "")
const getMaskedDate = (value, pattern) => (0,_mask_js__WEBPACK_IMPORTED_MODULE_0__.mask)(value, pattern)
const getComputedDate = value => {
  value = value.replace(/\D/g, "")
  return value + initialDate.slice(value.length)
}

/**
 * Get Date Masked
 * @param {string} value
 * @param {string} pattern
 * @param {string} [locale=undefined]
 * @returns {string}
 */
const maskDate = (value, pattern, locale = undefined) => {
  const dateObject = date(
    getMaskedDate(
      getComputedDate(value),
      pattern
    ),
    locale
  )
  return (0,_mask_js__WEBPACK_IMPORTED_MODULE_0__.mask)(
    isNaN(dateObject.valueOf())
      ? value.slice(0, -1)
      : value,
    pattern
  )
}

/**
 * Get Date Pattern
 * @param {string} [locale=undefined]
 * @returns {object}
 */
const getDatePattern = (locale = undefined) => {
  let pattern = ""
  dateParts(locale).forEach(({ type, value }) => {
    if (type === "month" || type === "day") pattern += "dd"
    else if (type === "year") pattern += "dddd"
    else if (type === "literal") pattern += value
  })
  return pattern
}

/**
 * @param {string} value
 * @param {string} [locale=undefined]
 * @returns {Date}
 */
const date = (value, locale = undefined) => {
  const valueArray = value.split("/")
  const { month, day, year } = {
    [dateParts(locale)[0].type]: valueArray[0],
    [dateParts(locale)[2].type]: valueArray[1],
    [dateParts(locale)[4].type]: valueArray[2]
  }
  const dateFormat = `${month}/${day}/${year}`
  return new Date(dateFormat)
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

  if (typeof element === "string")
    element = document.querySelector(element)
  let [pattern, dynamicPattern] = patterns
  let listener = () => { }

  // Disable input keyboard arrow and point click
  element.addEventListener("keydown", e => {
    [32, 37, 38, 39, 40].includes(e.keyCode) && e.preventDefault();
  });
  element.addEventListener("focus", () => element.setSelectionRange(-1, -1));
  element.addEventListener("click", () => element.setSelectionRange(-1, -1));

  // Initialize input listener by mask
  switch (pattern) {
    case "currency": {
      listener = () => element.value = (0,_currency_js__WEBPACK_IMPORTED_MODULE_2__.currency)((0,_unmaskNumber_js__WEBPACK_IMPORTED_MODULE_1__.unmaskNumber)(element.value, pattern), pattern)
      break
    }
    case "date": {
      const pattern = (0,_date_js__WEBPACK_IMPORTED_MODULE_3__.getDatePattern)()
      element.minLength = element.maxLength = pattern.length
      element.pattern = `.{${pattern.length},${pattern.length}}`
      listener = () => element.value = (0,_date_js__WEBPACK_IMPORTED_MODULE_3__.maskDate)(element.value, pattern)
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
  [...document.querySelectorAll("[data-mask]")]
    .forEach(el => (0,_input_js__WEBPACK_IMPORTED_MODULE_0__.input)(el, datasetToObject(el.dataset.mask)))
}

const datasetToObject = value => JSON.parse(value.replace(/'/g, "\""));


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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zbWFzay8uL3NyYy9jdXJyZW5jeS5qcyIsIndlYnBhY2s6Ly9zbWFzay8uL3NyYy9kYXRlLmpzIiwid2VicGFjazovL3NtYXNrLy4vc3JjL2lucHV0LmpzIiwid2VicGFjazovL3NtYXNrLy4vc3JjL21hc2suanMiLCJ3ZWJwYWNrOi8vc21hc2svLi9zcmMvbnVtYmVyLmpzIiwid2VicGFjazovL3NtYXNrLy4vc3JjL3ByZXBhcmVNYXNrSW5wdXRzLmpzIiwid2VicGFjazovL3NtYXNrLy4vc3JjL3Rva2Vucy5qcyIsIndlYnBhY2s6Ly9zbWFzay8uL3NyYy91bm1hc2suanMiLCJ3ZWJwYWNrOi8vc21hc2svLi9zcmMvdW5tYXNrTnVtYmVyLmpzIiwid2VicGFjazovL3NtYXNrL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3NtYXNrL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9zbWFzay93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3NtYXNrL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vc21hc2svLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBbUM7O0FBRW5DO0FBQ0EsV0FBVyxXQUFXO0FBQ3RCLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCLGFBQWE7QUFDYjtBQUNPO0FBQ1A7QUFDQTtBQUNBLEdBQUcsV0FBVyxLQUFLO0FBQ25CO0FBQ0E7QUFDQSxTQUFTLGtEQUFNO0FBQ2Y7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2hCZ0M7O0FBRWhDO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQyw4Q0FBSTtBQUM5QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcs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QUNsQixhQUFhO0FBQ2I7QUFDTztBQUNQLCtDQUErQyw0QkFBNEI7QUFDM0U7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxXQUFXLE9BQU87QUFDbEIsV0FBVyxNQUFNO0FBQ2pCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O1NDbERBO1NBQ0E7O1NBRUE7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7O1NBRUE7U0FDQTs7U0FFQTtTQUNBO1NBQ0E7Ozs7O1VDdEJBO1VBQ0E7VUFDQTtVQUNBO1VBQ0Esd0NBQXdDLHlDQUF5QztVQUNqRjtVQUNBO1VBQ0EsRTs7Ozs7VUNQQSx3Rjs7Ozs7VUNBQTtVQUNBO1VBQ0E7VUFDQSxzREFBc0Qsa0JBQWtCO1VBQ3hFO1VBQ0EsK0NBQStDLGNBQWM7VUFDN0QsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ044QjtBQUNJO0FBQ0Y7QUFDd0I7QUFDa0M7QUFDNUQ7QUFDSTtBQUNJOztBQUV0QyxpRUFBZTtBQUNmLE1BQU0sb0RBQVEsdURBQU8saUVBQW1CLDhFQUFRLDBEQUFVLDBEQUFNO0FBQ2hFLGNBQWMsaUZBQXFCLDBGQUF1QjtBQUMxRCxDQUFDIiwiZmlsZSI6InNtYXNrLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtudW1iZXJ9IGZyb20gXCIuL251bWJlci5qc1wiO1xuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfGludH0gdmFsdWVcbiAqIEBwYXJhbSB7c3RyaW5nfSBbc3R5bGU9XCJjdXJyZW5jeVwiXVxuICogQHBhcmFtIHtvYmplY3R9IFtvcHRpb25zXVxuICogQHBhcmFtIHtzdHJpbmd9IFtsb2NhbGVdXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5leHBvcnQgY29uc3QgY3VycmVuY3kgPSAoXG4gIHZhbHVlLFxuICBzdHlsZSA9IFwiY3VycmVuY3lcIixcbiAgey4uLm9wdGlvbnN9ID0ge30sXG4gIGxvY2FsZSxcbikgPT4ge1xuICByZXR1cm4gbnVtYmVyKHBhcnNlRmxvYXQodmFsdWUpLCBzdHlsZSwgb3B0aW9ucywgbG9jYWxlKVxufVxuIiwiaW1wb3J0IHsgbWFzayB9IGZyb20gXCIuL21hc2suanNcIlxuXG5jb25zdCBkYXRlUGFydHMgPSBsb2NhbGUgPT4gbmV3IEludGwuRGF0ZVRpbWVGb3JtYXQobG9jYWxlKS5mb3JtYXRUb1BhcnRzKClcbmNvbnNvbGUubG9nKGRhdGVQYXJ0cygpKTtcbmNvbnN0IGluaXRpYWxEYXRlID0gXCIwMS8wMS8xOTcwXCIucmVwbGFjZSgvXFxEL2csIFwiXCIpXG5jb25zdCBnZXRNYXNrZWREYXRlID0gKHZhbHVlLCBwYXR0ZXJuKSA9PiBtYXNrKHZhbHVlLCBwYXR0ZXJuKVxuY29uc3QgZ2V0Q29tcHV0ZWREYXRlID0gdmFsdWUgPT4ge1xuICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoL1xcRC9nLCBcIlwiKVxuICByZXR1cm4gdmFsdWUgKyBpbml0aWFsRGF0ZS5zbGljZSh2YWx1ZS5sZW5ndGgpXG59XG5cbi8qKlxuICogR2V0IERhdGUgTWFza2VkXG4gKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVcbiAqIEBwYXJhbSB7c3RyaW5nfSBwYXR0ZXJuXG4gKiBAcGFyYW0ge3N0cmluZ30gW2xvY2FsZT11bmRlZmluZWRdXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5leHBvcnQgY29uc3QgbWFza0RhdGUgPSAodmFsdWUsIHBhdHRlcm4sIGxvY2FsZSA9IHVuZGVmaW5lZCkgPT4ge1xuICBjb25zdCBkYXRlT2JqZWN0ID0gZGF0ZShcbiAgICBnZXRNYXNrZWREYXRlKFxuICAgICAgZ2V0Q29tcHV0ZWREYXRlKHZhbHVlKSxcbiAgICAgIHBhdHRlcm5cbiAgICApLFxuICAgIGxvY2FsZVxuICApXG4gIHJldHVybiBtYXNrKFxuICAgIGlzTmFOKGRhdGVPYmplY3QudmFsdWVPZigpKVxuICAgICAgPyB2YWx1ZS5zbGljZSgwLCAtMSlcbiAgICAgIDogdmFsdWUsXG4gICAgcGF0dGVyblxuICApXG59XG5cbi8qKlxuICogR2V0IERhdGUgUGF0dGVyblxuICogQHBhcmFtIHtzdHJpbmd9IFtsb2NhbGU9dW5kZWZpbmVkXVxuICogQHJldHVybnMge29iamVjdH1cbiAqL1xuZXhwb3J0IGNvbnN0IGdldERhdGVQYXR0ZXJuID0gKGxvY2FsZSA9IHVuZGVmaW5lZCkgPT4ge1xuICBsZXQgcGF0dGVybiA9IFwiXCJcbiAgZGF0ZVBhcnRzKGxvY2FsZSkuZm9yRWFjaCgoeyB0eXBlLCB2YWx1ZSB9KSA9PiB7XG4gICAgaWYgKHR5cGUgPT09IFwibW9udGhcIiB8fCB0eXBlID09PSBcImRheVwiKSBwYXR0ZXJuICs9IFwiZGRcIlxuICAgIGVsc2UgaWYgKHR5cGUgPT09IFwieWVhclwiKSBwYXR0ZXJuICs9IFwiZGRkZFwiXG4gICAgZWxzZSBpZiAodHlwZSA9PT0gXCJsaXRlcmFsXCIpIHBhdHRlcm4gKz0gdmFsdWVcbiAgfSlcbiAgcmV0dXJuIHBhdHRlcm5cbn1cblxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVcbiAqIEBwYXJhbSB7c3RyaW5nfSBbbG9jYWxlPXVuZGVmaW5lZF1cbiAqIEByZXR1cm5zIHtEYXRlfVxuICovXG5leHBvcnQgY29uc3QgZGF0ZSA9ICh2YWx1ZSwgbG9jYWxlID0gdW5kZWZpbmVkKSA9PiB7XG4gIGNvbnN0IHZhbHVlQXJyYXkgPSB2YWx1ZS5zcGxpdChcIi9cIilcbiAgY29uc3QgeyBtb250aCwgZGF5LCB5ZWFyIH0gPSB7XG4gICAgW2RhdGVQYXJ0cyhsb2NhbGUpWzBdLnR5cGVdOiB2YWx1ZUFycmF5WzBdLFxuICAgIFtkYXRlUGFydHMobG9jYWxlKVsyXS50eXBlXTogdmFsdWVBcnJheVsxXSxcbiAgICBbZGF0ZVBhcnRzKGxvY2FsZSlbNF0udHlwZV06IHZhbHVlQXJyYXlbMl1cbiAgfVxuICBjb25zdCBkYXRlRm9ybWF0ID0gYCR7bW9udGh9LyR7ZGF5fS8ke3llYXJ9YFxuICByZXR1cm4gbmV3IERhdGUoZGF0ZUZvcm1hdClcbn1cbiIsImltcG9ydCB7IG1hc2sgfSBmcm9tIFwiLi9tYXNrLmpzXCJcbmltcG9ydCB7IHVubWFza051bWJlciB9IGZyb20gXCIuL3VubWFza051bWJlci5qc1wiXG5pbXBvcnQgeyBjdXJyZW5jeSB9IGZyb20gXCIuL2N1cnJlbmN5LmpzXCJcbmltcG9ydCB7IGdldERhdGVQYXR0ZXJuLCBtYXNrRGF0ZSB9IGZyb20gXCIuL2RhdGUuanNcIlxuXG4vKipcbiAqIG1hc2tJbnB1dFxuICogQHBhcmFtIHtzdHJpbmd8SFRNTElucHV0RWxlbWVudH0gZWxlbWVudCBFbGVtZW50IFNlbGVjdG9yXG4gKiBAcGFyYW0ge3N0cmluZ3xzdHJpbmdbXX0gcGF0dGVybnMgZGVjaW1hbHxjdXJyZW5jeVxuICovXG5leHBvcnQgY29uc3QgaW5wdXQgPSAoZWxlbWVudCwgcGF0dGVybnMpID0+IHtcbiAgaWYgKCFBcnJheS5pc0FycmF5KHBhdHRlcm5zKSkgdGhyb3cgUmVmZXJlbmNlRXJyb3IoXCJQYXR0ZXJuIGlzIG5vdCBhcnJheVwiKVxuICBpZiAoIXBhdHRlcm5zKSB0aHJvdyBSZWZlcmVuY2VFcnJvcihcIk1pc3Npbmcgc2Vjb25kIHBhcmFtZXRlciBwYXR0ZXJuLlwiKVxuXG4gIGlmICh0eXBlb2YgZWxlbWVudCA9PT0gXCJzdHJpbmdcIilcbiAgICBlbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihlbGVtZW50KVxuICBsZXQgW3BhdHRlcm4sIGR5bmFtaWNQYXR0ZXJuXSA9IHBhdHRlcm5zXG4gIGxldCBsaXN0ZW5lciA9ICgpID0+IHsgfVxuXG4gIC8vIERpc2FibGUgaW5wdXQga2V5Ym9hcmQgYXJyb3cgYW5kIHBvaW50IGNsaWNrXG4gIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgZSA9PiB7XG4gICAgWzMyLCAzNywgMzgsIDM5LCA0MF0uaW5jbHVkZXMoZS5rZXlDb2RlKSAmJiBlLnByZXZlbnREZWZhdWx0KCk7XG4gIH0pO1xuICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJmb2N1c1wiLCAoKSA9PiBlbGVtZW50LnNldFNlbGVjdGlvblJhbmdlKC0xLCAtMSkpO1xuICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiBlbGVtZW50LnNldFNlbGVjdGlvblJhbmdlKC0xLCAtMSkpO1xuXG4gIC8vIEluaXRpYWxpemUgaW5wdXQgbGlzdGVuZXIgYnkgbWFza1xuICBzd2l0Y2ggKHBhdHRlcm4pIHtcbiAgICBjYXNlIFwiY3VycmVuY3lcIjoge1xuICAgICAgbGlzdGVuZXIgPSAoKSA9PiBlbGVtZW50LnZhbHVlID0gY3VycmVuY3kodW5tYXNrTnVtYmVyKGVsZW1lbnQudmFsdWUsIHBhdHRlcm4pLCBwYXR0ZXJuKVxuICAgICAgYnJlYWtcbiAgICB9XG4gICAgY2FzZSBcImRhdGVcIjoge1xuICAgICAgY29uc3QgcGF0dGVybiA9IGdldERhdGVQYXR0ZXJuKClcbiAgICAgIGVsZW1lbnQubWluTGVuZ3RoID0gZWxlbWVudC5tYXhMZW5ndGggPSBwYXR0ZXJuLmxlbmd0aFxuICAgICAgZWxlbWVudC5wYXR0ZXJuID0gYC57JHtwYXR0ZXJuLmxlbmd0aH0sJHtwYXR0ZXJuLmxlbmd0aH19YFxuICAgICAgbGlzdGVuZXIgPSAoKSA9PiBlbGVtZW50LnZhbHVlID0gbWFza0RhdGUoZWxlbWVudC52YWx1ZSwgcGF0dGVybilcbiAgICAgIGJyZWFrXG4gICAgfVxuICAgIGRlZmF1bHQ6IHtcbiAgICAgIHBhdHRlcm5zLnNvcnQoKGEsIGIpID0+IGEubGVuZ3RoIC0gYi5sZW5ndGgpXG4gICAgICBlbGVtZW50Lm1pbkxlbmd0aCA9IHBhdHRlcm4ubGVuZ3RoXG4gICAgICBlbGVtZW50Lm1heExlbmd0aCA9IGR5bmFtaWNQYXR0ZXJuPy5sZW5ndGggfHwgZWxlbWVudC5taW5MZW5ndGhcbiAgICAgIGVsZW1lbnQucGF0dGVybiA9IGAueyR7cGF0dGVybi5sZW5ndGh9LCR7ZHluYW1pY1BhdHRlcm4/Lmxlbmd0aCB8fCBwYXR0ZXJuLmxlbmd0aH19YFxuICAgICAgbGlzdGVuZXIgPSBkeW5hbWljUGF0dGVyblxuICAgICAgICA/ICgpID0+IGVsZW1lbnQudmFsdWUgPSBtYXNrKFxuICAgICAgICAgIGVsZW1lbnQudmFsdWUsXG4gICAgICAgICAgZWxlbWVudC52YWx1ZS5sZW5ndGggPD0gZWxlbWVudC5taW5MZW5ndGggPyBwYXR0ZXJuIDogZHluYW1pY1BhdHRlcm5cbiAgICAgICAgKVxuICAgICAgICA6ICgpID0+IGVsZW1lbnQudmFsdWUgPSBtYXNrKGVsZW1lbnQudmFsdWUsIHBhdHRlcm4pXG4gICAgfVxuICB9XG4gIGVsZW1lbnQudmFsdWUgJiYgbGlzdGVuZXIoKVxuICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCBsaXN0ZW5lcilcbn1cbiIsImltcG9ydCB7dG9rZW5zfSBmcm9tIFwiLi90b2tlbnMuanNcIlxuaW1wb3J0IHt1bm1hc2t9IGZyb20gXCIuL3VubWFzay5qc1wiO1xuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZVxuICogQHBhcmFtIHtzdHJpbmd9IHBhdHRlcm5cbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBjb25zdCBtYXNrID0gKHZhbHVlLCBwYXR0ZXJuKSA9PiB7XG4gIGlmICghdmFsdWUgfHwgIXBhdHRlcm4pIHJldHVybiBcIlwiXG4gIGNvbnN0IG91dHB1dCA9IFsuLi51bm1hc2sodmFsdWUsIHBhdHRlcm4pXSwgdW5tYXNrZWQgPSBbLi4udW5tYXNrKHBhdHRlcm4pXVxuICBmb3IgKGxldCBpID0gMCwgbCA9IHBhdHRlcm4ubGVuZ3RoOyBpIDwgbCAmJiBvdXRwdXRbaV07IGkrKylcbiAgICAhdG9rZW5zW3VubWFza2VkW2ldXS50ZXN0KG91dHB1dFtpXSlcbiAgICAgID8gb3V0cHV0LnNwbGljZShpLCAxKVxuICAgICAgOiAvXFxXLy50ZXN0KHBhdHRlcm5baV0pXG4gICAgICA/IG91dHB1dC5zcGxpY2UoaSwgMCwgcGF0dGVybltpXSkgJiYgdW5tYXNrZWQuc3BsaWNlKGksIDAsIHBhdHRlcm5baV0pXG4gICAgICA6IG91dHB1dC5zcGxpY2UoaSwgMSwgdG9rZW5zW3VubWFza2VkW2ldXS50cmFuc2Zvcm0ob3V0cHV0W2ldKSlcbiAgcmV0dXJuIG91dHB1dC5qb2luKFwiXCIpXG59XG4iLCIvKipcbiAqIEBwYXJhbSB7bnVtYmVyfHN0cmluZ30gdmFsdWVcbiAqIEBwYXJhbSB7c3RyaW5nfSBbc3R5bGVdXG4gKiBAcGFyYW0ge3N0cmluZ30gW2xvY2FsZV1cbiAqIEBwYXJhbSB7b2JqZWN0fSBbb3B0aW9uc11cbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBjb25zdCBudW1iZXIgPSAoXG4gIHZhbHVlLFxuICBzdHlsZSxcbiAgey4uLm9wdGlvbnN9ID0ge30sXG4gIGxvY2FsZVxuKSA9PiB7XG4gIG9wdGlvbnMgPSB7Li4ub3B0aW9ucywgLi4uZ2V0T3B0aW9ucyhsb2NhbGUgfHwgXCJwdC1CUlwiKVtzdHlsZV19O1xuICByZXR1cm4gbmV3IEludGwuTnVtYmVyRm9ybWF0KGxvY2FsZSwgb3B0aW9ucykuZm9ybWF0KHZhbHVlKVxufVxuXG4vKiBUbyBiZSB1cGRhdGVkIGJhc2VkIG9uIG5lZWQgLSBGcmVuY2ggLSBDYW5hZGEgYW5kIFVTIGxvY2FsZSBoYW5kbGVkICAqL1xuY29uc3QgY3VycmVuY3lUb0xvY2FsZSA9IG5ldyBNYXAoW1xuICBbXCJlbi1VU1wiLCBcIlVTRFwiXSxcbiAgW1wicHQtQlJcIiwgXCJCUkxcIl0sXG4gIFtcImZyLUNBXCIsIFwiQ0FEXCJdXG5dKVxuXG5jb25zdCBnZXRPcHRpb25zID0gbG9jYWxlID0+ICh7XG4gIGN1cnJlbmN5OiB7XG4gICAgc3R5bGU6IFwiY3VycmVuY3lcIixcbiAgICBjdXJyZW5jeTogY3VycmVuY3lUb0xvY2FsZS5nZXQobG9jYWxlKVxuICB9LFxuICBkZWNpbWFsOiB7fSxcbiAgcGVyY2VudDoge31cbn0pXG4iLCJpbXBvcnQge2lucHV0fSBmcm9tIFwiLi9pbnB1dC5qc1wiO1xuXG4vKipcbiAqIE1hc2sgYWxsIGlucHV0cyB3aGF0IGhhdmUgZGF0YS1pbmRleCBhdHRyaWJ1dGVcbiAqL1xuZXhwb3J0IGNvbnN0IHByZXBhcmVNYXNrSW5wdXRzID0gKCkgPT4ge1xuICBbLi4uZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIltkYXRhLW1hc2tdXCIpXVxuICAgIC5mb3JFYWNoKGVsID0+IGlucHV0KGVsLCBkYXRhc2V0VG9PYmplY3QoZWwuZGF0YXNldC5tYXNrKSkpXG59XG5cbmNvbnN0IGRhdGFzZXRUb09iamVjdCA9IHZhbHVlID0+IEpTT04ucGFyc2UodmFsdWUucmVwbGFjZSgvJy9nLCBcIlxcXCJcIikpO1xuIiwiZXhwb3J0IGNvbnN0IHRva2VucyA9IHtcbiAgZDoge3Rlc3Q6IHYgPT4gL1xcZC8udGVzdCh2KSwgdHJhbnNmb3JtOiB2ID0+IHZ9LFxuICBhOiB7dGVzdDogdiA9PiAvW2Etel0vaS50ZXN0KHYpLCB0cmFuc2Zvcm06IHYgPT4gdi50b0xvd2VyQ2FzZSgpfSxcbiAgQToge3Rlc3Q6IHYgPT4gL1thLXpdL2kudGVzdCh2KSwgdHJhbnNmb3JtOiB2ID0+IHYudG9VcHBlckNhc2UoKX0sXG4gIHc6IHt0ZXN0OiB2ID0+IC9cXHcvLnRlc3QodiksIHRyYW5zZm9ybTogdiA9PiB2LnRvTG93ZXJDYXNlKCl9LFxuICBXOiB7dGVzdDogdiA9PiAvXFx3Ly50ZXN0KHYpLCB0cmFuc2Zvcm06IHYgPT4gdi50b1VwcGVyQ2FzZSgpfVxufVxuIiwiLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVcbiAqIEBwYXJhbSB7c3RyaW5nfSBbcGF0dGVybj1cIlwiXVxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuZXhwb3J0IGNvbnN0IHVubWFzayA9ICh2YWx1ZSwgcGF0dGVybikgPT4ge1xuICBpZiAoIXZhbHVlKSByZXR1cm4gdmFsdWVcbiAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKC9cXFcvaWcsIFwiXCIpXG4gIHJldHVybiBwYXR0ZXJuID8gdmFsdWUuc2xpY2UoMCwgcGF0dGVybi5yZXBsYWNlKC9cXFcvaWcsIFwiXCIpLmxlbmd0aCkgOiB2YWx1ZVxufVxuIiwiLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVcbiAqIEBwYXJhbSB7c3RyaW5nfSBbcGF0dGVybj11bmRlZmluZWRdXG4gKiBAcmV0dXJucyB7c3RyaW5nfGludH1cbiAqL1xuZXhwb3J0IGNvbnN0IHVubWFza051bWJlciA9ICh2YWx1ZSwgcGF0dGVybikgPT4ge1xuICBsZXQgb3V0cHV0ID0gdmFsdWUucmVwbGFjZSgvXFxEL2csIFwiXCIpXG4gIGlmIChvdXRwdXQgJiYgXCJjdXJyZW5jeVwiID09PSBwYXR0ZXJuKSBvdXRwdXQgPSBvdXRwdXQgLyAxMDBcbiAgcmV0dXJuIG91dHB1dCB8fCAwXG59XG5cbi8qKlxuICogUmV2ZXJzZSBOdW1iZXIgRm9ybWF0XG4gKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVcbiAqIEBwYXJhbSB7c3RyaW5nfSBsb2NhbGVcbiAqIEByZXR1cm5zIHtudW1iZXJ9XG4gKi9cbmV4cG9ydCBjb25zdCByZXZlcnNlTnVtYmVyRm9ybWF0ID0gKHZhbHVlLCBsb2NhbGUpID0+IHtcbiAgY29uc3QgcGFydHMgPSBuZXcgSW50bC5OdW1iZXJGb3JtYXQobG9jYWxlKS5mb3JtYXRUb1BhcnRzKDExMTEuMSlcbiAgcmV0dXJuIHJldmVyc2VGb3JtYXQodmFsdWUsIHBhcnRzKVxufVxuXG4vKipcbiAqIFJldmVyc2UgQ3VycmVuY3kgRm9ybWF0XG4gKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVcbiAqIEBwYXJhbSB7c3RyaW5nfSBsb2NhbGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBjdXJyZW5jeVxuICogQHJldHVybnMge251bWJlcn1cbiAqL1xuZXhwb3J0IGNvbnN0IHJldmVyc2VDdXJyZW5jeUZvcm1hdCA9ICh2YWx1ZSwgbG9jYWxlLCBjdXJyZW5jeSkgPT4ge1xuICBjb25zdCBwYXJ0cyA9IG5ldyBJbnRsLk51bWJlckZvcm1hdChsb2NhbGUsIHtzdHlsZTogXCJjdXJyZW5jeVwiLCBjdXJyZW5jeX0pLmZvcm1hdFRvUGFydHMoMTExMS4xKVxuICBjb25zdCBzeW1ib2wgPSBwYXJ0cy5maW5kKHBhcnQgPT4gcGFydC50eXBlID09PSAnY3VycmVuY3knKS52YWx1ZVxuICBjb25zdCByZXZlcnNlZFZhbCA9IHZhbHVlLnJlcGxhY2Uoc3ltYm9sLCAnJylcbiAgcmV0dXJuIHJldmVyc2VGb3JtYXQocmV2ZXJzZWRWYWwsIHBhcnRzKVxufVxuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZVxuICogQHBhcmFtIHthcnJheX0gcGFydHNcbiAqIEByZXR1cm5zIHtudW1iZXJ8bnVtYmVyfVxuICovXG5jb25zdCByZXZlcnNlRm9ybWF0ID0gKHZhbHVlLCBwYXJ0cykgPT4ge1xuICBjb25zdCBncm91cCA9IHBhcnRzLmZpbmQocGFydCA9PiBwYXJ0LnR5cGUgPT09ICdncm91cCcpLnZhbHVlXG4gIGNvbnN0IGRlY2ltYWwgPSBwYXJ0cy5maW5kKHBhcnQgPT4gcGFydC50eXBlID09PSAnZGVjaW1hbCcpLnZhbHVlXG4gIGxldCByZXZlcnNlZFZhbCA9IHZhbHVlXG4gICAgLnJlcGxhY2VBbGwoZ3JvdXAsICcnKVxuICAgIC5yZXBsYWNlKGRlY2ltYWwsICcuJylcbiAgcmV0dXJuIE51bWJlci5pc05hTihyZXZlcnNlZFZhbClcbiAgICA/IE5hTlxuICAgIDogK3JldmVyc2VkVmFsXG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7bWFza30gZnJvbSBcIi4vbWFzay5qc1wiXG5pbXBvcnQge3VubWFza30gZnJvbSBcIi4vdW5tYXNrLmpzXCJcbmltcG9ydCB7aW5wdXR9IGZyb20gXCIuL2lucHV0LmpzXCJcbmltcG9ydCB7cHJlcGFyZU1hc2tJbnB1dHN9IGZyb20gXCIuL3ByZXBhcmVNYXNrSW5wdXRzLmpzXCJcbmltcG9ydCB7dW5tYXNrTnVtYmVyLCByZXZlcnNlTnVtYmVyRm9ybWF0LCByZXZlcnNlQ3VycmVuY3lGb3JtYXR9IGZyb20gXCIuL3VubWFza051bWJlci5qc1wiXG5pbXBvcnQge2RhdGV9IGZyb20gXCIuL2RhdGUuanNcIlxuaW1wb3J0IHtudW1iZXJ9IGZyb20gXCIuL251bWJlci5qc1wiXG5pbXBvcnQge2N1cnJlbmN5fSBmcm9tIFwiLi9jdXJyZW5jeS5qc1wiXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbWFzaywgdW5tYXNrLCBpbnB1dCwgcHJlcGFyZU1hc2tJbnB1dHMsIG51bWJlciwgY3VycmVuY3ksIGRhdGUsXG4gIHVubWFza051bWJlciwgcmV2ZXJzZU51bWJlckZvcm1hdCwgcmV2ZXJzZUN1cnJlbmN5Rm9ybWF0XG59XG4iXSwic291cmNlUm9vdCI6IiJ9