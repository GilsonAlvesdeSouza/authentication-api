import express from 'express';
import usersRoute from "./routes/users.routes";
import statusRoutes from "./routes/status.routes";

const app = express();
const host = 'http://localhost:';
const port = 3000;

app.listen(port, () => console.log(`Server is running ${host}${port}`));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(statusRoutes);
app.use(usersRoute);
