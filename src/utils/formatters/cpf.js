/**
 * Formats a string as a CPF
 * @param {string}
 * @returns {string}
 */
export const formatCPF = (value) => {
  if (!value) return '';

  const digits = value.replace(/\D/g, '').slice(0, 11);

  let formatted = digits;
  if (digits.length > 3) formatted = formatted.replace(/(\d{3})(\d)/, '$1.$2');
  if (digits.length > 6) formatted = formatted.replace(/(\d{3})\.(\d{3})(\d)/, '$1.$2.$3');
  if (digits.length > 9) formatted = formatted.replace(/(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4');

  return formatted;
};


/**
 * Validates if a CPF is correctly formatted
 * @param {string}
 * @returns {boolean}
 */
export const isValidCPF = (cpf) => {
  if (!cpf) return false;

  const digits = cpf.replace(/\D/g, '');
  if (digits.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(digits)) return false;

  return true;
};
