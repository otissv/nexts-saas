export function truncate(n: number, str: string) {
  // Use regex to match the first N characters or whole words
  const regex = new RegExp(`^([\\s\\S]{0,${n}}\\b)`)
  const match = str.match(regex)

  if (match && match[1]) {
    return match[1]
  } else {
    return "" // If the string is empty or shorter than N characters, return an empty string
  }
}
