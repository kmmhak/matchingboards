import express from 'express';
import cors from 'cors';
import userRouter from './routes/user.router.js';
import gameRouter from './routes/game.router.js';
import authRouter from './routes/auth.router.js';

const server = express();
const port = process.env.PORT || 3001;

server.use(cors());
server.use(express.json());
server.use('/users', userRouter);
server.use('/games', gameRouter);
server.use(authRouter);

server.listen(port, () => {
  console.log(`Server listening on port ${port}...`);
});
