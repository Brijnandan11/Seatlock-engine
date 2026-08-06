import { insertEvent, findEventById } from '../repositories/event.repository';
import { getVenueById } from './venue.service';
import { CreateEventInput } from '../schemas/event.schema';
import { NotFoundError } from '../errors';

export async function createEvent(input: CreateEventInput) {

  await getVenueById(input.venueId);

  return insertEvent(input);
}

export async function getEventById(id: string) {
  const event = await findEventById(id);
  if (!event) {
    throw new NotFoundError('Event not found');
  }
  return event;
}