import { Response } from "express"
import { IUserDocument } from "../models/user.model"
import jwt from "jsonwebtoken"
import { Document } from "mongoose"

export const generateCookie=(res:Response,user:IUserDocument&Document)=>{
    const token=jwt.sign({userId:user._id},process.env.SECRET_KEY!,{expiresIn:"1d"})
    res.cookie('token', token, {
        httpOnly: true, // Ensures the cookie is not accessible via JavaScript
        secure: process.env.NODE_ENV === 'production', // Use secure cookies in production (HTTPS)
        sameSite: 'none', // Required if you're working with cross-origin requests
        maxAge: 24 * 60 * 60 * 1000, // Cookie expiration (1 day)
      });
    //return token
}