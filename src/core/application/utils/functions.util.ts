import * as bcrypt from 'bcryptjs';

export const normalizeDatetimeFunction = (value: Date): string => {
  const dateString = value.toISOString();
  const uppercasedDateString = dateString.toUpperCase();
  const dateStringWithoutSuffix = uppercasedDateString.slice(0, -1);
  const date = new Date(dateStringWithoutSuffix);
  const formattedDate = date.toLocaleString('es-CO', {
    timeZone: 'America/Bogota',
    hourCycle: 'h23',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
  return formattedDate.replace(/, /g, ' ');
};

export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
};

export const comparePasswords = (
  plainTextPassword: string,
  hashedPassword: string,
): Promise<boolean> => {
  return bcrypt.compare(plainTextPassword, hashedPassword);
};
