export function findNestedObj(
  entireObj: any,
  keyToFind: number | string,
  valToFind: number | string | null | undefined,
): any {
  let foundObj
  JSON.stringify(entireObj, (_, nestedValue) => {
    if (nestedValue && nestedValue[keyToFind] === valToFind) {
      foundObj = nestedValue
    }
    return nestedValue
  })
  return foundObj
}
