import express from 'express';
import cors from 'cors';
import userRouter from './routes/user.router.js';
import gameRouter from './routes/game.router.js';
import groupRouter from './routes/group.router.js';
import authRouter from './routes/auth.router.js';
import sessionRouter from './routes/session.router.js';

const server = express();
const port = process.env.PORT || 3001;

server.use(cors());
server.use(express.json());
server.use('/users', userRouter);
server.use('/games', gameRouter);
server.use('/groups', groupRouter);
server.use(authRouter);
server.use('/sessions', sessionRouter);

server.listen(port, () => {
  console.log(`Server listening on port ${port}...`);
});
