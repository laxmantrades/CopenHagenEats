import express from "express";
import dotenv from "dotenv";
import connectDb from "./db/connectDb";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

connectDb().then(() =>
  app.listen(PORT, () => {
    console.log(`Server is running at port to  ${PORT}`);
  })
);
