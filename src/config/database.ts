import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MONGO_URI:string = `${process.env.MONGO_URI}`;

export default async function connectDb():Promise<void> {
    try {
        const conn = await mongoose.connect(MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error}`);
        process.exit(1);
    }
}