type NameHolder = {
  first_name: string;
  last_name: string;
  middle_name?: string | null;
  [key: string]: unknown;
}
export function getFullName(nameHolder: NameHolder): string {
  let result = `${nameHolder.last_name} ${nameHolder.first_name}`
  if (nameHolder.middle_name) {
    result += ' ' + nameHolder.middle_name
  }
  return result;
}