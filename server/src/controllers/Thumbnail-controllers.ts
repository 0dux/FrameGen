import { GenerateContentConfig, HarmBlockThreshold, HarmCategory } from "@google/genai";
import { v2 as cloudinary } from "cloudinary";
import { Request, Response } from "express";
import fs from "fs";
import mongoose from "mongoose";
import path from "path";
import ai from "../config/ai";
import Thumbnail from "../models/Thumbnail-models";
import User from "../models/User-models";

const stylePrompts = {
    'Bold & Graphic': 'eye-catching thumbnail, bold typography, vibrant colors, expressive facial reaction, dramatic lighting, high contrast, click-worthy composition, professional style',
    'Tech/Futuristic': 'futuristic thumbnail, sleek modern design, digital UI elements, glowing accents, holographic effects, cyber-tech aesthetic, sharp lighting, high-tech atmosphere',
    'Minimalist': 'minimalist thumbnail, clean layout, simple shapes, limited color palette, plenty of negative space, modern flat design, clear focal point',
    'Photorealistic': 'photorealistic thumbnail, ultra-realistic lighting, natural skin tones, candid moment, DSLR-style photography, lifestyle realism, shallow depth of field',
    'Illustrated': 'illustrated thumbnail, custom digital illustration, stylized characters, bold outlines, vibrant colors, creative cartoon or vector art style',
}

const colorSchemeDescriptions = {
    vibrant: 'vibrant and energetic colors, high saturation, bold contrasts, eye-catching palette',
    sunset: 'warm sunset tones, orange pink and purple hues, soft gradients, cinematic glow',
    forest: 'natural green tones, earthy colors, calm and organic palette, fresh atmosphere',
    neon: 'neon glow effects, electric blues and pinks, cyberpunk lighting, high contrast glow',
    purple: 'purple-dominant color palette, magenta and violet tones, modern and stylish mood',
    monochrome: 'black and white color scheme, high contrast, dramatic lighting, timeless aesthetic',
    ocean: 'cool blue and teal tones, aquatic color palette, fresh and clean atmosphere',
    pastel: 'soft pastel colors, low saturation, gentle tones, calm and friendly aesthetic',
}

