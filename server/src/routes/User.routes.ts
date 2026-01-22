import { Router } from "express";
import { getThumbnailById, getUserThumbnails } from "../controllers/User.controllers.js";
import protect from "../middlewares/auth.middleware.js";

const UserRouter = Router();

UserRouter.get("/thumbnails", protect, getUserThumbnails);
UserRouter.get("/thumbnail/:id", protect, getThumbnailById);

export default UserRouter;