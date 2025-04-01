/**
 * Normalizes a phone number string into the format (xxx) xxx-xxxx
 * and appends an extension if present.
 *
 * @param phone - The input phone number string.
 * @returns The normalized phone number.
 */
export const normalizePhoneNumber = (phone: string): string => {
  if (!phone) return ""

  // Trim the input to remove extra whitespace.
  phone = phone.trim()

  // Look for an extension (common markers: "ext", "x", or "extension")
  const extRegex = /(?:ext\.?|x|extension)\s*(\d+)/i
  const extMatch = phone.match(extRegex)
  let extension = ""
  if (extMatch) {
    extension = extMatch[1]
    // Remove the extension part from the main phone string.
    phone = phone.replace(extRegex, "")
  }

  // Remove all non-digit characters from the remaining phone string.
  const digits = phone.replace(/\D/g, "")

  // Make sure we have at least 10 digits for a standard US phone number.
  if (digits.length < 10) {
    return phone // Alternatively, you could return an error message or throw an error.
  }

  // Extract parts of the phone number.
  const areaCode = digits.substring(0, 3)
  const firstPart = digits.substring(3, 6)
  const secondPart = digits.substring(6, 10)

  let normalized = `(${areaCode}) ${firstPart}-${secondPart}`

  // Append the extension if one was found.
  if (extension) {
    normalized += ` ext ${extension}`
  }

  return normalized
}
