import Knex from 'knex';

export async function seed(knex: Knex) {
    await knex('users').insert([
        { name: 'João', username: 'joao', email: "joao@gmail.com" }
    ]);
}