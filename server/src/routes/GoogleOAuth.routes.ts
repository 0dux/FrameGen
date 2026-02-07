import { Router } from "express";
import { googleLogin } from "../controllers/GoogleOAuth.controllers.js";

const google = Router();

google.get("/login", googleLogin);
google.get("/callback");

export default google