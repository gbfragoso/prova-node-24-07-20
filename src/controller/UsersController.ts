import { Request, Response, } from 'express';
import knex from '../model/connection';

class UsersController {

    async list(request: Request, response: Response) {
        const users = await knex('users').distinct();

        return response.status(200).json({ users });
    }

    async read(request: Request, response: Response) {
        const { id } = request.params;

        const user = await knex('users').where('id', id).first();

        if (user == null) {
            return response.status(404).json({ message: 'User not found' });
        }

        return response.status(200).json({ user });
    }

    async create(request: Request, response: Response) {
        let { name, username, email } = request.body;

        username = username.toLowerCase();
        var userId;
        
        const user = await knex('users')
            .insert({name, username, email})
            .returning('id')
            .then(([id]) => userId = id);

        return response.status(201).json({userId, name, username, email});
    }

    async update(request: Request, response: Response) {
        const { id } = request.params;
        const { name, username, email } = request.body;

        const user = await knex('users').where('id', id).first().update({name, username, email});

        if (user === 0) {
            return response.status(404).json({ message: 'User not found' });
        }

        return response.status(200).json({ success: true });
    }

    async delete(request: Request, response: Response) {
        const { id } = request.params;

        const user = await knex('users').where('id', id).first().del();

        if (user === 0) {
            return response.status(404).json({ message: 'User not found' });
        }

        return response.status(200).json({ success: true });
    }
}

export default UsersController;