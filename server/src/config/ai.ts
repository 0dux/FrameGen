import { GoogleGenAI } from "@google/genai";
import { env } from "./env";

const ai = new GoogleGenAI({
    apiKey: env.GEMINI_API_KEY
})

export default ai;