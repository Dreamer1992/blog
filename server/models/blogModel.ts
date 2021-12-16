import mongoose from 'mongoose';
import { IBlog } from "../config/interfaces";

const blogSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Types.ObjectId, ref: 'user' },
        title: {
            type: String,
            required: true,
            trim: true,
            minlength: 10,
            maxlength: 50,
        },
        content: {
            type: String,
            required: true,
            minLength: 2000,
        },
        description: {
            type: String,
            required: true,
            trim: true,
            minlength: 50,
            maxlength: 200,
        },
        thumbnail: {
            type: String,
            required: true,
        },
        category: { type: mongoose.Types.ObjectId, ref: 'category' },
    },
    {
        timestamps: true,
    },
);

export default mongoose.model<IBlog>('blog', blogSchema);
