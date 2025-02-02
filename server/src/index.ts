import express from "express";
import dotenv from "dotenv";
import connectDb from "./db/connectDb";
import userRouter from "./routes/user.route";
import { errorHandler } from "./middlewares/errorHandler";


dotenv.config();

const app = express();

const PORT = process.env.PORT;

app.use(express.json())
app.use("/api/v1/user",userRouter )
app.use(errorHandler)

connectDb().then(() =>
  app.listen(PORT, () => {
    console.log(`Server is running at port too  ${PORT}`);
  })
);
