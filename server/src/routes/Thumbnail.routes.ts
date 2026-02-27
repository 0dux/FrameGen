import { Router } from "express";
import {
  deleteThumbnail,
  generateThumbnail,
  getPublishedThumbnails,
  proxyDownload,
  togglePublished,
} from "../controllers/Thumbnail.controllers.js";
import protect from "../middlewares/auth.middleware.js";

const ThumbnailRouter = Router();

ThumbnailRouter.post("/generate", protect, generateThumbnail);
ThumbnailRouter.delete("/delete/:id", protect, deleteThumbnail);
ThumbnailRouter.patch(
  "/toggle-published/:thumbnailId",
  protect,
  togglePublished,
);
ThumbnailRouter.get("/community", getPublishedThumbnails);
ThumbnailRouter.get("/download-proxy", protect, proxyDownload);

export default ThumbnailRouter;
