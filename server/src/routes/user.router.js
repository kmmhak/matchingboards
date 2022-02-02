import { Router } from 'express';
import * as controller from '../controllers/user.controller.js';
import { authJwt } from '../middleware/passport-jwt.middleware.js';

const userRouter = Router({ mergeParams: true });

userRouter.post('/', controller.addUser);
userRouter.post('/login', authJwt);
userRouter.get('/:id', controller.getUser);

export default userRouter;
