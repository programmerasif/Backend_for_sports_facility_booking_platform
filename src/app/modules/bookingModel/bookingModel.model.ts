import { Schema, Types, model } from "mongoose";
import { TBooking } from "./bookingModel.interface";


const  bookinSchema = new Schema<TBooking>({
    date: {
        type: String,
        required: true,
        validate: {
            validator: function(v: string) {
                return /^\d{4}-\d{2}-\d{2}$/.test(v);
            },
            message: (props: any) => `${props.value} is not a valid date! Format should be YYYY-MM-DD.`
        }
    },
    startTime: {
        type: String,
        required: true,
        validate: {
            validator: function(v: string) {
                return /^\d{2}:\d{2}$/.test(v);
            },
            message: (props: any) => `${props.value} is not a valid time! Format should be HH:MM.`
        }
    },
    endTime: {
        type: String,
        required: true,
        validate: {
            validator: function(v: string) {
                return /^\d{2}:\d{2}$/.test(v);
            },
            message: (props: any) => `${props.value} is not a valid time! Format should be HH:MM.`
        }
    },
    user: {
        type: Schema.Types.ObjectId,
        required: [true, 'User id is required'],
        ref: 'User',
      },
    facility:{
        type: Schema.Types.ObjectId,
        required: [true, 'Facility id is required'],
        ref: 'Facility',
      }, 
    payableAmount: {
        type: Number,
        required: true
    },
    isBooked: {
        type: String,
        enum: ['confirmed', 'unconfirmed', 'canceled'],
        required: true
    }
}, {
    timestamps: true 
});

export const Booking = model<TBooking>('Booking', bookinSchema);