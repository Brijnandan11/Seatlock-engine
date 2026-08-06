import { insertVenue, findVenueById, findAllVenues } from "../repositories/venue.repository"
import { createVenueInput } from "../schemas/venue.schema"
import { NotFoundError } from "../errors"

export async function createVenue(input: createVenueInput) {
    return insertVenue(input)
}

export async function getVenueById(id: string) {
    const venue = await findVenueById(id)

    if(!venue){
        throw new NotFoundError('Venue not found')
    }

    return venue
}

export async function listVenues(){
    return findAllVenues()
}

