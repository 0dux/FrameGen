import { Router } from "express";
import { deleteThumbnail, generateThumbnail, getPublishedThumbnails, togglePublished } from "../controllers/Thumbnail.controllers.js";
import protect from "../middlewares/auth.middleware.js";

const ThumbnailRouter = Router();

// console.log("Thumbnail Router Accessed");


ThumbnailRouter.post("/generate", protect, generateThumbnail);
ThumbnailRouter.delete("/delete/:id", protect, deleteThumbnail);
ThumbnailRouter.patch("/toggle-published/:thumbnailId", protect, togglePublished);
ThumbnailRouter.get("/community", getPublishedThumbnails)


export default ThumbnailRouter;