import express from "express";
import { login, signup } from "../controllers/user.controller";

const userRouter = express.Router();

userRouter.route("/signup").post(signup)
userRouter.route("/login").post(login);


export default userRouter;
