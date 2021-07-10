import {mask} from "./mask.js"

const maskDateMap = {
  getComputedDate: (value, initialDate = "01/01/1970".replace(/\D/g, "")) => {
    value = value.replace(/\D/g, "")
    return value + initialDate.slice(value.length)
  },
  getMaskedDate: (value, pattern) => mask(value, pattern)
}

/**
 * Get Date Masked
 * @param {string} value
 * @param {string} pattern
 * @returns {string}
 */
export const maskDate = (value, pattern) => {
  const dateObject = date(
    maskDateMap.getMaskedDate(
      maskDateMap.getComputedDate(value),
      pattern
    )
  )
  return mask(isNaN(dateObject.valueOf()) ? value.slice(0, -1) : value, pattern)
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
export const getDatePattern = () => {
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
export const date = (value, locale = undefined) => {
  dateMap.valueArray = value.split("/")
  const {month, day, year} = {
      [dateMap.parts[0].type]: dateMap.valueArray[0],
      [dateMap.parts[2].type]: dateMap.valueArray[1],
      [dateMap.parts[4].type]: dateMap.valueArray[2]
    }
  return new Date(dateMap.dateFormat(month, day, year))
}
