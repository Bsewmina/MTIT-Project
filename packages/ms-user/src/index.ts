import mongoose from "mongoose";
import { app } from "./app";

const start = async () => {
  // check jwt key is exists
  // if (!process.env.JWT_KEY){
  //     throw new Error('JWT_KEY must be defined');
  // }
  try {
    await mongoose.connect();
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log(err);
  }
  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
};

start();
