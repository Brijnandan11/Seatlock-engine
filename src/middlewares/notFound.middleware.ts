import { Request, Response } from "express"
import { success } from "zod"

const notFoundMiddleware = (req: Request, res: Response)=> {

    res.status(404).json({
        success: false,
        message: "Route not found"
    })
}

export { notFoundMiddleware }