import { db } from '../lib/db';
import { generateSeatLayout } from '../lib/seatGenerator';
import { insertSection, insertSeatsBulk } from '../repositories/section.repository';
import { CreateSectionInput } from '../schemas/section.schema';
import { logger } from '../lib/logger';

export async function createSectionWithSeats(input: CreateSectionInput) {
  return db.transaction(async (tx) => {
    const section = await insertSection(
      {
        showId: input.showId,
        name: input.name,
        priceInCents: input.priceInCents,
        totalRows: input.totalRows,
        seatsPerRow: input.seatsPerRow,
      },
      tx as unknown as typeof db
    );

    const blueprint = generateSeatLayout(input.totalRows, input.seatsPerRow);

    const seatRows = blueprint.map((seat) => ({
      sectionId: section.id,
      rowLabel: seat.rowLabel,
      seatNumber: seat.seatNumber,
    }));

    const createdSeats = await insertSeatsBulk(seatRows, tx as unknown as typeof db);

    logger.info(
      { sectionId: section.id, seatCount: createdSeats.length },
      'Section created with seats'
    );

    return { section, seatCount: createdSeats.length };
  });
}