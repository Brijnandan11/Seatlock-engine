import { AppError } from "./AppError"

export { AppError }

export class NotFoundError extends AppError{
    constructor(message = "Resource not found ", details?: unknown){
        super("NOT_FOUND", message, 404, true, details)
    }
}

export class ValidationError extends AppError{
    constructor(message = "Validation failed", details?: unknown){
        super("VALIDATION_ERROR", message, 400, true, details)
    }
}

export class ConflictError extends AppError{
    constructor(message = "Resource conflict", details?: unknown){
        super("CONFLICT", message, 409, true, details)
    }
}

export class UnauthorizedError extends AppError{
    constructor(message = "Unauthorized", details?: unknown){
        super("UNAUTHORIZED", message, 401, true, details)
    }
}

export class ForbiddenError extends AppError{
    constructor(message = "Forbidden", details?: unknown){
        super("FORBIDDEN", message, 403, true, details)
    }
}

export class RateLimitError extends AppError {
  constructor(message = 'Too many requests', details?: unknown) {
    super('RATE_LIMIT', message, 429, true, details)
  }
}

export class LockAcquisitionError extends AppError {
  constructor(message = 'Could not acquire lock', details?: unknown) {
    super('LOCK_ACQUISITION_FAILED', message, 409, true, details)
  }
}

export class PaymentError extends AppError {
  constructor(message = 'Payment failed', details?: unknown) {
    super('PAYMENT_ERROR', message, 402, true, details)
  }
}

export class IdempotencyConflictError extends AppError {
  constructor(message = 'Idempotency key conflict', details?: unknown) {
    super('IDEMPOTENCY_CONFLICT', message, 409, true, details)
  }
}

export class TokenExpiredError extends AppError {
  constructor(message = 'Token expired', details?: unknown) {
    super('TOKEN_EXPIRED', message, 401, true, details)
  }
}

export class InvalidTokenError extends AppError {
  constructor(message = 'Invalid token', details?: unknown) {
    super('INVALID_TOKEN', message, 401, true, details)
  }
}