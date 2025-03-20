/**
 * Format a phone number to Brazilian format (xx) xxxxx-xxxx
 * @param {string}
 * @returns {string}
 */
export const formatPhone = (value) => {
  if (!value) return ''
  const digits = value.replace(/\D/g, '').slice(0, 11)

  if (digits.length === 0) return ''

  return digits.replace(/(\d{0,2})(\d{0,5})(\d{0,4})/, '($1) $2-$3').trim()
}
