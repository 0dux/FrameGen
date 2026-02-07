import { Router } from "express";
import { googleCallback, googleLogin } from "../controllers/GoogleOAuth.controllers.js";

const google = Router();

google.get("/login", googleLogin);
google.get("/callback", googleCallback);

export default google