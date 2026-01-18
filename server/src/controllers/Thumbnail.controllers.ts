import { GenerateContentConfig } from "@google/genai";
import { Request, Response } from "express";
import Thumbnail from "../models/Thumbnail.models.js";


const generateThumbnail = async (req: Request, res: Response) => {
    try {
        const { userId } = req.session;

        const { title, prompt: user_prompt, style, aspect_ratio, color_scheme, text_overlay } = req.body;

        const thumbnail = await Thumbnail.create({
            userId, title, prompt_used: user_prompt, user_prompt, style, aspect_ratio, color_scheme, text_overlay, isGenerating: true,
        })

        const models = "gemini-2.5-flash-image";

        const generationConfig: GenerateContentConfig = {
            maxOutputTokens: 32768,
            temperature: 1,
            topP:0.95,
            responseModalities:["IMAGE"],
            imageConfig:{
                aspectRatio:aspect_ratio,
                imageSize:"1k",
            },
            safetySettings:[
                
            ]
        }
    } catch (error) {

    }
}