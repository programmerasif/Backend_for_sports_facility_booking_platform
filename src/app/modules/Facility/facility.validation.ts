import { z } from "zod";

export const facilityValidationSchema = z.object({
    body : z.object({
        name: z.string().min(1, "Name is required"),
        description: z.string().min(10, "Description is required"),
        pricePerHour: z.number().min(0, "Price per hour must be a non-negative number"),
        location: z.string().min(5, "Location is required"),
    })
});
