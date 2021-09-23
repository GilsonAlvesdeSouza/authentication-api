import express, {Request, Response, NextFunction} from 'express';

const app = express();
const host = 'http://localhost:';
const port = 3000;

app.get('/status', (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send({foo:'bartop'});
});
app.listen(3000, () => console.log(`Server is running ${host}${port}`));
