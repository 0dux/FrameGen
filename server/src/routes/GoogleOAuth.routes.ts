import { Router } from "express";
import { googleCallback, googleLogin } from "../controllers/GoogleOAuth.controllers.js";

const googleRouter = Router();

googleRouter.get("/login", googleLogin);
googleRouter.get("/callback", googleCallback);

export default googleRouter