export const truncate = (str: string | undefined, n: number) =>
  str && str.length > n ? str.slice(0, n - 1) + '...' : str ?? ''
