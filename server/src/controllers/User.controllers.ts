import { Request, Response } from "express";
import Thumbnail from "../models/Thumbnail.models.js";

// Controller to get all user thumbnails 
export const getUserThumbnails = async (req: Request, res: Response) => {
    try {
        const { userId } = req.session;
        const thumbnails = await Thumbnail.find({ userId }).sort({ createdAt: -1 });

        res.json({
            thumbnails
        })
    } catch (error: any) {
        console.error(error);
        res.status(500).json({
            message: error.message
        })
    }
}

// Controller to get a single thumbnail for user.
export const getThumbnailById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { userId } = req.session;

        const thumbnail = await Thumbnail.findOne({ _id: id, userId })
        res.json(
            thumbnail
        )
    } catch (error: any) {
        console.error(error);
        res.status(500).json({
            message: error.message
        })
    }
}