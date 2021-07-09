import {mask} from "./mask.js"

const getComputedDate = (value) => {
  const initialDate = "01/01/1970".replace(/\D/g, "")
  value = value.replace(/\D/g, "")
  return value + initialDate.slice(value.length)
}

export const maskDate = (value, pattern) => {
  const computedDate = getComputedDate(value)
  const dateMasked = mask(computedDate, pattern)
  const dateObject = date(dateMasked)
  return mask(isNaN(dateObject.valueOf()) ? value.slice(0, -1) : value, pattern)
}

/**
 * Get Mask Date Intl
 * @returns {object}
 */
export const getDatePattern = () => {
  const parts = new Intl.DateTimeFormat().formatToParts(new Date("1-1-1970"))
  let mask = "", placeholder = ""
  parts.forEach(({type, value}) => {
    new Map([
      ["month", () => (mask += "dd") && (placeholder += "__")],
      ["day", () => (mask += "dd") && (placeholder += "__")],
      ["year", () => (mask += "dddd") && (placeholder += "____")],
      ["literal", () => (mask += value) && (placeholder += value)]
    ]).get(type)()
  })
  return {mask, placeholder}
}

/**
 * @param {string} value
 * @param {string} [locale=undefined]
 * @returns {Date}
 */
export const date = (value, locale = undefined) => {
  const parts = new Intl.DateTimeFormat().formatToParts(),
    valueArray = value.split("/"),
    {month, day, year} = {
      [parts[0].type]: valueArray[0],
      [parts[2].type]: valueArray[1],
      [parts[4].type]: valueArray[2]
    },
    dateFormat = `${month}/${day}/${year}`
  return new Date(dateFormat)
}
