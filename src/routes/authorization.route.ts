import { NextFunction, Request, Response, Router } from "express";
import ForbiddenError from "../models/errors/forbidden.error.model";

const authorizationRoute = Router();

authorizationRoute.post("/token", (req: Request, res: Response, next: NextFunction)=>{

    try {
        const autorizationHeader = req.headers['authorization'];
    
        if(!autorizationHeader){
            throw new ForbiddenError("Credenciais não informadas");
        }

        const [authenticationType, token] = autorizationHeader.split(' ');

        if (authenticationType !== 'Basic' || !token){
            throw new ForbiddenError("Tipo de authenticação inválido");
        }

        
    } catch (error) {
        next(error);
    }
});

export default authorizationRoute;