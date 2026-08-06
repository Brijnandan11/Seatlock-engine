import { Router } from "express"
import { authenticate } from "../middlewares/auth.middleware"
import { requireRole } from "../middlewares/rbac.middleware"
import { catchAsync } from "../middlewares/catchAsync"
import { createVenueSchema } from "../schemas/venue.schema"
import { createVenue, getVenueById, listVenues } from "../services/venue.service"

export const venueRouter = Router()

venueRouter.post('/venues', authenticate, requireRole('admin'), catchAsync( async(req, res)=>{
      const input  = createVenueSchema.parse(req.body)
      const venue = await createVenue(input)

      res.status(201).json({ venue })
}))

