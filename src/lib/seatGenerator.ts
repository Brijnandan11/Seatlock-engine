export interface SeatBlueprint{
    rowLebel: string,
    seatNumber: number
}

export function generateSeatLayout( totalRows: number, seatPerRow: number): SeatBlueprint[]{
    if( totalRows <= 0 || seatPerRow <= 0){
        throw new Error('Total rows and seatPerRow must be positive')
    }

    if(totalRows > 26){
        throw new Error('totalRows cannot exceed 26 with single-letter row labels')
    }

    const seats: SeatBlueprint[] = []

    for(let rowIndex = 0; rowIndex < totalRows; rowIndex++){
        const rowLebel = String.fromCharCode(65 + rowIndex)

        for(let seatNumber = 1; seatNumber<= seatPerRow; seatNumber++){
            seats.push({rowLebel, seatNumber})
        }

    }
    return seats
}