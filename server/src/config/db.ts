import mongoose from "mongoose";
import { env } from "./env.js";

export const connectDB = async () => {
    try {
        mongoose.connection.on("connected", () => {
            console.log("MongoDB connected");
        })
        await mongoose.connect(env.MONGODB_URI)
    } catch (error) {
        console.error("Some error has occured during connection:: ", error);
        process.exit(1);
    }
}