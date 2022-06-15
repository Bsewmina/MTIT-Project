import express from "express";
import "express-async-errors";
import { shipperRouter } from "./routes/Shipper";

const app = express();
app.use(express.json());

app.use("/api/v1/bookshop/Shipper", shipperRouter);

export { app };
