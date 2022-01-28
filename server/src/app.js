import express from 'express';
import userRouter from './routes/user.router.js';

const server = express();
const port = process.env.PORT || 3001;

server.use(express.json());
server.use('/users', userRouter);

server.listen(port,()=>{
    console.log('Server listening on port ' + port + '...')
});