/**
 * Formats a string as a CPF (Brazilian ID)
 * @param {string}
 * @returns {string}
 */
export const formatCPFString = (value) => {
  if (!value) return '';

  const digits = value.replace(/\D/g, '').slice(0, 11);

  let formatted = digits;
  if (digits.length > 3) formatted = formatted.replace(/(\d{3})(\d)/, '$1.$2');
  if (digits.length > 6) formatted = formatted.replace(/(\d{3})\.(\d{3})(\d)/, '$1.$2.$3');
  if (digits.length > 9) formatted = formatted.replace(/(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4');

  return formatted;
};

