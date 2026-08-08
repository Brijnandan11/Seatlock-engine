import { Router } from "express"
import { catchAsync } from "../middlewares/catchAsync"
import { authenticate } from "../middlewares/auth.middleware"
import { requireRole } from "../middlewares/rbac.middleware"
import { createShowSchema } from "../schemas/show.schema"
import { createShow, getShowById } from "../services/show.service"

export const showRouter = Router()

showRouter.post('/shows', authenticate, requireRole('admin'), catchAsync(async(req, res)=>{
    const input = createShowSchema.parse(req.body)

    const show = await createShow(input)
    
    res.status(201).json({ show })
}))

showRouter.get('/shows/:id', catchAsync( async(req, res)=>{
    const show = await getShowById(req.params.id as string)
    res.status(200).json({show})
}))