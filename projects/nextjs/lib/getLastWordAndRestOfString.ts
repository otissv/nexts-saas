export function getLastWordAndRestOfString(str: string) {
  // Use regex to match the last word and the rest of the string
  const regex = /(.+)\s(\w+)$/
  const match = str.match(regex)

  if (match && match.length === 3) {
    const restOfString = match[1]
    const lastWord = match[2]
    return [restOfString, lastWord]
  } else {
    // If no match found, return the entire string as the last word
    return [str, '']
  }
}
