import express from 'express';
import UsersController from '../controller/UsersController';
import Validator from '../middleware/Validator';
import 'express-validator';

const routes = express.Router();
const usersController = new UsersController();
const validator = new Validator();

routes.get("/users", usersController.list);
routes.get("/users/:id", usersController.read);
routes.post('/users', validator.validateNewUser, validator.handle, usersController.create);
routes.delete('/users/:id', usersController.delete);
routes.put('/users/:id', usersController.update);

export default routes;