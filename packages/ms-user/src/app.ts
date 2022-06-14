import express from 'express';
import 'express-async-errors';
import { userRouter } from './routes/User';

const app = express();
app.use(express.json());

app.use('/api/v1/bookshop/User', userRouter);

export { app };
