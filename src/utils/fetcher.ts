export const fetcher = (url: string) =>
  fetch(url, {
    headers: {
      'Accept-Encoding': 'gzip, deflate, br',
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json())
