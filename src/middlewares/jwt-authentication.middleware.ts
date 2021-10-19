import { NextFunction, Request, Response } from "express";
import JWT from "jsonwebtoken";
import ForbiddenError from "../models/errors/forbidden.error.model";

async function jwtAuthenticationMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const authorization = req.headers['authorization'];

        if (!authorization) {
            throw new ForbiddenError("Credenciais não informadas");
        }

        const [authenticationType, token] = authorization.split(' ');

        if (authenticationType !== 'Bearer' || !token) {
            throw new ForbiddenError("Tipo de authenticação inválido");
        }
        
        
        try {
            const tokenPayload = JWT.verify(token, 'my_secret_key');

            if (typeof tokenPayload !== 'object' || !tokenPayload.sub) {
                throw new ForbiddenError("Token inválido");
            }

            const user = {
                id: tokenPayload.sub,
                username: tokenPayload.username
            };
            req.user = user;
            next();
        } catch (error) {
            throw new ForbiddenError("Token inválido");
        }

    } catch (error) {
        next(error);
    }
}

export default jwtAuthenticationMiddleware;