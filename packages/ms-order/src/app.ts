import express from 'express';
import 'express-async-errors';
import { orderRouter } from './routes/Order';

const app = express();
app.use(express.json());

app.use('/api/v1/bookshop/order', orderRouter);

export { app };
