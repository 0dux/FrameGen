import { Router } from "express";
import { loginUser, logoutUser, registerUser, verifyUser } from "../controllers/Auth.controllers.js";
import protect from "../middlewares/auth.middleware.js";

const AuthRouter = Router();

AuthRouter.post("/register", registerUser);
AuthRouter.post("/login", loginUser);
AuthRouter.get("/verify", protect, verifyUser);
AuthRouter.post("/logout", protect, logoutUser);


export default AuthRouter;