import { GenerateContentConfig, HarmBlockThreshold, HarmCategory } from "@google/genai";
import { v2 as cloudinary } from "cloudinary";
import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import ai from "../config/ai.js";
import Thumbnail from "../models/Thumbnail.models.js";

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

const generateThumbnail = async (req: Request, res: Response) => {
    try {
        const { userId } = req.session;

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const { title, prompt: user_prompt, style, aspect_ratio, color_scheme, text_overlay } = req.body;

        if (!title || !style) {
            return res.status(400).json({ message: "Title and style are required" });
        }

        if (style && !stylePrompts[style as keyof typeof stylePrompts]) {
            return res.status(400).json({ message: "Invalid style selected" });
        }

        if (color_scheme && !colorSchemeDescriptions[color_scheme as keyof typeof colorSchemeDescriptions]) {
            return res.status(400).json({ message: "Invalid color scheme selected" });
        }

        const thumbnail = await Thumbnail.create({
            userId, title, prompt_used: user_prompt, user_prompt, style, aspect_ratio, color_scheme, text_overlay, isGenerating: true,
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
                { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.OFF },
                { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.OFF },
                { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.OFF },
                { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.OFF },
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

        //Response validity check
        if (!response?.candidates[0]?.content?.parts) {
            throw new Error("Unknown response recieved.");
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
                // use_filename: true, how to save with a filename.
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
        return res.status(500).json({
            message: error.message
        });
    }
}


export const deleteThumbnail = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { userId } = req.session;

        await Thumbnail.findByIdAndDelete({ _id: id, userId });
    } catch (error: any) {
        console.error(error);
        return res.status(500).json({
            message: error.message
        });
    }
}

export { generateThumbnail };

