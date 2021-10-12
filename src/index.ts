import express from 'express';
import usersRoute from "./routes/users.routes";
import statusRoutes from "./routes/status.routes";
import errorHandler from "./middlewares/error-handler.middleware";

const app = express();
const host = 'http://localhost:';
const port = 3000;

/*Configuração da inicialização do servidor*/
app.listen(port, () => console.log(`Server is running ${host}${port}`));

/*Configurção da aplicação*/
app.use(express.json());
app.use(express.urlencoded({extended: true}));

/*Configuração das rotas*/
app.use(statusRoutes);
app.use(usersRoute);

/*Configuração dos Handlers de erros*/
app.use(errorHandler);



