// Get Mask Date Intl
export const getDateMask = () => {
  const parts = new Intl.DateTimeFormat().formatToParts(new Date("1-1-1990"));
  console.log({parts})
  let mask = "", placeholder = ""
  parts.forEach(part => {
    if (part.type === "month") (mask += "dd") && (placeholder += "mm")
    else if (part.type === "day") (mask += "dd") && (placeholder += "dd")
    else if (part.type === "year") (mask += "dddd") && (placeholder += "yyyy")
    else if (part.type === "literal") (mask += part.value) && (placeholder += part.value)
  })
  console.log({mask, placeholder})
  return mask
}

/**
 * @param {string} value
 * @returns {Date|undefined}
 */
export const reverseDateFormat = (value) => {
  if (!value) return
  const parts = new Intl.DateTimeFormat().formatToParts(),
    valueArray = value.split("/"),
    dateArray = ["", "-", "", "-", ""]
  parts.forEach(({type}) => {
    if ("month" === type) dateArray.splice(0, 1, valueArray[1])
    else if ("day" === type) dateArray.splice(2, 1, valueArray[0])
    else if ("year" === type) dateArray.splice(4, 1, valueArray[2])
  })
  return new Date(dateArray.join(""))
}
reverseDateFormat("11/12/1983")
