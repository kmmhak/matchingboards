import { Router } from 'express';
import * as controller from '../controllers/user.controller.js';
import { passportJwt } from '../middleware/passport-jwt.middleware.js';

const authRouter = Router();

authRouter.post('/login', controller.login);
authRouter.post('/register', controller.register);
authRouter.get('/authenticate', passportJwt(), controller.authenticate);

export default authRouter;
