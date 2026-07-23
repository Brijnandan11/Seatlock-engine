import { Request, Response } from 'express'

import { catchAsync } from '../utils/catchAsync'
import { sendSuccess } from '../utils/response'

export const getHealth = catchAsync(
    async (
        req: Request,
        res: Response,
    ) => {

        return sendSuccess(
            res,
            200,
            'SeatLock API is running',
        )

    },
)