export const generateThumbnail = async (req: Request, res: Response) => {
    try {
        const { userId } = req.session;

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const {
            title,
            prompt: user_prompt,
            style,
            aspect_ratio,
            color_scheme,
            text_overlay } = req.body;

        if (!title || !style) {
            return res.status(400).json({ message: "Title and style are required" });
        }

        if (style && !stylePrompts[style as keyof typeof stylePrompts]) {
            return res.status(400).json({ message: "Invalid style selected" });
        }

        if (color_scheme && !colorSchemeDescriptions[color_scheme as keyof typeof colorSchemeDescriptions]) {
            return res.status(400).json({ message: "Invalid color scheme selected" });
        }

        // Atomic check and deduct credits - prevents race conditions
        const user = await User.findOneAndUpdate(
            { _id: userId, credits: { $gte: 5 } },
            { $inc: { credits: -5 } },
            { new: true }
        );

        if (!user) {
            const existingUser = await User.findById(userId);
            if (!existingUser) {
                return res.status(401).json({
                    message: "User not found, please login again."
                });
            }
            return res.status(402).json({
                message: "Insufficient credits"
            });
        }

        const thumbnail = await Thumbnail.create({
            userId, title, prompt_used: user_prompt, text_overlay, user_prompt, style, aspect_ratio, color_scheme, isGenerating: true,
        })
        //model -------------------------------------------------------------------------------------------
        const model = "gemini-3-pro-image-preview";

        //Configuration for the image to be generated
        const generationConfig: GenerateContentConfig = {
            maxOutputTokens: 8192,
            temperature: 1,
            topP: 0.95,
            responseModalities: ["IMAGE"],
            imageConfig: {
                aspectRatio: aspect_ratio || "16:9",
                imageSize: "1k",
            },
            safetySettings: [
                { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
                { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
                { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
                { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
            ]
        }

        //Prompt for the image
        let prompt = `Create a ${stylePrompts[style as keyof typeof stylePrompts]} image for: ${title}`;

        if (color_scheme) {
            prompt += `Use a ${colorSchemeDescriptions[color_scheme as keyof typeof colorSchemeDescriptions]} color scheme.`
        }

        if (user_prompt) {
            prompt += `Additional details:${user_prompt}`
        }

        prompt += `The thumbnail should be of ${aspect_ratio} aspect ratio, visiually stunning, and designed to maximize click-through rate. Make it bold, professional, and impossible to ignore.`

        //Image generation using prompt
        const response: any = await ai.models.generateContent({
            model,
            contents: [{ text: prompt }],
            config: generationConfig,
        })

        // console.log("AI Response:", JSON.stringify(response, null, 2));

        //Response validity check
        if (!response?.candidates || response.candidates.length === 0) {
            console.error("No candidates in response");
            const blockReason = response?.promptFeedback?.blockReason;
            const safetyRatings = response?.promptFeedback?.safetyRatings;

            thumbnail.isGenerating = false;
            await thumbnail.save();

            if (blockReason) {
                throw new Error(`Content blocked by AI safety filters. Reason: ${blockReason}. Try rephrasing your prompt or choosing a different style.`);
            }
            throw new Error("AI did not generate any content. Please try again with a different prompt.");
        }

        if (!response.candidates[0]?.content?.parts) {
            console.error("Invalid response structure:", response.candidates[0]);
            throw new Error("Invalid response structure from AI");
        }

        const parts = response.candidates[0].content.parts;
        //Generating file buffer
        let finalBuffer: Buffer | null = null;

        for (const part of parts) {
            if (part.inlineData) {
                finalBuffer = Buffer.from(part.inlineData.data, "base64");
                break;
            }
        }

        if (!finalBuffer) {
            throw new Error("No image data received from AI");
        }

        const fileName = `final-output-${Date.now()}.png`;
        let filePath = path.join("images", fileName);

        try {
            //Create images folder
            fs.mkdirSync("images", { recursive: true });
            fs.writeFileSync(filePath, finalBuffer);

            //Upload file
            const uploadResult = await cloudinary.uploader.upload(filePath, {
                resource_type: "image",
                folder: "Frame-Gen-Images",
                // use_filename: true, 
            });

            thumbnail.image_url = uploadResult.url;
            thumbnail.isGenerating = false;
            await thumbnail.save();

            res.json({
                message: "Thumbnail Generated", thumbnail
            });
        } finally {
            //Delete file once uploaded or if error occurred
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }
    } catch (error: any) {
        console.error(error);
        // Refund credits on failure
        const { userId } = req.session;
        if (userId) {
            await User.findByIdAndUpdate(userId, { $inc: { credits: 5 } });
        }
        return res.status(500).json({
            message: "Failed to generate thumbnail. Please try again."
        });
    }
}

export const deleteThumbnail = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { userId } = req.session;

        // Validate ObjectId to prevent injection
        if (!mongoose.Types.ObjectId.isValid(id as string)) {
            return res.status(400).json({ message: "Invalid thumbnail ID" });
        }

        const deleted = await Thumbnail.findOneAndDelete({ _id: id, userId });
        if (!deleted) {
            return res.status(404).json({ message: "Thumbnail not found" });
        }

        return res.json({ message: "Thumbnail deleted successfully" });
    } catch (error: any) {
        console.error(error);
        return res.status(500).json({
            message: "Failed to delete thumbnail"
        });
    }
}

export const togglePublished = async (req: Request, res: Response) => {
    try {
        const { thumbnailId } = req.params;
        const { userId } = req.session;

        // Validate ObjectId to prevent injection
        if (!mongoose.Types.ObjectId.isValid(thumbnailId as string)) {
            return res.status(400).json({ message: "Invalid thumbnail ID" });
        }

        const thumbnail = await Thumbnail.findOne({ _id: thumbnailId, userId });
        if (!thumbnail) {
            return res.status(404).json({
                message: "Thumbnail not found!"
            })
        }
        thumbnail.isPublished = !thumbnail.isPublished;
        await thumbnail.save();
        return res.json({
            thumbnail
        })
    } catch (error: any) {
        console.error(error);
        return res.status(500).json({
            message: "Failed to update thumbnail"
        });
    }
}

export const getPublishedThumbnails = async (req: Request, res: Response) => {
    try {
        const thumbnails = await Thumbnail.find({ isPublished: true });
        if (!thumbnails) {
            return res.status(404).json({
                message: "No one has published any thumbnails yet"
            })
        }
        res.json({
            thumbnails
        })
    } catch (error: any) {
        console.error(error);
        return res.status(500).json({
            message: "Failed to fetch thumbnails"
        });
    }
}