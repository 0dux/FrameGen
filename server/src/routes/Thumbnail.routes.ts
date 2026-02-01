import { Router } from "express";
import { deleteThumbnail, generateThumbnail, getPublishedThumbnails, togglePublished } from "../controllers/Thumbnail.controllers.js";
import protect from "../middlewares/auth.middleware.js";

const ThumbnailRouter = Router();

ThumbnailRouter.post("/generate", protect, generateThumbnail);
ThumbnailRouter.delete("/delete/:id", protect, deleteThumbnail);
ThumbnailRouter.get("/toggle-published/:thumbnailId", protect, togglePublished);
ThumbnailRouter.get("/community", getPublishedThumbnails)


export default ThumbnailRouter;