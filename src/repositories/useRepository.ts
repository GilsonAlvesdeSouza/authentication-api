import db from '../db';
import User from "../models/useModels";
import DatabaseError from "../models/errors/database.error.model";

class UseRepository {
    async findAllUsers(): Promise<User[]> {
        const query = `select id, username
                       from application_user;`;
        const result = await db.query<User>(query);
        const rows = result.rows;
        return rows || [];
    }

    async findById(id: string): Promise<User> {
        try {
            const query = `select id, username
                       from application_user
                       where id = $1`;
            const values = [id];
            const result = await db.query<User>(query, values);
            const rows = result.rows;
            return rows[0] || null;

        } catch (e) {
            throw new DatabaseError('Erro na consulta por Id', e);
        }
    }

    async create(user: User): Promise<User> {
        const query = `insert into application_user(username, password)
                       values ($1, crypt($2, 'soctop')) returning id`;
        const values = [user.username, user.password];
        const { rows } = await db.query<{ id: string }>(query, values);
        const [newUser] = rows;
        return this.findById(newUser.id);
    }

    async remove(id: string): Promise<void> {
        const query = `delete from application_user where id=$1 returning id`;
        const values = [id];
        await db.query<{ id: string }>(query, values);
    }

    async merge(user: User): Promise<User> {
        if (user.id) {
            const query = `UPDATE application_user
                           SET username=$2,
                               password = crypt($3, 'soctop')
                           WHERE id = $1 returning id`;
            const values = [user.id, user.username, user.password];
            const { rows } = await db.query<{ id: string }>(query, values);
            const [newUser] = rows;
            return this.findById(newUser.id);
        }

        const query = `insert into application_user(username, password)
                       values ($1, crypt($2, 'soctop')) returning id`;
        const values = [user.username, user.password];
        const { rows } = await db.query<{ id: string }>(query, values);
        const [newUser] = rows;
        return this.findById(newUser.id);
    }

    async findByUsernameAndPassword(username: string, password: string): Promise<User | null> {

        try {
            const query = `select id, username 
                           from application_user where username = $1 
                           and password = crypt($2, 'soctop')`;
            const values = [username, password];
            const { rows } = await db.query<User>(query, values);
            const [user] = rows;
            return user || null;
        } catch (error) {
            throw new DatabaseError('Erro na conssulta por usário e senha', error);
        }
    }
}

export default new UseRepository();
