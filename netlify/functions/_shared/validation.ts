export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validateRegisterInput(body: any): { valid: boolean; error?: string } {
  if (!body.name || typeof body.name !== 'string' || body.name.trim().length < 2) {
    return { valid: false, error: 'Name must be at least 2 characters' };
  }
  if (!body.email || typeof body.email !== 'string' || !isValidEmail(body.email)) {
    return { valid: false, error: 'Valid email address is required' };
  }
  if (!body.password || typeof body.password !== 'string' || body.password.length < 6) {
    return { valid: false, error: 'Password must be at least 6 characters' };
  }
  return { valid: true };
}

export function validateLoginInput(body: any): { valid: boolean; error?: string } {
  if (!body.email || typeof body.email !== 'string' || !isValidEmail(body.email)) {
    return { valid: false, error: 'Valid email address is required' };
  }
  if (!body.password || typeof body.password !== 'string') {
    return { valid: false, error: 'Password is required' };
  }
  return { valid: true };
}
