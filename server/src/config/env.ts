import "dotenv/config";
import z from "zod";


const envSchema = z.object({
    MONGODB_URI: z.string(),
    SESSION_SECRET: z.string(),
    GEMINI_API_KEY: z.string(),
    CLOUDINARY_URL: z.string(),

})

const result = envSchema.safeParse(process.env);
if (!result.success) {
    console.error("Some error has occured during fetching of environment variables.", result.error.issues);
    throw new Error(`Environment Validation Failed: ${JSON.stringify(result.error.issues)}`);
}
export const env = result.data;
