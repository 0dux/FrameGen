import mongoose from "mongoose";

export interface IUser {
    name: string,
    email: string,
    credits: number,
    password?: string,
    createdAt?: string,
    updatedAt?: string,
}

const UserSchema = new mongoose.Schema<IUser>({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: false,
        trim: true,
    },
    credits: {
        type: Number,
        required: true,
    }
}, { timestamps: true })

const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;