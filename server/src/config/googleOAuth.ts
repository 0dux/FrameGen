import { google } from 'googleapis';
import { env } from './env.js';

const oauth2Client = new google.auth.OAuth2(
    env.GOOGLE_OAUTH_CLIENT_ID,
    env.GOOGLE_OAUTH_CLIENT_SECRET,
    env.GOOGLE_OAUTH_REDIRECT_URL
);

// console.log(env.GOOGLE_OAUTH_REDIRECT_URL);

export default oauth2Client