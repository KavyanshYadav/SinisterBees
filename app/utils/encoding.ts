import crypto from 'crypto';
import bcrypt from 'bcryptjs';

const SALT_ROUNDS = 10;

export function generateOTP(email: string): string {
  const timestamp = Math.floor(Date.now() / 1000 / 60);
  const data = `${email}:${timestamp}`;
  return crypto
    .createHmac('sha256', process.env.SECRET_KEY)
    .update(data)
    .digest('hex')
    .substring(0, 6);
}

export function generateMagicLink(email: string): string {
  const timestamp = Math.floor(Date.now() / 1000 / 60);
  const token = crypto
    .createHmac('sha256', process.env.SECRET_KEY)
    .update(`${email}:${timestamp}`)
    .digest('hex');
  return `${process.env.APP_URL}/magic-login?email=${encodeURIComponent(email)}&token=${token}`;
}

export function verifyOTP(email: string, providedOtp: string): boolean {
  const expectedOtp = generateOTP(email);
  return expectedOtp === providedOtp;
}

export function verifyMagicLink(email: string, token: string): boolean {
  const expectedToken = crypto
    .createHmac('sha256', process.env.SECRET_KEY)
    .update(`${email}:${Math.floor(Date.now() / 1000 / 60)}`)
    .digest('hex');
  return expectedToken === token;
}

export const hashPassword = async (
  password: string,
): Promise<{ hashedPassword: string; salt: string }> => {
  try {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(password, salt);

    return { hashedPassword, salt };
  } catch (error) {
    throw new Error('Error hashing password: ' + error.message);
  }
};

export const comparePassword = async (
  plainPassword: string,
  hashedPassword: string,
): Promise<boolean> => {
  try {
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
    return isMatch;
  } catch (error) {
    throw new Error('Error comparing passwords: ' + error.message);
  }
};
