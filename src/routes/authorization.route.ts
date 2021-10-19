import { NextFunction, Request, Response, Router } from "express";
import ForbiddenError from "../models/errors/forbidden.error.model";
import useRepository from "../repositories/useRepository";

const authorizationRoute = Router();

authorizationRoute.post("/token", async(req: Request, res: Response, next: NextFunction) => {

    try {
        const autorizationHeader = req.headers['authorization'];

        if (!autorizationHeader) {
            throw new ForbiddenError("Credenciais não informadas");
        }

        const [authenticationType, token] = autorizationHeader.split(' ');

        if (authenticationType !== 'Basic' || !token) {
            throw new ForbiddenError("Tipo de authenticação inválido");
        }

        const tokenContent = Buffer.from(token, 'base64').toString('utf-8');

        const [username, password] = tokenContent.split(":");

        if(!username || !password){
            throw new ForbiddenError("Credenciais não preenchidas");
        }
        
        const user = await useRepository.findByUsernameAndPassword(username, password);
    } catch (error) {
        next(error);
    }
});

export default authorizationRoute;