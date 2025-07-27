import { z } from "zod";

export const profileSchema = z.object({
    first_name: z.string().min(1, "نام نباید خالی باشد."),
    last_name: z.string().min(1, "نام خانوادگی نباید خالی باشد."),
    email: z.string().email("ایمیل معتبر نیست.").min(1, "ایمیل نباید خالی باشد."),
    phone: z
        .string()
        .nullable()
        .optional()
        .refine((val) => {
            if (!val) return true;
            return /^09\d{9}$/.test(val);
        }, "شماره تماس باید ۱۱ رقم و با 09 شروع شود."),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;
