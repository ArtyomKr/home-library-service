import { genSalt, hash } from 'bcrypt';

const saltSize = +(process.env.CRYPT_SALT ?? '10');

export async function generateHash(str: string) {
  const salt = await genSalt(saltSize);
  return hash(str, salt);
}
