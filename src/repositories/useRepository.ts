import db from '../db';
import User from "../models/useModels";

class UseRepository {
    async findAllUsers(): Promise<User[]> {
        const query = `select id, username from application_user;`;
        const result = await db.query<User>(query);
        const rows = result.rows;
        return rows || [];
    }

    async create(user: User): Promise<string>{
        const query = `insert into application_user(username, password)
                        values($1, crypt($2, 'soctop'))
                        returning id`;
        const values=[user.username, user.password];
        const {rows} = await db.query<{id: string}>(query, values);
        const [newUser] = rows;
        return newUser.id;
    }
}

export default new UseRepository();
