import MongoStore from "connect-mongo";
import cors from "cors";
import "dotenv/config";
import express, { Request, Response } from 'express';
import session from "express-session";
import { connectDB } from "./config/db.js";
import { env } from "./config/env.js";
import AuthRouter from "./routes/auth.routes.js";

declare module "express-session" {
    interface SessionData {
        isLoggedIn: boolean,
        userId: string,
    }
}
const app = express();
connectDB();

app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    credentials: true,
}));

app.use(session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 },//7-days
    store: MongoStore.create({
        mongoUrl: env.MONGODB_URI,
        collectionName: "session"
    })
}))
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.json({
        message: "Server is working!!!"
    })
})
app.use("/api/v1/auth", AuthRouter)

const port = 3000

app.listen(port, () => {
    console.log(`Server is running at :: http://localhost:${port}`);
})