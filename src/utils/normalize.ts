export const removeAccents = (str: string) => {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/ /g, '_') // Replace spaces with underscores
    .replace(/[()]/g, '') // Remove parentheses
}
