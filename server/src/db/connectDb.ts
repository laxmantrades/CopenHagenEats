import { PrismaClient } from "@prisma/client";
import mongoose from "mongoose";
export const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
});
const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    prisma;

    console.log("Database Succefully connected");
  } catch (error) {
    
  }
};
export default connectDb;
