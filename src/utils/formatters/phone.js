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

export const isValidPhone = (phone) => {
  if (!phone) return false;

  const digits = phone.replace(/\D/g, '');
  if (digits.length === 10) {
    const thirdDigit = parseInt(digits.substring(2, 3));
    return thirdDigit >= 2 && thirdDigit <= 5;
  } else if (digits.length === 11) {
    const thirdDigit = parseInt(digits.substring(2, 3));
    return thirdDigit >= 6 && thirdDigit <= 9;
  }

  return false;
};
