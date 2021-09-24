import {Pool} from "pg";

const connection= '';
const db = new Pool({connection});

export default db;
