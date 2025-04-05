type NameHolder = {
  name: string;
  lastName: string;
  middleName?: string | null;
  [key: string]: unknown;
}
export function getFullName(nameHolder: NameHolder): string {
  let result = `${nameHolder.lastName} ${nameHolder.name}`
  if (nameHolder.middleName) {
    result += ' ' + nameHolder.middleName
  }
  return result;
}