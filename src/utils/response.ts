import { Response } from 'express'

interface SuccessResponse<T> {
  success: true
  message: string
  data?: T
}

interface ErrorResponse {
  success: false
  message: string
  errors?: unknown
}

export function sendSuccess<T>(res: Response, statusCode: number, message: string, data?: T) {
  const response: SuccessResponse<T> = {
    success: true,
    message,
    ...(data !== undefined && { data }),
  }

  return res.status(statusCode).json(response)
}

export function sendError<T>(res: Response, statusCode: number, message: string, errors?: unknown) {
  const response: ErrorResponse = {
    success: false,
    message,
    errors,
  }

  return res.status(statusCode).json(response)
}
