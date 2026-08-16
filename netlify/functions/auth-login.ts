import { Handler } from '@netlify/functions';
import { getCollection } from './_shared/mongodb';
import { comparePassword, generateToken } from './_shared/auth';
import { validateLoginInput } from './_shared/validation';
import { buildResponse, handleOptions } from './_shared/response';

export const handler: Handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') return handleOptions();
  if (event.httpMethod !== 'POST') {
    return buildResponse(405, { success: false, error: 'Method Not Allowed' });
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const validation = validateLoginInput(body);
    if (!validation.valid) {
      return buildResponse(400, { success: false, error: validation.error });
    }

    const usersCol = await getCollection('users');
    const user = await usersCol.findOne({ email: body.email.toLowerCase() });
    if (!user) {
      return buildResponse(401, { success: false, error: 'Invalid email or password' });
    }

    const match = await comparePassword(body.password, user.passwordHash || '');
    if (!match) {
      return buildResponse(401, { success: false, error: 'Invalid email or password' });
    }

    const userId = user._id ? user._id.toString() : 'usr-' + Date.now();
    const token = generateToken({ userId, email: user.email, name: user.name });

    return buildResponse(200, {
      success: true,
      message: 'Login successful',
      data: {
        token,
        user: { id: userId, email: user.email, name: user.name }
      }
    });
  } catch (err: any) {
    console.error("Login Error:", err);
    return buildResponse(500, { success: false, error: err.message || 'Login failed' });
  }
};
