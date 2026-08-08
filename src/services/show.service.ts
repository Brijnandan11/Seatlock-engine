import { insertShow, findShowById } from "../repositories/show.repository" 
import { getEventById } from "./event.service"
import { NotFoundError } from "../errors"
import { createShowInput } from "../schemas/show.schema"

export async function createShow(input: createShowInput) {
      await getEventById(input.eventId)

      return insertShow({
        eventId: input.eventId,
        startsAt: new Date(input.startsAt),
        status: input.status
      })
}

export async function getShowById(id: string) {
    const show = await findShowById(id)

    if(!show){
        throw new NotFoundError("Show Not Found")
    }
    return show
}