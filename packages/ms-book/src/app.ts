import express from 'express';
import 'express-async-errors';
import { bookRouter } from './routes/Book';

const app = express();
app.use(express.json());

app.use('/api/v1/bookshop/book', bookRouter);

//Temp token value
declare global {
  var token: string;
}
globalThis.token = 'token';
//console.log(globalThis.token);

export { app };
