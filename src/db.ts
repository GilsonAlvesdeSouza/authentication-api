import {Pool} from "pg";

const connection= {
    user: 'node',
    host: 'localhost',
    database: 'postgres',
    password: '1234',
    port: 5432,
};
const db = new Pool(connection);

export default db;
