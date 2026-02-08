import bcrypt from "bcrypt";
import { Request, Response } from "express";
import z from "zod";
import User from "../models/User.models.js";



export const registerUser = async (req: Request, res: Response) => {
    try {
        const data = req.body;

        const registerSchema = z.object({
            name: z.string().trim(),
            email: z.email().trim(),
            password: z.string()
        })

        //Input validation
        const result = registerSchema.safeParse(data);

        if (!result.success) {
            return res.status(400).json({
                message: "Invalid inputs passed."
            })
        }

        const { name, email, password } = result.data;
        //Check if the user exists
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: "User already exists."
            })
        }

        //Encrypt password for storage in DB.
        const salt = await bcrypt.genSalt(10);
        const hashedPwd = await bcrypt.hash(password as string, salt);

        const newUser = new User({ name, email, password: hashedPwd, credits: 20 });
        await newUser.save();

        //Setup user session
        req.session.isLoggedIn = true;
        req.session.userId = newUser._id.toString();

        // Explicitly save session before responding
        req.session.save((err) => {
            if (err) {
                console.error('Session save error:', err);
                return res.status(500).json({ message: "Session error" });
            }
            return res.status(200).json({
                message: "Account created successfully",
                user: {
                    id: newUser._id,
                    name: newUser.name,
                    email: newUser.email,
                }
            });
        });
    } catch (error: any) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}



export const loginUser = async (req: Request, res: Response) => {
    try {
        const data = req.body;

        const loginSchema = z.object({
            email: z.email().trim(),
            password: z.string()
        })

        //Input validation
        const result = loginSchema.safeParse(data);

        if (!result.success) {
            return res.status(400).json({
                message: "Invalid inputs passed."
            })
        }

        const { email, password } = result.data;
        //Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "User doesn't exists."
            })
        }
        //Check if password exists || cause different login methods might be used.
        if (!user.password) {
            return res.status(400).json({ message: "Invalid login method" });
        }

        //Check if the password is correct
        const isPasswordCorrect = await bcrypt.compare(password as string, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({
                message: "Incorrect email or password."
            })
        }

        //Setup user session
        req.session.isLoggedIn = true;
        req.session.userId = user._id.toString();

        // Explicitly save session before responding
        req.session.save((err) => {
            if (err) {
                console.error('Session save error:', err);
                return res.status(500).json({ message: "Session error" });
            }
            return res.status(200).json({
                message: "Account logged-in successfully",
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                }
            });
        });
    } catch (error: any) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}


export const logoutUser = async (req: Request, res: Response) => {
    req.session.destroy((error) => {
        if (error) {
            console.error(error);
            return res.status(400).json({
                message: "Failed to logout"
            })
        }
        return res.status(200).json({
            message: "Logout Successfull."
        })
    })

}

export const verifyUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.session;

        if (!userId) {
            return res.status(401).json({ message: "Not authenticated" });
        }
        const user = await User.findById(userId).select("-password")
        if (!user) {
            return res.status(401).json({
                message: "Invalid user."
            })
        }

        return res.json({
            user: {
                name: user.name,
                email: user.email,
                credits: user.credits
            },
            message: "User verified"
        })

    } catch (error: any) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}