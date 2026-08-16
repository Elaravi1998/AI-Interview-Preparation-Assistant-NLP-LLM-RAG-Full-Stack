import { Handler } from '@netlify/functions';
import { extractUserFromHeader } from './_shared/auth';
import { buildResponse, handleOptions } from './_shared/response';

export const handler: Handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') return handleOptions();
  if (event.httpMethod !== 'GET') {
    return buildResponse(405, { success: false, error: 'Method Not Allowed' });
  }

  const decoded = extractUserFromHeader(event.headers);
  if (!decoded) {
    return buildResponse(401, { success: false, error: 'Unauthorized or token expired' });
  }

  return buildResponse(200, {
    success: true,
    data: {
      user: {
        id: decoded.userId,
        email: decoded.email,
        name: decoded.name
      }
    }
  });
};
