import { Request, Response } from "express"

const getHealth = (req: Request, res: Response) =>{
       
    res.status(200).json({
        success: true,
        message: "Seatlock api is running"
    })

}

export { getHealth } 