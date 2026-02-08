import { Router } from "express";
import { getCredits, getThumbnailById, getUserThumbnails } from "../controllers/User-controllers";
import protect from "../middlewares/auth-middleware";

const UserRouter = Router();

UserRouter.get("/thumbnails", protect, getUserThumbnails);
UserRouter.get("/thumbnail/:id", protect, getThumbnailById);
UserRouter.get("/credits", protect, getCredits);

export default UserRouter;