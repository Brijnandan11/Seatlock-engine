export class AppError extends Error{
    public readonly code: string
    public readonly httpStatus: number
    public readonly isOperational: boolean
    public readonly details?: unknown

    constructor(
        code: string,
        message: string,
        httpStatus: number,
        isOperational: true,
        details?: unknown
    ){
        super(message)
        this.code = code
        this.httpStatus = httpStatus
        this.isOperational = isOperational
        this.details = details

        Error.captureStackTrace(this, this.constructor)
    }
}