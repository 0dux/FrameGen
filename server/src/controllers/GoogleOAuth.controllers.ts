import crypto from 'crypto';
import { Request, Response } from "express";
import oauth2Client from '../config/googleOAuth.js';

const scopes = [
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
    "openid"
];

export const googleLogin = async (req: Request, res: Response) => {
    const state = crypto.randomBytes(32).toString('hex');

    req.session.state = state;

    const authorizationUrl = oauth2Client.generateAuthUrl({
        access_type: "online",
        scope: scopes,
        include_granted_scopes: true,
        state: state
    });
    
    res.redirect(authorizationUrl)
}