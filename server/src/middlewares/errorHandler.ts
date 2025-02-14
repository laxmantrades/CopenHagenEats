import { NextFunction, Request, Response } from "express";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {

  
  res.status(500).json({
    success: false,
    message: "Internal Server Error" + err.message,
  });
};
