export function validateEmail(email: string) {
  // RFC 5321 compliant email regex
  const emailRegex =
    /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$/;

  if (!email) {
    return false;
  }

  // Проверка общей длины email (RFC 5321: максимум 320 символов)
  if (email.length > 320) {
    return false;
  }

  const [localPart, domainPart] = email.split("@");

  // Проверка наличия @ и корректности разделения
  if (!localPart || !domainPart) {
    return false;
  }

  // Проверка длины локальной части (RFC 5321: максимум 64 символа)
  if (localPart.length > 64) {
    return false;
  } 

  // Проверка длины доменной части (RFC 5321: максимум 253 символа)
  if (domainPart.length > 253) {
    return false;
  }

  if (!emailRegex.test(email)) {
    return false;
  }

  return true;
}
