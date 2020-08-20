import { Request, Response, } from 'express';
import { body, check, validationResult } from 'express-validator';
import knex from '../model/connection';

class UsersController {

    async list(request: Request, response: Response) {
        const users = await knex('users').distinct();

        return response.json({ users });
    }

    async read(request: Request, response: Response) {
        const { id } = request.params;

        const user = await knex('users').where('id', id).first();

        if (user == null) {
            return response.status(400).json({ message: 'User not found' });
        }

        return response.status(200).json({ user });
    }

    async create(request: Request, response: Response) {
        const { name, username, email } = request.body;

        const user = await knex('users').insert({name, username, email});

        return response.json({user});
    }

    async update(request: Request, response: Response) {
        const { id } = request.params;
        const { name, username, email } = request.body;

        const user = await knex('users').where('id', id).first().update({name, username, email});

        return response.status(200).json({ user });
    }

    async delete(request: Request, response: Response) {
        const { id } = request.params;

        const user = await knex('users').where('id', id).first().del();

        return response.status(200).json({ user });
    }

    async validate(request: Request) {
        
    }
}

export default UsersController;