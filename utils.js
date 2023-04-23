export function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function toCamelCase(str) {
  return str.replace(/[-_]+([a-z])/g, (match, letter) => letter.toUpperCase());
}

export const log = console.log