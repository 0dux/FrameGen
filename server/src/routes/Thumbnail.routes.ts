import { Router } from "express";
import { generateThumbnail } from "../controllers/Thumbnail.controllers.js";
import protect from "../middlewares/auth.middleware.js";

const ThumbnailRouter = Router();

ThumbnailRouter.post("/generate", protect, generateThumbnail);


export default ThumbnailRouter;