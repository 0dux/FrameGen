import mongoose from "mongoose";


export interface IThumbnail extends Document {
    _id: string;
    userId: string;
    title: string;
    isPublished: boolean;
    description?: string;
    style: "Bold & Graphic" | "Tech/Futuristic" | "Minimalist" | "Photorealistic" | "Illustrated";
    aspect_ratio?: "16:9" | "1:1" | "9:16";
    color_scheme?: "vibrant" | "sunset" | "forest" | "neon" | "purple" | "monochrome" | "ocean" | "pastel";
    text_overlay?: boolean;
    image_url?: string;
    prompt_used?: string;
    user_prompt?: string;
    isGenerating?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

const ThumbnailSchema = new mongoose.Schema<IThumbnail>({
    userId: { type: String, ref: "User", required: true, },
    title: { type: String, trim: true, required: true, },
    isPublished: { type: Boolean, default: true, required: true },
    description: { type: String, trim: true, },
    style: { type: String, required: true, enum: ["Bold & Graphic", "Tech/Futuristic", "Minimalist", "Photorealistic", "Illustrated"] },
    aspect_ratio: { type: String, enum: ["16:9", "1:1", "9:16"], default: "16:9" },
    color_scheme: { type: String, enum: ["vibrant", "sunset", "forest", "neon", "purple", "monochrome", "ocean", "pastel"] },
    text_overlay: { type: Boolean, default: false },
    image_url: { type: String, default: "" },
    prompt_used: { type: String },
    user_prompt: { type: String },
    isGenerating: { type: Boolean, default: true }
}, { timestamps: true })

const Thumbnail = mongoose.models.Thumbnail || mongoose.model<IThumbnail>("Thumbnail", ThumbnailSchema)

export default Thumbnail;