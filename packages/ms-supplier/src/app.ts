import express from 'express';
import 'express-async-errors';
import { supplierRouter } from './routes/Supplier';

const app = express();
app.use(express.json());

app.use('/api/v1/bookshop/supplier', supplierRouter);

export { app };
