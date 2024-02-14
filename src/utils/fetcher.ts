export const fetcher = (url: string) =>
  fetch(url, {
    headers: {
      'Accept-Encoding': 'gzip, deflate, br',
    },
  }).then((res) => res.json())
