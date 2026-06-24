import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

export const LoginFormSchema = z.object({
    email: z.string().email(),
    password: z.string().min(5),
});


export const LoginFormSchemaResolver = zodResolver(LoginFormSchema);