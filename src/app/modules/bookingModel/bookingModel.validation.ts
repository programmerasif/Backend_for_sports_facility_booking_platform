import { z } from 'zod';



export const YYYYMMDD = /^\d{4}-\d{2}-\d{2}$/;
export const HHMM = /^\d{2}:\d{2}$/;

export const bookingValidationSchema = z.object({
 body: z.object({
     date: z
    .string()
    .regex(YYYYMMDD, { message: 'Date must be in the format YYYY-MM-DD' }),
  startTime: z
    .string()
    .regex(HHMM, { message: 'Start time must be in the format HH:MM' }),
  endTime: z
    .string()
    .regex(HHMM, { message: 'End time must be in the format HH:MM' }),
  facility: z.string(),
 })
});
