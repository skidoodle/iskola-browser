export const removeAccents = (str: string) => {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ /g, '_')
    .replace(/[()]/g, '_')
    .replace(/\//g, '_')
}
