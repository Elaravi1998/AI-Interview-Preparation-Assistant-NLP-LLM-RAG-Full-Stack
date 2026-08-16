import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-super-secret-jwt-key-change-in-production';
const JWT_EXPIRE = (process.env.JWT_EXPIRE_MINUTES || '1440') + 'm';

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function generateToken(payload: { userId: string; email: string; name: string }): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });
}

export function verifyToken(token: string): { userId: string; email: string; name: string } | null {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: string; email: string; name: string };
  } catch (error) {
    return null;
  }
}

export function extractUserFromHeader(headers: Record<string, string | undefined>): { userId: string; email: string; name: string } | null {
  const authHeader = headers.authorization || headers.Authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.split(' ')[1];
  return verifyToken(token);
}
