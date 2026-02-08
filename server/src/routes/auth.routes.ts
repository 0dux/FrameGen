import { Router } from "express";
import { loginUser, logoutUser, registerUser, verifyUser } from "../controllers/Auth.controllers";
import protect from "../middlewares/auth.middleware";

const AuthRouter = Router();

AuthRouter.post("/register", registerUser);
AuthRouter.post("/login", loginUser);
AuthRouter.post("/logout", protect, logoutUser);
AuthRouter.get("/verify", protect, verifyUser);


export default AuthRouter;