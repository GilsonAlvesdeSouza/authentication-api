import db from '../db';
import User from "../models/useModels";

class UseRepository {
    async findAllUsers(): Promise<User[]> {
        const query = `select id, username
                       from application_user;`;
        const result = await db.query<User>(query);
        const rows = result.rows;
        return rows || [];
    }

    async findById(id: string): Promise<User> {
        const query = `select id, username
                       from application_user
                       where id = $1`;
        const values = [id];
        const result = await db.query<User>(query, values);
        const rows = result.rows;
        return rows[0] || null;
    }

    async create(user: User): Promise<User> {
        const query = `insert into application_user(username, password)
                       values ($1, crypt($2, 'soctop')) returning id`;
        const values = [user.username, user.password];
        const {rows} = await db.query<{ id: string }>(query, values);
        const [newUser] = rows;
        return this.findById(newUser.id);
    }

    async merge(user: User): Promise<User> {
        if (user.id) {
            const query = `UPDATE application_user
                           SET username=$2,
                               password = crypt($3, 'soctop')
                           WHERE id = $1 returning id;`;
            const values = [user.id, user.username, user.password];
            const {rows} = await db.query<{ id: string }>(query, values);
            const [newUser] = rows;
            return this.findById(newUser.id);
        }

        const query = `insert into application_user(username, password)
                       values ($1, crypt($2, 'soctop')) returning id`;
        const values = [user.username, user.password];
        const {rows} = await db.query<{ id: string }>(query, values);
        const [newUser] = rows;
        return this.findById(newUser.id);
    }
}

export default new UseRepository();
