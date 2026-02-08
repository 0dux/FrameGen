import crypto from 'crypto';
import { Request, Response } from "express";
import { google } from 'googleapis';
import { env } from '../config/env.js';
import oauth2Client from '../config/googleOAuth.js';
import User from '../models/User.models.js';

const scopes = [
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
    "openid"
];

const CLIENT_URL = env.CLIENT_URL;

export const googleLogin = async (req: Request, res: Response) => {
    try {
        const state = crypto.randomBytes(32).toString('hex');
        req.session.state = state;

        const authorizationUrl = oauth2Client.generateAuthUrl({
            access_type: "online",
            scope: scopes,
            state: state
        });

        req.session.save((err) => {
            if (err) {
                console.error('Session save error:', err);
                return res.redirect(`${CLIENT_URL}/login?error=session_error`);
            }
            // console.log('Session saved with ID:', req.sessionID);
            // console.log('State stored:', req.session.state);
            res.redirect(authorizationUrl);
        });
    } catch (error) {
        console.error('Google OAuth Login Error:', error);
        return res.redirect(`${CLIENT_URL}/login?error=oauth_failed`);
    }
}

export const googleCallback = async (req: Request, res: Response) => {
    try {
        const { code, state, error } = req.query;

        // console.log('Callback session ID:', req.sessionID);
        // console.log('Callback session state:', req.session.state);

        if (error) {
            console.error('Google OAuth Error:', error);
            return res.redirect(`${CLIENT_URL}/login?error=oauth_denied`);
        }

        if (state !== req.session.state) {
            console.error('State mismatch. Possible CSRF attack');
            // console.error('URL state:', state);
            // console.error('Session state:', req.session.state);
            return res.redirect(`${CLIENT_URL}/login?error=invalid_state`);
        }

        const { tokens } = await oauth2Client.getToken(code as string);
        oauth2Client.setCredentials(tokens);

        const oauth2 = google.oauth2({ version: 'v2', auth: oauth2Client });
        const { data: googleUser } = await oauth2.userinfo.get();

        if (!googleUser.email) {
            return res.redirect(`${CLIENT_URL}/login?error=no_email`);
        }

        let user = await User.findOne({ email: googleUser.email });

        if (!user) {
            user = new User({
                name: googleUser.name || googleUser.email.split('@')[0],
                email: googleUser.email,
                password: undefined,
                credits: 20,
            });
            await user.save();
        }

        req.session.isLoggedIn = true;
        req.session.userId = user._id.toString();

        delete req.session.state;

        return res.redirect(CLIENT_URL as string);

    } catch (error: any) {
        console.error('Google OAuth Callback Error:', error);
        return res.redirect(`${CLIENT_URL}/login?error=oauth_failed`);
    }
}