import { Handler } from '@netlify/functions';
import { getCollection } from './_shared/mongodb';
import { hashPassword, generateToken } from './_shared/auth';
import { validateRegisterInput } from './_shared/validation';
import { buildResponse, handleOptions } from './_shared/response';

export const handler: Handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') return handleOptions();
  if (event.httpMethod !== 'POST') {
    return buildResponse(405, { success: false, error: 'Method Not Allowed' });
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const validation = validateRegisterInput(body);
    if (!validation.valid) {
      return buildResponse(400, { success: false, error: validation.error });
    }

    const usersCol = await getCollection('users');
    const existing = await usersCol.findOne({ email: body.email.toLowerCase() });
    if (existing) {
      return buildResponse(400, { success: false, error: 'User with this email already exists' });
    }

    const passwordHash = await hashPassword(body.password);
    const newUser = {
      name: body.name.trim(),
      email: body.email.toLowerCase().trim(),
      passwordHash,
      createdAt: new Date().toISOString()
    };

    const res = await usersCol.insertOne(newUser);
    const userId = res.insertedId.toString();

    const token = generateToken({ userId, email: newUser.email, name: newUser.name });

    return buildResponse(201, {
      success: true,
      message: 'User registered successfully',
      data: {
        token,
        user: { id: userId, email: newUser.email, name: newUser.name }
      }
    });
  } catch (err: any) {
    console.error("Register Error:", err);
    return buildResponse(500, { success: false, error: err.message || 'Registration failed' });
  }
};
