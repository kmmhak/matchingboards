import { Router } from 'express';
import * as controller from '../controllers/user.controller.js';

const userRouter = Router({ mergeParams: true });

userRouter.post('/', controller.validate('addUser'), controller.addUser);
userRouter.get('/:id', controller.validate('getUser'), controller.getUser);
userRouter.get('/', controller.getAllUsers);
userRouter.delete('/:id', controller.validate('deleteUser'), controller.deleteUser);

export default userRouter;
