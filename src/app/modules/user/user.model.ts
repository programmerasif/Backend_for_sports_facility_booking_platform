import { Schema, model } from "mongoose";
import { TUser } from "./user.interface";



// Define the User schema
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
        required: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true 
})

// Create the User model from the schema
// export const User = mongoose.model('User', userSchema);
export const User = model<TUser>('User', userSchema);
