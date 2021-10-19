import { NextFunction, Request, Response, Router } from "express";
import ForbiddenError from "../models/errors/forbidden.error.model";
import JWT from 'jsonwebtoken';
import { StatusCodes } from "http-status-codes";
import basicAuthenticationMiddleware from "../middlewares/basic-authentication.middleware";

const authorizationRoute = Router();

authorizationRoute.post("/token", basicAuthenticationMiddleware, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user;

        if(!user){
            throw new ForbiddenError("Usuário não informado");
        }

        const jwtPayload = { username: user.username };
        const secretkey = 'my_secret_key)';
        const jwtOptinos = { subject: user?.id };

        const jwt = JWT.sign(jwtPayload, secretkey, jwtOptinos);

        res.status(StatusCodes.OK).json({ token: jwt });

    } catch (error) {
        next(error);
    }
});

export default authorizationRoute;