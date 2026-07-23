import {
    NextFunction,
    Request,
    RequestHandler,
    Response,
} from 'express'

export function catchAsync(
    controller: RequestHandler,
): RequestHandler {
    return (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        Promise.resolve(
            controller(req, res, next),
        ).catch(next)
    }
}