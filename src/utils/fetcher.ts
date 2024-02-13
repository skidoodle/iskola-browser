/* Fetcher function for SWR hook with gzip support
 * @param url - url to fetch
 * @returns response in JSON
 */
export const fetcher = (url: string) =>
  fetch(url, {
    headers: {
      'Accept-Encoding': 'gzip, deflate, br',
    },
  }).then((res) => res.json())
