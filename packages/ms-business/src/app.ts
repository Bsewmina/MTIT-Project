import express from 'express';
import 'express-async-errors';
import { businessRouter } from './routes/business';
import { categoryRouter } from './routes/category';

const app = express();
app.use(express.json());

app.use('/api/v1/business/business', businessRouter);
app.use('/api/v1/business/category', categoryRouter);

//Temp token value
declare global {
  var token: string;
}
globalThis.token = 'token';
//console.log(globalThis.token);

export { app };
