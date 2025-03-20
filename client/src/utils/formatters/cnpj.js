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


/**
 * Validates if a string is a valid CNPJ
 * @param {string}
 * @returns {boolean}
 *
*/

export const isValidCNPJ = (cnpj) => {
  if (!cnpj) return false;

  const cleanCNPJ = cnpj.replace(/[^\d]/g, '');

  if (cleanCNPJ.length !== 14) return false;
  if (/^(\d)\1+$/.test(cleanCNPJ)) return false;


  let sum = 0;
  let weight = 5;

  for (let i = 0; i < 12; i++) {
    sum += parseInt(cleanCNPJ.charAt(i)) * weight;
    weight = weight === 2 ? 9 : weight - 1;
  }

  let digit = 11 - (sum % 11);
  digit = digit >= 10 ? 0 : digit;
  if (parseInt(cleanCNPJ.charAt(12)) !== digit) return false;


  sum = 0;
  weight = 6;
  for (let i = 0; i < 13; i++) {
    sum += parseInt(cleanCNPJ.charAt(i)) * weight;
    weight = weight === 2 ? 9 : weight - 1;
  }

  digit = 11 - (sum % 11);
  digit = digit >= 10 ? 0 : digit;

  return parseInt(cleanCNPJ.charAt(13)) === digit;
};
