import { Router } from 'express';
import passport from 'passport';
import * as controller from '../controllers/game.controller.js';
import {
  jwtStrategy,
  passportJwt,
} from '../middleware/passport-jwt.middleware.js';

const gameRouter = Router({ mergeParams: true });
passport.use(jwtStrategy);

gameRouter.get('/', passportJwt(), controller.getAllGames);
gameRouter.get('/:id', passportJwt(), controller.getGameById);
gameRouter.get('/search/name', passportJwt(), controller.searchGames);
gameRouter.post('/users', passportJwt(), controller.addGameToUser);
gameRouter.delete('/users', passportJwt(), controller.deleteGameFromUser);

export default gameRouter;
