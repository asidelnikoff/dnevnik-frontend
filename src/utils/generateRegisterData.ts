function generateRandomString (
  length = 8,
  characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~!@-#$'
) {
  return Array.from(crypto.getRandomValues(new Uint32Array(length)))
    .map((x) => characters[x % characters.length])
    .join('')
}

export function generateLogin(): string {
  return generateRandomString(8, '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz')
}
export function generatePassword(): string {
  return generateRandomString(8)
}