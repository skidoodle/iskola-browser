/* Truncate string function for card title to prevent overflow issues on long names and cities in cards on smaller screens and devices (mobile)
 * @param str - string to truncate
 * @param n - number of characters to truncate
 * @returns truncated string
 */

export const truncate = (str: string, n: number) =>
  str.length > n ? str.slice(0, n - 1) + '...' : str
