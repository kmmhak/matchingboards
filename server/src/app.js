import express from 'express';
import userRouter from './routes/user.router.js';
import gameRouter from './routes/game.router.js';

const server = express();
const port = process.env.PORT || 3001;

server.use(express.json());
server.use('/users', userRouter);
server.use('/games', gameRouter);

server.listen(port, () => {
  console.log(`Server listening on port ${port}...`);
});
