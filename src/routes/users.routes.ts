import { Router, Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import jwtAuthenticationMiddleware from "../middlewares/jwt-authentication.middleware";
import useRepository from "../repositories/useRepository";

const usersRoute = Router();

usersRoute.get("/users", async (req: Request, res: Response, next: NextFunction) => {
    const users = await useRepository.findAllUsers();
    res.status(StatusCodes.OK).send({ users });
});

usersRoute.get("/users/:id", async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const user = await useRepository.findById(id);
        res.status(StatusCodes.OK).send({ user });
    } catch (error) {
        next(error)
    }
});

usersRoute.post("/users", async (req: Request, res: Response, next: NextFunction) => {
    const newUser = req.body;
    const user = await useRepository.merge(newUser);
    res.status(StatusCodes.OK).send({ user });
});

usersRoute.put("/users/:id", async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    const newUser = req.body;
    const user = await useRepository.merge(newUser);
    res.status(StatusCodes.OK).send({ user });
});

usersRoute.delete("/users/:id", async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    const { id } = req.params;
    await useRepository.remove(id);
    res.status(StatusCodes.OK).send({ msg: 'Usuário removido' });
});

export default usersRoute;

