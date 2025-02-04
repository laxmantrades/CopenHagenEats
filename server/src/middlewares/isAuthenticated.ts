import { RequestHandler } from "express"
import jwt from "jsonwebtoken"

declare global {
    namespace Express{
        interface Request{
            id:string
        }
    }
}

export const isAuthenticated:RequestHandler=async(req,res,next)=>{
try {
    const token=req.cookies.token
    if(!token){
        res.status(401).json({
            success:false,
            message:"User not authenticated"
        })
        return
    }
    //verify the token
    const decode=jwt.verify(token,process.env.SECRET_KEY!) as jwt.JwtPayload
    //
    if(!decode){
        res.status(401).json({
            success:false,
            message:"Invalid Token"
        })
        return
    }
    req.id=decode.userId
    next()
} catch (error) {
    console.log(error);
    
    res.status(500).json({
        success:false,
        message:"Internal server error"
    })
}
}