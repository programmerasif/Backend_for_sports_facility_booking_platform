import { Schema, model } from "mongoose";
import { TFacility } from "./facility.interface";

const facilitySchema = new Schema<TFacility>({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    pricePerHour: {
        type: Number,
        required: true,
        min: 0
    },
    location: {
        type: String,
        required: true,
        trim: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true 
});

export const Facility = model<TFacility>('Facility', facilitySchema);