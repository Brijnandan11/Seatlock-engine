import rateLimit from "express-rate-limit"
import { RateLimitError } from "../errors"

export const authRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res, next) => {
        next(new RateLimitError("Too many attempts, try again later"))
    }
})