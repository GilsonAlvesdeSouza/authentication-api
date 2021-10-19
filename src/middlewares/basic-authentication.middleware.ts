import { NextFunction, Request, Response } from "express";
import ForbiddenError from "../models/errors/forbidden.error.model";
import useRepository from "../repositories/useRepository";

async function basicAuthenticationMiddleware(req:Request, res:Response, next:NextFunction){
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

        if (!username || !password) {
            throw new ForbiddenError("Credenciais não preenchidas");
        }

        const user = await useRepository.findByUsernameAndPassword(username, password);

        /* informações sobre o token
        "iss" o dominio  da aplicação geradora de token
        "sub" é o assunto do token, mas é muito utilizado para guardar o id do usuário 
        "aud" define quem pode usar o token 
        "exp" data para expiração do token 
        "nbf" define uma data para qual o token não pode ser aceito antes dela
        "iat" data de criação do token
        "jti" o id do token
        */

        if (!user) {
            throw new ForbiddenError("Usuário ou senha inválidos");
        }

        req.user = user;
        return next();
        
    } catch (error) {
        return next(error);
    }
}

export default basicAuthenticationMiddleware;