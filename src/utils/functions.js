/**
 * Return the week day letter from a numeric day of month
 * @param { String } mday Numeric day of the month (start from 1)
 * @return { Promise }
 */
export function getWeekDay(mday) {
  return ['D', 'L', 'M', 'M', 'J', 'V', 'S'][mday % 7]
}

/**
 * Return day of month from an english date
 * @param { String } date English date (YYYY-MM-DD)
 * @return { String } Numeric day of month
 */
export function getMonthDay(date) {
  return parseInt(date.split('-')[2])
}

/**
 * Formats numbers by adding commas
 * @param { Number } n Number to format
 * @return { String } Formated number
 */
export function formatNumber(n) {
  let str = n.toString()

  return str.lenght < 4
    ? str
    : Array.from(str)
        .reverse()
        .reduce((acc, c, i) => {
          if (i % 3 === 0 && i > 0) acc.push(',')
          acc.push(c)
          return acc
        }, [])
        .reverse()
}
