import { Request, Response } from 'express'
import { sendSuccess } from '../utils/response'

const getHealth = (req: Request, res: Response) => {
  return sendSuccess(res, 200, 'Seatlock api is working')
}

export { getHealth }
