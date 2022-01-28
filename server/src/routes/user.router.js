import { Router } from 'express';
import * as controller from '../controllers/user.controller.js';

const userRouter = Router({ mergeParams: true });

userRouter.post('/', controller.addUser);
userRouter.get('/:id', controller.getUser);

export default userRouter;
