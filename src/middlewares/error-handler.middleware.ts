import {Request, Response, NextFunction} from "express";
import DatabaseError from "../repositories/errors/database.error.model";
import {StatusCodes} from "http-status-codes";

function errorHandler(error: any, req: Request, res: Response, next: NextFunction){
    if(error instanceof DatabaseError){
        res.sendStatus(StatusCodes.BAD_REQUEST);
    }
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
}

export default errorHandler;
