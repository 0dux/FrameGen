import { Router } from "express";
import { deleteThumbnail, generateThumbnail } from "../controllers/Thumbnail.controllers.js";
import protect from "../middlewares/auth.middleware.js";

const ThumbnailRouter = Router();

ThumbnailRouter.post("/generate", protect, generateThumbnail);
ThumbnailRouter.delete("/delete/:id", protect, deleteThumbnail);


export default ThumbnailRouter;