import { Router } from 'express';
import * as controller from '../controllers/game.controller.js';

const gameRouter = Router({ mergeParams: true });

gameRouter.get('/', controller.getAllGames);
gameRouter.get('/:id', controller.getGameById);
gameRouter.get('/search/name', controller.searchGames);

export default gameRouter;
