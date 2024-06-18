import { z } from 'zod';

import { isconfirmed } from './bookingModel.const';

export const YYYYMMDD = /^\d{4}-\d{2}-\d{2}$/;
export const HHMM = /^\d{2}:\d{2}$/;

export const bookingSchema = z.object({
    date: z.string().regex(YYYYMMDD, { message: "Date must be in the format YYYY-MM-DD" }),
    startTime: z.string().regex(HHMM, { message: "Start time must be in the format HH:MM" }),
    endTime: z.string().regex(HHMM, { message: "End time must be in the format HH:MM" }),
    user: z.string(),
    facility: z.string(),
    payableAmount: z.number().min(0, { message: "Payable amount must be a positive number" }),
    isBooked: z.array(z.enum([...isconfirmed] as [string,...string[]]))
});