import * as yup from "yup";
import type { InferType } from "yup";

export const profileSchema = yup.object({
    first_name: yup.string().required("نام نباید خالی باشد."),
    last_name: yup.string().required("نام خانوادگی نباید خالی باشد."),
    email: yup.string().email("ایمیل معتبر نیست.").required("ایمیل نباید خالی باشد."),
    phone: yup
        .string()
        .optional()
        .nullable()
        .transform((value, originalValue) => {
            return originalValue === "" ? null : value;
        })
        .matches(/^09\d{9}$/, {
            message: "شماره تماس باید ۱۱ رقم و با 09 شروع شود.",
            excludeEmptyString: true,
        }),
});

export type ProfileFormValues = InferType<typeof profileSchema>;
