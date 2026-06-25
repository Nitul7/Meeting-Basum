import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

export const ScheduleMeetingFormSchema = z.object({
    title: z.string().min(1, { message: "Title is required" }),
    date: z.string().min(1, { message: "Date is required" }).transform((date) => {
        // Convert date string to Date object
        const [year, month, day] = date.split("-");
        return new Date(`${year}-${month}-${day}`);
    }),
    time: z.string().min(1, { message: "Time is required" }).transform((time) => {
        // Convert time string to Date object
        const [hours, minutes] = time.split(":");
        const date = new Date();
        date.setHours(hours);
        date.setMinutes(minutes);
        return date;
    }),
    duration: z.string().min(1, { message: "Duration is required" }).transform((duration) => {
        // Convert duration to hours
        return parseInt(duration);
    }),
    timezone: z.string().min(1, { message: "Timezone is required" }),
    participants: z.string().optional()
        .transform((participants) =>
            participants
                ? participants.split(",").map((p) => p.trim()).filter(Boolean) // drop empty entries from trailing/double commas
                : []
        )
        .pipe(z.array(z.string().email("Invalid email address"))),
    description: z.string().min(1, { message: "Description is required" }),
});

export const ScheduleMeetingFormSchemaResolver = zodResolver(ScheduleMeetingFormSchema);