import express from "express";
import dotenv from "dotenv";
import connectDb from "./db/connectDb";
import userRouter from "./routes/user.route";
import { errorHandler } from "./middlewares/errorHandler";
import cookieParser from "cookie-parser"
import bodyParser from "body-parser"
import cors from "cors"

dotenv.config();

const app = express();

const PORT = process.env.PORT;

app.use(bodyParser.json({limit:"10mb"}))
app.use(express.urlencoded({extended:true,limit:"10mb"}))

app.use(express.json())
app.use(cookieParser())
app.use("/api/v1/user",userRouter )
app.use(errorHandler)

const corsOptions={
  origin:process.env.FRONTEND_URL,
  credentials:true
}
app.use(cors(corsOptions))

connectDb().then(() =>
  app.listen(PORT, () => {
    console.log(`Server is running at port too  ${PORT}`);
  })
);
