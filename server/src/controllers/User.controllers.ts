import { Request, Response } from "express";
import mongoose from "mongoose";
import Thumbnail from "../models/Thumbnail.models.js";
import User from "../models/User.models.js";

// Controller to get all user thumbnails 
export const getUserThumbnails = async (req: Request, res: Response) => {
    try {
        const { userId } = req.session;
        const thumbnails = await Thumbnail.find({ userId }).sort({ createdAt: -1 });

        return res.json({
            thumbnails
        })
    } catch (error: any) {
        console.error(error);
        return res.status(500).json({
            message: "Failed to fetch thumbnails"
        })
    }
}

// Controller to get a single thumbnail for user.
export const getThumbnailById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { userId } = req.session;

        if (!mongoose.Types.ObjectId.isValid(id as string)) {
            return res.status(400).json({ message: "Invalid thumbnail ID" });
        }

        const thumbnail = await Thumbnail.findOne({ _id: id, userId });
        if (!thumbnail) {
            return res.status(404).json({
                message: "Thumbnail not found"
            });
        }
        return res.json(thumbnail);
    } catch (error: any) {
        console.error(error);
        return res.status(500).json({
            message: "Failed to fetch thumbnail"
        })
    }
}

export const getCredits = async (req: Request, res: Response) => {
    try {
        const { userId } = req.session;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        return res.json({
            credits: user.credits
        })
    } catch (error: any) {
        console.error(error);
        return res.status(500).json({
            message: "Failed to fetch credits"
        })
    }
}