import MongoStore from "connect-mongo";
import cors from "cors";
import "dotenv/config";
import express, { Request, Response } from 'express';
import rateLimit from "express-rate-limit";
import session from "express-session";
import helmet from "helmet";
import { connectDB } from "./config/db.js";
import { env } from "./config/env.js";
import AuthRouter from "./routes/Auth-routes.js";
import googleRouter from "./routes/GoogleOAuth-routes.js";
import ThumbnailRouter from "./routes/Thumbnail-routes.js";
import UserRouter from "./routes/User-routes.js";

declare module "express-session" {
    interface SessionData {
        isLoggedIn: boolean,
        userId: string,
        state?: string
    }
}
const app = express();
connectDB();

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: { message: "Too many requests, please try again later" }
});

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: { message: "Too many login attempts, please try again later" }
});

app.use(limiter);

app.use(cors({
    origin: env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
}));

app.set("trust proxy", 1);
// console.log(env.NODE_ENV);

app.use(session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
        secure: env.NODE_ENV === "production",
        sameSite: env.NODE_ENV === "production" ? "none" : "lax",
        path: "/"
    },
    store: MongoStore.create({
        mongoUrl: env.MONGODB_URI,
        collectionName: "session"
    })
}))

app.use(express.json({ limit: "10kb" }));

app.get("/", (req: Request, res: Response) => {
    res.json({
        message: "Server is working!!!"
    })
})
app.use("/api/v1/auth/login", authLimiter);
app.use("/api/v1/auth/register", authLimiter);

app.use("/api/v1/auth", AuthRouter);
app.use("/api/v1/thumbnail", ThumbnailRouter)
app.use("/api/v1/user", UserRouter)
app.use("/api/v1/googleOAuth", googleRouter)

const port = env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running at :: http://localhost:${port}`);
})