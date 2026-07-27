import { findUserByEmail, createUser } from '../repositories/user.repository';
import { hashPassword, verifyPassword } from '../lib/password';
import { ConflictError, UnauthorizedError } from '../errors';
import { RegisterInput, LoginInput } from '../schemas/auth.schema';
import { logger } from '../lib/logger';

export async function registerUser(input: RegisterInput) {
  const existing = await findUserByEmail(input.email);
  if (existing) {
    throw new ConflictError('Email already registered');
  }

  const passwordHash = await hashPassword(input.password);

  try {
    const user = await createUser({ email: input.email, passwordHash });
    return { id: user.id, email: user.email, role: user.role };
  } catch (err) {
    if (err instanceof Error && err.message === 'DUPLICATE_EMAIL') {
      throw new ConflictError('Email already registered');
    }
    logger.error({ err }, 'User creation failed');
    throw err;
  }
}

export async function loginUser(input: LoginInput) {
  const user = await findUserByEmail(input.email);
  if (!user) {
    throw new UnauthorizedError('Invalid credentials');
  }

  const valid = await verifyPassword(user.passwordHash, input.password);
  if (!valid) {
    throw new UnauthorizedError('Invalid credentials');
  }

  return user;
}