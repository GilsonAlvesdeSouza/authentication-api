import {Router, Request, Response, NextFunction} from "express";
import {StatusCodes} from "http-status-codes";
import useRepository from "../repositories/useRepository";

const usersRoute = Router();

usersRoute.get("/users", async (req: Request, res: Response, next: NextFunction) => {
    const users = await useRepository.findAllUsers();
    res.status(StatusCodes.OK).send({users});
});

usersRoute.get("/users/:id", (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    const {id} = req.params;
    res.status(StatusCodes.OK).send({id});
});

usersRoute.post("/users", async (req: Request, res: Response, next: NextFunction) => {
    const newUser = req.body;
    const id = await useRepository.create(newUser);
    res.status(StatusCodes.OK).send({id});
});

usersRoute.put("/users/:id", (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    const {id} = req.params;
    res.status(StatusCodes.OK).send({id});
});

usersRoute.delete("/users/:id", (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    const {id} = req.params;
    res.status(StatusCodes.OK).send({id});
});

export default usersRoute;

