import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

export const ScheduleMeetingFormSchema = z.object({
    title: z.string().min(1, { message: "Title is required" }),
    date: z.string().min(1, { message: "Date is required" }),
    time: z.string().min(1, { message: "Time is required" }),
    duration: z.string().min(1, { message: "Duration is required" }),
    timezone: z.string().min(1, { message: "Timezone is required" }),
    participants: z.string().optional(),
    description: z.string().optional(),
    visibility: z.enum(["public", "private", "codeprotected"]).default("public"),
    code: z.string().optional(),
});

export const ScheduleMeetingFormSchemaResolver = zodResolver(ScheduleMeetingFormSchema);