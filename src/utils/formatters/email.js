/**
 * Validates if a string is a correctly formatted email address
 * @param {string}
 * @returns {boolean}
 */
export const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}
