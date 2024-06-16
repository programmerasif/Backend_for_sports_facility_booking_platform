import { z } from 'zod';
import { Role } from './user.const';

export const userValidationSchema = z.object({
  body: z.object({
    user: z.object({
      name: z.string().min(1, 'Name is required'),
      email: z.string().email(),
      password: z.string().min(1, 'Password is required'),
      phone: z.string().min(1, 'Phone number is required'),
      role: z.enum([...Role] as [string, ...string[]]),
      address: z.string().min(1, 'Address is required'),
    }),
  }),
});
