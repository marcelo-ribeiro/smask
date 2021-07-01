/**
 * Get Mask Date Intl
 * @returns {object}
 */
export const dateMask = () => {
  const parts = new Intl.DateTimeFormat().formatToParts(new Date("1-1-1990"));
  let mask = "", placeholder = ""
  parts.forEach(part => {
    if (part.type === "month") (mask += "dd") && (placeholder += "mm")
    else if (part.type === "day") (mask += "dd") && (placeholder += "dd")
    else if (part.type === "year") (mask += "dddd") && (placeholder += "yyyy")
    else if (part.type === "literal") (mask += part.value) && (placeholder += part.value)
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
console.log(date("11/12/1983"))
