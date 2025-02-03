import { Response } from "express"
import { IUserDocument } from "../models/user.model"
import jwt from "jsonwebtoken"
import { Document } from "mongoose"

export const generateCookie=(res:Response,user:IUserDocument&Document)=>{
    const token=jwt.sign({userId:user._id},process.env.SECRET_KEY!,{expiresIn:"1d"})
    res.cookie("token",token,{httpOnly:true, maxAge:24*60*60*1000})
    //return token
}