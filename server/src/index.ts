import express from "express";
import dotenv from "dotenv";
import connectDb from "./db/connectDb";
import userRouter from "./routes/user.route";
import { errorHandler } from "./middlewares/errorHandler";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import resturantRouter from "./routes/resturant.route";
import menuRouter from "./routes/menu.route";
import orderRoute from "./routes/order.route";

dotenv.config();

const app = express();

const PORT = process.env.PORT;
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
};

app.use(bodyParser.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/user", userRouter);
app.use("/api/v1/resturant", resturantRouter);
app.use("api/v1/menu", menuRouter);
app.use("api/v1/order", orderRoute);
app.use(errorHandler);




connectDb().then(() =>
  app.listen(PORT, () => {
    console.log(`Server is running at port too  ${PORT}`);
  })
);
