import { Router } from 'express';
import passport from 'passport';
import * as controller from '../controllers/game.controller.js';
import {
  jwtStrategy,
  passportJwt,
} from '../middleware/passport-jwt.middleware.js';

const gameRouter = Router({ mergeParams: true });
passport.use(jwtStrategy);

gameRouter.get('/', controller.getAllGames);
gameRouter.get('/:id', controller.getGameById);
gameRouter.get('/search/name', controller.searchGames);
gameRouter.post('/users', passportJwt(), controller.addGameToUser);
gameRouter.delete('/users', passportJwt(), controller.deleteGameFromUser);

export default gameRouter;
