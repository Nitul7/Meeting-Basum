import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

export const RegisterFormSchema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(5),
    confirmPassword: z.string().min(5)
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});


export const RegisterFormSchemaResolver = zodResolver(RegisterFormSchema);