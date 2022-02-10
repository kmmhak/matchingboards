import { Router } from 'express';
import * as controller from '../controllers/session.controller.js';

const sessionRouter = Router({ mergeParams: true });

sessionRouter.get('/', controller.getAllSessions);
sessionRouter.post(
  '/',
  controller.validate('addSession'),
  controller.addSession,
);
sessionRouter.get(
  '/:id',
  controller.validate('getSessionById'),
  controller.getSessionById,
);
sessionRouter.delete(
  '/:id',
  controller.validate('deleteSessionById'),
  controller.deleteSessionById,
);

export default sessionRouter;
