import "dotenv/config";
import z from "zod";


const envSchema = z.object({
    MONGODB_URI: z.string(),
    SESSION_SECRET: z.string(),
    GEMINI_API_KEY: z.string(),
    CLOUDINARY_URL: z.string(),
    GOOGLE_OAUTH_CLIENT_ID: z.string(),
    GOOGLE_OAUTH_CLIENT_SECRET: z.string(),
    GOOGLE_OAUTH_REDIRECT_URL: z.string(),
    CLIENT_URL: z.string().optional(),
    NODE_ENV: z.string().optional(),
    PORT: z.coerce.number().optional(),
})

const result = envSchema.safeParse(process.env);
if (!result.success) {
    console.error("Some error has occured during fetching of environment variables.", result.error.issues);
    throw new Error(`Environment Validation Failed: ${JSON.stringify(result.error.issues)}`);
}
export const env = result.data;
