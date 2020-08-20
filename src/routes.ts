import express from 'express';
import UsersController from './controller/UsersController';
import expressValidator from 'express-validator';

const routes = express.Router();
const usersController = new UsersController();

routes.get("/users", usersController.list);
routes.get("/users/:id", usersController.read);
routes.post('/users', usersController.create);
routes.delete('/users/:id', usersController.delete);
routes.put('/users/:id', usersController.update);

export default routes;