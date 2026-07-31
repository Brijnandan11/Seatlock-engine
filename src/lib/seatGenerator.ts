export interface SeatBlueprint{
    rowLabel: string,
    seatNumber: number
}

export function generateSeatLayout( totalRows: number, seatsPerRow: number): SeatBlueprint[]{
    if( totalRows <= 0 || seatsPerRow <= 0){
        throw new Error('Total rows and seatPerRow must be positive')
    }

    if(totalRows > 26){
        throw new Error('totalRows cannot exceed 26 with single-letter row labels')
    }

    const seats: SeatBlueprint[] = []

    for(let rowIndex = 0; rowIndex < totalRows; rowIndex++){
        const rowLabel = String.fromCharCode(65 + rowIndex)

        for(let seatNumber = 1; seatNumber<= seatsPerRow; seatNumber++){
            seats.push({rowLabel, seatNumber})
        }

    }
    return seats
}