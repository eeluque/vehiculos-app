/**
 * Formato de placa: alfanumérico, entre 5 y 10 caracteres.
 * Ajusta el regex según las reglas que necesites (ej. solo letras y números).
 */
const PLACA_REGEX = /^[A-Za-z0-9\u00C0-\u024F\- ]{5,10}$/;

export function isValidPlaca(placa: string): boolean {
  return PLACA_REGEX.test(placa.trim());
}

export const placaErrorMsg =
  "La placa debe tener entre 5 y 10 caracteres alfanuméricos.";
