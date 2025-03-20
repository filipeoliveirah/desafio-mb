/**
 * Formats a string as a CNPJ
 * @param {string}
 * @returns {string}
 */
export const formatCNPJ = (value) => {
  if (!value) return '';

  const digits = value.replace(/\D/g, '').slice(0, 14)
  let formatted = digits
  if (digits.length > 2) formatted = formatted.replace(/(\d{2})(\d)/, '$1.$2')
  if (digits.length > 5) formatted = formatted.replace(/(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
  if (digits.length > 8) formatted = formatted.replace(/(\d{2})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3/$4')
  if (digits.length > 12) formatted = formatted.replace(/(\d{2})\.(\d{3})\.(\d{3})\/(\d{4})(\d)/, '$1.$2.$3/$4-$5')

  return formatted;
};
